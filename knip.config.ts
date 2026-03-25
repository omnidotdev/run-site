import type { KnipConfig } from "knip";

const knipConfig: KnipConfig = {
  entry: ["src/routes/**/*.{ts,tsx}", "src/router.tsx"],
  project: ["src/**/*.{ts,tsx,css}"],
  ignoreExportsUsedInFile: true,
  ignore: [
    "**/*.gen.*",
    "**/generated/**",
    "src/test/**",
    "src/__tests__/**",
    "**/*.test.{ts,tsx}",
  ],
};

export default knipConfig;
