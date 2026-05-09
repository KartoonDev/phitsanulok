import Image from "next/image";
import Link from "next/link";
import { ArrowUp, Clock3, Mail, MapPin, Phone } from "lucide-react";

const footerGroups = [
  {
    title: "เที่ยวจังหวัด",
    links: [
      ["ข้อมูลทั่วไป", "/culture"],
      ["ประวัติความเป็นมา", "/stories"],
      ["สถานที่ท่องเที่ยว", "/places"],
      ["คำขวัญจังหวัด", "/stories"]
    ]
  },
  {
    title: "บริการประชาชน",
    links: [
      ["บริการออนไลน์", "/admin"],
      ["ข่าวสารประกาศ", "/news"],
      ["ถาม-ตอบ", "/news"],
      ["ร้องเรียนร้องทุกข์", "/admin"]
    ]
  },
  {
    title: "สำหรับนักลงทุน",
    links: [
      ["ข่าวสำหรับนักลงทุน", "/news"],
      ["สิทธิประโยชน์", "/news"],
      ["เขตเศรษฐกิจนิคม", "/stories"],
      ["คู่มือการลงทุน", "/stories"]
    ]
  },
  {
    title: "ติดต่อเรา",
    links: [
      ["หน่วยงานในจังหวัด", "#contact"],
      ["แผนผังเว็บไซต์", "/places"],
      ["ติดต่อสอบถาม", "#contact"]
    ]
  }
];

export function SiteFooter() {
  return (
    <footer id="contact" className="relative overflow-hidden bg-[#080d20] text-primary-foreground">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/70 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(201,151,34,0.16),transparent_28rem),radial-gradient(circle_at_88%_18%,rgba(255,255,255,0.08),transparent_24rem)]" />
      <div className="container-page relative grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-[1.35fr_repeat(4,1fr)] lg:py-16">
        <div className="sm:col-span-2 lg:col-span-1">
          <div className="flex items-center gap-3">
            <span className="relative size-14 overflow-hidden rounded-full border border-accent/55 bg-black/30 shadow-lg shadow-accent/20">
              <Image
                src="/brand/phitsanulok-logo.png"
                alt="ตราจังหวัดพิษณุโลก"
                fill
                className="object-cover object-[50%_28%]"
                sizes="56px"
              />
            </span>
            <div>
              <h2 className="text-lg font-black">จังหวัดพิษณุโลก</h2>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/58">
                Phitsanulok City Portal
              </p>
            </div>
          </div>
          <div className="mt-6 max-w-sm space-y-3 text-sm leading-7 text-primary-foreground/72">
            <p className="font-bold text-primary-foreground">ศูนย์ข้อมูลเมืองและการท่องเที่ยวพิษณุโลก</p>
            <p className="flex gap-2">
              <MapPin className="mt-1 size-4 shrink-0 text-accent" />
              ถ.บรมไตรโลกนาถ ต.ในเมือง อ.เมืองพิษณุโลก จ.พิษณุโลก 65000
            </p>
            <p className="flex gap-2">
              <Phone className="mt-1 size-4 shrink-0 text-accent" />
              โทร. 055 258 000
            </p>
            <p className="flex gap-2">
              <Mail className="mt-1 size-4 shrink-0 text-accent" />
              info@phitsanulok.go.th
            </p>
            <p className="flex gap-2">
              <Clock3 className="mt-1 size-4 shrink-0 text-accent" />
              เปิดบริการข้อมูลทุกวัน 08.30 - 16.30 น.
            </p>
          </div>
        </div>

        {footerGroups.map((group) => (
          <div key={group.title}>
            <h3 className="text-sm font-black text-white">{group.title}</h3>
            <div className="mt-5 grid gap-3 text-sm text-primary-foreground/66">
              {group.links.map(([label, href]) => (
                <Link
                  key={label}
                  href={href}
                  className="transition hover:translate-x-1 hover:text-accent"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="relative border-t border-white/10 bg-black/16">
        <div className="container-page flex flex-wrap items-center justify-between gap-4 py-5 pr-14 text-xs text-primary-foreground/58 sm:pr-0">
          <p>© 2026 Phitsanulok Province. All rights reserved.</p>
          <div className="flex flex-wrap gap-4">
            <Link href="/news" className="hover:text-accent">
              ข่าวสาร
            </Link>
            <Link href="/places" className="hover:text-accent">
              แผนที่เมือง
            </Link>
            <Link href="#contact" className="hover:text-accent">
              ติดต่อเรา
            </Link>
          </div>
          <Link
            href="#"
            className="absolute right-4 top-1/2 flex size-12 -translate-y-1/2 items-center justify-center rounded-full bg-accent text-accent-foreground shadow-xl shadow-black/30 transition hover:-translate-y-[56%] hover:bg-accent/90 sm:right-[max(1rem,calc((100vw-1120px)/2))]"
            aria-label="กลับด้านบน"
          >
            <ArrowUp className="size-4" />
          </Link>
        </div>
      </div>
    </footer>
  );
}
