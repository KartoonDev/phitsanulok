import type { Metadata } from "next";
import { Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";

const fontThai = Noto_Sans_Thai({
  subsets: ["thai", "latin"],
  display: "swap",
  variable: "--font-thai"
});

export const metadata: Metadata = {
  title: {
    default: "พิษณุโลก - เมืองสองแคว",
    template: "%s | พิษณุโลก"
  },
  description:
    "เว็บไซต์จังหวัดพิษณุโลก รวมที่เที่ยว วัฒนธรรม ข่าวประชาสัมพันธ์ อาหาร และเรื่องเล่าท้องถิ่น"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={fontThai.variable}>
      <body className="min-h-screen font-sans antialiased">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
