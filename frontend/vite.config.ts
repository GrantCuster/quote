import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import jotaiDebugLabel from "jotai/babel/plugin-debug-label";
import jotaiReactRefresh from "jotai/babel/plugin-react-refresh";
import { backendPort, frontendPort } from "../app-config";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({ babel: { plugins: [jotaiDebugLabel, jotaiReactRefresh] } }),
  ],
  server: {
    port: frontendPort,
    proxy: {
      "/api": {
        target: "http://localhost:" + backendPort,
        changeOrigin: true,
      },
    },
  },
});
