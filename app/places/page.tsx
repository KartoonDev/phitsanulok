import { PlaceCard } from "@/components/site/content-card";
import { SectionHeading } from "@/components/site/section-heading";
import { places } from "@/lib/data";

export const metadata = {
  title: "ที่เที่ยว"
};

export default function PlacesPage() {
  return (
    <section className="container-page py-12">
      <SectionHeading
        eyebrow="Travel"
        title="ที่เที่ยวพิษณุโลก"
        description="รวบรวมสถานที่สำคัญที่แอดมินสามารถเพิ่ม แก้ไข และจัดหมวดหมู่ได้ผ่านระบบหลังบ้าน"
      />
      <div className="grid gap-5 md:grid-cols-3">
        {places.map((place) => (
          <PlaceCard key={place.id} place={place} />
        ))}
      </div>
    </section>
  );
}
