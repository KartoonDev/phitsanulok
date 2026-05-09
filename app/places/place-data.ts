import * as sourceData from "@/lib/data";
import type { Place } from "@/lib/types";

type PlaceDetailExtras = {
  district?: string;
  openingHours?: string;
  entryFee?: string;
  address?: string;
  mapQuery?: string;
  travelTips?: string[];
  highlights?: string[];
};

export type PlaceDetail = Place & PlaceDetailExtras;

type PlaceDataModule = typeof sourceData & {
  placeCategories?: string[];
  placeDistricts?: string[];
  getPlaceBySlug?: (slug: string) => Place | undefined;
  getNearbyPlaces?: (slug: string, limit?: number) => Place[];
};

const data = sourceData as PlaceDataModule;

const detailBySlug: Record<string, PlaceDetailExtras> = {
  "wat-phra-si-rattana-mahathat": {
    district: "เมืองพิษณุโลก",
    openingHours: "เปิดทุกวัน 06:00-18:00 น.",
    entryFee: "เข้าชมฟรี",
    address: "ถนนพุทธบูชา ตำบลในเมือง อำเภอเมืองพิษณุโลก",
    mapQuery: "วัดพระศรีรัตนมหาธาตุวรมหาวิหาร พิษณุโลก",
    highlights: ["พระพุทธชินราช", "สถาปัตยกรรมสุโขทัย", "ตลาดและของฝากรอบวัด"],
    travelTips: [
      "ช่วงเช้าเหมาะกับการไหว้พระและถ่ายภาพก่อนแดดแรง",
      "แต่งกายสุภาพและเผื่อเวลาสำหรับเดินชมวิหารกับตลาดใกล้เคียง"
    ]
  },
  "phu-hin-rong-kla": {
    district: "นครไทย",
    openingHours: "เปิดทุกวัน 08:00-16:30 น.",
    entryFee: "มีค่าธรรมเนียมอุทยานตามประกาศ",
    address: "อุทยานแห่งชาติภูหินร่องกล้า อำเภอนครไทย",
    mapQuery: "อุทยานแห่งชาติภูหินร่องกล้า พิษณุโลก",
    highlights: ["ลานหินปุ่ม", "ป่าสนเขา", "เส้นทางประวัติศาสตร์"],
    travelTips: [
      "ตรวจสอบสภาพอากาศก่อนขึ้นเขา โดยเฉพาะช่วงฝนและหมอกจัด",
      "เตรียมรองเท้าเดินสบาย เสื้อกันลม และน้ำดื่มสำหรับเส้นทางธรรมชาติ"
    ]
  },
  "nan-river-community": {
    district: "เมืองพิษณุโลก",
    openingHours: "เดินเล่นได้ตลอดวัน ร้านค้าคึกคักช่วงเย็น",
    entryFee: "เข้าชมฟรี",
    address: "ย่านชุมชนริมแม่น้ำน่าน อำเภอเมืองพิษณุโลก",
    mapQuery: "ริมน้ำน่าน พิษณุโลก",
    highlights: ["ทางเดินริมแม่น้ำ", "ตลาดชุมชน", "บ้านเก่าและวัดใกล้เคียง"],
    travelTips: [
      "ช่วงเย็นอากาศสบายและเหมาะกับการเดินต่อไปหาร้านอาหารท้องถิ่น",
      "ใช้เวลาแบบไม่เร่งรีบเพื่อแวะคาเฟ่ ตลาด และจุดถ่ายภาพริมแม่น้ำ"
    ]
  }
};

export const places = data.places.map((place) => enrichPlace(place));

export const placeCategories =
  data.placeCategories ?? Array.from(new Set(places.map((place) => place.category)));

export const placeDistricts =
  data.placeDistricts ??
  Array.from(new Set(places.map((place) => sourceData.normalizeDistrict(place.district ?? place.location))));

export function getPlaceBySlug(slug: string) {
  const sourcePlace = data.getPlaceBySlug?.(slug) ?? data.places.find((place) => place.slug === slug);

  return sourcePlace ? enrichPlace(sourcePlace) : undefined;
}

export function getNearbyPlaces(slug: string, limit = 3) {
  const sourcePlaces =
    data.getNearbyPlaces?.(slug, limit) ??
    data.places.filter((place) => place.slug !== slug).slice(0, limit);

  return sourcePlaces.map((place) => enrichPlace(place));
}

function enrichPlace(place: Place): PlaceDetail {
  const detail = detailBySlug[place.slug] ?? {};

  return {
    ...place,
    ...detail,
    district: sourceData.normalizeDistrict(detail.district ?? place.district),
    mapQuery: detail.mapQuery ?? `${place.name} ${place.location}`,
    openingHours: detail.openingHours ?? "ตรวจสอบเวลาเปิดก่อนเดินทาง",
    entryFee: detail.entryFee ?? "ตรวจสอบค่าเข้าชมจากผู้ให้บริการ",
    travelTips: detail.travelTips ?? ["บันทึกแผนที่ไว้ล่วงหน้าและตรวจสอบสภาพอากาศก่อนออกเดินทาง"],
    highlights: detail.highlights ?? [place.category, place.location]
  };
}
