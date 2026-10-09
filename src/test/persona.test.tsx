import { act, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { PersonaProvider, usePersona } from "@/lib/persona";

function ProfileConsumer() {
  const { profile, setPersona } = usePersona();
  return <button onClick={() => setPersona("michael")}>{profile.firstName}</button>;
}

describe("Persona context", () => {
  it("keeps nested consumers connected across provider rerenders", () => {
    localStorage.clear();
    const { rerender } = render(<PersonaProvider><ProfileConsumer /></PersonaProvider>);
    expect(screen.getByRole("button", { name: "Jennifer" })).toBeDefined();
    act(() => screen.getByRole("button", { name: "Jennifer" }).click());
    rerender(<PersonaProvider><ProfileConsumer /></PersonaProvider>);
    expect(screen.getByRole("button", { name: "Michael" })).toBeDefined();
  });
});