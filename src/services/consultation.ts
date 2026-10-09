export interface ConsultationRequest {
  rooms: string[];
  timeline: string;
  budgetRange: string;
  streetAddress: string;
  zipCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  contactPreference: string;
  consent: boolean;
}

export const consultationRooms = ["Kitchen", "Primary bathroom", "Another bathroom", "Closet", "Fireplace or media wall", "Laundry, office, bar or pantry", "Floors throughout", "Something else"];
export const consultationTimelines = ["As soon as possible", "Within 3 months", "3 – 6 months", "6+ months", "Still exploring"];
export const consultationBudgets = ["$75k – $150k", "$150k – $250k", "$250k – $400k", "$400k – $750k", "$750k+"];

export function validConsultationStep(form: ConsultationRequest, step: number) {
  return [form.rooms.length > 0, Boolean(form.timeline), Boolean(form.budgetRange),
    Boolean(form.streetAddress.trim() && /^\d{5}$/.test(form.zipCode)),
    Boolean(form.firstName.trim() && form.lastName.trim() && /\S+@\S+\.\S+/.test(form.email) && form.phone.replace(/\D/g, "").length >= 10 && form.contactPreference && form.consent),
  ][step] ?? false;
}