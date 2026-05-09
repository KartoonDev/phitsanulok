import type { MediaItem, Place, PlaceCategory, PlaceCategorySlug, Post } from "@/lib/types";

export const placeCategoryLabels: Record<PlaceCategorySlug, PlaceCategory> = {
  nature: "ธรรมชาติ",
  "temple-history": "วัดและประวัติศาสตร์",
  community: "ชุมชน",
  food: "อาหาร",
  "museum-learning": "พิพิธภัณฑ์และศูนย์เรียนรู้"
};

const categorySlugByLabel = Object.fromEntries(
  Object.entries(placeCategoryLabels).map(([slug, label]) => [label, slug])
) as Record<PlaceCategory, PlaceCategorySlug>;

const legacyCategoryLabels: Record<string, PlaceCategory> = {
  culture: "วัดและประวัติศาสตร์",
  history: "วัดและประวัติศาสตร์",
  places: "ชุมชน"
};

export function normalizePlaceCategory(category: string | null | undefined): PlaceCategory {
  if (!category) {
    return "ชุมชน";
  }

  if (isPlaceCategory(category)) {
    return category;
  }

  return placeCategoryLabels[category as PlaceCategorySlug] ?? legacyCategoryLabels[category] ?? "ชุมชน";
}

export function getPlaceCategorySlug(category: PlaceCategory | string): PlaceCategorySlug {
  return categorySlugByLabel[normalizePlaceCategory(category)];
}

export function normalizeDistrict(district: string | null | undefined) {
  return (district ?? "").replace(/^อำเภอ/, "").trim();
}

export function getDistrictDisplayName(district: string | null | undefined) {
  const normalizedDistrict = normalizeDistrict(district);

  return normalizedDistrict ? `อำเภอ${normalizedDistrict}` : "";
}

function isPlaceCategory(category: string): category is PlaceCategory {
  return Object.values(placeCategoryLabels).includes(category as PlaceCategory);
}

