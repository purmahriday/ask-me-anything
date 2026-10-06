import { createFileRoute } from "@tanstack/react-router";
import { FileText } from "lucide-react";
import { usePersona } from "@/lib/persona";
import { Accent, EmptyState, PageHeader } from "@/components/portal/primitives";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/project")({
  head: () => ({
    meta: [
      { title: "My Project — Revive Client Portal" },
      { name: "description", content: "Track your Revive renovation: schedule, documents, payments, messages and team." },
      { property: "og:title", content: "My Project — Revive Client Portal" },
      { property: "og:description", content: "Track your Revive renovation: schedule, documents, payments, messages and team." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProjectPage,
});

const tabCls = "caps rounded-none border-b-2 border-transparent bg-transparent px-4 py-3 text-[10px] data-[state=active]:border-primary data-[state=active]:bg-transparent data-[state=active]:text-primary data-[state=active]:shadow-none";

function ProjectPage() {
  const { profile } = usePersona();
  const pr = profile.project;
  if (!pr) return <EmptyState title="No active project yet" body="Once your renovation begins, your schedule, documents and team will live here." cta="Back to home" to="/" />;

  return (
    <div>
      <PageHeader eyebrow="My project" title={<>{pr.name.replace(" Renovation", "")} <Accent>Renovation</Accent></>} intro={`Currently: ${pr.phase}. Estimated completion ${pr.estCompletion}.`} />
      <div className="mb-12 max-w-xl">
        <div className="flex justify-between text-sm"><span>Started {pr.startDate}</span><span className="text-primary">{pr.progress}%</span></div>
        <div className="mt-2 h-1 bg-muted"><div className="h-1 bg-primary" style={{ width: `${pr.progress}%` }} /></div>
      </div>
      <Tabs defaultValue="schedule">
        <TabsList className="h-auto w-full justify-start gap-2 overflow-x-auto rounded-none border-b border-border bg-transparent p-0">
          {["schedule", "documents", "payments", "messages", "team"].map((t) => <TabsTrigger key={t} value={t} className={tabCls}>{t}</TabsTrigger>)}
        </TabsList>
        <TabsContent value="schedule" className="pt-10">
          <ol className="relative ml-3 border-l border-primary/30">
            {pr.milestones.map((m) => (
              <li key={m.label} className="mb-8 ml-8">
                <span className={`absolute -left-[7px] mt-1.5 size-3 rounded-full border-2 border-primary ${m.done ? "bg-primary" : "bg-background"}`} />
                <p className="caps text-[10px] text-muted-foreground">{m.date}</p>
                <p className="mt-1 font-[family-name:var(--font-display)] text-xl">{m.label}</p>
              </li>
            ))}
          </ol>
        </TabsContent>
        <TabsContent value="documents" className="pt-10">
          <ul className="divide-y divide-border border-y border-border">
            {pr.documents.map((d) => (
              <li key={d.name} className="flex items-center gap-4 py-4"><FileText className="size-5 text-primary" /><span className="flex-1">{d.name}</span><span className="text-sm text-muted-foreground">{d.date}</span></li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="payments" className="pt-10">
          <ul className="divide-y divide-border border-y border-border">
            {pr.payments.map((p) => (
              <li key={p.label} className="flex items-center justify-between py-4"><span>{p.label}</span><span className="text-sm text-muted-foreground">{p.due} · <span className={p.status === "Paid" ? "text-primary" : ""}>{p.status}</span></span></li>
            ))}
          </ul>
        </TabsContent>
        <TabsContent value="messages" className="space-y-4 pt-10">
          {pr.messages.map((m) => (
            <div key={m.at} className="border border-border bg-card p-5"><p className="caps text-[10px] text-muted-foreground">{m.from} · {m.at}</p><p className="mt-2">{m.body}</p></div>
          ))}
        </TabsContent>
        <TabsContent value="team" className="grid gap-6 pt-10 md:grid-cols-3">
          {pr.team.map((t) => (
            <div key={t.name} className="border border-border bg-card p-6 text-center">
              <span className="mx-auto grid size-16 place-items-center rounded-full bg-primary-soft font-[family-name:var(--font-caps)] text-lg text-primary">{t.initials}</span>
              <p className="mt-4 text-lg">{t.name}</p><p className="caps text-[10px] text-muted-foreground">{t.role}</p>
            </div>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
