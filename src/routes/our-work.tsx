import { createFileRoute } from "@tanstack/react-router";
import { getLatestProjects } from "@/services/portal";
import { Accent, PageHeader } from "@/components/portal/primitives";

export const Route = createFileRoute("/our-work")({
  head: () => ({
    meta: [
      { title: "Our Work — Revive Client Portal" },
      { name: "description", content: "The latest Revive kitchens, baths and whole-home renovations across Tampa and Orlando." },
      { property: "og:title", content: "Our Work — Revive Client Portal" },
      { property: "og:description", content: "The latest Revive kitchens, baths and whole-home renovations across Tampa and Orlando." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OurWork,
});

function OurWork() {
  const projects = getLatestProjects();
  return (
    <div className="space-y-12">
      <PageHeader eyebrow="Latest projects" title={<>Recently <Accent>revived.</Accent></>} intro="A look at the homes our team has most recently completed across Tampa and Orlando." />
      <section className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((p) => (
          <article key={p.id} className="overflow-hidden border border-border bg-card">
            <img src={p.image} alt={p.title} loading="lazy" className="aspect-[4/3] w-full object-cover" />
            <div className="p-5">
              <p className="caps text-[9px] text-muted-foreground">{p.type} · {p.location} · {p.style}</p>
              <h2 className="mt-2 text-xl">{p.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.blurb}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}
