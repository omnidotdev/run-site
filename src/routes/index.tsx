import { createFileRoute } from "@tanstack/react-router";

import { CallToAction, Features, Hero, HowItWorks } from "@/components/landing";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Features />
      <HowItWorks />
      <CallToAction />
    </div>
  );
}
