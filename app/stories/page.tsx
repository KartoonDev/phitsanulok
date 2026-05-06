import { PostCard } from "@/components/site/content-card";
import { SectionHeading } from "@/components/site/section-heading";
import { posts } from "@/lib/data";

export const metadata = {
  title: "เรื่องเล่าท้องถิ่น"
};

export default function StoriesPage() {
  const stories = posts.filter((post) => post.type === "story");

  return (
    <section className="container-page py-12">
      <SectionHeading
        eyebrow="Stories"
        title="บทความและเรื่องเล่าท้องถิ่น"
        description="พื้นที่เล่าเมืองแบบมีชีวิต ทั้งเส้นทางเดินทาง ความทรงจำ และมุมมองของคนพิษณุโลก"
      />
      <div className="grid gap-5 md:grid-cols-2">
        {stories.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
