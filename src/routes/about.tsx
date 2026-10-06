import { createFileRoute } from "@tanstack/react-router";
import { images } from "@/services/mockData";
import { Accent, ArchPhoto, Eyebrow, PageHeader } from "@/components/portal/primitives";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Revive — Revive Client Portal" },
      { name: "description", content: "Revive Design and Renovation: award-winning design and construction under one roof in Tampa and Orlando." },
      { property: "og:title", content: "About Revive — Revive Client Portal" },
      { property: "og:description", content: "Revive Design and Renovation: award-winning design and construction under one roof in Tampa and Orlando." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: About,
});

const pillars = [
  ["Design-build, in house", "Designers, project managers and craftsmen on one team, accountable to you."],
  ["Clear from day one", "Detailed proposals, a fixed schedule and a dedicated point of contact."],
  ["Built to last", "Materials we'd put in our own homes, installed by people who care."],
];

function About() {
  return (
    <div className="space-y-20">
      <section className="grid items-center gap-14 md:grid-cols-2">
        <PageHeader eyebrow="About Revive" title={<>Rooted in <Accent>Tampa Bay.</Accent></>} intro="For more than a decade we've helped Florida families fall back in love with their homes. 23 NARI Contractor of the Year awards later, the approach hasn't changed: listen first, design beautifully, build carefully." />
        <ArchPhoto src={images.ensuite} alt="Revive primary suite renovation" circle={images.materials} />
      </section>
      <section className="grid gap-10 border-t border-border pt-14 md:grid-cols-3">
        {pillars.map(([t, b]) => (
          <div key={t}><Eyebrow>{t}</Eyebrow><p className="text-muted-foreground">{b}</p></div>
        ))}
      </section>
      <section className="bg-card px-8 py-14 text-center">
        <h2 className="text-3xl">Talk to our <Accent>team</Accent></h2>
        <p className="mt-3 text-muted-foreground">Tampa (813) 555‑0142 · Orlando (407) 555‑0187</p>
      </section>
    </div>
  );
}
