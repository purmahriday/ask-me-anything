import { createContext } from "react";
import type { ConsultationRequest } from "@/services/consultation";
import type { CustomerProfile } from "@/services/mockData";

export interface PersonaContextValue {
  profile: CustomerProfile;
  setPersona: (id: string) => void;
  toggleSaved: (materialId: string) => void;
  consultationBooked: boolean;
  consultationRequest: ConsultationRequest | undefined;
  bookConsultation: (request: ConsultationRequest) => boolean;
}

// Keep context identity outside the Fast Refresh component module. Otherwise a
// refreshed consumer can read a new context while the mounted provider holds the old one.
export const PersonaContext = createContext<PersonaContextValue | null>(null);