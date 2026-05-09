import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CalendarDays,
  Clock3,
  Landmark,
  Map,
  MapPin,
  Mail,
  MonitorCheck,
  Mountain,
  Phone,
  PlayCircle,
  Send,
  Share2,
  Sparkles,
  Utensils,
  Waves
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { places, posts } from "@/lib/data";
import { formatThaiDate } from "@/lib/utils";

const identityCards = [
  {
    title: "เมืองประวัติศาสตร์",
    text: "เดินทางผ่านวัดใหญ่ พระราชวังจันทน์ และเรื่องเล่าของเมืองสองแคว",
    image:
      "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=900&q=80",
    icon: Landmark
  },
  {
    title: "ศาสนาและวัฒนธรรม",
    text: "พระพุทธชินราชคือภาพจำระดับประเทศของพิษณุโลก",
    image:
      "https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=900&q=80",
    icon: Sparkles
  },
  {
    title: "ธรรมชาติสองยาม",
    text: "ภูหินร่องกล้า น้ำตก และหมอกเช้าที่เชื่อมเมืองกับภูเขา",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
    icon: Mountain
  },
  {
    title: "อาหารพื้นถิ่น",
    text: "ก๋วยเตี๋ยวห้อยขา ตลาดเช้า และรสชาติริมแม่น้ำน่าน",
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=900&q=80",
    icon: Utensils
  },
  {
    title: "ภูมิปัญญาท้องถิ่น",
    text: "พิพิธภัณฑ์ ชุมชน และงานหัตถกรรมที่ทำให้เมืองมีชีวิต",
    image:
      "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&w=900&q=80",
    icon: Waves
  }
];

const quickActions = [
  { href: "/culture", label: "ข้อมูลจังหวัด", icon: Building2 },
  { href: "/places", label: "แผนที่ท่องเที่ยว", icon: Map },
  { href: "/news", label: "ปฏิทินกิจกรรม", icon: CalendarDays },
  { href: "/admin", label: "บริการออนไลน์", icon: MonitorCheck },
  { href: "#contact", label: "ติดต่อหน่วยงาน", icon: Phone }
];

const events = [
  {
    day: "25",
    month: "พ.ค.",
    title: "งานนมัสการพระพุทธชินราช",
    place: "วัดพระศรีรัตนมหาธาตุวรมหาวิหาร",
    image:
      "https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=500&q=80"
  },
  {
    day: "8",
    month: "มิ.ย.",
    title: "วิ่งสองแคว มาราธอน 2026",
    place: "สนามกีฬากลางจังหวัดพิษณุโลก",
    image:
      "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=500&q=80"
  },
  {
    day: "15",
    month: "มิ.ย.",
    title: "เทศกาลอาหารสองแคว",
    place: "บริเวณริมแม่น้ำน่าน",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=500&q=80"
  }
];

