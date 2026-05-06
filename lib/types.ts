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

export type Place = {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: "ธรรมชาติ" | "วัดและประวัติศาสตร์" | "ชุมชน" | "อาหาร";
  location: string;
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
