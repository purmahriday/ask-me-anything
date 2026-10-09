// Service adapter layer. Mock implementations today; swap bodies for real API calls later
// without touching UI components.
import { ARTICLES, MATERIALS, PERSONAS, PROJECTS, images, type CustomerProfile, type Material } from "./mockData";
import type { ConsultationRequest } from "./consultation";
import { reviveContent } from "./reviveContent";

export const getReviveContent = () => reviveContent;

// Mock-only request adapter: Vivo will replace this in-memory store.
const consultationRequests = new Map<string, ConsultationRequest>();
export const getConsultationRequest = (id: string) => consultationRequests.get(id);
export const hasConsultation = (p: CustomerProfile) => Boolean(p.consultation || p.project || p.lifecycleStage === "booked" || consultationRequests.has(p.id));
export function requestConsultation(p: CustomerProfile, request: ConsultationRequest) {
  if (hasConsultation(p)) return false;
  consultationRequests.set(p.id, { ...request, rooms: [...request.rooms] });
  return true;
}

export function getStyleImagery(p: CustomerProfile) {
  const style = p.designQuiz.completed ? p.designQuiz.primaryStyle : undefined;
  if (style === "Coastal Transitional") return { src: images.living, alt: "Coastal Transitional living room with soft blues and natural light", inset: images.bath, circle: images.kitchen };
  if (style === "Modern Organic") return { src: images.ensuite, alt: "Modern Organic interior with plaster, walnut and natural textures", inset: images.detail, circle: images.materials };
  if (style === "Classic") return { src: images.bath, alt: "Classic bathroom with timeless finishes", inset: images.kitchen, circle: images.detail };
  return { src: images.kitchen, alt: "Warm Modern kitchen with light oak and a marble waterfall island", inset: images.detail, circle: images.bath };
}

export function getCustomerPortalProfile(id: string): CustomerProfile {
  const profile = PERSONAS.find((p) => p.id === id) ?? PERSONAS[0];
  if (!profile) throw new Error("No demo profiles configured");
  return profile;
}

export interface NextStep { eyebrow: string; title: string; body: string; cta: string; to: string }

export function getCustomerNextStep(p: CustomerProfile): NextStep {
  if (getConsultationRequest(p.id) && !p.consultation && !p.project) return { eyebrow: "Consultation requested", title: "Your request is already in", body: "Our team will get back to you. In the meantime, keep exploring your style and materials.", cta: "Continue designing", to: "/design-studio" };
  switch (p.lifecycleStage) {
    case "new_prospect":
      return { eyebrow: "Your first step", title: "Discover your style", body: "Tap your way through our Style Studio. About three minutes, and everything here becomes yours.", cta: "Begin the quiz", to: "/design-studio" };
    case "quiz_complete":
      return { eyebrow: "Next step", title: "Start your material sheet", body: `We've picked finishes that suit ${p.designQuiz.primaryStyle}. Save the ones you love.`, cta: "Explore materials", to: "/materials" };
    case "engaged":
      return { eyebrow: "You're ready", title: "Book your design consultation", body: "Bring your saved materials to a one-on-one session with a Revive designer.", cta: "Book consultation", to: "/consultation" };
    case "booked":
      return { eyebrow: "Coming up", title: "Your proposal is being prepared", body: `${p.consultation?.designer} is finalizing your design proposal following your ${p.consultation?.date} consultation.`, cta: "Review your selections", to: "/materials" };
    case "active":
      return { eyebrow: "This week", title: p.project?.phase ?? "Your project", body: p.project ? `Your project is ${p.project.progress}% complete. Estimated completion ${p.project.estCompletion}.` : "Our team will share your next update soon.", cta: "View project", to: "/project" };
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
// Latest completed projects; Vivo will supply these in date order later.
export const getLatestProjects = (limit = 6) => [...PROJECTS].reverse().slice(0, limit);
export const getAllArticles = () => ARTICLES;
