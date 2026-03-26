import {
  HeartPulseIcon,
  KeyRoundIcon,
  NetworkIcon,
  RocketIcon,
  ShieldCheckIcon,
  Trash2Icon,
} from "lucide-react";

import { CardRoot } from "@/components/ui/card";

import type { ReactNode } from "react";

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <RocketIcon className="size-6 text-primary" />,
    title: "One-Command Deploys",
    description:
      "run up runa and your full stack is running. Databases, auth, API, frontend, all wired together.",
  },
  {
    icon: <ShieldCheckIcon className="size-6 text-primary" />,
    title: "Automatic SSL",
    description:
      "Trusted HTTPS certificates via mkcert. No manual cert management, no insecure connections.",
  },
  {
    icon: <NetworkIcon className="size-6 text-primary" />,
    title: "Reverse Proxy",
    description:
      "Built-in Caddy proxy routes traffic to the right service. Custom ports, automatic HTTPS redirection.",
  },
  {
    icon: <KeyRoundIcon className="size-6 text-primary" />,
    title: "Secret Management",
    description:
      "Cryptographic secrets generated on first run. Database passwords, auth tokens, OAuth credentials, all unique per deployment.",
  },
  {
    icon: <HeartPulseIcon className="size-6 text-primary" />,
    title: "Health Checks",
    description:
      "Monitors every service until healthy before proceeding. Know exactly when your stack is ready.",
  },
  {
    icon: <Trash2Icon className="size-6 text-primary" />,
    title: "Clean Teardown",
    description:
      "run down --fresh removes everything: volumes, secrets, certs. Start fresh whenever you need.",
  },
];

const Features = () => (
  <section className="bg-muted/30 px-4 py-20">
    <div className="mx-auto max-w-6xl">
      <div className="mb-12 text-center">
        <h2 className="font-bold text-3xl tracking-tight">
          Everything you need to self-host
        </h2>
        <p className="mt-2 text-muted-foreground">
          Production-ready infrastructure with zero configuration
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <CardRoot
            key={feature.title}
            className="transition-shadow hover:shadow-md"
          >
            <div className="flex flex-col gap-3 p-6">
              {feature.icon}
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </div>
          </CardRoot>
        ))}
      </div>
    </div>
  </section>
);

export default Features;