export const places: Place[] = [
  {
    id: "place-1",
    name: "วัดพระศรีรัตนมหาธาตุวรมหาวิหาร",
    slug: "wat-phra-si-rattana-mahathat",
    description:
      "แลนด์มาร์กคู่เมืองและที่ประดิษฐานพระพุทธชินราช งานศิลป์สุโขทัยที่ยังมีชีวิตในวิถีเมืองสองแคว",
    category: "วัดและประวัติศาสตร์",
    location: "อำเภอเมืองพิษณุโลก",
    district: "เมืองพิษณุโลก",
    address: "ถนนพุทธบูชา ตำบลในเมือง อำเภอเมืองพิษณุโลก จังหวัดพิษณุโลก",
    openingHours: "ทุกวัน 06:00-18:00 น.",
    entryFee: "ไม่มีค่าเข้าชม",
    phone: "055-258-966",
    website: "https://www.tourismthailand.org/",
    latitude: 16.8212,
    longitude: 100.2628,
    tags: ["พระพุทธชินราช", "วัดสำคัญ", "ประวัติศาสตร์", "กลางเมือง"],
    highlights: [
      "สักการะพระพุทธชินราช พระพุทธรูปสำคัญคู่เมืองพิษณุโลก",
      "ชมสถาปัตยกรรมวัดหลวงและงานศิลป์แบบสุโขทัย",
      "เดินต่อไปยังย่านตลาดและริมแม่น้ำน่านได้สะดวก"
    ],
    travelTips: [
      "แต่งกายสุภาพและเผื่อเวลาในช่วงวันหยุดยาว",
      "ช่วงเช้าแสงสวย คนไม่แน่น และเดินตลาดใกล้วัดต่อได้"
    ],
    nearbyPlaceSlugs: ["nan-river-community", "sgt-maj-thawee-folk-museum"],
    duration: "1-2 ชั่วโมง",
    bestTimeToVisit: "เช้าตรู่หรือช่วงเย็น",
    accessibility: "พื้นที่หลักเดินง่าย มีทางเข้าใกล้ลานจอดรถ แต่บางจุดพื้นต่างระดับ",
    mapUrl: "https://maps.google.com/?q=Wat+Phra+Si+Rattana+Mahathat+Phitsanulok",
    coverImage:
      "https://images.unsplash.com/photo-1563492065599-3520f775eeed?auto=format&fit=crop&w=1200&q=80",
    featured: true
  },
  {
    id: "place-2",
    name: "อุทยานแห่งชาติภูหินร่องกล้า",
    slug: "phu-hin-rong-kla",
    description:
      "ป่าสน ลานหินปุ่ม และเส้นทางประวัติศาสตร์กลางขุนเขา เหมาะกับการเดินทางช่วงอากาศเย็น",
    category: "ธรรมชาติ",
    location: "อำเภอนครไทย",
    district: "นครไทย",
    address: "ตำบลเนินเพิ่ม อำเภอนครไทย จังหวัดพิษณุโลก",
    openingHours: "ทุกวัน 06:00-18:00 น.",
    entryFee: "มีค่าธรรมเนียมอุทยานตามประกาศกรมอุทยานฯ",
    phone: "055-356-652",
    website: "https://portal.dnp.go.th/",
    latitude: 16.9976,
    longitude: 100.9955,
    tags: ["อุทยานแห่งชาติ", "ภูเขา", "ลานหินปุ่ม", "เดินป่า"],
    highlights: [
      "เดินเส้นทางลานหินปุ่มและผาชูธง",
      "สัมผัสอากาศเย็น ป่าสน และวิวภูเขานครไทย",
      "เรียนรู้ประวัติศาสตร์การเมืองร่วมสมัยในพื้นที่อุทยาน"
    ],
    travelTips: [
      "เตรียมรองเท้าเดินป่า เสื้อกันฝน และเสื้อกันหนาวตามฤดูกาล",
      "ตรวจสอบสภาพอากาศและประกาศอุทยานก่อนขึ้นเขา"
    ],
    nearbyPlaceSlugs: ["kaeng-song-waterfall"],
    duration: "ครึ่งวัน-1 วัน",
    bestTimeToVisit: "พฤศจิกายน-กุมภาพันธ์",
    accessibility: "เหมาะกับผู้เดินทางที่พร้อมเดินบนทางธรรมชาติ บางจุดไม่เหมาะกับรถเข็น",
    mapUrl: "https://maps.google.com/?q=Phu+Hin+Rong+Kla+National+Park",
    coverImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    featured: true
  },
  {
    id: "place-3",
    name: "น้ำตกแก่งซอง",
    slug: "kaeng-song-waterfall",
    description:
      "จุดพักริมน้ำเข็กที่เดินทางง่ายจากเส้นทางสู่เขาค้อ เหมาะกับแวะรับลม เล่นน้ำตามฤดูกาล และชิมอาหารพื้นถิ่น",
    category: "ธรรมชาติ",
    location: "อำเภอวังทอง",
    district: "วังทอง",
    address: "ตำบลแก่งโสภา อำเภอวังทอง จังหวัดพิษณุโลก",
    openingHours: "ทุกวัน 08:00-17:00 น.",
    entryFee: "ไม่มีค่าเข้าชมสำหรับพื้นที่ริมทางทั่วไป บางกิจกรรมอาจมีค่าใช้จ่าย",
    phone: "055-311-282",
    website: "https://www.tourismthailand.org/",
    latitude: 16.8588,
    longitude: 100.6932,
    tags: ["น้ำตก", "แม่น้ำเข็ก", "ครอบครัว", "ธรรมชาติ"],
    highlights: [
      "ชมสายน้ำและแก่งหินริมแม่น้ำเข็ก",
      "แวะพักระหว่างเส้นทางพิษณุโลก-เขาค้อ",
      "มีร้านอาหารและจุดนั่งพักใกล้พื้นที่ท่องเที่ยว"
    ],
    travelTips: [
      "หลีกเลี่ยงลงน้ำช่วงฝนตกหนักหรือกระแสน้ำแรง",
      "วันหยุดคนค่อนข้างมาก ควรเดินทางช่วงเช้าหรือบ่ายแก่"
    ],
    nearbyPlaceSlugs: ["phu-hin-rong-kla"],
    duration: "1-2 ชั่วโมง",
    bestTimeToVisit: "ปลายฝนถึงต้นหนาว",
    accessibility: "พื้นที่ชมวิวบางส่วนอยู่ใกล้ลานจอดรถ แต่ทางลงริมน้ำอาจลื่นและต่างระดับ",
    mapUrl: "https://maps.google.com/?q=Kaeng+Song+Waterfall+Phitsanulok",
    coverImage:
      "https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80",
    featured: true
  },
  {
    id: "place-4",
    name: "ชุมชนริมน้ำน่านและตลาดใต้",
    slug: "nan-river-community",
    description:
      "ย่านเดินเล่นริมแม่น้ำน่านที่ผูกตลาด วัด บ้านเก่า และอาหารพื้นถิ่นไว้ในจังหวะเดียวกัน",
    category: "ชุมชน",
    location: "อำเภอเมืองพิษณุโลก",
    district: "เมืองพิษณุโลก",
    address: "ย่านตลาดใต้และริมแม่น้ำน่าน ตำบลในเมือง อำเภอเมืองพิษณุโลก จังหวัดพิษณุโลก",
    openingHours: "ทุกวัน ช่วงเช้าและเย็นคึกคักเป็นพิเศษ",
    entryFee: "ไม่มีค่าเข้าชม",
    phone: "055-252-742",
    website: "https://www.tourismthailand.org/",
    latitude: 16.8224,
    longitude: 100.2599,
    tags: ["ชุมชนเมือง", "ตลาด", "แม่น้ำน่าน", "เดินเล่น"],
    highlights: [
      "เดินชมวิถีตลาดเก่าและบ้านเรือนริมแม่น้ำน่าน",
      "ชิมอาหารเช้า ของหวาน และของฝากในย่านเมืองเก่า",
      "เชื่อมเส้นทางเดินจากวัดใหญ่ไปยังจุดชมวิวริมน้ำ"
    ],
    travelTips: [
      "เตรียมเงินสดสำหรับร้านเล็กในตลาด",
      "ช่วงเย็นเหมาะกับเดินเล่นริมแม่น้ำและถ่ายภาพเมือง"
    ],
    nearbyPlaceSlugs: ["wat-phra-si-rattana-mahathat", "hanging-leg-noodle"],
    duration: "1-3 ชั่วโมง",
    bestTimeToVisit: "เช้า 07:00-10:00 น. หรือเย็น 16:30-19:00 น.",
    accessibility: "ทางเดินในตลาดบางช่วงแคบและมีขอบทาง แต่ริมแม่น้ำบางจุดเดินได้สะดวก",
    mapUrl: "https://maps.google.com/?q=Nan+River+Phitsanulok+Market",
    coverImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    featured: false
  },
  {
    id: "place-5",
    name: "ก๋วยเตี๋ยวห้อยขาริมน่าน",
    slug: "hanging-leg-noodle",
    description:
      "ประสบการณ์อาหารเมืองสองแควที่นั่งห้อยขาริมน่าน กินก๋วยเตี๋ยวร้อน ๆ คู่บรรยากาศแม่น้ำกลางเมือง",
    category: "อาหาร",
    location: "อำเภอเมืองพิษณุโลก",
    district: "เมืองพิษณุโลก",
    address: "ถนนพุทธบูชา ริมแม่น้ำน่าน ตำบลในเมือง อำเภอเมืองพิษณุโลก จังหวัดพิษณุโลก",
    openingHours: "ทุกวัน 09:00-16:00 น. โดยประมาณ",
    entryFee: "ไม่มีค่าเข้าชม ค่าอาหารตามเมนู",
    phone: "สอบถามร้านโดยตรง",
    website: "https://www.tourismthailand.org/",
    latitude: 16.8248,
    longitude: 100.2604,
    tags: ["ก๋วยเตี๋ยว", "อาหารท้องถิ่น", "ริมแม่น้ำ", "ครอบครัว"],
    highlights: [
      "ชิมก๋วยเตี๋ยวห้อยขา เมนูจำง่ายของพิษณุโลก",
      "นั่งรับลมริมแม่น้ำน่านใกล้ย่านวัดใหญ่",
      "เหมาะกับมื้อกลางวันแบบสั้น ๆ ในตัวเมือง"
    ],
    travelTips: [
      "ช่วงเที่ยงคนแน่น ควรเผื่อเวลารอคิว",
      "ลองจับคู่กับของหวานหรือกาแฟในย่านเมืองเก่า"
    ],
    nearbyPlaceSlugs: ["nan-river-community", "wat-phra-si-rattana-mahathat"],
    duration: "45 นาที-1 ชั่วโมง",
    bestTimeToVisit: "ก่อนเที่ยงหรือบ่ายต้น",
    accessibility: "ร้านริมตลิ่งบางแห่งมีบันไดและพื้นที่ต่างระดับ ควรสอบถามร้านล่วงหน้า",
    mapUrl: "https://maps.google.com/?q=Phitsanulok+hanging+leg+noodle",
    coverImage:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80",
    featured: false
  },
  {
    id: "place-6",
    name: "พิพิธภัณฑ์พื้นบ้านจ่าทวี",
    slug: "sgt-maj-thawee-folk-museum",
    description:
      "พิพิธภัณฑ์พื้นบ้านที่เก็บเครื่องมือ วิถีชีวิต และความทรงจำของชาวพิษณุโลกไว้อย่างอบอุ่น",
    category: "พิพิธภัณฑ์และศูนย์เรียนรู้",
    location: "อำเภอเมืองพิษณุโลก",
    district: "เมืองพิษณุโลก",
    address: "ถนนวิสุทธิกษัตริย์ ตำบลในเมือง อำเภอเมืองพิษณุโลก จังหวัดพิษณุโลก",
    openingHours: "อังคาร-อาทิตย์ 08:30-16:30 น. ปิดวันจันทร์",
    entryFee: "มีค่าเข้าชม โปรดตรวจสอบอัตราปัจจุบันกับพิพิธภัณฑ์",
    phone: "055-212-749",
    website: "https://www.tourismthailand.org/",
    latitude: 16.8121,
    longitude: 100.2677,
    tags: ["พิพิธภัณฑ์", "วัฒนธรรม", "ของเก่า", "ศูนย์เรียนรู้"],
    highlights: [
      "ชมเครื่องมือพื้นบ้านและข้าวของเครื่องใช้ในอดีต",
      "เรียนรู้วิถีชุมชนภาคเหนือตอนล่างผ่านของสะสมจริง",
      "เหมาะกับครอบครัว นักเรียน และคนที่ชอบประวัติศาสตร์ท้องถิ่น"
    ],
    travelTips: [
      "โทรสอบถามวันเปิดทำการก่อนเดินทางในช่วงวันหยุดนักขัตฤกษ์",
      "ใช้เวลาช้า ๆ กับป้ายคำอธิบายและของจัดแสดงขนาดเล็ก"
    ],
    nearbyPlaceSlugs: ["wat-phra-si-rattana-mahathat", "nan-river-community"],
    duration: "1-2 ชั่วโมง",
    bestTimeToVisit: "ช่วงสายหรือบ่ายที่อากาศไม่ร้อนจัด",
    accessibility: "อาคารจัดแสดงบางส่วนมีทางต่างระดับ ควรติดต่อเจ้าหน้าที่หากต้องการความช่วยเหลือ",
    mapUrl: "https://maps.google.com/?q=Sgt+Maj+Thawee+Folk+Museum",
    coverImage:
      "https://images.unsplash.com/photo-1566127444979-b3d2b654e3d7?auto=format&fit=crop&w=1200&q=80",
    featured: false
  }
];

