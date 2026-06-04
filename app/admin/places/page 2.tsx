import { Edit, ExternalLink, Info, MapPin, Plus, Save, Trash2 } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

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

const demoPlaces = [
  {
    name: "วัดพระศรีรัตนมหาธาตุวรมหาวิหาร",
    slug: "wat-phra-si-rattana-mahathat",
    category: "temple-history",
    district: "เมืองพิษณุโลก",
    status: "published",
    featured: true,
    duration: "1-2 ชั่วโมง",
    publishedAt: "2026-05-09"
  },
  {
    name: "อุทยานแห่งชาติภูหินร่องกล้า",
    slug: "phu-hin-rong-kla",
    category: "nature",
    district: "นครไทย",
    status: "published",
    featured: true,
    duration: "ครึ่งวัน-เต็มวัน",
    publishedAt: "2026-05-09"
  },
  {
    name: "ริมแม่น้ำน่าน พิษณุโลก",
    slug: "nan-river-community",
    category: "community",
    district: "เมืองพิษณุโลก",
    status: "draft",
    featured: false,
    duration: "30 นาที-1 ชั่วโมง",
    publishedAt: null
  }
];

export default function PlacesAdminPage() {
  return (
    <AdminShell>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <Badge variant="secondary">หน้าจอตัวอย่าง</Badge>
          <h1 className="mt-3 text-3xl font-bold">จัดการสถานที่</h1>
          <p className="mt-2 text-muted-foreground">
            ข้อมูลด้านล่างเป็นตัวอย่างแบบ static สำหรับออกแบบ workflow ของ editor ไทย ยังไม่บันทึกหรือแก้ไขข้อมูลจริง
          </p>
        </div>
        <Button disabled title="ยังไม่เชื่อมระบบสร้างสถานที่">
          <Plus />
          เพิ่มสถานที่ใหม่
        </Button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <CardTitle>รายการสถานที่ตัวอย่าง</CardTitle>
                <p className="mt-2 text-sm text-muted-foreground">
                  ใช้ตรวจหน้าตา ตาราง และสถานะเผยแพร่เท่านั้น ปุ่มทุกปุ่มถูกปิดไว้จนกว่าจะต่อ CRUD จริง
                </p>
              </div>
              <Badge variant="outline">Read-only demo</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-start gap-2 rounded-md border bg-muted/40 p-3 text-sm text-muted-foreground">
              <Info className="mt-0.5 size-4 shrink-0" />
              <p>
                สถานะ หมวดหมู่ และปุ่มเผยแพร่เป็นตัวอย่าง UI เท่านั้น ข้อมูลจริงยังต้องเชื่อม Supabase ก่อนเปิดให้แก้ไข
              </p>
            </div>

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
                  {demoPlaces.map((place) => (
                    <TR key={place.slug}>
                      <TD>
                        <div className="font-semibold">{place.name}</div>
                        <div className="mt-1 text-xs text-muted-foreground">{place.slug}</div>
                      </TD>
                      <TD>
                        <div className="flex items-center gap-2">
                          <MapPin className="size-4 text-muted-foreground" />
                          {place.district}
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
                      <TD>{place.duration}</TD>
                      <TD className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="icon"
                            variant="ghost"
                            aria-label="ดูตัวอย่าง ยังไม่เปิดใช้งาน"
                            disabled
                            title="ตัวอย่างเท่านั้น ยังไม่เปิด preview"
                          >
                            <ExternalLink />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            aria-label="แก้ไขสถานที่ ยังไม่เปิดใช้งาน"
                            disabled
                            title="ตัวอย่างเท่านั้น ยังไม่เปิดแก้ไข"
                          >
                            <Edit />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            aria-label="ลบสถานที่ ยังไม่เปิดใช้งาน"
                            disabled
                            title="ตัวอย่างเท่านั้น ยังไม่เปิดลบ"
                          >
                            <Trash2 />
                          </Button>
                        </div>
                      </TD>
                    </TR>
                  ))}
                </TBody>
              </Table>
            </div>

            <div className="grid gap-3 md:hidden">
              {demoPlaces.map((place) => (
                <article key={place.slug} className="rounded-md border p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h2 className="text-base font-semibold leading-6">{place.name}</h2>
                      <p className="mt-1 break-all text-xs text-muted-foreground">{place.slug}</p>
                    </div>
                    <Badge variant={place.status === "published" ? "default" : "secondary"}>
                      {statusLabels[place.status] ?? place.status}
                    </Badge>
                  </div>
                  <div className="mt-3 grid gap-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="size-4" />
                      <span>{place.district}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline">{categoryLabels[place.category] ?? place.category}</Badge>
                      <Badge variant="outline">{place.duration}</Badge>
                      {place.featured ? <Badge variant="accent">แนะนำ</Badge> : null}
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <Button size="sm" variant="outline" disabled>
                      <ExternalLink />
                      ดู
                    </Button>
                    <Button size="sm" variant="outline" disabled>
                      <Edit />
                      แก้ไข
                    </Button>
                    <Button size="sm" variant="outline" disabled>
                      <Trash2 />
                      ลบ
                    </Button>
                  </div>
                  <p className="mt-3 text-xs text-muted-foreground">
                    ปุ่มถูกปิดไว้ เพราะหน้านี้ยังเป็นข้อมูลตัวอย่าง
                  </p>
                </article>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>แบบฟอร์มตัวอย่างสำหรับ editor</CardTitle>
            <p className="mt-2 text-sm text-muted-foreground">
              ช่องข้อมูลเป็นตัวอย่างเพื่อแสดงโครงสร้างเนื้อหา ยังไม่สามารถบันทึก draft หรือ publish ได้
            </p>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="placeName">ชื่อสถานที่</Label>
              <Input
                id="placeName"
                defaultValue="วัดพระศรีรัตนมหาธาตุวรมหาวิหาร"
                readOnly
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="placeSlug">Slug สำหรับ URL</Label>
              <Input id="placeSlug" defaultValue="wat-phra-si-rattana-mahathat" readOnly />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="placeDescription">คำอธิบายสั้น</Label>
              <Textarea
                id="placeDescription"
                defaultValue="วัดสำคัญคู่เมืองพิษณุโลก เป็นที่ประดิษฐานพระพุทธชินราช"
                readOnly
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="placeCategory">หมวดหมู่</Label>
                <select
                  id="placeCategory"
                  className="focus-ring h-10 rounded-md border bg-background px-3 text-sm disabled:cursor-not-allowed disabled:opacity-70"
                  defaultValue="temple-history"
                  disabled
                >
                  <option value="temple-history">วัดและประวัติศาสตร์</option>
                  <option value="nature">ธรรมชาติ</option>
                  <option value="community">ชุมชน</option>
                  <option value="food">อาหาร</option>
                  <option value="museum-learning">พิพิธภัณฑ์และศูนย์เรียนรู้</option>
                </select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="placeDistrict">อำเภอ</Label>
                <Input id="placeDistrict" defaultValue="เมืองพิษณุโลก" readOnly />
              </div>
            </div>
            <div className="grid gap-3 rounded-md border p-3">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <Label htmlFor="placeStatus">สถานะเนื้อหา</Label>
                  <p className="mt-1 text-xs text-muted-foreground">
                    เลือกได้เมื่อเชื่อมระบบบันทึกจริงแล้ว
                  </p>
                </div>
                <Badge variant="default">เผยแพร่แล้ว</Badge>
              </div>
              <select
                id="placeStatus"
                className="focus-ring h-10 rounded-md border bg-background px-3 text-sm disabled:cursor-not-allowed disabled:opacity-70"
                defaultValue="published"
                disabled
              >
                <option value="draft">ฉบับร่าง</option>
                <option value="published">เผยแพร่แล้ว</option>
              </select>
              <label className="flex items-center gap-2 text-sm text-muted-foreground">
                <input type="checkbox" defaultChecked disabled className="size-4" />
                แสดงเป็นสถานที่แนะนำบนหน้าเว็บ
              </label>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="placeAddress">ที่อยู่</Label>
              <Textarea
                id="placeAddress"
                defaultValue="ถนนพุทธบูชา ตำบลในเมือง อำเภอเมืองพิษณุโลก จังหวัดพิษณุโลก"
                readOnly
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="placeOpeningHours">เวลาเปิด</Label>
                <Input id="placeOpeningHours" defaultValue="06:00-18:00" readOnly />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="placeEntryFee">ค่าเข้าชม</Label>
                <Input id="placeEntryFee" defaultValue="เข้าชมฟรี" readOnly />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="placePhone">โทรศัพท์</Label>
                <Input id="placePhone" defaultValue="055-251-649" readOnly />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="placeWebsite">เว็บไซต์</Label>
                <Input id="placeWebsite" placeholder="https://example.com" readOnly />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="placeLatitude">ละติจูด</Label>
                <Input id="placeLatitude" defaultValue="16.824310" readOnly />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="placeLongitude">ลองจิจูด</Label>
                <Input id="placeLongitude" defaultValue="100.262870" readOnly />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="placeTags">แท็กสำหรับค้นหา</Label>
              <Input id="placeTags" defaultValue="วัด, มรดกเมือง, ใจกลางเมือง" readOnly />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="placeHighlights">จุดเด่น</Label>
              <Textarea
                id="placeHighlights"
                defaultValue="พระพุทธชินราช, สถาปัตยกรรมวัดเก่า, เดินเที่ยวริมแม่น้ำน่าน"
                readOnly
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="placeTravelTips">คำแนะนำสำหรับนักท่องเที่ยว</Label>
              <Textarea
                id="placeTravelTips"
                defaultValue="แต่งกายสุภาพ, ช่วงเช้าคนไม่แน่น, จอดรถตามจุดที่วัดจัดไว้"
                readOnly
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="placeDuration">เวลาเที่ยวโดยประมาณ</Label>
                <Input id="placeDuration" defaultValue="1-2 ชั่วโมง" readOnly />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="placeBestTime">ช่วงเวลาที่แนะนำ</Label>
                <Input id="placeBestTime" defaultValue="เช้าหรือเย็น" readOnly />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="placeAccessibility">การเข้าถึง</Label>
              <Textarea
                id="placeAccessibility"
                defaultValue="มีทางเดินหลักและพื้นที่พัก แต่บางจุดมีขั้นบันได"
                readOnly
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="placeMapUrl">ลิงก์แผนที่</Label>
              <Input
                id="placeMapUrl"
                defaultValue="https://maps.google.com/?q=Wat+Phra+Si+Rattana+Mahathat+Phitsanulok"
                readOnly
              />
            </div>
            <Button disabled title="ยังไม่เชื่อมระบบบันทึก draft">
              <Save />
              บันทึกฉบับร่าง
            </Button>
            <p className="text-xs text-muted-foreground">
              ปุ่มบันทึกถูกปิดไว้เพื่อไม่ให้เข้าใจผิดว่าแก้ไขข้อมูลจริงได้
            </p>
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
