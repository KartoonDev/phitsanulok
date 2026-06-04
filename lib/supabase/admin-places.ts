import { createSupabaseServerClient } from "@/lib/supabase/server";
import { places as staticPlaces } from "@/lib/data";
import type { ContentStatus } from "@/lib/types";

export type AdminPlace = {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  district: string;
  address: string;
  openingHours: string;
  entryFee: string;
  phone: string;
  website: string;
  latitude: string;
  longitude: string;
  location: string;
  coverImage: string;
  tags: string[];
  highlights: string[];
  travelTips: string[];
  nearbyPlaceSlugs: string[];
  duration: string;
  bestTimeToVisit: string;
  accessibility: string;
  mapUrl: string;
  status: ContentStatus;
  featured: boolean;
  publishedAt: string | null;
  updatedAt: string | null;
};

const adminPlaceColumns = `
  id,
  name,
  slug,
  description,
  category,
  district,
  address,
  opening_hours,
  entry_fee,
  phone,
  website,
  latitude,
  longitude,
  location,
  cover_image,
  tags,
  highlights,
  travel_tips,
  nearby_place_slugs,
  duration,
  best_time_to_visit,
  accessibility,
  map_url,
  status,
  featured,
  published_at,
  updated_at
`;

type AdminPlaceRow = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  category: string;
  district: string | null;
  address: string | null;
  opening_hours: Record<string, string> | null;
  entry_fee: string | null;
  phone: string | null;
  website: string | null;
  latitude: number | string | null;
  longitude: number | string | null;
  location: string | null;
  cover_image: string | null;
  tags: string[] | null;
  highlights: string[] | null;
  travel_tips: string[] | null;
  nearby_place_slugs: string[] | null;
  duration: string | null;
  best_time_to_visit: string | null;
  accessibility: string | null;
  map_url: string | null;
  status: ContentStatus;
  featured: boolean;
  published_at: string | null;
  updated_at: string | null;
};

export async function getAdminPlaces() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return getDemoAdminPlaces();
  }

  const { data, error } = await supabase
    .from("places")
    .select(adminPlaceColumns)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch admin places", error);
    return getDemoAdminPlaces();
  }

  return ((data ?? []) as AdminPlaceRow[]).map(mapRowToAdminPlace);
}

export function getDemoAdminPlaces(): AdminPlace[] {
  return staticPlaces.slice(0, 4).map((place) => ({
    id: place.id,
    name: place.name,
    slug: place.slug,
    description: place.description,
    category: categoryToSlug(place.category),
    district: place.district,
    address: place.address,
    openingHours: place.openingHours,
    entryFee: place.entryFee,
    phone: place.phone,
    website: place.website,
    latitude: String(place.latitude),
    longitude: String(place.longitude),
    location: place.location,
    coverImage: place.coverImage,
    tags: place.tags,
    highlights: place.highlights,
    travelTips: place.travelTips,
    nearbyPlaceSlugs: place.nearbyPlaceSlugs,
    duration: place.duration,
    bestTimeToVisit: place.bestTimeToVisit,
    accessibility: place.accessibility,
    mapUrl: place.mapUrl,
    status: place.featured ? "published" : "draft",
    featured: place.featured,
    publishedAt: place.featured ? new Date().toISOString() : null,
    updatedAt: new Date().toISOString()
  }));
}

function mapRowToAdminPlace(row: AdminPlaceRow): AdminPlace {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    description: row.description ?? "",
    category: row.category,
    district: row.district ?? "",
    address: row.address ?? "",
    openingHours: formatOpeningHours(row.opening_hours),
    entryFee: row.entry_fee ?? "",
    phone: row.phone ?? "",
    website: row.website ?? "",
    latitude: row.latitude === null ? "" : String(row.latitude),
    longitude: row.longitude === null ? "" : String(row.longitude),
    location: row.location ?? "",
    coverImage: row.cover_image ?? "",
    tags: row.tags ?? [],
    highlights: row.highlights ?? [],
    travelTips: row.travel_tips ?? [],
    nearbyPlaceSlugs: row.nearby_place_slugs ?? [],
    duration: row.duration ?? "",
    bestTimeToVisit: row.best_time_to_visit ?? "",
    accessibility: row.accessibility ?? "",
    mapUrl: row.map_url ?? "",
    status: row.status,
    featured: row.featured,
    publishedAt: row.published_at,
    updatedAt: row.updated_at
  };
}

function formatOpeningHours(openingHours: Record<string, string> | null | undefined) {
  if (!openingHours) {
    return "";
  }

  return openingHours.daily ?? Object.values(openingHours)[0] ?? "";
}

function categoryToSlug(category: string) {
  const map: Record<string, string> = {
    ธรรมชาติ: "nature",
    วัดและประวัติศาสตร์: "temple-history",
    ชุมชน: "community",
    อาหาร: "food",
    พิพิธภัณฑ์และศูนย์เรียนรู้: "museum-learning"
  };

  return map[category] ?? category;
}
