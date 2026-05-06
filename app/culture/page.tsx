import { Landmark, Palette, ScrollText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeading } from "@/components/site/section-heading";

export const metadata = {
  title: "วัฒนธรรม"
};

export default function CulturePage() {
  const items = [
    {
      icon: Landmark,
      title: "พระพุทธชินราช",
      text: "ศูนย์รวมใจของเมืองและงานศิลป์พระพุทธรูปที่สำคัญที่สุดแห่งหนึ่งของไทย"
    },
    {
      icon: ScrollText,
      title: "เมืองสองแคว",
      text: "เมืองประวัติศาสตร์ที่เติบโตจากสายน้ำ การค้า และผู้คนหลากหลายชุมชน"
    },
    {
      icon: Palette,
      title: "งานช่างและประเพณี",
      text: "พื้นที่สำหรับขยายเป็นฐานข้อมูลประเพณี งานศิลป์ท้องถิ่น และปฏิทินกิจกรรม"
    }
  ];

  return (
    <section className="container-page py-12">
      <SectionHeading
        eyebrow="Culture"
        title="วัด ศิลปวัฒนธรรม และความทรงจำของเมือง"
        description="หน้าเนื้อหาที่เน้นความลึกของจังหวัด เหมาะสำหรับบทความยาว แกลเลอรี และเส้นเวลา"
      />
      <div className="grid gap-5 md:grid-cols-3">
        {items.map((item) => (
          <Card key={item.title}>
            <CardContent className="pt-5">
              <div className="flex size-12 items-center justify-center rounded-md bg-primary text-primary-foreground">
                <item.icon />
              </div>
              <h2 className="mt-5 text-xl font-bold">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
