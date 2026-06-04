import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t bg-primary text-primary-foreground">
      <div className="container-page grid gap-8 py-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
        <div>
          <h2 className="text-xl font-bold">พิษณุโลก เมืองสองแคว</h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-primary-foreground/78">
            แพลตฟอร์มรวมข้อมูลจังหวัดสำหรับคนท้องถิ่น นักเดินทาง และผู้ดูแลเนื้อหา
            ออกแบบให้ขยายเป็นเว็บไซต์จังหวัดเต็มรูปแบบได้
          </p>
        </div>
        <div>
          <h3 className="font-semibold">สำรวจ</h3>
          <div className="mt-3 grid gap-2 text-sm text-primary-foreground/78">
            <Link href="/places">ที่เที่ยว</Link>
            <Link href="/culture">วัฒนธรรม</Link>
            <Link href="/food">อาหารและของฝาก</Link>
          </div>
        </div>
        <div>
          <h3 className="font-semibold">ระบบ</h3>
          <div className="mt-3 grid gap-2 text-sm text-primary-foreground/78">
            <Link href="/admin/login">Admin login</Link>
            <Link href="/admin">Dashboard</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
