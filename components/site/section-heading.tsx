import { Badge } from "@/components/ui/badge";

export function SectionHeading({
  eyebrow,
  title,
  description
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-8 max-w-3xl">
      <Badge variant="secondary">{eyebrow}</Badge>
      <h2 className="mt-3 text-3xl font-black leading-tight tracking-normal md:text-4xl">
        {title}
      </h2>
      <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">{description}</p>
    </div>
  );
}
