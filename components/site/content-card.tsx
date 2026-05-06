import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import type { Place, Post } from "@/lib/types";
import { formatThaiDate } from "@/lib/utils";

export function PlaceCard({ place }: { place: Place }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-[4/3]">
        <Image src={place.coverImage} alt={place.name} fill className="object-cover" />
      </div>
      <CardContent className="pt-5">
        <Badge variant="outline">{place.category}</Badge>
        <h3 className="mt-3 text-xl font-bold">{place.name}</h3>
        <p className="mt-2 line-clamp-3 text-sm leading-6 text-muted-foreground">
          {place.description}
        </p>
        <p className="mt-4 flex items-center gap-2 text-sm font-semibold text-primary">
          <MapPin className="size-4" />
          {place.location}
        </p>
      </CardContent>
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
