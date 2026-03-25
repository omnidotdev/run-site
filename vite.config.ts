import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { nitroV2Plugin } from "@tanstack/nitro-v2-vite-plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import mkcert from "vite-plugin-mkcert";
import tsConfigPaths from "vite-tsconfig-paths";

const viteConfig = defineConfig(({ command }) => ({
  server: {
    port: 3001,
    host: "0.0.0.0",
  },
  plugins: [
    devtools(),
    command === "serve" && mkcert(),
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart(),
    nitroV2Plugin({ preset: "node-server" }),
    react(),
  ],
}));

export default viteConfig;
