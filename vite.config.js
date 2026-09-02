import { defineConfig } from "vite";

export default defineConfig({
  // La variable est injectée par le workflow GitHub Pages. Sur le serveur local,
  // l'application reste accessible à la racine.
  base: process.env.VITE_BASE_PATH || "/",
});