export default function HomePage() {
  const featuredPlaces = places.filter((place) => place.featured).slice(0, 4);
  const newsItems = posts.slice(0, 3);

  return (
    <>
      <section className="relative isolate -mt-16 overflow-hidden pt-16">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1513326738677-b964603b136d?auto=format&fit=crop&w=2400&q=88"
            alt="บรรยากาศวัดและเมืองพิษณุโลกยามเย็น"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/50 to-primary/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-primary/25" />
          <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-background via-background/40 to-transparent" />
        </div>

        <div className="container-page grid min-h-[100svh] items-center pb-28 pt-20 md:pb-32">
          <div className="max-w-4xl text-primary-foreground">
            <h1 className="text-5xl font-black leading-[1.08] tracking-normal sm:text-6xl md:text-7xl lg:text-8xl">
              สองแควอดีต
              <span className="block">ปรากฏชัดในปัจจุบัน</span>
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-primary-foreground/80 md:text-xl">
              พิษณุโลก เมืองประวัติศาสตร์ที่ยังมีชีวิต จุดเชื่อมวัฒนธรรม ธรรมชาติ
              และเมืองศูนย์กลางภาคเหนือตอนล่าง
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-[3.25rem] rounded-full border-white/70 bg-transparent px-6 text-primary-foreground hover:bg-white/14"
              >
                <Link href="/places/wat-phra-si-rattana-mahathat" className="gap-3">
                  <PlayCircle className="text-accent" />
                  ชมวิดีโอแนะนำจังหวัด
                </Link>
              </Button>
            </div>
            <div className="mt-14 flex items-center gap-4 text-sm font-semibold text-primary-foreground/70">
              <span className="text-accent">01</span>
              <span className="h-px w-12 bg-accent" />
              <span>02</span>
              <span>03</span>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page relative z-10 -mt-12">
        <div className="grid overflow-hidden rounded-[1.75rem] border border-white/10 bg-primary text-primary-foreground shadow-[0_24px_70px_rgba(20,31,75,0.24)] sm:grid-cols-2 md:grid-cols-5 md:rounded-full">
          {quickActions.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex min-h-16 items-center justify-center gap-3 border-white/12 px-4 py-4 text-center text-sm font-semibold transition hover:bg-white/10 sm:border-r sm:[&:nth-child(2n)]:border-r-0 md:border-r md:[&:nth-child(2n)]:border-r md:last:border-r-0"
            >
              <item.icon className="size-5 text-accent" />
              <span className="min-w-0">{item.label}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-white py-12 md:py-14">
        <div className="container-page">
          <div className="mb-7 text-center">
            <h2 className="text-3xl font-black">จุดเด่นพิษณุโลก</h2>
            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
              เมืองแห่งประวัติศาสตร์ ธรรมะ วัฒนธรรม และธรรมชาติ
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {identityCards.map((item) => (
              <Card
                key={item.title}
                className="group overflow-hidden rounded-lg border-border/80 bg-white transition duration-200 hover:-translate-y-0.5 hover:shadow-soft"
              >
                <div className="relative aspect-[5/3] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-[1.04]"
                    sizes="(min-width: 1024px) 210px, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <CardContent className="relative px-4 pb-5 pt-9 text-center">
                  <div className="absolute -top-7 left-1/2 flex size-14 -translate-x-1/2 items-center justify-center rounded-full border-[5px] border-white bg-accent text-accent-foreground shadow-md">
                    <item.icon className="size-6" />
                  </div>
                  <h3 className="text-[15px] font-black leading-6">{item.title}</h3>
                  <p className="mt-1.5 line-clamp-3 text-xs leading-5 text-muted-foreground">
                    {item.text}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="container-page">
          <div className="mb-6 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-3xl font-black">สถานที่ท่องเที่ยวน่าสนใจ</h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                คัดสถานที่หลักที่เล่าตัวตนเมืองสองแควได้ชัดที่สุด
              </p>
            </div>
            <Link href="/places" className="hidden text-sm font-bold text-primary md:inline-flex">
              ดูทั้งหมด →
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featuredPlaces.map((place) => (
              <Link
                key={place.id}
                href={`/places/${place.slug}`}
                className="group relative aspect-[16/11] overflow-hidden rounded-lg shadow-sm ring-1 ring-black/5"
              >
                <Image
                  src={place.coverImage}
                  alt={place.name}
                  fill
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 260px, (min-width: 640px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/22 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <h3 className="text-base font-black leading-6 drop-shadow-sm">
                    {place.name}
                  </h3>
                  <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-white/82">
                    <MapPin className="size-3.5 text-accent" />
                    {place.location}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white pb-14 pt-10 md:pb-16">
        <div className="container-page grid gap-10 lg:grid-cols-2">
          <div>
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="text-3xl font-black">ข่าวสารและประกาศ</h2>
              <Link href="/news" className="text-sm font-bold text-primary">
                ดูทั้งหมด →
              </Link>
            </div>
            <div className="space-y-3">
              {newsItems.map((post) => (
                <Link
                  key={post.id}
                  href="/news"
                  className="grid grid-cols-[88px_1fr] gap-4 rounded-lg border border-border/80 bg-white p-3 transition hover:shadow-soft sm:grid-cols-[108px_1fr]"
                >
                  <div className="relative aspect-[4/3] overflow-hidden rounded-md">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                      sizes="108px"
                    />
                  </div>
                  <div className="min-w-0 self-center">
                    <p className="text-xs font-semibold text-accent">
                      {formatThaiDate(post.publishedAt)}
                    </p>
                    <h3 className="mt-1 line-clamp-2 font-bold leading-6">
                      {post.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-5 flex items-center justify-between gap-4">
              <h2 className="text-3xl font-black">ปฏิทินกิจกรรม</h2>
              <Link href="/news" className="text-sm font-bold text-primary">
                ดูทั้งหมด →
              </Link>
            </div>
            <div className="space-y-3">
              {events.map((event) => (
                <Card key={event.title} className="overflow-hidden border-border/80 bg-white">
                  <CardContent className="grid grid-cols-[64px_1fr] gap-4 p-3 sm:grid-cols-[72px_1fr_112px] sm:items-center">
                    <div className="flex min-h-16 flex-col items-center justify-center rounded-md bg-accent px-2 py-2 text-center font-black text-accent-foreground">
                      <span className="text-2xl leading-none">{event.day}</span>
                      <span className="mt-1 text-xs">{event.month}</span>
                    </div>
                    <div className="min-w-0 self-center">
                      <h3 className="line-clamp-2 font-black leading-6">{event.title}</h3>
                      <p className="mt-1 flex items-start gap-2 text-sm leading-6 text-muted-foreground">
                        <MapPin className="mt-1 size-4 shrink-0 text-accent" />
                        <span className="line-clamp-2">{event.place}</span>
                      </p>
                    </div>
                    <div className="relative col-span-2 aspect-[16/9] overflow-hidden rounded-md sm:col-span-1 sm:h-20 sm:aspect-auto">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                        sizes="112px"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative isolate mt-10 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2200&q=88"
          alt="ภูเขาและธรรมชาติยามพระอาทิตย์ตก"
          fill
          className="-z-10 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#111936]/96 via-[#1d2450]/76 to-[#c99722]/18" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-[#090e20]/72 via-transparent to-[#090e20]/18" />
        <div className="container-page grid gap-8 py-16 md:grid-cols-[minmax(0,1fr)_380px] md:items-center lg:py-20">
          <div className="max-w-2xl text-primary-foreground">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-accent backdrop-blur">
              <Mountain className="size-4" />
              Explore Phitsanulok
            </p>
            <h2 className="text-3xl font-black leading-tight md:text-5xl">
              เก็บแผนเที่ยวเมืองสองแควไว้ใกล้มือ
            </h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-primary-foreground/80 md:text-lg">
              รับเส้นทางใหม่ ข่าวกิจกรรม และไอเดียเที่ยวจากตัวเมืองสู่ภูเขา
              แม่น้ำน่าน และชุมชนสร้างสรรค์ของพิษณุโลก
            </p>
            <Button asChild variant="accent" size="lg" className="mt-7 shadow-lg shadow-black/20">
              <Link href="/places">
                วางแผนการเดินทาง
                <ArrowRight />
              </Link>
            </Button>
          </div>
          <Card className="w-full border-white/18 bg-white/95 shadow-2xl shadow-black/25 backdrop-blur-md">
            <CardContent className="p-5 sm:p-6">
              <div className="flex items-start gap-3">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                  <Mail className="size-5" />
                </span>
                <div>
                  <h3 className="text-lg font-black">Phitsanulok Insider</h3>
                  <p className="mt-1 text-sm leading-6 text-muted-foreground">
                    อัปเดตไฮไลต์ประจำสัปดาห์และกิจกรรมที่ไม่ควรพลาด
                  </p>
                </div>
              </div>
              <div className="mt-5 flex min-w-0 overflow-hidden rounded-md border bg-background shadow-inner">
                <input
                  className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none"
                  placeholder="กรอกอีเมลของคุณ"
                />
                <Button size="icon" variant="accent" aria-label="ติดตามข่าวสาร" className="h-auto rounded-l-none">
                  <Send />
                </Button>
              </div>
              <div className="mt-5 grid gap-3 text-sm text-muted-foreground">
                <p className="flex gap-2">
                  <Clock3 className="mt-0.5 size-4 shrink-0 text-accent" />
                  ข่าวประกาศ กิจกรรม และเส้นทางเที่ยวใหม่ ส่งแบบอ่านง่าย
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Facebook", "Line", "YouTube"].map((item) => (
                    <Link
                      key={item}
                      href="#contact"
                      className="inline-flex items-center gap-2 rounded-full border bg-white px-3 py-1.5 text-xs font-bold text-primary transition hover:border-accent hover:text-accent-foreground"
                    >
                      <Share2 className="size-3.5 text-accent" />
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  );
}
