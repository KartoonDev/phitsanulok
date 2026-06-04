"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { requireAdminWrite } from "@/lib/admin/auth";
import type { ContentStatus } from "@/lib/types";

export type PlaceActionState = {
  ok: boolean;
  message: string;
};

export async function savePlaceAction(
  _previousState: PlaceActionState,
  formData: FormData
): Promise<PlaceActionState> {
  let context;

  try {
    context = await requireAdminWrite();
  } catch (error) {
    return actionError(error);
  }

  if (context.mode === "demo") {
    return {
      ok: false,
      message: "Demo mode: ตั้งค่า Supabase env ก่อนจึงจะบันทึกสถานที่จริงได้"
    };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    return {
      ok: false,
      message: "ยังไม่ได้ตั้งค่า Supabase"
    };
  }

  const id = readText(formData, "id");
  const status = normalizeStatus(readText(formData, "status"));
  const payload = {
    name: readRequired(formData, "name", "กรุณากรอกชื่อสถานที่"),
    slug: slugify(readRequired(formData, "slug", "กรุณากรอก slug")),
    description: readText(formData, "description"),
    category: readRequired(formData, "category", "กรุณาเลือกหมวดหมู่"),
    district: readText(formData, "district"),
    address: readText(formData, "address"),
    opening_hours: parseOpeningHours(readText(formData, "openingHours")),
    entry_fee: readText(formData, "entryFee"),
    phone: readText(formData, "phone"),
    website: readText(formData, "website"),
    latitude: parseOptionalNumber(readText(formData, "latitude")),
    longitude: parseOptionalNumber(readText(formData, "longitude")),
    location: readText(formData, "location"),
    cover_image: readText(formData, "coverImage"),
    tags: parseList(readText(formData, "tags")),
    highlights: parseList(readText(formData, "highlights")),
    travel_tips: parseList(readText(formData, "travelTips")),
    nearby_place_slugs: parseList(readText(formData, "nearbyPlaceSlugs")),
    duration: readText(formData, "duration"),
    best_time_to_visit: readText(formData, "bestTimeToVisit"),
    accessibility: readText(formData, "accessibility"),
    map_url: readText(formData, "mapUrl"),
    status,
    featured: formData.get("featured") === "on",
    published_at: status === "published" ? new Date().toISOString() : null,
    updated_at: new Date().toISOString()
  };

  if (payload.latitude !== null && (payload.latitude < -90 || payload.latitude > 90)) {
    return { ok: false, message: "ละติจูดต้องอยู่ระหว่าง -90 ถึง 90" };
  }

  if (payload.longitude !== null && (payload.longitude < -180 || payload.longitude > 180)) {
    return { ok: false, message: "ลองจิจูดต้องอยู่ระหว่าง -180 ถึง 180" };
  }

  const query = id
    ? supabase.from("places").update(payload).eq("id", id).select("id").single()
    : supabase.from("places").insert(payload).select("id").single();

  const { error } = await query;

  if (error) {
    return {
      ok: false,
      message: error.message
    };
  }

  revalidatePath("/admin/places");
  revalidatePath("/places");
  revalidatePath("/");

  return {
    ok: true,
    message: id ? "บันทึกการแก้ไขสถานที่แล้ว" : "เพิ่มสถานที่ใหม่แล้ว"
  };
}

export async function deletePlaceAction(formData: FormData) {
  try {
    const context = await requireAdminWrite();

    if (context.mode === "demo") {
      return;
    }

    const id = readRequired(formData, "id", "ไม่พบสถานที่ที่ต้องการลบ");
    const supabase = await createSupabaseServerClient();

    if (!supabase) {
      return;
    }

    await supabase.from("places").delete().eq("id", id);
    revalidatePath("/admin/places");
    revalidatePath("/places");
    revalidatePath("/");
  } catch (error) {
    console.error("Failed to delete place", error);
  }
}

function readText(formData: FormData, key: string) {
  const value = formData.get(key);

  return typeof value === "string" ? value.trim() : "";
}

function readRequired(formData: FormData, key: string, message: string) {
  const value = readText(formData, key);

  if (!value) {
    throw new Error(message);
  }

  return value;
}

function parseList(value: string) {
  return value
    .split(/[,\\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseOpeningHours(value: string) {
  return value ? { daily: value } : {};
}

function parseOptionalNumber(value: string) {
  if (!value) {
    return null;
  }

  const number = Number(value);

  return Number.isFinite(number) ? number : null;
}

function normalizeStatus(value: string): ContentStatus {
  return value === "published" ? "published" : "draft";
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9ก-๙]+/gi, "-")
    .replace(/^-+|-+$/g, "");
}

function actionError(error: unknown): PlaceActionState {
  return {
    ok: false,
    message: error instanceof Error ? error.message : "ไม่สามารถบันทึกข้อมูลได้"
  };
}
