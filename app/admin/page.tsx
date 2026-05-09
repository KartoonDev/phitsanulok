import Link from "next/link";
import { BarChart3, FileText, ImageIcon, MapPin } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { places, posts, mediaItems } from "@/lib/data";

export const metadata = {
  title: "Admin Dashboard"
};

export default function AdminPage() {
  const metrics = [
    { label: "Posts", value: posts.length, icon: FileText },
    { label: "Places", value: places.length, icon: MapPin },
    { label: "Media", value: mediaItems.length, icon: ImageIcon },
    { label: "Published", value: posts.filter((post) => post.status === "published").length, icon: BarChart3 }
  ];

  return (
    <AdminShell>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <Badge variant="secondary">Demo CMS</Badge>
          <h1 className="mt-3 text-3xl font-bold">Dashboard</h1>
          <p className="mt-2 text-muted-foreground">
            ภาพรวมระบบจัดการเนื้อหาจังหวัดพิษณุโลก พร้อมต่อ Supabase
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button asChild variant="secondary">
            <Link href="/admin/places">จัดการสถานที่</Link>
          </Button>
          <Button asChild>
            <Link href="/admin/content">จัดการเนื้อหา</Link>
          </Button>
        </div>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        {metrics.map((metric) => (
          <Card key={metric.label}>
            <CardContent className="pt-5">
              <metric.icon className="size-5 text-primary" />
              <p className="mt-4 text-3xl font-black">{metric.value}</p>
              <p className="text-sm text-muted-foreground">{metric.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>งานที่ควรทำต่อ</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 text-sm leading-6 text-muted-foreground">
          <p>1. ตั้งค่า Supabase env และรัน schema SQL</p>
          <p>2. สร้าง admin user แล้วกำหนด role เป็น admin ใน `profiles`</p>
          <p>3. เปลี่ยน demo data เป็น query จาก Supabase ในแต่ละหน้า</p>
        </CardContent>
      </Card>
    </AdminShell>
  );
}
