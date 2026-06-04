import Link from "next/link";
import { Edit, ExternalLink, Info, MapPin, Plus, Trash2 } from "lucide-react";
import { getAdminContext } from "@/lib/admin/auth";
import { getAdminPlaces } from "@/lib/supabase/admin-places";
import { AdminShell } from "@/components/admin/admin-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { deletePlaceAction } from "./actions";
import { PlaceForm } from "./place-form";

export const metadata = {
  title: "จัดการสถานที่"
};

const categoryLabels: Record<string, string> = {
  "temple-history": "วัดและประวัติศาสตร์",
  nature: "ธรรมชาติ",
  community: "ชุมชน",
  food: "อาหาร",
  "museum-learning": "พิพิธภัณฑ์และศูนย์เรียนรู้"
};

const statusLabels: Record<string, string> = {
  published: "เผยแพร่แล้ว",
  draft: "ฉบับร่าง"
};

type PlacesAdminPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function PlacesAdminPage({ searchParams }: PlacesAdminPageProps) {
  const [context, places, params] = await Promise.all([
    getAdminContext(),
    getAdminPlaces(),
    searchParams
  ]);
  const selectedId = getParam(params, "edit");
  const selectedPlace = places.find((place) => place.id === selectedId) ?? places[0];
  const publishedCount = places.filter((place) => place.status === "published").length;
  const draftCount = places.filter((place) => place.status === "draft").length;

  return (
    <AdminShell>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <Badge variant={context.mode === "demo" ? "secondary" : "default"}>
            {context.mode === "demo" ? "Demo CMS" : "Connected CMS"}
          </Badge>
          <h1 className="mt-3 text-3xl font-bold">จัดการสถานที่</h1>
          <p className="mt-2 text-muted-foreground">
            เพิ่ม แก้ไข เผยแพร่ และจัดสถานที่แนะนำสำหรับหน้าเว็บท่องเที่ยวพิษณุโลก
          </p>
        </div>
        <Button asChild disabled={!context.canWrite}>
          <Link href="/admin/places?new=1">
            <Plus />
            เพิ่มสถานที่ใหม่
          </Link>
        </Button>
      </div>

      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <Metric label="สถานที่ทั้งหมด" value={places.length} />
        <Metric label="เผยแพร่แล้ว" value={publishedCount} />
        <Metric label="ฉบับร่าง" value={draftCount} />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_440px]">
        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <CardTitle>รายการสถานที่</CardTitle>
                <p className="mt-2 text-sm text-muted-foreground">
                  {context.mode === "demo"
                    ? "กำลังแสดงข้อมูล demo จากไฟล์ static เพราะยังไม่ได้ตั้งค่า Supabase env"
                    : "ข้อมูลจาก Supabase table places"}
                </p>
              </div>
              <Badge variant="outline">{context.canWrite ? "แก้ไขได้" : "Read-only"}</Badge>
            </div>
          </CardHeader>
          <CardContent>
            {context.mode === "demo" ? (
              <div className="mb-4 flex items-start gap-2 rounded-md border bg-muted/40 p-3 text-sm text-muted-foreground">
                <Info className="mt-0.5 size-4 shrink-0" />
                <p>
                  เปิด Supabase env และรัน `supabase/schema.sql` เพื่อให้ฟอร์มนี้บันทึกข้อมูลจริงได้
                </p>
              </div>
            ) : null}

            <div className="hidden md:block">
              <Table>
                <THead>
                  <TR>
                    <TH>สถานที่</TH>
                    <TH>อำเภอ</TH>
                    <TH>หมวดหมู่</TH>
                    <TH>สถานะ</TH>
                    <TH>เวลาเที่ยว</TH>
                    <TH className="text-right">การทำงาน</TH>
                  </TR>
                </THead>
                <TBody>
                  {places.map((place) => (
                    <TR key={place.id}>
                      <TD>
                        <div className="font-semibold">{place.name}</div>
                        <div className="mt-1 text-xs text-muted-foreground">{place.slug}</div>
                      </TD>
                      <TD>
                        <div className="flex items-center gap-2">
                          <MapPin className="size-4 text-muted-foreground" />
                          {place.district || "ยังไม่ระบุ"}
                        </div>
                      </TD>
                      <TD>{categoryLabels[place.category] ?? place.category}</TD>
                      <TD>
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant={place.status === "published" ? "default" : "secondary"}>
                            {statusLabels[place.status] ?? place.status}
                          </Badge>
                          {place.featured ? <Badge variant="accent">แนะนำ</Badge> : null}
                        </div>
                      </TD>
                      <TD>{place.duration || "-"}</TD>
                      <TD className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button size="icon" variant="ghost" asChild aria-label="ดูหน้าสถานที่">
                            <Link href={`/places/${place.slug}`}>
                              <ExternalLink />
                            </Link>
                          </Button>
                          <Button size="icon" variant="ghost" asChild aria-label="แก้ไขสถานที่">
                            <Link href={`/admin/places?edit=${place.id}`}>
                              <Edit />
                            </Link>
                          </Button>
                          <form action={deletePlaceAction}>
                            <input type="hidden" name="id" value={place.id} />
                            <Button
                              size="icon"
                              variant="ghost"
                              aria-label="ลบสถานที่"
                              disabled={!context.canWrite}
                            >
                              <Trash2 />
                            </Button>
                          </form>
                        </div>
                      </TD>
                    </TR>
                  ))}
                </TBody>
              </Table>
            </div>

            <div className="grid gap-3 md:hidden">
              {places.map((place) => (
                <article key={place.id} className="rounded-md border p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-base font-semibold leading-6">{place.name}</h2>
                      <p className="mt-1 break-all text-xs text-muted-foreground">{place.slug}</p>
                    </div>
                    <Badge variant={place.status === "published" ? "default" : "secondary"}>
                      {statusLabels[place.status] ?? place.status}
                    </Badge>
                  </div>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge variant="outline">{categoryLabels[place.category] ?? place.category}</Badge>
                    {place.featured ? <Badge variant="accent">แนะนำ</Badge> : null}
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/places/${place.slug}`}>
                        <ExternalLink />
                        ดู
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={`/admin/places?edit=${place.id}`}>
                        <Edit />
                        แก้ไข
                      </Link>
                    </Button>
                    <form action={deletePlaceAction}>
                      <input type="hidden" name="id" value={place.id} />
                      <Button size="sm" variant="outline" disabled={!context.canWrite} className="w-full">
                        <Trash2 />
                        ลบ
                      </Button>
                    </form>
                  </div>
                </article>
              ))}
            </div>
          </CardContent>
        </Card>

        <PlaceForm
          key={getParam(params, "new") ? "new" : selectedPlace?.id ?? "new"}
          place={getParam(params, "new") ? undefined : selectedPlace}
          canWrite={context.canWrite}
          mode={context.mode}
        />
      </div>
    </AdminShell>
  );
}

function Metric({ label, value }: { label: string; value: number }) {
  return (
    <Card>
      <CardContent className="pt-5">
        <p className="text-3xl font-black">{value}</p>
        <p className="text-sm text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
}

function getParam(
  params: Record<string, string | string[] | undefined> | undefined,
  key: string
) {
  const value = params?.[key];

  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}
