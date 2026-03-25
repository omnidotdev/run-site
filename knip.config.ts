import type { KnipConfig } from "knip";

const config: KnipConfig = {
  entry: ["src/routes/**/*.{ts,tsx}", "src/router.tsx"],
  ignore: ["src/routeTree.gen.ts"],
};

export default config;
