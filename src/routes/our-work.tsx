import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { getReviveContent } from "@/services/portal";
import { Accent, Eyebrow, PageHeader } from "@/components/portal/primitives";

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
  const content = getReviveContent();
  return (
    <div className="space-y-16">
      <PageHeader eyebrow="Why Revive" title={<>What makes us the best home remodeling company in <Accent>Florida</Accent></>} />
      <section className="grid gap-10 md:grid-cols-[2fr_3fr]">
        <div>
          <figure><img src={content.founders} alt="Justin and David Caballero, Revive president and CEO, father and son" className="aspect-[363/247] w-full object-cover" /><figcaption className="mt-3 text-xs text-muted-foreground">Justin &amp; David Caballero · President &amp; CEO, father and son</figcaption></figure>
          <h2 className="mt-6 text-2xl">Our story</h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">{content.story.map((p) => <p key={p}>{p}</p>)}</div>
        </div>
        <div className="border-t border-border pt-8 md:border-l md:border-t-0 md:pl-10 md:pt-0">
          <Eyebrow>A message from our president</Eyebrow>
          <div className="space-y-4 text-sm leading-relaxed text-muted-foreground">{content.message.map((p) => <p key={p}>{p}</p>)}</div>
          <p className="mt-8 text-sm text-muted-foreground">With gratitude,</p><p className="mt-1 font-[family-name:var(--font-display)] text-2xl">Justin Caballero</p><p className="mt-1 text-xs text-muted-foreground">President, Revive Design and Renovation</p>
        </div>
      </section>
      <section className="border-y border-border py-10">
        <h2 className="mb-8 text-3xl">The principles we live by</h2>
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-3">{content.principles.map(([title, body]) => <div key={title}><h3 className="flex items-center gap-3 font-sans text-sm font-semibold"><Check className="size-5 text-primary" />{title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p></div>)}</div>
      </section>
      <section id="awards" aria-labelledby="awards-title">
        <h2 id="awards-title" className="mb-8 text-3xl">Awards and <Accent>recognition</Accent></h2>
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{content.awards.map((award) => <article key={award.title} className="border border-border bg-card p-5"><img src={award.image} alt={award.title} loading="lazy" className="mb-5 h-20 w-full object-contain" /><p className="caps text-[9px] text-muted-foreground">{award.period}</p><h3 className="mt-2 font-sans text-sm font-semibold">{award.title}</h3><p className="mt-2 text-xs leading-relaxed text-muted-foreground">{award.body}</p></article>)}</div>
      </section>
      <section id="work" aria-label="Our renovation approach" className="grid gap-6 md:grid-cols-3">{content.features.map((feature) => <article key={feature.title} className="overflow-hidden border border-border bg-card"><img src={feature.image} alt={feature.title === "First class design, in-house" ? "Revive bathroom with marble shower and freestanding tub" : "Completed Revive kitchen renovation"} loading="lazy" className="aspect-[298/186] w-full object-cover" /><div className="p-5"><h2 className="text-xl">{feature.title}</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{feature.body}</p></div></article>)}</section>
      <section className="border-t border-border pt-10">
        <Eyebrow>Published openly</Eyebrow><h2 className="text-3xl">How to hire a remodeler you will not <Accent>regret</Accent></h2>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground">After thousands of projects, we built a vetting checklist and published it openly, because a homeowner who checks these eight things ends up with a great contractor whether or not that contractor is us.</p>
        <div className="mt-10 grid gap-8 md:grid-cols-2">{content.checklist.map(([title, body], i) => <div key={title} className="flex gap-4"><span className="grid size-8 shrink-0 place-items-center rounded-full border border-primary/20 bg-primary-soft text-xs text-primary">{i + 1}</span><div><h3 className="font-sans text-sm font-semibold">{title}</h3><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{body}</p>{i === 1 && <a href="#awards" className="mt-3 inline-block text-xs text-primary underline underline-offset-4">See our awards →</a>}{i === 3 && <a href="#work" className="mt-3 inline-block text-xs text-primary underline underline-offset-4">See our work →</a>}</div></div>)}</div>
      </section>
    </div>
  );
}
