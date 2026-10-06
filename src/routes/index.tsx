import { createFileRoute, Link } from "@tanstack/react-router";
import { usePersona } from "@/lib/persona";
import { images } from "@/services/mockData";
import {
  getCustomerNextStep, getRecommendedArticles, getRecommendedMaterials, getRecommendedProjects, getSavedMaterials,
} from "@/services/portal";
import {
  Accent, ArchPhoto, ArticleCard, EmptyState, Eyebrow, MaterialCard, PrimaryLink, ProjectCard, SectionHead, TextLink,
} from "@/components/portal/primitives";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Home — Revive Client Portal" },
      { name: "description", content: "Your personalized Revive home: style profile, saved materials, next steps and project updates." },
      { property: "og:title", content: "Home — Revive Client Portal" },
      { property: "og:description", content: "Your personalized Revive home: style profile, saved materials, next steps and project updates." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

const heroCopy: Record<string, string> = {
  new_prospect: "Let's begin with what you love. Everything here will shape itself around your taste.",
  quiz_complete: "Your style is taking shape. Here's what we've gathered for you.",
  engaged: "Your vision is coming together beautifully. One conversation away from a plan.",
  booked: "Your design is in our hands. Here's what happens next.",
  active: "Your home is being transformed. Here's where things stand today.",
};

function Home() {
  const { profile: p, toggleSaved } = usePersona();
  const next = getCustomerNextStep(p);
  const saved = getSavedMaterials(p.materials.savedIds);
  const recMat = getRecommendedMaterials(p);
  const recProj = getRecommendedProjects(p);
  const recArt = getRecommendedArticles(p);
  const greeting = p.lifecycleStage === "new_prospect" ? "Welcome," : "Welcome back,";

  return (
    <div className="space-y-24">
      {/* Hero */}
      <section className="grid items-center gap-14 md:grid-cols-2">
        <div>
          <Eyebrow>Your Revive Portal</Eyebrow>
          <h1 className="text-5xl leading-[1.05] md:text-6xl">{greeting} <Accent>{p.firstName}.</Accent></h1>
          <p className="mt-6 max-w-md text-lg text-muted-foreground">{heroCopy[p.lifecycleStage]}</p>
          {p.designQuiz.completed && (
            <p className="caps mt-6 text-[11px] text-primary">Your style · {p.designQuiz.primaryStyle}</p>
          )}
        </div>
        <ArchPhoto src={images.kitchen} alt="Light oak kitchen with marble waterfall island" inset={images.detail} circle={images.bath} />
      </section>

      {/* Next step */}
      <section aria-labelledby="next" className="grid gap-8 border border-primary/30 bg-card p-8 md:grid-cols-[1fr_auto] md:items-center md:p-12">
        <div>
          <Eyebrow>{next.eyebrow}</Eyebrow>
          <h2 id="next" className="text-3xl md:text-4xl">{next.title}</h2>
          <p className="mt-3 max-w-xl text-muted-foreground">{next.body}</p>
          {p.project && (
            <div className="mt-6 max-w-md">
              <div className="h-1 bg-muted" role="progressbar" aria-valuenow={p.project.progress} aria-valuemin={0} aria-valuemax={100} aria-label="Project progress">
                <div className="h-1 bg-primary" style={{ width: `${p.project.progress}%` }} />
              </div>
            </div>
          )}
        </div>
        <PrimaryLink to={next.to}>{next.cta}</PrimaryLink>
      </section>

      {/* Style profile */}
      {p.designQuiz.completed && (
        <section className="grid gap-12 md:grid-cols-2 md:items-center">
          <img src={images.living} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover shadow-[var(--shadow-photo)]" />
          <div>
            <Eyebrow>Your style profile</Eyebrow>
            <h2 className="text-4xl">{p.designQuiz.primaryStyle?.split(" ")[0]} <Accent>{p.designQuiz.primaryStyle?.split(" ").slice(1).join(" ")}</Accent></h2>
            <p className="mt-3 text-muted-foreground">With touches of {p.designQuiz.secondaryStyle}.</p>
            <div className="mt-6 flex gap-2">
              {p.designQuiz.palette?.map((c) => <span key={c} className="size-10 rounded-full border border-border" style={{ background: c }} />)}
            </div>
            <div className="mt-8"><TextLink to="/design-studio">See full profile</TextLink></div>
          </div>
        </section>
      )}

      {/* Saved materials */}
      {p.designQuiz.completed && (
        <section>
          <SectionHead eyebrow="Your material sheet" title={<>Saved <Accent>finishes</Accent></>} action={saved.length > 0 ? <TextLink to="/materials">View all</TextLink> : undefined} />
          {saved.length ? (
            <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
              {saved.slice(0, 4).map((m) => <MaterialCard key={m.id} m={m} saved onToggle={() => toggleSaved(m.id)} />)}
            </div>
          ) : (
            <EmptyState title="Your sheet is waiting" body="Save cabinetry, stone, tile and hardware you love. We'll bring them to your consultation." cta="Browse materials" to="/materials" />
          )}
        </section>
      )}

      {/* Recommended materials */}
      {p.lifecycleStage !== "active" && p.designQuiz.completed && (
        <section>
          <SectionHead eyebrow={`Chosen for ${p.designQuiz.primaryStyle}`} title={<>Materials you may <Accent>love</Accent></>} />
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {recMat.map((m) => <MaterialCard key={m.id} m={m} saved={false} onToggle={() => toggleSaved(m.id)} />)}
          </div>
        </section>
      )}

      {/* Consultation */}
      {p.consultation && (
        <section className="grid gap-10 border-y border-border py-12 md:grid-cols-3">
          <div><Eyebrow>Consultation</Eyebrow><p className="font-[family-name:var(--font-display)] text-2xl">{p.consultation.date}</p></div>
          <div><p className="caps text-[10px] text-muted-foreground">Your designer</p><p className="mt-2 text-xl">{p.consultation.designer}</p></div>
          <div><p className="caps text-[10px] text-muted-foreground">Status</p><p className="mt-2 text-xl">Proposal in preparation</p></div>
        </section>
      )}

      {/* Project team */}
      {p.project && (
        <section>
          <SectionHead eyebrow="Your team" title={<>The people behind your <Accent>home</Accent></>} action={<TextLink to="/project">Project details</TextLink>} />
          <div className="grid gap-6 md:grid-cols-3">
            {p.project.team.map((t) => (
              <div key={t.name} className="flex items-center gap-4 border border-border bg-card p-5">
                <span className="grid size-12 place-items-center rounded-full bg-primary-soft font-[family-name:var(--font-caps)] text-primary">{t.initials}</span>
                <div><p className="text-lg">{t.name}</p><p className="caps text-[10px] text-muted-foreground">{t.role}</p></div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      <section>
        <SectionHead eyebrow="Our work" title={<>Homes like <Accent>yours</Accent></>} action={<TextLink to="/our-work">View portfolio</TextLink>} />
        <div className="grid gap-10 md:grid-cols-3">{recProj.map((x) => <ProjectCard key={x.id} p={x} />)}</div>
      </section>

      {/* Articles */}
      <section>
        <SectionHead eyebrow="Read" title={<>Ideas for your <Accent>project</Accent></>} action={<TextLink to="/articles">All articles</TextLink>} />
        <div className="grid gap-10 md:grid-cols-3">{recArt.map((a) => <ArticleCard key={a.id} a={a} />)}</div>
      </section>

      {/* Why Revive */}
      {p.lifecycleStage !== "active" && (
        <section className="bg-card px-8 py-16 text-center md:px-16">
          <Eyebrow className="flex flex-col items-center">Why Revive</Eyebrow>
          <h2 className="mx-auto max-w-2xl text-4xl">One team, from first sketch to <Accent>final reveal.</Accent></h2>
          <div className="mt-12 grid gap-10 md:grid-cols-3">
            {[["23", "NARI CotY awards"], ["1,800+", "Homes renovated"], ["In-house", "Design & construction"]].map(([n, l]) => (
              <div key={l}><p className="font-[family-name:var(--font-display)] text-4xl text-primary">{n}</p><p className="caps mt-2 text-[10px] text-muted-foreground">{l}</p></div>
            ))}
          </div>
          <div className="mt-12"><Link to="/about" className="caps text-[11px] hover:text-primary">Meet the team</Link></div>
        </section>
      )}
    </div>
  );
}
