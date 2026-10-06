import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { Menu, MessageCircle, Send } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { usePersona } from "@/lib/persona";
import { PERSONAS } from "@/services/mockData";

function Wordmark() {
  return (
    <Link to="/" className="block text-center leading-none text-primary" aria-label="Revive home">
      <span className="font-[family-name:var(--font-caps)] text-3xl tracking-[0.18em]">REVIVE</span>
      <span className="mt-1 block text-[9px] font-semibold tracking-[0.12em]">DESIGN AND RENOVATION</span>
    </Link>
  );
}

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  const { profile } = usePersona();
  const items: { to: string; label: string }[] = [
    { to: "/", label: "Home" },
    ...(profile.project ? [{ to: "/project", label: "My Project" }] : []),
    { to: "/design-studio", label: "Design Studio" },
    { to: "/materials", label: "Material Sheet" },
    { to: "/our-work", label: "Our Work" },
    { to: "/articles", label: "Articles" },
    { to: "/about", label: "About Revive" },
  ];
  return (
    <nav aria-label="Portal" className="flex flex-col gap-1">
      {items.map((i) => (
        <Link
          key={i.to}
          to={i.to}
          onClick={onNavigate}
          activeOptions={{ exact: i.to === "/" }}
          className="caps border-l-2 border-transparent px-5 py-3 text-[11px] text-foreground/80 transition hover:text-primary"
          activeProps={{ className: "!border-primary bg-sidebar-accent !text-primary" }}
        >
          {i.label}
        </Link>
      ))}
    </nav>
  );
}

function PersonaSwitcher() {
  const { profile, setPersona } = usePersona();
  return (
    <label className="block px-5 text-[11px] text-muted-foreground">
      <span className="caps text-[9px]">Preview as (demo)</span>
      <select
        value={profile.id}
        onChange={(e) => setPersona(e.target.value)}
        className="mt-2 w-full border border-border bg-card px-2 py-2 text-xs text-foreground"
      >
        {PERSONAS.map((p) => (
          <option key={p.id} value={p.id}>{p.firstName} — {p.lifecycleStage.replace("_", " ")}</option>
        ))}
      </select>
    </label>
  );
}

function SidebarBody({ onNavigate }: { onNavigate?: () => void }) {
  const { profile } = usePersona();
  return (
    <div className="flex h-full flex-col">
      <div className="px-5 py-8"><Wordmark /></div>
      <NavLinks onNavigate={onNavigate} />
      <div className="mt-auto space-y-6 pb-8 pt-10">
        <div className="mx-5 border-t border-border pt-6">
          <p className="font-[family-name:var(--font-display)] text-lg">{profile.firstName} {profile.lastName}</p>
          <p className="text-xs text-muted-foreground">{profile.city}, Florida</p>
        </div>
        <PersonaSwitcher />
      </div>
    </div>
  );
}

function AskDrawer() {
  const { profile } = usePersona();
  const [msgs, setMsgs] = useState<{ me: boolean; text: string }[]>([
    { me: false, text: `Hi ${profile.firstName}, ask us anything about your home, materials or the Revive process.` },
  ]);
  const [v, setV] = useState("");
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="caps fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 bg-primary px-5 py-3 text-[11px] text-primary-foreground shadow-[var(--shadow-glow)]">
          <MessageCircle className="size-4" /> Ask us anything
        </button>
      </SheetTrigger>
      <SheetContent className="flex flex-col bg-background">
        <SheetHeader>
          <SheetTitle className="text-2xl font-normal">Ask <em className="text-primary">Revive</em></SheetTitle>
        </SheetHeader>
        <div className="flex-1 space-y-3 overflow-y-auto py-4" aria-live="polite">
          {msgs.map((m, i) => (
            <p key={i} className={m.me ? "ml-10 bg-primary p-3 text-sm text-primary-foreground" : "mr-10 border border-border bg-card p-3 text-sm"}>{m.text}</p>
          ))}
        </div>
        <form
          className="flex gap-2 border-t border-border pt-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (!v.trim()) return;
            setMsgs((m) => [...m, { me: true, text: v }, { me: false, text: "Thanks! A member of our team will reply shortly." }]);
            setV("");
          }}
        >
          <label htmlFor="ask" className="sr-only">Your question</label>
          <input id="ask" value={v} onChange={(e) => setV(e.target.value)} placeholder="Type your question…" className="flex-1 border border-border bg-card px-3 py-2 text-sm" />
          <button aria-label="Send" className="bg-primary px-3 text-primary-foreground"><Send className="size-4" /></button>
        </form>
      </SheetContent>
    </Sheet>
  );
}

export function PortalShell({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <div className="caps bg-primary py-2 text-center text-[10px] text-primary-foreground">Your complete interior remodeling solution</div>
      <div className="flex">
        <aside className="sticky top-0 hidden h-screen w-64 shrink-0 border-r border-sidebar-border bg-sidebar lg:block">
          <SidebarBody />
        </aside>
        <div className="min-w-0 flex-1">
          <header className="flex items-center justify-between border-b border-border px-5 py-4 lg:hidden">
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger aria-label="Open menu" className="p-2"><Menu className="size-5" /></SheetTrigger>
              <SheetContent side="left" className="w-72 bg-sidebar p-0">
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <SidebarBody onNavigate={() => setOpen(false)} />
              </SheetContent>
            </Sheet>
            <Wordmark />
            <span className="w-9" />
          </header>
          <main className="mx-auto max-w-6xl px-6 py-12 md:px-12 md:py-16">{children}</main>
          <footer className="mx-auto max-w-6xl border-t border-border px-6 py-10 text-center md:px-12">
            <p className="caps text-[9px] text-muted-foreground">Winner of</p>
            <p className="font-[family-name:var(--font-display)] text-4xl">23</p>
            <p className="caps text-[9px] text-primary">NARI CotY Awards</p>
            <p className="caps mt-3 text-[10px] text-muted-foreground">Tampa <span className="text-primary">◆</span> Orlando</p>
          </footer>
        </div>
      </div>
      <AskDrawer />
    </div>
  );
}
