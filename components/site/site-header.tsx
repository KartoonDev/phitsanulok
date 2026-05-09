"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe2, LayoutDashboard, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/", label: "หน้าแรก" },
  { href: "/places", label: "ที่เที่ยว" },
  { href: "/culture", label: "วัฒนธรรม" },
  { href: "/news", label: "ข่าว" },
  { href: "/food", label: "อาหาร" },
  { href: "/stories", label: "เรื่องเล่า" }
];

export function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-primary/20 text-primary-foreground backdrop-blur-md">
      <div className="container-page grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-3">
        <Link href="/" className="flex min-w-0 items-center gap-2 font-bold">
          <span className="relative size-11 shrink-0 overflow-hidden rounded-full border border-accent/55 bg-black/30 shadow-sm shadow-accent/30">
            <Image
              src="/brand/phitsanulok-logo.png"
              alt="ตราจังหวัดพิษณุโลก"
              fill
              priority
              className="object-cover object-[50%_28%]"
              sizes="44px"
            />
          </span>
          <span className="hidden leading-tight text-accent sm:inline">
            พิษณุโลก
            <span className="block text-xs font-medium text-primary-foreground/70">
              เมืองสองแคว
            </span>
          </span>
        </Link>
        <nav className="hidden items-center justify-center gap-1 rounded-full border border-white/10 bg-black/10 px-2 py-1 md:flex">
          {navItems.map((item) => {
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <Button
                key={item.href}
                asChild
                variant="ghost"
                size="sm"
                className={
                  isActive
                    ? "rounded-full bg-white/10 text-accent hover:bg-white/10 hover:text-accent"
                    : "rounded-full text-primary-foreground/80 hover:bg-white/10 hover:text-primary-foreground"
                }
              >
                <Link href={item.href}>{item.label}</Link>
              </Button>
            );
          })}
        </nav>
        <div className="flex items-center justify-end gap-2">
          <Button variant="ghost" size="icon" className="hidden rounded-full text-primary-foreground/80 hover:bg-white/10 md:inline-flex" aria-label="เปลี่ยนภาษา">
            <Globe2 />
          </Button>
          <Button variant="ghost" size="icon" className="hidden rounded-full text-primary-foreground/80 hover:bg-white/10 md:inline-flex" aria-label="ค้นหา">
            <Search />
          </Button>
          <Button asChild variant="outline" size="sm" className="hidden rounded-full border-white/25 bg-white/10 text-primary-foreground hover:bg-white/10 md:inline-flex">
            <Link href="/admin">
              <LayoutDashboard />
              หลังบ้าน
            </Link>
          </Button>
          <details className="group relative md:hidden">
            <summary
              className="focus-ring inline-flex size-10 cursor-pointer list-none items-center justify-center rounded-md text-primary-foreground hover:bg-white/10 [&::-webkit-details-marker]:hidden"
              aria-label="เปิดเมนูนำทาง"
            >
              <Menu className="size-5" />
            </summary>
            <div className="absolute right-0 top-12 w-64 rounded-lg border border-white/10 bg-primary p-2 shadow-soft">
              <nav className="grid gap-1" aria-label="เมนูนำทางมือถือ">
                {navItems.map((item) => {
                  const isActive =
                    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={
                        isActive
                          ? "focus-ring rounded-md bg-white/10 px-3 py-2 text-sm font-semibold text-accent"
                          : "focus-ring rounded-md px-3 py-2 text-sm font-semibold text-primary-foreground/80 hover:bg-white/10 hover:text-primary-foreground"
                      }
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <Link
                  href="/admin"
                  className="focus-ring mt-1 inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm font-semibold text-primary-foreground hover:bg-white/10"
                >
                  <LayoutDashboard className="size-4" />
                  หลังบ้าน
                </Link>
              </nav>
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
