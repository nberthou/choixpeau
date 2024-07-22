import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { pigment } from "@pigment-css/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps: {
    include: ["prop-types", "react-is"]
  },
  plugins: [
    react(),
    pigment({
      theme: {},
      css: {
        defaultDirection: "ltr",
        generateForBothDir: true
      }
    })
  ]
});
