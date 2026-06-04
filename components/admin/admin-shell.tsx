import Link from "next/link";
import { FileText, ImageIcon, LayoutDashboard, LogOut, MapPin, Settings } from "lucide-react";
import { getAdminContext } from "@/lib/admin/auth";
import { signOutAction } from "@/app/admin/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const adminNav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/places", label: "Places", icon: MapPin },
  { href: "/admin/content", label: "Content", icon: FileText },
  { href: "/admin/media", label: "Media", icon: ImageIcon },
  { href: "/admin/settings", label: "Settings", icon: Settings }
];

export async function AdminShell({ children }: { children: React.ReactNode }) {
  const context = await getAdminContext();

  return (
    <div className="container-page mt-8 grid gap-6 md:grid-cols-[220px_1fr]">
      <aside className="h-fit rounded-lg border bg-card p-3 shadow-sm">
        <div className="px-3 py-2">
          <p className="text-sm font-bold">Phitsanulok CMS</p>
          <p className="text-xs text-muted-foreground">
            {context.user?.displayName ?? "Custom admin"}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Badge variant={context.mode === "demo" ? "secondary" : "default"}>
              {context.mode === "demo" ? "Demo" : context.user?.role}
            </Badge>
            {!context.canWrite ? <Badge variant="outline">Read-only</Badge> : null}
          </div>
        </div>
        <nav className="mt-3 grid gap-1">
          {adminNav.map((item) => (
            <Button key={item.href} asChild variant="ghost" className="justify-start">
              <Link href={item.href}>
                <item.icon />
                {item.label}
              </Link>
            </Button>
          ))}
        </nav>
        {context.mode === "authenticated" ? (
          <form action={signOutAction} className="mt-4 border-t pt-3">
            <Button variant="ghost" className="w-full justify-start">
              <LogOut />
              ออกจากระบบ
            </Button>
          </form>
        ) : null}
      </aside>
      <section>{children}</section>
    </div>
  );
}
