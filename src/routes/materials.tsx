import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { usePersona } from "@/lib/persona";
import { getAllMaterials, getSavedMaterials } from "@/services/portal";
import { Accent, EmptyState, MaterialCard, PageHeader, SectionHead } from "@/components/portal/primitives";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/materials")({
  head: () => ({
    meta: [
      { title: "Material Sheet — Revive Client Portal" },
      { name: "description", content: "Browse cabinetry, countertops, tile, flooring and hardware, and save your favorites." },
      { property: "og:title", content: "Material Sheet — Revive Client Portal" },
      { property: "og:description", content: "Browse cabinetry, countertops, tile, flooring and hardware, and save your favorites." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Materials,
});

const CATS = ["All", "Cabinetry", "Countertops", "Backsplash", "Flooring", "Hardware", "Paint", "Fixtures"] as const;

function Materials() {
  const { profile: p, toggleSaved } = usePersona();
  const [cat, setCat] = useState<(typeof CATS)[number]>("All");
  const saved = getSavedMaterials(p.materials.savedIds);
  const list = getAllMaterials().filter((m) => cat === "All" || m.category === cat);

  return (
    <div className="space-y-20">
      <PageHeader eyebrow="Material sheet" title={<>The finishes of your <Accent>home</Accent></>} intro="Save what speaks to you. Your designer will see your sheet before every conversation." />
      <section>
        <SectionHead eyebrow={`${saved.length} saved`} title={<>Your <Accent>selections</Accent></>} />
        {saved.length ? (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">{saved.map((m) => <MaterialCard key={m.id} m={m} saved onToggle={() => toggleSaved(m.id)} />)}</div>
        ) : (
          <EmptyState title="Nothing saved yet" body="Tap the heart on any finish below to start your sheet." cta="Discover your style first" to="/design-studio" />
        )}
      </section>
      <section>
        <SectionHead eyebrow="Catalog" title={<>Browse <Accent>materials</Accent></>} />
        <div role="tablist" aria-label="Material category" className="mb-8 flex flex-wrap gap-2">
          {CATS.map((c) => (
            <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
              className={cn("caps border px-4 py-2 text-[10px]", cat === c ? "border-primary bg-primary text-primary-foreground" : "border-border hover:border-primary")}>
              {c}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
          {list.map((m) => <MaterialCard key={m.id} m={m} saved={p.materials.savedIds.includes(m.id)} onToggle={() => toggleSaved(m.id)} />)}
        </div>
      </section>
    </div>
  );
}
