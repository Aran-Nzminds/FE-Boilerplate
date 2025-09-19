/// <reference types="vitest" />
/// <reference types="vite/client" />

import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";
import Inspect from "vite-plugin-inspect";
// import { defineConfig } from 'vite';
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    Inspect({
      build: true,
      outputDir: ".vite-inspect",
    }),
    {
      ...visualizer({
        filename: "./dist/bundle-stats.html",
        template: "treemap",
        gzipSize: true,
        brotliSize: true,
        open: true,
      }),
      apply: "build",
    },
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@app": "/src/app",
      "@assets": "/src/assets",
      "@components": "/src/components",
      "@features": "/src/features",
      "@pages": "/src/pages",
      "@lib": "/src/lib",
      "@styles": "/src/styles",
      "@types": "/src/types",
      "@utils": "/src/utils",
      "@hooks": "/src/hooks",
      "@routes": "/src/routes",
      "@layout": "/src/layout",
      "@interface": "/src/interface",
      "@constants": path.resolve(__dirname, "./src/constants"),

    },
  },
  build: {
    sourcemap: true, // Enable source maps for better debugging
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTests.ts",
    coverage: {
      reporter: ["text", "json", "html"], // coverage reports
    },
  },
});
