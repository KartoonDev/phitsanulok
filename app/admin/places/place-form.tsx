"use client";

import { useActionState } from "react";
import { Save } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { AdminPlace } from "@/lib/supabase/admin-places";
import { savePlaceAction, type PlaceActionState } from "./actions";

const initialState: PlaceActionState = {
  ok: false,
  message: ""
};

const categories = [
  ["temple-history", "วัดและประวัติศาสตร์"],
  ["nature", "ธรรมชาติ"],
  ["community", "ชุมชน"],
  ["food", "อาหาร"],
  ["museum-learning", "พิพิธภัณฑ์และศูนย์เรียนรู้"]
];

export function PlaceForm({
  place,
  canWrite,
  mode
}: {
  place?: AdminPlace;
  canWrite: boolean;
  mode: "demo" | "authenticated";
}) {
  const [state, formAction, pending] = useActionState(savePlaceAction, initialState);
  const disabled = !canWrite || pending;

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <CardTitle>{place ? "แก้ไขสถานที่" : "เพิ่มสถานที่ใหม่"}</CardTitle>
            <p className="mt-2 text-sm text-muted-foreground">
              ฟอร์มนี้บันทึกลง Supabase เมื่อเข้าสู่ระบบด้วย role admin/editor
            </p>
          </div>
          <Badge variant={mode === "demo" ? "secondary" : "default"}>
            {mode === "demo" ? "Demo mode" : canWrite ? "แก้ไขได้" : "อ่านอย่างเดียว"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="grid gap-4">
          {place ? <input type="hidden" name="id" value={place.id} /> : null}
          <Field label="ชื่อสถานที่" name="name" defaultValue={place?.name} disabled={disabled} required />
          <Field label="Slug สำหรับ URL" name="slug" defaultValue={place?.slug} disabled={disabled} required />
          <div className="grid gap-2">
            <Label htmlFor="description">คำอธิบายสั้น</Label>
            <Textarea
              id="description"
              name="description"
              defaultValue={place?.description}
              disabled={disabled}
              rows={4}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="category">หมวดหมู่</Label>
              <select
                id="category"
                name="category"
                defaultValue={place?.category ?? "temple-history"}
                disabled={disabled}
                className="focus-ring h-10 rounded-md border bg-background px-3 text-sm disabled:cursor-not-allowed disabled:opacity-60"
              >
                {categories.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <Field label="อำเภอ" name="district" defaultValue={place?.district} disabled={disabled} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="ย่าน/ตำแหน่งที่แสดงบนการ์ด" name="location" defaultValue={place?.location} disabled={disabled} />
            <Field label="เวลาเที่ยวโดยประมาณ" name="duration" defaultValue={place?.duration} disabled={disabled} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="address">ที่อยู่</Label>
            <Textarea id="address" name="address" defaultValue={place?.address} disabled={disabled} rows={3} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="เวลาเปิด" name="openingHours" defaultValue={place?.openingHours} disabled={disabled} />
            <Field label="ค่าเข้าชม" name="entryFee" defaultValue={place?.entryFee} disabled={disabled} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="โทรศัพท์" name="phone" defaultValue={place?.phone} disabled={disabled} />
            <Field label="เว็บไซต์" name="website" defaultValue={place?.website} disabled={disabled} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="ละติจูด" name="latitude" defaultValue={place?.latitude} disabled={disabled} />
            <Field label="ลองจิจูด" name="longitude" defaultValue={place?.longitude} disabled={disabled} />
          </div>
          <Field label="Cover image URL" name="coverImage" defaultValue={place?.coverImage} disabled={disabled} />
          <Field label="ลิงก์แผนที่" name="mapUrl" defaultValue={place?.mapUrl} disabled={disabled} />
          <Field label="ช่วงเวลาที่แนะนำ" name="bestTimeToVisit" defaultValue={place?.bestTimeToVisit} disabled={disabled} />
          <div className="grid gap-2">
            <Label htmlFor="accessibility">การเข้าถึง</Label>
            <Textarea
              id="accessibility"
              name="accessibility"
              defaultValue={place?.accessibility}
              disabled={disabled}
              rows={3}
            />
          </div>
          <ListField label="แท็ก" name="tags" values={place?.tags} disabled={disabled} />
          <ListField label="จุดเด่น" name="highlights" values={place?.highlights} disabled={disabled} />
          <ListField label="คำแนะนำนักท่องเที่ยว" name="travelTips" values={place?.travelTips} disabled={disabled} />
          <ListField label="Slug สถานที่ใกล้เคียง" name="nearbyPlaceSlugs" values={place?.nearbyPlaceSlugs} disabled={disabled} />
          <div className="grid gap-3 rounded-md border p-3">
            <Label htmlFor="status">สถานะเนื้อหา</Label>
            <select
              id="status"
              name="status"
              defaultValue={place?.status ?? "draft"}
              disabled={disabled}
              className="focus-ring h-10 rounded-md border bg-background px-3 text-sm disabled:cursor-not-allowed disabled:opacity-60"
            >
              <option value="draft">ฉบับร่าง</option>
              <option value="published">เผยแพร่แล้ว</option>
            </select>
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <input
                type="checkbox"
                name="featured"
                defaultChecked={place?.featured ?? false}
                disabled={disabled}
                className="size-4"
              />
              แสดงเป็นสถานที่แนะนำบนหน้าเว็บ
            </label>
          </div>
          {state.message ? (
            <p className={state.ok ? "text-sm font-semibold text-emerald-700" : "text-sm font-semibold text-destructive"}>
              {state.message}
            </p>
          ) : null}
          <Button disabled={disabled}>
            <Save />
            {pending ? "กำลังบันทึก" : place ? "บันทึกการแก้ไข" : "เพิ่มสถานที่"}
          </Button>
          {!canWrite ? (
            <p className="text-xs text-muted-foreground">
              {mode === "demo"
                ? "ยังไม่ตั้งค่า Supabase env จึงปิดการบันทึกจริงไว้ก่อน"
                : "บัญชีนี้ไม่มีสิทธิ์แก้ไขข้อมูล"}
            </p>
          ) : null}
        </form>
      </CardContent>
    </Card>
  );
}

function Field({
  label,
  name,
  defaultValue,
  disabled,
  required
}: {
  label: string;
  name: string;
  defaultValue?: string;
  disabled: boolean;
  required?: boolean;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Input id={name} name={name} defaultValue={defaultValue ?? ""} disabled={disabled} required={required} />
    </div>
  );
}

function ListField({
  label,
  name,
  values,
  disabled
}: {
  label: string;
  name: string;
  values?: string[];
  disabled: boolean;
}) {
  return (
    <div className="grid gap-2">
      <Label htmlFor={name}>{label}</Label>
      <Textarea
        id={name}
        name={name}
        defaultValue={(values ?? []).join(", ")}
        disabled={disabled}
        rows={2}
        placeholder="คั่นรายการด้วย comma หรือขึ้นบรรทัดใหม่"
      />
    </div>
  );
}
