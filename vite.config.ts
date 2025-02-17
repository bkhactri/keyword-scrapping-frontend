import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "path";
import fixReactVirtualized from "esbuild-plugin-react-virtualized";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  esbuild: {
    target: "es2015",
  },
  resolve: {
    alias: {
      "@enums/*": path.resolve(__dirname, "./src/enums/*"),
      "@pages/*": path.resolve(__dirname, "./src/pages/*"),
      "@routes/*": path.resolve(__dirname, "./src/routes/*"),
      "@constants/*": path.resolve(__dirname, "./src/constants/*"),
      "@components/*": path.resolve(__dirname, "./src/components/*"),
      "@contexts/*": path.resolve(__dirname, "./src/contexts/*"),
      "@interfaces/*": path.resolve(__dirname, "./src/interfaces/*"),
      "@config/*": path.resolve(__dirname, "./src/config/*"),
      "@store/*": path.resolve(__dirname, "./src/store/*"),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [fixReactVirtualized],
    },
  },
});
