import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/client";

export type AdminRole = "admin" | "editor" | "viewer";

export type AdminContext = {
  mode: "demo" | "authenticated";
  user: {
    id: string;
    email: string;
    displayName: string;
    role: AdminRole;
  } | null;
  canWrite: boolean;
};

export async function getAdminContext(): Promise<AdminContext> {
  if (!isSupabaseConfigured()) {
    return {
      mode: "demo",
      user: null,
      canWrite: false
    };
  }

  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    redirect("/admin/login");
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/admin/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("display_name, role")
    .eq("id", user.id)
    .maybeSingle();

  const role = normalizeRole(profile?.role);

  return {
    mode: "authenticated",
    user: {
      id: user.id,
      email: user.email ?? "",
      displayName: profile?.display_name ?? user.email ?? "Admin",
      role
    },
    canWrite: role === "admin" || role === "editor"
  };
}

export async function requireAdminWrite() {
  const context = await getAdminContext();

  if (!context.canWrite) {
    throw new Error("บัญชีนี้ไม่มีสิทธิ์แก้ไขข้อมูล");
  }

  return context;
}

function normalizeRole(role: unknown): AdminRole {
  return role === "admin" || role === "editor" || role === "viewer" ? role : "viewer";
}
