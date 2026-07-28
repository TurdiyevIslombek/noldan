import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Routes are code-split, so a chunk approaching this size means
    // something leaked into the shared bundle.
    chunkSizeWarningLimit: 500,
  },
});
