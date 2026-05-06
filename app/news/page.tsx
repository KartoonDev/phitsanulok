import { PostCard } from "@/components/site/content-card";
import { SectionHeading } from "@/components/site/section-heading";
import { posts } from "@/lib/data";

export const metadata = {
  title: "ข่าวประชาสัมพันธ์"
};

export default function NewsPage() {
  const news = posts.filter((post) => post.type === "news");

  return (
    <section className="container-page py-12">
      <SectionHeading
        eyebrow="News"
        title="ข่าวประชาสัมพันธ์"
        description="ประกาศ กิจกรรม และข่าวจากจังหวัด รองรับสถานะ draft/published ในหลังบ้าน"
      />
      <div className="grid gap-5 md:grid-cols-2">
        {news.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
