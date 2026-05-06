import { Edit, Plus, Trash2 } from "lucide-react";
import { AdminShell } from "@/components/admin/admin-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TBody, TD, TH, THead, TR } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { posts } from "@/lib/data";
import { formatThaiDate } from "@/lib/utils";

export const metadata = {
  title: "Content Admin"
};

export default function ContentAdminPage() {
  return (
    <AdminShell>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Content</h1>
          <p className="mt-2 text-muted-foreground">
            CRUD ข่าว บทความ และสถานะ publish/draft
          </p>
        </div>
        <Button>
          <Plus />
          New post
        </Button>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <Card>
          <CardHeader>
            <CardTitle>รายการเนื้อหา</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <THead>
                <TR>
                  <TH>Title</TH>
                  <TH>Type</TH>
                  <TH>Status</TH>
                  <TH>Published</TH>
                  <TH className="text-right">Actions</TH>
                </TR>
              </THead>
              <TBody>
                {posts.map((post) => (
                  <TR key={post.id}>
                    <TD className="font-semibold">{post.title}</TD>
                    <TD>{post.type}</TD>
                    <TD>
                      <Badge variant={post.status === "published" ? "default" : "secondary"}>
                        {post.status}
                      </Badge>
                    </TD>
                    <TD>{formatThaiDate(post.publishedAt)}</TD>
                    <TD className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button size="icon" variant="ghost" aria-label="Edit">
                          <Edit />
                        </Button>
                        <Button size="icon" variant="ghost" aria-label="Delete">
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
              <Label htmlFor="title">Title</Label>
              <Input id="title" placeholder="หัวข้อข่าวหรือบทความ" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="slug">Slug</Label>
              <Input id="slug" placeholder="local-story-slug" />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="excerpt">Excerpt</Label>
              <Textarea id="excerpt" placeholder="คำโปรยหน้าเว็บ" />
            </div>
            <Button>Save draft</Button>
          </CardContent>
        </Card>
      </div>
    </AdminShell>
  );
}
