export type ContentStatus = "draft" | "published";

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  type: "news" | "story";
  status: ContentStatus;
  featured: boolean;
  coverImage: string;
  publishedAt: string;
  category: string;
};

export type PlaceCategory =
  | "ธรรมชาติ"
  | "วัดและประวัติศาสตร์"
  | "ชุมชน"
  | "อาหาร"
  | "พิพิธภัณฑ์และศูนย์เรียนรู้";

export type Place = {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: PlaceCategory;
  location: string;
  district: string;
  address: string;
  openingHours: string;
  entryFee: string;
  phone: string;
  website: string;
  latitude: number;
  longitude: number;
  tags: string[];
  highlights: string[];
  travelTips: string[];
  nearbyPlaceSlugs: string[];
  duration: string;
  bestTimeToVisit: string;
  accessibility: string;
  mapUrl: string;
  coverImage: string;
  featured: boolean;
};

export type MediaItem = {
  id: string;
  name: string;
  url: string;
  bucket: string;
  size: string;
  createdAt: string;
};
