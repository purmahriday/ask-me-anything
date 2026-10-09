import { describe, expect, it } from "vitest";
import { validConsultationStep, type ConsultationRequest } from "@/services/consultation";
import { getCustomerPortalProfile, getStyleImagery, hasConsultation, requestConsultation } from "@/services/portal";

const request: ConsultationRequest = { rooms: ["Kitchen"], timeline: "Still exploring", budgetRange: "$75k – $150k", streetAddress: "123 Demo Street", zipCode: "33602", firstName: "Test", lastName: "Customer", email: "test@example.com", phone: "8135550123", contactPreference: "Email", consent: true };
describe("Consultation", () => {
  it("validates each questionnaire step", () => {
    for (let i = 0; i < 5; i++) expect(validConsultationStep(request, i)).toBe(true);
    expect(validConsultationStep({ ...request, rooms: [] }, 0)).toBe(false);
    expect(validConsultationStep({ ...request, zipCode: "123" }, 3)).toBe(false);
    expect(validConsultationStep({ ...request, consent: false }, 4)).toBe(false);
    expect(validConsultationStep({ ...request, email: "bad" }, 4)).toBe(false);
  });
  it("blocks existing bookings and active customers", () => {
    expect(requestConsultation(getCustomerPortalProfile("david"), request)).toBe(false);
    expect(requestConsultation(getCustomerPortalProfile("emma"), request)).toBe(false);
  });
  it("accepts only one demo request per persona", () => {
    const p = { ...getCustomerPortalProfile("sarah"), id: "consultation-test" };
    expect(hasConsultation(p)).toBe(false);
    expect(requestConsultation(p, request)).toBe(true);
    expect(hasConsultation(p)).toBe(true);
    expect(requestConsultation(p, request)).toBe(false);
  });
  it("selects distinct completed-style photos", () => {
    const warm = getStyleImagery(getCustomerPortalProfile("jennifer"));
    const coastal = getStyleImagery(getCustomerPortalProfile("michael"));
    const organic = getStyleImagery(getCustomerPortalProfile("david"));
    expect(new Set([warm.src, coastal.src, organic.src]).size).toBe(3);
  });
});