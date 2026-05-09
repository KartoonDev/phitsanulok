import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  getDistrictDisplayName,
  normalizeDistrict,
  normalizePlaceCategory,
  places as staticPlaces
} from "@/lib/data";
import type { Place } from "@/lib/types";

export type PublishedPlace = {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: string;
  district: string | null;
  address: string | null;
  opening_hours: Record<string, string>;
  entry_fee: string | null;
  phone: string | null;
  website: string | null;
  latitude: number | null;
  longitude: number | null;
  location: string | null;
  cover_image: string | null;
  tags: string[];
  highlights: string[];
  travel_tips: string[];
  nearby_place_slugs: string[];
  duration: string | null;
  best_time_to_visit: string | null;
  accessibility: string | null;
  map_url: string | null;
  featured: boolean;
  published_at: string | null;
};

const DEFAULT_PLACE_COVER_IMAGE =
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80";

const publishedPlaceColumns = `
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
  featured,
  published_at
`;

export function mapPublishedPlaceToPlace(place: PublishedPlace): Place {
  const staticFallback = staticPlaces.find((staticPlace) => staticPlace.slug === place.slug);
  const district = normalizeDistrict(place.district ?? staticFallback?.district ?? place.location);
  const location =
    place.location ?? (district ? getDistrictDisplayName(district) : staticFallback?.location) ?? "";

  return {
    id: place.id,
    name: place.name,
    slug: place.slug,
    description: place.description,
    category: normalizePlaceCategory(place.category),
    location,
    district,
    address: place.address ?? staticFallback?.address ?? location,
    openingHours: formatOpeningHours(place.opening_hours) ?? staticFallback?.openingHours ?? "ตรวจสอบเวลาเปิดก่อนเดินทาง",
    entryFee: place.entry_fee ?? staticFallback?.entryFee ?? "ตรวจสอบค่าเข้าชมจากผู้ให้บริการ",
    phone: place.phone ?? staticFallback?.phone ?? "",
    website: place.website ?? staticFallback?.website ?? "",
    latitude: place.latitude ?? staticFallback?.latitude ?? 0,
    longitude: place.longitude ?? staticFallback?.longitude ?? 0,
    tags: asStringArray(place.tags, staticFallback?.tags),
    highlights: asStringArray(place.highlights, staticFallback?.highlights),
    travelTips: asStringArray(place.travel_tips, staticFallback?.travelTips),
    nearbyPlaceSlugs: asStringArray(place.nearby_place_slugs, staticFallback?.nearbyPlaceSlugs),
    duration: place.duration ?? staticFallback?.duration ?? "",
    bestTimeToVisit: place.best_time_to_visit ?? staticFallback?.bestTimeToVisit ?? "",
    accessibility: place.accessibility ?? staticFallback?.accessibility ?? "",
    mapUrl: place.map_url ?? staticFallback?.mapUrl ?? "",
    coverImage: place.cover_image ?? staticFallback?.coverImage ?? DEFAULT_PLACE_COVER_IMAGE,
    featured: place.featured
  };
}

export function mapPublishedPlacesToPlaces(places: PublishedPlace[]) {
  return places.map((place) => mapPublishedPlaceToPlace(place));
}

export async function getPublishedPlaces() {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return [];
  }

  const { data, error } = await supabase
    .from("places")
    .select(publishedPlaceColumns)
    .eq("status", "published")
    .order("featured", { ascending: false })
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch published places", error);
    return [];
  }

  return (data ?? []) as PublishedPlace[];
}

export async function getNormalizedPublishedPlaces() {
  const places = await getPublishedPlaces();

  return mapPublishedPlacesToPlaces(places);
}

export async function getPublishedPlaceBySlug(slug: string) {
  const supabase = await createSupabaseServerClient();

  if (!supabase) {
    return null;
  }

  const { data, error } = await supabase
    .from("places")
    .select(publishedPlaceColumns)
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error(`Failed to fetch published place: ${slug}`, error);
    return null;
  }

  return data as PublishedPlace | null;
}

export async function getNormalizedPublishedPlaceBySlug(slug: string) {
  const place = await getPublishedPlaceBySlug(slug);

  return place ? mapPublishedPlaceToPlace(place) : null;
}

function formatOpeningHours(openingHours: Record<string, string> | null | undefined) {
  if (!openingHours || Object.keys(openingHours).length === 0) {
    return null;
  }

  const preferredKeys = ["daily", "tuesday_sunday", "monday"];

  return Object.entries(openingHours)
    .sort(([leftKey], [rightKey]) => getOpeningHoursRank(leftKey) - getOpeningHoursRank(rightKey))
    .map(([key, value]) => `${key}: ${value}`)
    .join(", ");

  function getOpeningHoursRank(key: string) {
    const rank = preferredKeys.indexOf(key);

    return rank === -1 ? preferredKeys.length : rank;
  }
}

function asStringArray(value: string[] | null | undefined, fallback: string[] | undefined) {
  return value && value.length > 0 ? value : fallback ?? [];
}
