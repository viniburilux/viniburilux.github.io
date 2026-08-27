import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./",
  plugins: [react()],
  root: "source",
  build: {
    outDir: "../lyrio-build",
    emptyOutDir: true,
  },
});
