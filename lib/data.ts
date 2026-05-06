import type { MediaItem, Place, Post } from "@/lib/types";

export const places: Place[] = [
  {
    id: "place-1",
    name: "วัดพระศรีรัตนมหาธาตุวรมหาวิหาร",
    slug: "wat-phra-si-rattana-mahathat",
    description:
      "แลนด์มาร์กคู่เมืองและที่ประดิษฐานพระพุทธชินราช งานศิลป์สุโขทัยที่ยังมีชีวิตในวิถีเมืองสองแคว",
    category: "วัดและประวัติศาสตร์",
    location: "อำเภอเมืองพิษณุโลก",
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
    coverImage:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    featured: true
  },
  {
    id: "place-3",
    name: "ชุมชนริมน้ำน่าน",
    slug: "nan-river-community",
    description:
      "ย่านเดินเล่นริมแม่น้ำน่านที่ผูกตลาด วัด บ้านเก่า และอาหารพื้นถิ่นไว้ในจังหวะเดียวกัน",
    category: "ชุมชน",
    location: "อำเภอเมืองพิษณุโลก",
    coverImage:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80",
    featured: false
  }
];

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
