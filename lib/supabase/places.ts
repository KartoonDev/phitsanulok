import { createSupabaseServerClient } from "@/lib/supabase/server";

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
