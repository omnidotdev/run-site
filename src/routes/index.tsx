import { createFileRoute } from "@tanstack/react-router";

import {
  CallToAction,
  ElementHero,
  PeriodicCatalog,
  WhyRun,
} from "@/components/landing";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <div className="flex flex-col">
      <ElementHero />
      <WhyRun />
      <PeriodicCatalog />
      <CallToAction />
    </div>
  );
}
