import kitchen from "@/assets/kitchen.jpg";
import bath from "@/assets/bath.jpg";
import detail from "@/assets/detail.jpg";
import living from "@/assets/living.jpg";
import materials from "@/assets/materials.jpg";
import ensuite from "@/assets/ensuite.jpg";

export const images = { kitchen, bath, detail, living, materials, ensuite };

export type LifecycleStage = "new_prospect" | "quiz_complete" | "engaged" | "booked" | "active";

export interface Material {
  id: string;
  name: string;
  category: "Cabinetry" | "Countertops" | "Backsplash" | "Flooring" | "Hardware" | "Paint" | "Fixtures";
  finish: string;
  styles: string[];
  swatch: string; // css color for the chip
  image?: string;
}

export interface Project {
  id: string;
  title: string;
  type: "Kitchen" | "Bathroom" | "Whole Home" | "Living";
  location: string;
  style: string;
  image: string;
  blurb: string;
}

export interface Article {
  id: string;
  title: string;
  category: string;
  readMins: number;
  image: string;
  excerpt: string;
  tags: string[];
}

export interface CustomerProfile {
  id: string;
  firstName: string;
  lastName: string;
  city: string;
  lifecycleStage: LifecycleStage;
  designQuiz: { completed: boolean; primaryStyle?: string; secondaryStyle?: string; palette?: string[]; keywords?: string[] };
  materials: { savedIds: string[] };
  engagement: { interestedIn: Project["type"][]; articlesRead: number };
  consultation?: { date: string; designer: string; status: "scheduled" | "proposal_pending" };
  project?: {
    name: string;
    phase: string;
    progress: number;
    startDate: string;
    estCompletion: string;
    milestones: { label: string; date: string; done: boolean }[];
    team: { name: string; role: string; initials: string }[];
    documents: { name: string; date: string; kind: string }[];
    payments: { label: string; status: "Paid" | "Upcoming"; due: string }[];
    messages: { from: string; at: string; body: string }[];
  };
}

export const MATERIALS: Material[] = [
  { id: "m1", name: "Natural White Oak Shaker", category: "Cabinetry", finish: "Matte clear coat", styles: ["Warm Modern", "Coastal Transitional"], swatch: "oklch(0.78 0.06 75)" },
  { id: "m2", name: "Calacatta Gold Quartz", category: "Countertops", finish: "Polished", styles: ["Warm Modern", "Classic"], swatch: "oklch(0.95 0.01 85)" },
  { id: "m3", name: "Silver Travertine", category: "Countertops", finish: "Honed", styles: ["Modern Organic"], swatch: "oklch(0.82 0.03 75)" },
  { id: "m4", name: "Sea Glass Zellige", category: "Backsplash", finish: "Glazed", styles: ["Coastal Transitional"], swatch: "oklch(0.8 0.05 220)" },
  { id: "m5", name: "Handmade Ivory Subway", category: "Backsplash", finish: "Crackle glaze", styles: ["Warm Modern", "Classic"], swatch: "oklch(0.94 0.02 85)" },
  { id: "m6", name: "Wide Plank European Oak", category: "Flooring", finish: "Wire-brushed", styles: ["Warm Modern", "Modern Organic"], swatch: "oklch(0.7 0.06 70)" },
  { id: "m7", name: "Limestone Hex", category: "Flooring", finish: "Tumbled", styles: ["Modern Organic", "Coastal Transitional"], swatch: "oklch(0.88 0.02 85)" },
  { id: "m8", name: "Unlacquered Brass Pull", category: "Hardware", finish: "Living finish", styles: ["Warm Modern", "Classic"], swatch: "oklch(0.72 0.1 85)" },
  { id: "m9", name: "Matte Black Knob", category: "Hardware", finish: "Powder coat", styles: ["Modern Organic"], swatch: "oklch(0.25 0.01 250)" },
  { id: "m10", name: "Alabaster White", category: "Paint", finish: "Eggshell", styles: ["Warm Modern", "Coastal Transitional"], swatch: "oklch(0.95 0.015 90)" },
  { id: "m11", name: "Olive Grove", category: "Paint", finish: "Matte", styles: ["Modern Organic"], swatch: "oklch(0.45 0.04 120)" },
  { id: "m12", name: "Brushed Gold Faucet", category: "Fixtures", finish: "PVD brushed", styles: ["Warm Modern", "Classic"], swatch: "oklch(0.75 0.09 85)" },
  { id: "m13", name: "Freestanding Soaking Tub", category: "Fixtures", finish: "Gloss white", styles: ["Coastal Transitional", "Classic"], swatch: "oklch(0.97 0 0)" },
];

