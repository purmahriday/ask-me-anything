import { createFileRoute } from "@tanstack/react-router";
import { usePersona } from "@/lib/persona";
import { getAllArticles, getRecommendedArticles } from "@/services/portal";
import { Accent, ArticleCard, PageHeader } from "@/components/portal/primitives";

export const Route = createFileRoute("/articles")({
  head: () => ({
    meta: [
      { title: "Articles — Revive Client Portal" },
      { name: "description", content: "Planning guides, material comparisons and style ideas from the Revive design team." },
      { property: "og:title", content: "Articles — Revive Client Portal" },
      { property: "og:description", content: "Planning guides, material comparisons and style ideas from the Revive design team." },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Articles,
});

function Articles() {
  const { profile } = usePersona();
  const list = getRecommendedArticles(profile, getAllArticles().length);
  const [lead, ...rest] = list as [typeof list[number], ...typeof list];
  return (
    <div>
      <PageHeader eyebrow="The Revive Journal" title={<>Ideas, guides & <Accent>inspiration</Accent></>} />
      <article className="mb-16 grid gap-10 md:grid-cols-2 md:items-center">
        <img src={lead.image} alt="" className="aspect-[4/3] w-full object-cover" />
        <div>
          <p className="caps text-[10px] text-primary">Recommended for you · {lead.readMins} min</p>
          <h2 className="mt-3 text-4xl leading-tight">{lead.title}</h2>
          <p className="mt-4 text-lg text-muted-foreground">{lead.excerpt}</p>
        </div>
      </article>
      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">{rest.map((a) => <ArticleCard key={a.id} a={a} />)}</div>
    </div>
  );
}
