import { createFileRoute } from "@tanstack/react-router";
import { usePersona } from "@/lib/persona";
import { images } from "@/services/mockData";
import { getRecommendedProjects } from "@/services/portal";
import { Accent, ArchPhoto, Eyebrow, PageHeader, ProjectCard, SectionHead } from "@/components/portal/primitives";

export const Route = createFileRoute("/design-studio")({
  head: () => ({
    meta: [
      { title: "Design Studio — Revive Client Portal" },
      { name: "description", content: "Discover your interior style or revisit your Revive style profile." },
      { property: "og:title", content: "Design Studio — Revive Client Portal" },
      { property: "og:description", content: "Discover your interior style or revisit your Revive style profile." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DesignStudio,
});

function DesignStudio() {
  const { profile: p } = usePersona();
  const q = p.designQuiz;

  if (!q.completed) {
    return (
      <section className="grid items-center gap-14 md:grid-cols-2">
        <div>
          <Eyebrow>The Revive Style Studio</Eyebrow>
          <h1 className="text-5xl md:text-6xl">What's your <Accent>style?</Accent></h1>
          <p className="mt-6 max-w-sm text-lg text-muted-foreground">Tap your way to it. About three minutes.</p>
          <a
            href="https://revivequiz.lovable.app/tools/style-studio"
            className="caps mt-8 inline-flex w-full max-w-sm justify-center bg-primary px-10 py-4 text-xs text-primary-foreground shadow-[var(--shadow-glow)] hover:bg-primary/90"
          >
            Begin
          </a>
        </div>
        <ArchPhoto src={images.kitchen} alt="Light oak kitchen" inset={images.detail} circle={images.bath} />
      </section>
    );
  }

  const [first, ...rest] = (q.primaryStyle ?? "").split(" ");
  return (
    <div className="space-y-20">
      <PageHeader eyebrow="Your style profile" title={<>{first} <Accent>{rest.join(" ")}</Accent></>} intro={`Grounded in ${q.primaryStyle}, with the ease of ${q.secondaryStyle}. Here's what defines your home.`} />
      <section className="grid gap-12 md:grid-cols-2">
        <img src={images.living} alt="" className="aspect-[4/3] w-full object-cover shadow-[var(--shadow-photo)]" />
        <div className="space-y-10">
          <div>
            <p className="caps text-[10px] text-muted-foreground">Your palette</p>
            <div className="mt-4 flex gap-3">{q.palette?.map((c) => <span key={c} className="size-14 rounded-full border border-border" style={{ background: c }} />)}</div>
          </div>
          <div>
            <p className="caps text-[10px] text-muted-foreground">What you're drawn to</p>
            <div className="mt-4 flex flex-wrap gap-2">{q.keywords?.map((k) => <span key={k} className="border border-primary/40 px-4 py-2 text-sm">{k}</span>)}</div>
          </div>
          <div>
            <p className="caps text-[10px] text-muted-foreground">Complementary style</p>
            <p className="mt-2 font-[family-name:var(--font-display)] text-2xl">{q.secondaryStyle}</p>
          </div>
          <a href="https://revivequiz.lovable.app/tools/style-studio" className="caps inline-block text-[11px] text-primary hover:underline">Retake the quiz</a>
        </div>
      </section>
      <section>
        <SectionHead eyebrow="Inspired by your style" title={<>Projects to <Accent>explore</Accent></>} />
        <div className="grid gap-10 md:grid-cols-3">{getRecommendedProjects(p).map((x) => <ProjectCard key={x.id} p={x} />)}</div>
      </section>
    </div>
  );
}
