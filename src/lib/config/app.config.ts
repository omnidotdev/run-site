const app = {
  name: "Run",
  // Mirrors the omni-api product catalog SSOT
  icon: "🏃",
  description:
    "Self-hosting made simple. A CLI to self-host any app on your own machine, Omni's included, with one command: automatic SSL, reverse proxy, secrets, and health checks.",
  url: "https://run.omni.dev",
  docsUrl: "https://docs.omni.dev/products/run",
  socials: {
    discord: "https://discord.gg/omnidotdev",
    x: "https://x.com/omnidotdev",
    threads: "https://www.threads.com/@omnidotdev",
  },
  // Legal links mirror the omni-api catalog SSOT
  legal: {
    privacy: "https://omni.dev/legal/privacy",
    terms: "https://omni.dev/legal/terms",
    cookies: "https://omni.dev/legal/cookies",
  },
  organization: {
    name: "Omni",
    url: "https://omni.dev",
    supportEmailAddress: "support@omni.dev",
  },
  links: {
    github: "https://github.com/omnidotdev/run-cli",
    install: "https://run.omni.dev/install.sh",
  },
  // Fractal is Omni's cloud deploy target; the "Deploy to Fractal" button lands
  // on /deploy and hands a reviewed stack off to the Fractal dashboard
  fractal: {
    url: "https://fractal.omni.dev",
  },
  pwa: {
    themeColor: "#000000",
    backgroundColor: "#000000",
  },
};

export default app;
