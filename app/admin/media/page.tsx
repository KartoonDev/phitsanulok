import Image from "next/image";
import { Upload } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mediaItems } from "@/lib/data";
import { formatThaiDate } from "@/lib/utils";

export const metadata = {
  title: "Media Admin"
};

export default function MediaAdminPage() {
  return (
    <AdminShell>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Media Library</h1>
          <p className="mt-2 text-muted-foreground">
            พื้นที่จัดการรูปภาพ ต่อกับ Supabase Storage bucket `site-media`
          </p>
        </div>
        <Button>
          <Upload />
          Upload
        </Button>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {mediaItems.map((item) => (
          <Card key={item.id} className="overflow-hidden">
            <div className="relative aspect-video">
              <Image src={item.url} alt={item.name} fill className="object-cover" />
            </div>
            <CardContent className="pt-5">
              <h2 className="font-bold">{item.name}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {item.bucket} · {item.size} · {formatThaiDate(item.createdAt)}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </AdminShell>
  );
}
