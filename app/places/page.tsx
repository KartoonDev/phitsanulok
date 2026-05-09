import Link from "next/link";
import { Compass, MapPinned, Search, SlidersHorizontal, X } from "lucide-react";
import { PlaceCard } from "@/components/site/content-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { placeCategories, placeDistricts, places } from "./place-data";

export const metadata = {
  title: "ที่เที่ยว"
};

type PlacesPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function PlacesPage({ searchParams }: PlacesPageProps) {
  const params = await searchParams;
  const query = getParam(params, "q");
  const category = getParam(params, "category");
  const district = getParam(params, "district");
  const activeFilters = [
    query ? `คำค้น: ${query}` : "",
    category ? `หมวดหมู่: ${category}` : "",
    district ? `อำเภอ: ${district}` : ""
  ].filter(Boolean);
  const filteredPlaces = places.filter((place) => {
    const matchesQuery = query
      ? [place.name, place.description, place.category, place.location]
          .join(" ")
          .toLowerCase()
          .includes(query.toLowerCase())
      : true;
    const matchesCategory = category ? place.category === category : true;
    const matchesDistrict = district ? (place.district ?? place.location) === district : true;

    return matchesQuery && matchesCategory && matchesDistrict;
  });

  return (
    <div className="container-page py-8 md:py-12">
      <section className="relative overflow-hidden rounded-lg border bg-card p-5 shadow-soft md:p-8">
        <div className="absolute inset-0 -z-0 bg-[linear-gradient(135deg,rgba(31,111,104,0.10),transparent_42%),linear-gradient(315deg,rgba(222,93,44,0.14),transparent_38%)]" />
        <div className="relative grid gap-6 lg:grid-cols-[1fr_18rem] lg:items-end">
          <div className="mb-8 max-w-3xl">
            <Badge variant="secondary">เที่ยวพิษณุโลก</Badge>
            <h1 className="mt-3 text-3xl font-black leading-tight tracking-normal md:text-4xl">
              เลือกจุดหมายให้เข้ากับทริปเมืองสองแคว
            </h1>
            <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
              ค้นหาวัดสำคัญ เส้นทางธรรมชาติ ชุมชนริมแม่น้ำ และจุดแวะพักที่จัดหมวดไว้ให้อ่านง่าย
            </p>
          </div>
          <div className="rounded-lg border bg-background/78 p-4 text-sm text-muted-foreground shadow-sm backdrop-blur">
            <div className="flex items-center gap-2 text-primary">
              <MapPinned className="size-5" />
              <span className="font-semibold">ผลลัพธ์ตอนนี้</span>
            </div>
            <p className="mt-3">
              <span className="text-4xl font-black text-foreground">{filteredPlaces.length}</span>
              <span className="ml-2">สถานที่พร้อมสำรวจ</span>
            </p>
          </div>
        </div>
      </section>

      <form
        action="/places"
        className="mt-5 grid gap-4 rounded-lg border bg-card/95 p-4 shadow-sm md:grid-cols-[1fr_13rem_13rem_auto] md:items-end"
      >
        <label className="grid gap-2">
          <span className="text-sm font-semibold">ค้นหาสถานที่</span>
          <span className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="ชื่อสถานที่ บรรยากาศ หรือย่าน"
              className="pl-9"
            />
          </span>
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-semibold">หมวดหมู่</span>
          <span className="relative">
            <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <select
              name="category"
              defaultValue={category}
              className="focus-ring h-10 w-full rounded-md border bg-background/90 px-9 text-sm shadow-inner shadow-primary/5"
            >
              <option value="">ทุกหมวดหมู่</option>
              {placeCategories.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </span>
        </label>
        <label className="grid gap-2">
          <span className="text-sm font-semibold">อำเภอ</span>
          <span className="relative">
            <Compass className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <select
              name="district"
              defaultValue={district}
              className="focus-ring h-10 w-full rounded-md border bg-background/90 px-9 text-sm shadow-inner shadow-primary/5"
            >
              <option value="">ทุกอำเภอ</option>
              {placeDistricts.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </span>
        </label>
        <div className="flex gap-2">
          <Button type="submit" className="flex-1 md:flex-none">
            <Search />
            ค้นหา
          </Button>
          <Button asChild variant="outline" className="flex-1 md:flex-none">
            <Link href="/places">
              <X />
              ล้าง
            </Link>
          </Button>
        </div>
        <div className="md:col-span-4">
          <p className="text-sm text-muted-foreground">
            {activeFilters.length > 0
              ? `กำลังแสดง ${filteredPlaces.length} สถานที่จากตัวกรองที่เลือก`
              : "ยังไม่ใช้ตัวกรอง แสดงสถานที่ทั้งหมด"}
          </p>
          {activeFilters.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {activeFilters.map((filter) => (
                <Badge key={filter} variant="outline">
                  {filter}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </form>

      <div className="mt-6 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filteredPlaces.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>

      {filteredPlaces.length === 0 && (
        <div className="mt-6 rounded-lg border bg-card p-8 text-center shadow-sm">
          <div className="mx-auto flex size-12 items-center justify-center rounded-md bg-secondary text-primary">
            <Search className="size-5" />
          </div>
          <h2 className="mt-4 text-2xl font-black">ยังไม่เจอสถานที่ที่ตรงกับตัวกรอง</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            ลองใช้คำกว้างขึ้น เลือกทุกหมวดหมู่ หรือเปิดทุกอำเภอเพื่อดูตัวเลือกทั้งหมด
          </p>
        </div>
      )}
    </div>
  );
}

function getParam(
  params: Record<string, string | string[] | undefined> | undefined,
  key: string
) {
  const value = params?.[key];

  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}