export const PROJECTS: Project[] = [
  { id: "p1", title: "The Davis Islands Kitchen", type: "Kitchen", location: "Tampa", style: "Warm Modern", image: kitchen, blurb: "Light oak, a marble waterfall island and brass that will age beautifully." },
  { id: "p2", title: "Bayshore Spa Bath", type: "Bathroom", location: "Tampa", style: "Coastal Transitional", image: bath, blurb: "Sea glass zellige and a freestanding tub framed by garden light." },
  { id: "p3", title: "Winter Park Great Room", type: "Living", location: "Orlando", style: "Coastal Transitional", image: living, blurb: "Built-ins in cerused oak and soft blues for everyday living." },
  { id: "p4", title: "Lake Nona Primary Suite", type: "Bathroom", location: "Orlando", style: "Modern Organic", image: ensuite, blurb: "Plaster walls, walnut vanity and an arched mirror." },
  { id: "p5", title: "Seminole Heights Bungalow", type: "Whole Home", location: "Tampa", style: "Modern Organic", image: detail, blurb: "Travertine, walnut and linen across a 1920s home." },
];

export const ARTICLES: Article[] = [
  { id: "a1", title: "How to plan a kitchen you'll love for twenty years", category: "Planning", readMins: 7, image: kitchen, excerpt: "Start with how you live, not with a Pinterest board.", tags: ["Kitchen", "Warm Modern"] },
  { id: "a2", title: "Quartz, marble or travertine? An honest comparison", category: "Materials", readMins: 5, image: detail, excerpt: "What each stone asks of you, and what it gives back.", tags: ["Countertops", "Modern Organic"] },
  { id: "a3", title: "Bringing coastal calm home without the clichés", category: "Style", readMins: 4, image: bath, excerpt: "Texture and light over anchors and shells.", tags: ["Bathroom", "Coastal Transitional"] },
  { id: "a4", title: "What really happens during a Revive renovation", category: "Process", readMins: 6, image: ensuite, excerpt: "From first walkthrough to final reveal, week by week.", tags: ["Process"] },
  { id: "a5", title: "Mixing metals with confidence", category: "Materials", readMins: 3, image: materials, excerpt: "Brass, black and nickel can live together.", tags: ["Hardware", "Warm Modern"] },
];

const baseTeam = [
  { name: "Alexis Moreno", role: "Lead Designer", initials: "AM" },
  { name: "Daniel Price", role: "Project Manager", initials: "DP" },
  { name: "Rosa Lin", role: "Client Care", initials: "RL" },
];

