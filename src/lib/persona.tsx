import { useContext, useEffect, useState, type ReactNode } from "react";
import { getCustomerPortalProfile, hasConsultation, requestConsultation, getConsultationRequest } from "@/services/portal";
import type { CustomerProfile } from "@/services/mockData";
import { PersonaContext } from "@/lib/persona-context";

export function PersonaProvider({ children }: { children: ReactNode }) {
  const [id, setId] = useState("jennifer");
  const [saved, setSaved] = useState<Record<string, string[]>>({});
  const [, refreshRequests] = useState(0);

  useEffect(() => {
    const s = localStorage.getItem("revive-persona");
    if (s) setId(s);
  }, []);

  const base = getCustomerPortalProfile(id);
  const profile: CustomerProfile = { ...base, materials: { savedIds: saved[id] ?? base.materials.savedIds } };

  return (
    <PersonaContext.Provider
      value={{
        profile,
        consultationBooked: hasConsultation(profile),
        consultationRequest: getConsultationRequest(profile.id),
        bookConsultation: (request) => {
          const accepted = requestConsultation(profile, request);
          refreshRequests((revision) => revision + 1);
          return accepted;
        },
        setPersona: (n) => { setId(n); localStorage.setItem("revive-persona", n); },
        toggleSaved: (m) => {
          const cur = profile.materials.savedIds;
          setSaved((s) => ({ ...s, [id]: cur.includes(m) ? cur.filter((x) => x !== m) : [...cur, m] }));
        },
      }}
    >
      {children}
    </PersonaContext.Provider>
  );
}

export function usePersona() {
  const c = useContext(PersonaContext);
  if (!c) throw new Error("usePersona outside provider");
  return c;
}
