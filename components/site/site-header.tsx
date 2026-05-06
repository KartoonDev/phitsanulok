import Link from "next/link";
import { Landmark, LayoutDashboard, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/places", label: "ที่เที่ยว" },
  { href: "/culture", label: "วัฒนธรรม" },
  { href: "/news", label: "ข่าว" },
  { href: "/food", label: "อาหาร" },
  { href: "/stories", label: "เรื่องเล่า" }
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/88 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-bold">
          <span className="flex size-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <Landmark className="size-5" />
          </span>
          <span className="leading-tight">
            พิษณุโลก
            <span className="block text-xs font-medium text-muted-foreground">
              เมืองสองแคว
            </span>
          </span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Button key={item.href} asChild variant="ghost" size="sm">
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" size="sm" className="hidden sm:inline-flex">
            <Link href="/admin">
              <LayoutDashboard />
              หลังบ้าน
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="เมนู">
            <Menu />
          </Button>
        </div>
      </div>
    </header>
  );
}
