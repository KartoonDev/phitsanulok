import { AdminShell } from "@/components/admin/admin-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export const metadata = {
  title: "Site Settings"
};

export default function SettingsAdminPage() {
  return (
    <AdminShell>
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Site Settings</h1>
        <p className="mt-2 text-muted-foreground">
          ข้อมูลกลางของเว็บไซต์ เช่น hero, contact และ social links
        </p>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>ข้อมูลเว็บไซต์</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="siteName">Site name</Label>
            <Input id="siteName" defaultValue="พิษณุโลก เมืองสองแคว" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="hero">Hero message</Label>
            <Textarea
              id="hero"
              defaultValue="บ้านเกิดที่เล่าใหม่ด้วยเว็บไซต์สมัยใหม่"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contact">Contact email</Label>
            <Input id="contact" defaultValue="contact@phitsanulok.local" />
          </div>
          <Button className="w-fit">Save settings</Button>
        </CardContent>
      </Card>
    </AdminShell>
  );
}
