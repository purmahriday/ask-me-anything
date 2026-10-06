// Service adapter layer. Mock implementations today; swap bodies for real API calls later
// without touching UI components.
import { ARTICLES, MATERIALS, PERSONAS, PROJECTS, type CustomerProfile, type Material } from "./mockData";

export function getCustomerPortalProfile(id: string): CustomerProfile {
  return PERSONAS.find((p) => p.id === id) ?? PERSONAS[0];
}

export interface NextStep { eyebrow: string; title: string; body: string; cta: string; to: string }

export function getCustomerNextStep(p: CustomerProfile): NextStep {
  switch (p.lifecycleStage) {
    case "new_prospect":
      return { eyebrow: "Your first step", title: "Discover your style", body: "Tap your way through our Style Studio. About three minutes, and everything here becomes yours.", cta: "Begin the quiz", to: "/design-studio" };
    case "quiz_complete":
      return { eyebrow: "Next step", title: "Start your material sheet", body: `We've picked finishes that suit ${p.designQuiz.primaryStyle}. Save the ones you love.`, cta: "Explore materials", to: "/materials" };
    case "engaged":
      return { eyebrow: "You're ready", title: "Book your design consultation", body: "Bring your saved materials to a one-on-one session with a Revive designer.", cta: "Book consultation", to: "/about" };
    case "booked":
      return { eyebrow: "Coming up", title: "Your proposal is being prepared", body: `${p.consultation?.designer} is finalizing your design proposal following your ${p.consultation?.date} consultation.`, cta: "Review your selections", to: "/materials" };
    case "active":
      return { eyebrow: "This week", title: p.project!.phase, body: `Your project is ${p.project!.progress}% complete. Estimated completion ${p.project!.estCompletion}.`, cta: "View project", to: "/project" };
  }
}

export const getSavedMaterials = (ids: string[]): Material[] => MATERIALS.filter((m) => ids.includes(m.id));
export const getAllMaterials = () => MATERIALS;

export function getRecommendedMaterials(p: CustomerProfile, limit = 4) {
  const style = p.designQuiz.primaryStyle;
  return MATERIALS.filter((m) => !p.materials.savedIds.includes(m.id))
    .sort((a, b) => Number(b.styles.includes(style ?? "")) - Number(a.styles.includes(style ?? "")))
    .slice(0, limit);
}

export function getRecommendedProjects(p: CustomerProfile, limit = 3) {
  const s = p.designQuiz.primaryStyle;
  const score = (x: (typeof PROJECTS)[number]) => (x.style === s ? 2 : 0) + (p.engagement.interestedIn.includes(x.type) ? 1 : 0);
  return [...PROJECTS].sort((a, b) => score(b) - score(a)).slice(0, limit);
}

export function getRecommendedArticles(p: CustomerProfile, limit = 3) {
  const s = p.designQuiz.primaryStyle ?? "";
  const pri = p.lifecycleStage === "active" || p.lifecycleStage === "booked" ? "Process" : s;
  return [...ARTICLES].sort((a, b) => Number(b.tags.includes(pri) || b.tags.includes(s)) - Number(a.tags.includes(pri) || a.tags.includes(s))).slice(0, limit);
}

export const getAllProjects = () => PROJECTS;
export const getAllArticles = () => ARTICLES;
