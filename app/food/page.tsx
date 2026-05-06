import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/site/section-heading";

export const metadata = {
  title: "อาหารและของฝาก"
};

const foods = [
  {
    name: "ก๋วยเตี๋ยวห้อยขา",
    image:
      "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1200&q=80",
    tag: "เมนูเมือง"
  },
  {
    name: "กล้วยตากบางกระทุ่ม",
    image:
      "https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=1200&q=80",
    tag: "ของฝาก"
  },
  {
    name: "ตลาดเช้าเมืองพิษณุโลก",
    image:
      "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=1200&q=80",
    tag: "ชุมชน"
  }
];

export default function FoodPage() {
  return (
    <section className="container-page py-12">
      <SectionHeading
        eyebrow="Food"
        title="อาหารและของฝาก"
        description="หน้า showcase สำหรับร้านอาหาร ของฝาก และเส้นทางกินเที่ยวในจังหวัด"
      />
      <div className="grid gap-5 md:grid-cols-3">
        {foods.map((food) => (
          <Card key={food.name} className="overflow-hidden">
            <div className="relative aspect-square">
              <Image src={food.image} alt={food.name} fill className="object-cover" />
            </div>
            <CardContent className="pt-5">
              <Badge variant="accent">{food.tag}</Badge>
              <h2 className="mt-3 text-xl font-bold">{food.name}</h2>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