export const placeCategories: PlaceCategory[] = Array.from(
  new Set(places.map((place) => place.category))
);

export const placeDistricts = Array.from(
  new Set(places.map((place) => normalizeDistrict(place.district)))
).sort((a, b) => a.localeCompare(b, "th"));

export function getPlaceBySlug(slug: string) {
  return places.find((place) => place.slug === slug);
}

export function getNearbyPlaces(slug: string) {
  const place = getPlaceBySlug(slug);

  if (!place) {
    return [];
  }

  return place.nearbyPlaceSlugs
    .map((nearbySlug) => getPlaceBySlug(nearbySlug))
    .filter((nearbyPlace): nearbyPlace is Place => Boolean(nearbyPlace));
}

export const posts: Post[] = [
  {
    id: "post-1",
    title: "เทศกาลอาหารและของดีเมืองสองแควเปิดรับร้านค้าท้องถิ่น",
    slug: "local-food-festival",
    excerpt:
      "ชวนผู้ประกอบการร้านอาหารและของฝากในจังหวัดร่วมออกบูธ สร้างพื้นที่ให้คนเมืองและนักท่องเที่ยวรู้จักรสชาติพิษณุโลกมากขึ้น",
    content:
      "เทศกาลนี้ออกแบบให้เป็นพื้นที่รวมร้านเด่นจากหลายอำเภอ ทั้งก๋วยเตี๋ยวห้อยขา กล้วยตาก น้ำพริก และเมนูพื้นบ้าน เพื่อให้ผู้มาเยือนได้สัมผัสเมืองผ่านอาหาร",
    type: "news",
    status: "published",
    featured: true,
    coverImage:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "2026-05-01T08:00:00.000Z",
    category: "ข่าวประชาสัมพันธ์"
  },
  {
    id: "post-2",
    title: "เช้าวันธรรมดาที่วัดใหญ่",
    slug: "morning-at-wat-yai",
    excerpt:
      "เรื่องเล่าจากจังหวะช้า ๆ หน้าองค์พระพุทธชินราช ที่ทำให้เข้าใจว่าทำไมเมืองนี้ถึงอ่อนโยนกับคนกลับบ้าน",
    content:
      "แสงเช้าบนลานวัดและเสียงตลาดที่ค่อย ๆ ตื่น คือภาพจำของพิษณุโลกที่ไม่ต้องจัดฉาก เมืองนี้มีวิธีต้อนรับคนด้วยความเรียบง่าย",
    type: "story",
    status: "published",
    featured: true,
    coverImage:
      "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "2026-04-24T08:00:00.000Z",
    category: "เรื่องเล่าท้องถิ่น"
  },
  {
    id: "post-3",
    title: "เส้นทางเที่ยวธรรมชาติ 2 วัน 1 คืนจากเมืองสู่นครไทย",
    slug: "nature-route-nakhon-thai",
    excerpt:
      "แพลนเที่ยวแบบไม่รีบ เริ่มจากตัวเมือง แวะตลาดเช้า แล้วขึ้นไปเก็บลมภูเขาที่นครไทย",
    content:
      "เส้นทางนี้เหมาะกับคนที่อยากเห็นพิษณุโลกทั้งมุมเมืองและมุมภูเขา มีทั้งอาหารเช้า วัดสำคัญ คาเฟ่ท้องถิ่น และเส้นทางธรรมชาติ",
    type: "story",
    status: "draft",
    featured: false,
    coverImage:
      "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80",
    publishedAt: "2026-04-18T08:00:00.000Z",
    category: "ที่เที่ยว"
  }
];

export const mediaItems: MediaItem[] = [
  {
    id: "media-1",
    name: "hero-phitsanulok.jpg",
    url: places[0].coverImage,
    bucket: "site-media",
    size: "420 KB",
    createdAt: "2026-05-01T08:00:00.000Z"
  },
  {
    id: "media-2",
    name: "food-market.jpg",
    url: posts[0].coverImage,
    bucket: "site-media",
    size: "360 KB",
    createdAt: "2026-04-30T08:00:00.000Z"
  }
];

export const categories = [
  "ข่าวประชาสัมพันธ์",
  "ที่เที่ยว",
  "วัดและวัฒนธรรม",
  "อาหารและของฝาก",
  "เรื่องเล่าท้องถิ่น"
];
