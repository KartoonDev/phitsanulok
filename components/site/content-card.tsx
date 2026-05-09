import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock3, Coins, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Place, Post } from "@/lib/types";
import { formatThaiDate } from "@/lib/utils";

type PlaceCardData = Place & {
  district?: string;
  openingHours?: string;
  entryFee?: string;
};

export function PlaceCard({ place }: { place: PlaceCardData }) {
  return (
    <Card className="group overflow-hidden transition duration-200 hover:-translate-y-0.5 hover:shadow-soft">
      <Link href={`/places/${place.slug}`} className="block">
        <div className="relative aspect-[4/3]">
          <Image
            src={place.coverImage}
            alt={place.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-[1.03]"
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-foreground/46 to-transparent" />
          {place.featured && (
            <Badge variant="accent" className="absolute left-3 top-3">
              แนะนำ
            </Badge>
          )}
        </div>
        <CardContent className="pt-5">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">{place.category}</Badge>
            <span className="text-xs font-semibold text-muted-foreground">
              {place.district ?? place.location}
            </span>
          </div>
          <h3 className="mt-3 text-xl font-black leading-7">{place.name}</h3>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
            {place.description}
          </p>
          <div className="mt-4 space-y-2 text-sm text-muted-foreground">
            <p className="flex items-center gap-2 font-semibold text-primary">
              <MapPin className="size-4 shrink-0" />
              {place.district ?? place.location}
            </p>
            {place.openingHours && (
              <p className="flex items-center gap-2">
                <Clock3 className="size-4 shrink-0" />
                <span className="line-clamp-1">{place.openingHours}</span>
              </p>
            )}
            {place.entryFee && (
              <p className="flex items-center gap-2">
                <Coins className="size-4 shrink-0" />
                <span className="line-clamp-1">{place.entryFee}</span>
              </p>
            )}
          </div>
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary">
            ดูรายละเอียด
            <ArrowRight className="size-4 transition group-hover:translate-x-0.5" />
          </span>
        </CardContent>
      </Link>
    </Card>
  );
}

export function PostCard({ post }: { post: Post }) {
  const href = post.type === "news" ? "/news" : "/stories";

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[16/10]">
        <Image src={post.coverImage} alt={post.title} fill className="object-cover" />
      </div>
      <CardContent className="pt-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant={post.status === "published" ? "default" : "secondary"}>
            {post.status === "published" ? "เผยแพร่แล้ว" : "ฉบับร่าง"}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {formatThaiDate(post.publishedAt)}
          </span>
        </div>
        <h3 className="mt-3 text-xl font-bold">{post.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
          {post.excerpt}
        </p>
        <Link href={href} className="mt-4 inline-flex text-sm font-semibold text-primary">
          อ่านเพิ่มเติม
        </Link>
      </CardContent>
    </Card>
  );
}
