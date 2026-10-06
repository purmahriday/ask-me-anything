import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Material, Project, Article } from "@/services/mockData";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("mb-5", className)}>
      <p className="caps text-[11px] text-primary">{children}</p>
      <span className="mt-4 block h-px w-16 bg-primary/60" />
    </div>
  );
}

export function Accent({ children }: { children: ReactNode }) {
  return <em className="italic text-primary">{children}</em>;
}

export function PrimaryLink({ to, children, className }: { to: string; children: ReactNode; className?: string }) {
  return (
    <Link
      to={to}
      className={cn(
        "caps inline-flex items-center justify-center bg-primary px-10 py-4 text-xs text-primary-foreground shadow-[var(--shadow-glow)] transition hover:bg-primary/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
        className,
      )}
    >
      {children}
    </Link>
  );
}

export function TextLink({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="caps text-[11px] text-foreground underline-offset-8 hover:text-primary hover:underline">
      {children}
    </Link>
  );
}

export function SectionHead({ eyebrow, title, action }: { eyebrow: string; title: ReactNode; action?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="text-3xl md:text-4xl">{title}</h2>
      </div>
      {action}
    </div>
  );
}

export function ArchPhoto({ src, alt, inset, circle }: { src: string; alt: string; inset?: string; circle?: string }) {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="arch border border-primary/40 p-3">
        <img src={src} alt={alt} width={1024} height={1280} className="arch aspect-[4/5] w-full object-cover" />
      </div>
      {inset && (
        <img src={inset} alt="" loading="lazy" className="absolute -right-6 top-1/2 w-28 border-4 border-card object-cover shadow-[var(--shadow-photo)] aspect-[3/4] md:w-32" />
      )}
      {circle && (
        <img src={circle} alt="" loading="lazy" className="absolute -bottom-4 -left-6 size-28 rounded-full border-4 border-card object-cover shadow-[var(--shadow-photo)] md:size-36" />
      )}
    </div>
  );
}

export function MaterialCard({ m, saved, onToggle }: { m: Material; saved?: boolean; onToggle?: () => void }) {
  return (
    <div className="group border border-border bg-card">
      <div className="relative aspect-square" style={{ background: m.swatch }}>
        {onToggle && (
          <button
            onClick={onToggle}
            aria-pressed={saved}
            aria-label={saved ? `Remove ${m.name} from material sheet` : `Save ${m.name} to material sheet`}
            className="absolute right-3 top-3 grid size-9 place-items-center rounded-full bg-card/90 text-primary transition hover:bg-card"
          >
            <Heart className={cn("size-4", saved && "fill-primary")} />
          </button>
        )}
      </div>
      <div className="p-4">
        <p className="caps text-[10px] text-muted-foreground">{m.category}</p>
        <p className="mt-2 font-[family-name:var(--font-display)] text-lg leading-snug">{m.name}</p>
        <p className="mt-1 text-sm text-muted-foreground">{m.finish}</p>
      </div>
    </div>
  );
}

export function ProjectCard({ p }: { p: Project }) {
  return (
    <article className="group">
      <div className="overflow-hidden">
        <img src={p.image} alt={p.title} loading="lazy" className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105" />
      </div>
      <p className="caps mt-4 text-[10px] text-primary">{p.style} · {p.location}</p>
      <h3 className="mt-2 text-xl">{p.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{p.blurb}</p>
    </article>
  );
}

export function ArticleCard({ a }: { a: Article }) {
  return (
    <article className="group">
      <img src={a.image} alt="" loading="lazy" className="aspect-[3/2] w-full object-cover" />
      <p className="caps mt-4 text-[10px] text-muted-foreground">{a.category} · {a.readMins} min read</p>
      <h3 className="mt-2 text-xl leading-snug group-hover:text-primary">{a.title}</h3>
      <p className="mt-1 text-sm text-muted-foreground">{a.excerpt}</p>
    </article>
  );
}

export function EmptyState({ title, body, cta, to }: { title: string; body: string; cta: string; to: string }) {
  return (
    <div className="border border-dashed border-primary/40 px-8 py-14 text-center">
      <h3 className="text-2xl">{title}</h3>
      <p className="mx-auto mt-3 max-w-md text-muted-foreground">{body}</p>
      <div className="mt-6"><TextLink to={to}>{cta}</TextLink></div>
    </div>
  );
}

export function PageHeader({ eyebrow, title, intro }: { eyebrow: string; title: ReactNode; intro?: string }) {
  return (
    <header className="mb-14 max-w-2xl">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h1 className="text-4xl leading-tight md:text-6xl">{title}</h1>
      {intro && <p className="mt-5 text-lg text-muted-foreground">{intro}</p>}
    </header>
  );
}
