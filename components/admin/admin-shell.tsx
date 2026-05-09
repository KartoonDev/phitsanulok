import Link from "next/link";
import { FileText, ImageIcon, LayoutDashboard, MapPin, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

const adminNav = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/places", label: "Places", icon: MapPin },
  { href: "/admin/content", label: "Content", icon: FileText },
  { href: "/admin/media", label: "Media", icon: ImageIcon },
  { href: "/admin/settings", label: "Settings", icon: Settings }
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="container-page mt-8 grid gap-6 md:grid-cols-[220px_1fr]">
      <aside className="h-fit rounded-lg border bg-card p-3 shadow-sm">
        <div className="px-3 py-2">
          <p className="text-sm font-bold">Phitsanulok CMS</p>
          <p className="text-xs text-muted-foreground">Custom admin</p>
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
      </aside>
      <section>{children}</section>
    </div>
  );
}
