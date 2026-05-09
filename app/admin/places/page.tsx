import { Edit, ExternalLink, MapPin, Plus, Trash2 } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";

export const metadata = {
  title: "Places Admin"
};

const demoPlaces = [
  {
    name: "วัดพระศรีรัตนมหาธาตุวรมหาวิหาร",
    slug: "wat-phra-si-rattana-mahathat",
    category: "culture",
    district: "เมืองพิษณุโลก",
    status: "published",
    featured: true,
    duration: "1-2 ชั่วโมง",
    publishedAt: "2026-05-09"
  },
  {
    name: "อุทยานแห่งชาติภูหินร่องกล้า",
    slug: "phu-hin-rong-kla-national-park",
    category: "nature",
    district: "นครไทย",
    status: "published",
    featured: true,
    duration: "ครึ่งวัน-เต็มวัน",
    publishedAt: "2026-05-09"
  },
  {
    name: "ริมแม่น้ำน่าน พิษณุโลก",
    slug: "nan-riverfront",
    category: "places",
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
          <h1 className="text-3xl font-bold">Places</h1>
          <p className="mt-2 text-muted-foreground">
            จัดการข้อมูลสถานที่ท่องเที่ยว อำเภอ เวลาเปิด ค่าเข้า และข้อมูลแผนที่
          </p>
        </div>
        <Button>
          <Plus />
          New place
        </Button>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <Card>
          <CardHeader>
            <CardTitle>รายการสถานที่</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <THead>
                <TR>
                  <TH>Place</TH>
                  <TH>District</TH>
                  <TH>Category</TH>
                  <TH>Status</TH>
                  <TH>Duration</TH>
                  <TH className="text-right">Actions</TH>
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
                    <TD>{place.category}</TD>
                    <TD>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant={place.status === "published" ? "default" : "secondary"}>
                          {place.status}
                        </Badge>
                        {place.featured ? <Badge variant="accent">featured</Badge> : null}
                      </div>
                    </TD>
                    <TD>{place.duration}</TD>
                    <TD className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="icon" variant="ghost" aria-label="Open preview">
                          <ExternalLink />
                        </Button>
                        <Button size="icon" variant="ghost" aria-label="Edit place">
                          <Edit />
                        </Button>
                        <Button size="icon" variant="ghost" aria-label="Delete place">
                          <Trash2 />
                        </Button>
                      </div>
                    </TD>
                  </TR>
                ))}
              </TBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>ฟอร์มตัวอย่าง</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="placeName">Name</Label>
              <Input
                id="placeName"
                defaultValue="วัดพระศรีรัตนมหาธาตุวรมหาวิหาร"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="placeSlug">Slug</Label>
              <Input id="placeSlug" defaultValue="wat-phra-si-rattana-mahathat" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="placeDescription">Description</Label>
              <Textarea
                id="placeDescription"
                defaultValue="วัดสำคัญคู่เมืองพิษณุโลก เป็นที่ประดิษฐานพระพุทธชินราช"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="placeCategory">Category</Label>
                <Input id="placeCategory" defaultValue="culture" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="placeDistrict">District</Label>
                <Input id="placeDistrict" defaultValue="เมืองพิษณุโลก" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="placeAddress">Address</Label>
              <Textarea
                id="placeAddress"
                defaultValue="ถนนพุทธบูชา ตำบลในเมือง อำเภอเมืองพิษณุโลก จังหวัดพิษณุโลก"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="placeOpeningHours">Opening hours</Label>
                <Input id="placeOpeningHours" defaultValue="06:00-18:00" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="placeEntryFee">Entry fee</Label>
                <Input id="placeEntryFee" defaultValue="เข้าชมฟรี" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="placePhone">Phone</Label>
                <Input id="placePhone" defaultValue="055-251-649" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="placeWebsite">Website</Label>
                <Input id="placeWebsite" placeholder="https://example.com" />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="placeLatitude">Latitude</Label>
                <Input id="placeLatitude" defaultValue="16.824310" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="placeLongitude">Longitude</Label>
                <Input id="placeLongitude" defaultValue="100.262870" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="placeTags">Tags</Label>
              <Input id="placeTags" defaultValue="temple, heritage, city-center" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="placeHighlights">Highlights</Label>
              <Textarea
                id="placeHighlights"
                defaultValue="พระพุทธชินราช, สถาปัตยกรรมวัดเก่า, เดินเที่ยวริมแม่น้ำน่าน"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="placeTravelTips">Travel tips</Label>
              <Textarea
                id="placeTravelTips"
                defaultValue="แต่งกายสุภาพ, ช่วงเช้าคนไม่แน่น, จอดรถตามจุดที่วัดจัดไว้"
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="placeDuration">Duration</Label>
                <Input id="placeDuration" defaultValue="1-2 ชั่วโมง" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="placeBestTime">Best time</Label>
                <Input id="placeBestTime" defaultValue="เช้าหรือเย็น" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="placeAccessibility">Accessibility</Label>
              <Textarea
                id="placeAccessibility"
                defaultValue="มีทางเดินหลักและพื้นที่พัก แต่บางจุดมีขั้นบันได"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="placeMapUrl">Map URL</Label>
              <Input
                id="placeMapUrl"
                defaultValue="https://maps.google.com/?q=Wat+Phra+Si+Rattana+Mahathat+Phitsanulok"
              />
            </div>
            <Button>Save draft</Button>
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
