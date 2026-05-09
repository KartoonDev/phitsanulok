import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Accessibility,
  CalendarDays,
  Clock3,
  Coins,
  Globe2,
  Lightbulb,
  MapPin,
  Navigation,
  Phone,
  Route
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PlaceCard } from "@/components/site/content-card";
import { getNearbyPlaces, getPlaceBySlug, places } from "../place-data";

type PlaceDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return places.map((place) => ({ slug: place.slug }));
}

export async function generateMetadata({ params }: PlaceDetailPageProps) {
  const { slug } = await params;
  const place = getPlaceBySlug(slug);

  return {
    title: place ? place.name : "สถานที่ท่องเที่ยว"
  };
}

export default async function PlaceDetailPage({ params }: PlaceDetailPageProps) {
  const { slug } = await params;
  const place = getPlaceBySlug(slug);

  if (!place) {
    notFound();
  }

  const nearbyPlaces = getNearbyPlaces(place.slug, 3);
  const mapHref =
    place.mapUrl ??
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      place.mapQuery ?? place.name
    )}`;
  const phoneNumber = place.phone?.replace(/[^\d+]/g, "");
  const phoneHref = phoneNumber ? `tel:${phoneNumber}` : "";

  return (
    <div>
      <section className="relative isolate min-h-[70vh] overflow-hidden">
        <Image
          src={place.coverImage}
          alt={place.name}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/92 via-foreground/50 to-foreground/14" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" />
        <div className="container-page relative flex min-h-[70vh] flex-col justify-end pb-10 pt-24 text-primary-foreground">
          <Button asChild variant="secondary" className="mb-auto w-fit bg-background/88 backdrop-blur">
            <Link href="/places">
              <ArrowLeft />
              กลับไปหน้าที่เที่ยว
            </Link>
          </Button>
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2">
              <Badge variant="accent">{place.category}</Badge>
              <Badge variant="secondary">{place.district ?? place.location}</Badge>
            </div>
            <h1 className="mt-5 text-4xl font-black leading-tight md:text-6xl">
              {place.name}
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-primary-foreground/90 md:text-lg">
              {place.description}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild variant="accent">
                <Link href={mapHref} target="_blank" rel="noreferrer">
                  <Navigation />
                  เปิดเส้นทาง
                </Link>
              </Button>
              <Button asChild variant="secondary" className="bg-background/88 backdrop-blur">
                <Link href="/places">ดูสถานที่อื่น</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="container-page grid gap-5 py-8 lg:grid-cols-[1fr_21rem]">
        <div className="space-y-5">
          <div className="grid gap-3 sm:grid-cols-2">
            <InfoCard icon={<Clock3 />} label="เวลาเปิด" value={place.openingHours} />
            <InfoCard icon={<CalendarDays />} label="ช่วงที่น่าไป" value={place.bestTimeToVisit} />
            <InfoCard icon={<Clock3 />} label="ใช้เวลาโดยประมาณ" value={place.duration} />
            <InfoCard icon={<Coins />} label="ค่าเข้าชม" value={place.entryFee} />
          </div>

          <Card>
            <CardContent className="pt-5 md:p-6">
              <div className="flex items-start gap-3">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-md bg-secondary text-primary">
                  <Route className="size-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-black">จุดเด่นของที่นี่</h2>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {place.highlights?.map((highlight) => (
                      <Badge key={highlight} variant="outline">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5 md:p-6">
              <div className="flex items-start gap-3">
                <div className="flex size-11 shrink-0 items-center justify-center rounded-md bg-secondary text-primary">
                  <Lightbulb className="size-5" />
                </div>
                <div>
                  <h2 className="text-2xl font-black">คำแนะนำก่อนเดินทาง</h2>
                  <ul className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
                    {place.travelTips?.map((tip) => (
                      <li key={tip} className="flex gap-3">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          {place.accessibility && (
            <Card>
              <CardContent className="pt-5 md:p-6">
                <div className="flex items-start gap-3">
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-md bg-secondary text-primary">
                    <Accessibility className="size-5" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-black">การเข้าถึงพื้นที่</h2>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      {place.accessibility}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <Card className="overflow-hidden shadow-soft">
            <div className="relative flex min-h-48 items-center justify-center bg-secondary">
              <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(31,111,104,0.18),transparent_45%),linear-gradient(315deg,rgba(222,93,44,0.18),transparent_45%)]" />
              <MapPin className="relative size-16 text-primary" />
            </div>
            <CardContent className="pt-5">
              <Badge variant="outline">แผนที่</Badge>
              <h2 className="mt-3 text-xl font-black">{place.district ?? place.location}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                {place.address ?? place.location}
              </p>
              <Button asChild className="mt-4 w-full">
                <Link href={mapHref} target="_blank" rel="noreferrer">
                  <Navigation />
                  เปิดเส้นทาง
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-5">
              <h2 className="text-xl font-black">ข้อมูลติดต่อ</h2>
              <div className="mt-4 space-y-3 text-sm leading-6">
                {place.address && (
                  <p className="flex gap-3 text-muted-foreground">
                    <MapPin className="mt-1 size-4 shrink-0 text-primary" />
                    <span>{place.address}</span>
                  </p>
                )}
                {place.phone && phoneHref && (
                  <Link
                    href={phoneHref}
                    className="focus-ring flex gap-3 rounded-md text-muted-foreground hover:text-primary"
                  >
                    <Phone className="mt-1 size-4 shrink-0 text-primary" />
                    <span>{place.phone}</span>
                  </Link>
                )}
                {place.phone && !phoneHref && (
                  <p className="flex gap-3 text-muted-foreground">
                    <Phone className="mt-1 size-4 shrink-0 text-primary" />
                    <span>{place.phone}</span>
                  </p>
                )}
                {place.website && (
                  <Link
                    href={place.website}
                    target="_blank"
                    rel="noreferrer"
                    className="focus-ring flex gap-3 rounded-md text-muted-foreground hover:text-primary"
                  >
                    <Globe2 className="mt-1 size-4 shrink-0 text-primary" />
                    <span className="break-all">{place.website}</span>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        </aside>
      </section>

      {nearbyPlaces.length > 0 && (
        <section className="container-page pb-12">
          <div className="mb-5 flex items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-accent">
                Nearby Route
              </p>
              <h2 className="text-3xl font-black">แวะต่อใกล้ ๆ กัน</h2>
            </div>
            <Button asChild variant="outline">
              <Link href="/places">ดูทั้งหมด</Link>
            </Button>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {nearbyPlaces.map((nearbyPlace) => (
              <PlaceCard key={nearbyPlace.id} place={nearbyPlace} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function InfoCard({
  icon,
  label,
  value
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
}) {
  return (
    <Card className="bg-card/95">
      <CardContent className="flex items-start gap-3 pt-5 md:p-6">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-md bg-secondary text-primary">
          {icon}
        </div>
        <div>
          <p className="text-sm font-semibold text-muted-foreground">{label}</p>
          <p className="mt-1 font-black leading-6">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
