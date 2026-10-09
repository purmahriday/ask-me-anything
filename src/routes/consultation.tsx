import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Check, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accent, Eyebrow } from "@/components/portal/primitives";
import { usePersona } from "@/lib/persona";
import { consultationBudgets, consultationRooms, consultationTimelines, validConsultationStep, type ConsultationRequest } from "@/services/consultation";

export const Route = createFileRoute("/consultation")({
  head: () => ({ meta: [
    { title: "Book a Consultation — Revive Client Portal" },
    { name: "description", content: "Share your rooms, timing and renovation vision with Revive, then continue exploring your personal style." },
    { property: "og:title", content: "Book a Consultation — Revive Client Portal" },
    { property: "og:description", content: "Start your Revive consultation with a few questions about your home." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Consultation,
});

function Consultation() {
  const { profile } = usePersona();
  return <ConsultationFlow key={profile.id} />;
}

function ConsultationFlow() {
  const { profile, consultationBooked, consultationRequest, bookConsultation } = usePersona();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState<ConsultationRequest>({ rooms: [], timeline: "", budgetRange: "", streetAddress: "", zipCode: "", firstName: profile.firstName, lastName: profile.lastName, email: "", phone: "", contactPreference: "", consent: false });
  const set = <K extends keyof ConsultationRequest>(key: K, value: ConsultationRequest[K]) => setForm((current) => ({ ...current, [key]: value }));
  const names = ["Rooms", "Timing", "Budget", "Address", "Contact"];
  const questions = ["What rooms are you thinking of designing?", "When are you thinking of starting?", "What is your planned investment?", "Where is your project located?", "How can we reach you?"];
  const helpers = ["Select all that apply.", "Choose the timing that feels closest.", "A range helps us prepare the right ideas for you.", "Your street address and ZIP code.", "Your details are used only for your Revive consultation."];
  const options = step === 0 ? consultationRooms : step === 1 ? consultationTimelines : consultationBudgets;
  const selected = step === 0 ? form.rooms : step === 1 ? [form.timeline] : [form.budgetRange];

  if (consultationBooked) return (
    <section className="mx-auto flex min-h-[65vh] max-w-2xl flex-col items-center justify-center text-center" aria-live="polite">
      <span className="mb-8 grid size-16 place-items-center rounded-full bg-primary-soft text-primary"><Check className="size-8" /></span>
      <Eyebrow>{submitted ? "Your Revive file is open" : "Consultation already requested"}</Eyebrow>
      <h1 className="text-4xl md:text-5xl">{submitted ? <>Thank you, <Accent>{form.firstName}.</Accent></> : <>We already have your <Accent>consultation.</Accent></>}</h1>
      <p className="mt-6 max-w-lg text-lg text-muted-foreground">Our team will get back to you. There’s no need to book again — your request is already with us.</p>
      {profile.consultation && <p className="mt-4 text-sm text-muted-foreground">{profile.consultation.date} · {profile.consultation.designer}</p>}
      {consultationRequest && <p className="mt-4 text-sm text-muted-foreground">{consultationRequest.rooms.join(", ")} · {consultationRequest.zipCode}</p>}
      <div className="mt-10 grid w-full gap-4 sm:grid-cols-2">
        <Button asChild variant="outline" className="h-auto justify-start gap-4 whitespace-normal rounded-none p-6 text-left"><Link to="/our-work"><MapPin className="text-primary" /><span>Explore our work</span><ArrowRight className="ml-auto" /></Link></Button>
        <Button asChild variant="outline" className="h-auto justify-start gap-4 whitespace-normal rounded-none p-6 text-left"><Link to="/design-studio"><Sparkles className="text-primary" /><span>Continue to Design Studio</span><ArrowRight className="ml-auto" /></Link></Button>
      </div>
      <p className="mt-6 text-xs text-muted-foreground">Demo preview — no request is sent to the Revive team.</p>
    </section>
  );

  return (
    <section className="mx-auto max-w-xl" aria-labelledby="consultation-title">
      <Eyebrow>Complimentary consultation</Eyebrow>
      <div className="mb-10 flex gap-2" aria-label={`Step ${step + 1} of 5: ${names[step]}`}>
        {names.map((name, i) => <div key={name} className="min-w-0 flex-1"><span className={`block h-1 ${i <= step ? "bg-primary" : "bg-muted"}`} /><span className={`mt-2 block text-[10px] ${i === step ? "text-primary" : "text-muted-foreground"}`}>{name}</span></div>)}
      </div>
      <form onSubmit={(event) => { event.preventDefault(); if (!validConsultationStep(form, step)) return; if (step < 4) setStep(step + 1); else { setSubmitted(true); bookConsultation(form); toast.success("We got your info!", { description: "Someone on our team will get back to you shortly." }); void navigate({ to: "/" }); } }}>
        <h1 id="consultation-title" className="text-center text-3xl leading-tight md:text-4xl">{questions[step]}</h1>
        <p className="mt-4 text-center text-sm text-muted-foreground">{helpers[step]}</p>
        <div className="my-8 min-h-64">
          {step < 3 ? <div className="overflow-hidden border border-border" role={step === 0 ? "group" : "radiogroup"} aria-label={questions[step]}>
            {options.map((option) => {
              const active = selected.includes(option);
              return <label key={option} className={`flex min-h-14 cursor-pointer items-center gap-4 border-b border-border px-4 py-3 text-sm last:border-b-0 hover:bg-secondary ${active ? "bg-primary-soft" : "bg-card"}`}>
                <input type={step === 0 ? "checkbox" : "radio"} name={names[step]} value={option} checked={active} onChange={() => step === 0 ? set("rooms", active ? form.rooms.filter((room) => room !== option) : [...form.rooms, option]) : step === 1 ? set("timeline", option) : set("budgetRange", option)} className="size-5 shrink-0 accent-primary" />{option}
              </label>;
            })}
          </div> : step === 3 ? <div className="grid gap-5">
            <Field label="Street address" autoComplete="street-address" value={form.streetAddress} onChange={(v) => set("streetAddress", v)} />
            <Field label="ZIP code" autoComplete="postal-code" inputMode="numeric" value={form.zipCode} onChange={(v) => set("zipCode", v.replace(/\D/g, "").slice(0, 5))} />
          </div> : <div className="space-y-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <Field label="First name" autoComplete="given-name" value={form.firstName} onChange={(v) => set("firstName", v)} />
              <Field label="Last name" autoComplete="family-name" value={form.lastName} onChange={(v) => set("lastName", v)} />
              <Field label="Email address" autoComplete="email" type="email" value={form.email} onChange={(v) => set("email", v)} />
              <Field label="Phone number" autoComplete="tel" type="tel" value={form.phone} onChange={(v) => set("phone", v)} />
            </div>
            <fieldset><legend className="mb-3 text-sm">Best way to reach you</legend><div className="flex flex-wrap gap-3">{["Phone call", "Text", "Email"].map((choice) => <label key={choice} className="flex items-center gap-2 text-sm"><input type="radio" name="contact-preference" checked={form.contactPreference === choice} onChange={() => set("contactPreference", choice)} className="accent-primary" />{choice}</label>)}</div></fieldset>
            <label className="flex items-start gap-3 text-xs leading-relaxed text-muted-foreground"><input type="checkbox" checked={form.consent} onChange={(e) => set("consent", e.target.checked)} className="mt-0.5 size-4 shrink-0 accent-primary" />I agree to be contacted by Revive about my consultation.</label>
          </div>}
        </div>
        <div className="flex items-center justify-between gap-2 border-t border-border pt-5">
          <Button type="button" variant="ghost" disabled={step === 0} onClick={() => setStep(step - 1)}><ArrowLeft />Back</Button>
          <span className="text-xs text-muted-foreground">{step + 1} of 5</span>
          <Button type="submit" disabled={!validConsultationStep(form, step)} className="rounded-none">{step < 4 ? "Continue" : "Request consultation"}<ArrowRight /></Button>
        </div>
      </form>
      <p className="mt-6 text-center text-xs text-muted-foreground">Demo preview — no request is sent to the Revive team.</p>
    </section>
  );
}

function Field({ label, value, onChange, ...props }: { label: string; value: string; onChange: (value: string) => void; autoComplete: string; type?: string; inputMode?: "numeric" }) {
  return <label className="grid gap-2 text-sm">{label}<input {...props} value={value} onChange={(e) => onChange(e.target.value)} required className="min-w-0 border border-input bg-card px-3 py-3 text-base text-foreground outline-none focus:border-primary focus:ring-1 focus:ring-ring" /></label>;
}