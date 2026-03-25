import type { KnipConfig } from "knip";

const knipConfig: KnipConfig = {
  entry: ["src/routes/**/*.{ts,tsx}", "src/router.tsx"],
  project: ["src/**/*.{ts,tsx,css}"],
  ignoreExportsUsedInFile: true,
  ignore: ["**/*.gen.*"],
  // UI components export a public API for downstream use
  ignoreDependencies: [],
  tags: ["-knipignore"],
};

export default knipConfig;
