import { describe, expect, it } from "vitest";
import { buildGuide, findProfile } from "./coach.js";

describe("le coach local", () => {
  it("oriente une demande de site vers le parcours web", () => {
    expect(findProfile("Je voudrais créer un portfolio").id).toBe("site");
  });

  it("oriente une demande d’erreur vers la méthode de débogage", () => {
    const guide = buildGuide("Mon code ne fonctionne pas, il y a une erreur");
    expect(guide.id).toBe("bug");
    expect(guide.steps).toHaveLength(4);
  });

  it("conserve la demande de l’utilisateur dans le prompt à copier", () => {
    const guide = buildGuide("Automatiser mon fichier Excel");
    expect(guide.id).toBe("python");
    expect(guide.prompt).toContain("Automatiser mon fichier Excel");
  });

  it("propose un plan neutre pour une idée encore inconnue", () => {
    expect(buildGuide("Une idée originale").id).toBe("starter");
  });
});
