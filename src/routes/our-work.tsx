import { createFileRoute } from "@tanstack/react-router";
import { usePersona } from "@/lib/persona";
import { getRecommendedProjects, getAllProjects } from "@/services/portal";
import { Accent, PageHeader, ProjectCard } from "@/components/portal/primitives";

export const Route = createFileRoute("/our-work")({
  head: () => ({
    meta: [
      { title: "Our Work — Revive Client Portal" },
      { name: "description", content: "Award-winning Revive kitchens, baths and whole-home renovations across Tampa and Orlando." },
      { property: "og:title", content: "Our Work — Revive Client Portal" },
      { property: "og:description", content: "Award-winning Revive kitchens, baths and whole-home renovations across Tampa and Orlando." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: OurWork,
});

function OurWork() {
  const { profile } = usePersona();
  const list = getRecommendedProjects(profile, getAllProjects().length);
  const [hero, ...rest] = list as [typeof list[number], ...typeof list];
  return (
    <div>
      <PageHeader eyebrow="Portfolio" title={<>Homes we've <Accent>revived</Accent></>} intro={profile.designQuiz.completed ? `Ordered for you, starting with ${profile.designQuiz.primaryStyle}.` : "A selection of recent work across Tampa Bay and Central Florida."} />
      <article className="mb-16 grid gap-10 md:grid-cols-[3fr_2fr] md:items-end">
        <img src={hero.image} alt={hero.title} className="aspect-[4/3] w-full object-cover shadow-[var(--shadow-photo)]" />
        <div>
          <p className="caps text-[10px] text-primary">{hero.style} · {hero.location}</p>
          <h2 className="mt-3 text-4xl">{hero.title}</h2>
          <p className="mt-3 text-muted-foreground">{hero.blurb}</p>
        </div>
      </article>
      <div className="grid gap-12 md:grid-cols-2">{rest.map((p) => <ProjectCard key={p.id} p={p} />)}</div>
    </div>
  );
}
