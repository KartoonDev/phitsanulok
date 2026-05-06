import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Compass, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceCard, PostCard } from "@/components/site/content-card";
import { SectionHeading } from "@/components/site/section-heading";
import { places, posts } from "@/lib/data";

export default function HomePage() {
  const featuredPlaces = places.filter((place) => place.featured);
  const featuredPosts = posts.filter((post) => post.featured);

  return (
    <>
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1800&q=85"
            alt="บรรยากาศเมืองและวัดในภาคเหนือของไทย"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/92 via-primary/58 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
        </div>
        <div className="container-page grid min-h-[calc(100vh-4rem)] items-center py-16">
          <div className="max-w-3xl text-primary-foreground">
            <p className="inline-flex items-center gap-2 rounded-md bg-white/14 px-3 py-2 text-sm font-semibold backdrop-blur">
              <Sparkles className="size-4" />
              บ้านเกิดที่เล่าใหม่ด้วยเว็บไซต์สมัยใหม่
            </p>
            <h1 className="mt-6 text-5xl font-black leading-tight md:text-7xl">
              พิษณุโลก
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-primary-foreground/86">
              เมืองสองแควที่รวมพระพุทธชินราช แม่น้ำน่าน ภูเขานครไทย
              อาหารพื้นถิ่น และเรื่องเล่าของคนกลับบ้านไว้ในที่เดียว
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" variant="accent">
                <Link href="/places">
                  สำรวจที่เที่ยว
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/admin">เข้าสู่หลังบ้าน</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page py-12">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            ["สถานที่", "จัดการข้อมูลวัด ธรรมชาติ ชุมชน และจุดเช็กอิน"],
            ["ข่าวสาร", "เผยแพร่ประกาศ เทศกาล และกิจกรรมของจังหวัด"],
            ["สื่อ", "เก็บรูปและจัดหมวดสำหรับใช้ซ้ำในทุกหน้า"]
          ].map(([title, desc], index) => (
            <Card key={title}>
              <CardContent className="pt-5">
                <div className="flex size-11 items-center justify-center rounded-md bg-secondary text-primary">
                  {index === 0 ? <Compass /> : index === 1 ? <CalendarDays /> : <Sparkles />}
                </div>
                <h2 className="mt-4 text-xl font-bold">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{desc}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="container-page py-12">
        <SectionHeading
          eyebrow="เที่ยวพิษณุโลก"
          title="จากวัดใหญ่ถึงภูหินร่องกล้า"
          description="คัดจุดหมายสำคัญสำหรับเริ่มต้นเว็บจังหวัด ทั้งมุมประวัติศาสตร์ ธรรมชาติ และวิถีชุมชน"
        />
        <div className="grid gap-5 md:grid-cols-2">
          {featuredPlaces.map((place) => (
            <PlaceCard key={place.id} place={place} />
          ))}
        </div>
      </section>

      <section className="container-page py-12">
        <SectionHeading
          eyebrow="อัปเดตล่าสุด"
          title="ข่าวและเรื่องเล่าท้องถิ่น"
          description="โครงเนื้อหาพร้อมต่อกับฐานข้อมูล Supabase เพื่อให้ทีมแอดมินเพิ่มบทความได้จากหลังบ้าน"
        />
        <div className="grid gap-5 md:grid-cols-2">
          {featuredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </>
  );
}