export const PERSONAS: CustomerProfile[] = [
  {
    id: "sarah", firstName: "Sarah", lastName: "Collins", city: "Tampa", lifecycleStage: "new_prospect",
    designQuiz: { completed: false }, materials: { savedIds: [] }, engagement: { interestedIn: ["Kitchen"], articlesRead: 0 },
  },
  {
    id: "michael", firstName: "Michael", lastName: "Ortiz", city: "Orlando", lifecycleStage: "quiz_complete",
    designQuiz: { completed: true, primaryStyle: "Coastal Transitional", secondaryStyle: "Warm Modern", palette: ["oklch(0.95 0.015 90)", "oklch(0.8 0.05 220)", "oklch(0.78 0.06 75)", "oklch(0.52 0.13 245)"], keywords: ["Airy", "Natural light", "Soft blues", "Textured"] },
    materials: { savedIds: [] }, engagement: { interestedIn: ["Bathroom", "Living"], articlesRead: 1 },
  },
  {
    id: "jennifer", firstName: "Jennifer", lastName: "Hale", city: "Tampa", lifecycleStage: "engaged",
    designQuiz: { completed: true, primaryStyle: "Warm Modern", secondaryStyle: "Modern Organic", palette: ["oklch(0.95 0.015 90)", "oklch(0.78 0.06 75)", "oklch(0.72 0.1 85)", "oklch(0.25 0.01 250)"], keywords: ["Light oak", "Brass", "Marble", "Calm"] },
    materials: { savedIds: ["m1", "m2", "m5", "m8", "m6"] }, engagement: { interestedIn: ["Kitchen"], articlesRead: 4 },
  },
  {
    id: "david", firstName: "David", lastName: "Kim", city: "Orlando", lifecycleStage: "booked",
    designQuiz: { completed: true, primaryStyle: "Modern Organic", secondaryStyle: "Warm Modern", palette: ["oklch(0.88 0.02 85)", "oklch(0.82 0.03 75)", "oklch(0.45 0.04 120)", "oklch(0.25 0.01 250)"], keywords: ["Plaster", "Walnut", "Earthy", "Quiet"] },
    materials: { savedIds: ["m3", "m7", "m9", "m11"] }, engagement: { interestedIn: ["Bathroom"], articlesRead: 3 },
    consultation: { date: "Oct 14, 2026 · 10:00 AM", designer: "Alexis Moreno", status: "proposal_pending" },
  },
  {
    id: "emma", firstName: "Emma", lastName: "Reyes", city: "Tampa", lifecycleStage: "active",
    designQuiz: { completed: true, primaryStyle: "Warm Modern", secondaryStyle: "Coastal Transitional", palette: ["oklch(0.95 0.015 90)", "oklch(0.78 0.06 75)", "oklch(0.72 0.1 85)", "oklch(0.8 0.05 220)"], keywords: ["Light oak", "Brass", "Bright"] },
    materials: { savedIds: ["m1", "m2", "m4", "m8", "m12", "m6"] }, engagement: { interestedIn: ["Kitchen"], articlesRead: 6 },
    project: {
      name: "Reyes Kitchen Renovation", phase: "Cabinetry installation", progress: 58, startDate: "Aug 24, 2026", estCompletion: "Nov 20, 2026",
      milestones: [
        { label: "Design approved", date: "Aug 10", done: true },
        { label: "Demolition", date: "Aug 24", done: true },
        { label: "Rough-in plumbing & electrical", date: "Sep 8", done: true },
        { label: "Cabinetry installation", date: "Oct 5", done: false },
        { label: "Countertops & backsplash", date: "Oct 26", done: false },
        { label: "Final walkthrough", date: "Nov 20", done: false },
      ],
      team: baseTeam,
      documents: [
        { name: "Signed design agreement", date: "Aug 2", kind: "PDF" },
        { name: "Final kitchen drawings", date: "Aug 10", kind: "PDF" },
        { name: "Material selections", date: "Aug 12", kind: "PDF" },
        { name: "Building permit", date: "Aug 20", kind: "PDF" },
      ],
      payments: [
        { label: "Design deposit", status: "Paid", due: "Aug 2" },
        { label: "Construction start", status: "Paid", due: "Aug 24" },
        { label: "Cabinetry delivery", status: "Upcoming", due: "Oct 12" },
        { label: "Substantial completion", status: "Upcoming", due: "Nov 20" },
      ],
      messages: [
        { from: "Daniel Price", at: "Today, 9:12 AM", body: "Upper cabinets are going in today. Photos by end of day!" },
        { from: "Alexis Moreno", at: "Yesterday", body: "Your brass pulls arrived and look beautiful against the oak." },
      ],
    },
  },
];
