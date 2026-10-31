import { ArrowUpRightIcon, CheckIcon, ClipboardIcon } from "lucide-react";
import { useState } from "react";

import { ExternalLink } from "@/components/core";
import TerminalDemo from "@/components/landing/TerminalDemo";
import app from "@/lib/config/app.config";

const installCommand = "curl -fsSL https://run.omni.dev/install.sh | sh";

interface Property {
  key: string;
  label: string;
  // leading emphasized fragment, rendered in the accent color
  emphasis?: string;
  value: string;
}

// run's real, scannable properties
const properties: Property[] = [
  { key: "tls", label: "TLS", emphasis: "mkcert", value: "local" },
  { key: "proxy", label: "Reverse proxy", value: "Caddy" },
  {
    key: "health",
    label: "Health checks",
    emphasis: "4",
    value: "db auth api app",
  },
  { key: "output", label: "Output", value: "https://localhost" },
];

interface MiniElement {
  number: string;
  symbol: string;
  name: string;
  // the product's real logo, served from public/
  logo: string;
  description: string;
  domain: string;
  href: string;
}

// products run can bring up today, as neighboring elements
const miniElements: MiniElement[] = [
  {
    number: "16",
    symbol: "Ru",
    name: "Runa",
    logo: "/runa-mark.svg",
    description: "Project management",
    domain: "runa.omni.dev",
    href: "https://runa.omni.dev",
  },
  {
    number: "42",
    symbol: "Bf",
    name: "Backfeed",
    logo: "/backfeed-mark.svg",
    description: "Customer feedback",
    domain: "backfeed.omni.dev",
    href: "https://backfeed.omni.dev",
  },
];

const ElementHero = () => {
  const [copied, setCopied] = useState(false);

  const copyCommand = () => {
    navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="px-4 py-16 sm:py-20">
      <div className="mx-auto flex max-w-5xl flex-col">
        <h1 className="max-w-3xl font-bold text-4xl leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
          Self-hosting made <span className="text-primary">simple</span>
        </h1>

        <p className="mt-4 max-w-xl text-lg text-muted-foreground leading-relaxed">
          run is a single command-line tool for self-hosting the apps you want
          on your own machine, including Omni's own. One command brings up a
          working app at your own address, with TLS, a reverse proxy, secrets,
          and health checks handled for you.
        </p>

        <div className="mt-8 grid grid-cols-1 items-stretch gap-6 md:grid-cols-[260px_1fr]">
          {/* big element tile for run */}
          <div className="relative flex flex-col overflow-hidden rounded-2xl border bg-card p-5 shadow-sm">
            <span className="absolute inset-x-0 top-0 h-1.5 bg-primary" />

            <div className="flex items-start justify-between text-muted-foreground text-sm">
              <span className="flex items-center gap-1.5 font-bold text-foreground text-lg">
                <img src="/favicon.svg" alt="" className="size-5" />1
              </span>
              <span className="text-right font-mono text-[11px] leading-snug">
                run.sh
                <br />
                group: cli
              </span>
            </div>

            <div className="mt-3 text-center font-bold text-7xl text-foreground leading-none tracking-tighter sm:text-8xl">
              Rn
            </div>
            <div className="mt-1 text-center font-bold text-foreground text-xl">
              run
            </div>
            <div className="mt-0.5 text-center font-bold text-[11px] text-primary uppercase tracking-[0.14em]">
              self-hosting
            </div>

            <div className="mt-4 flex flex-col gap-1.5 border-t border-dashed pt-3 font-mono text-[11px] text-muted-foreground">
              <span>
                phase{" "}
                <span className="font-semibold text-foreground">stable</span>
              </span>
              <span>
                bonds{" "}
                <span className="font-semibold text-foreground">
                  runa, backfeed
                </span>
              </span>
              <span>
                yields{" "}
                <span className="font-semibold text-foreground">
                  https://localhost
                </span>
              </span>
            </div>
          </div>

          {/* spec panel */}
          <div className="rounded-2xl border bg-card p-6 shadow-sm">
            <h2 className="font-bold text-muted-foreground text-xs uppercase tracking-[0.12em]">
              Properties
            </h2>

            <dl className="mt-3 grid grid-cols-1 sm:grid-cols-2">
              {properties.map((property, index) => (
                <div
                  key={property.key}
                  className={
                    // borders divide rows, but the first row(s) of each column have none
                    index === 0 || index === 1
                      ? "border-t py-3 first:border-t-0 sm:border-t-0"
                      : "border-t py-3"
                  }
                >
                  <dt className="text-muted-foreground text-xs uppercase tracking-[0.06em]">
                    {property.label}
                  </dt>
                  <dd className="mt-1 font-bold text-lg">
                    {property.emphasis ? (
                      <>
                        <span className="text-primary">
                          {property.emphasis}
                        </span>{" "}
                        {property.value}
                      </>
                    ) : (
                      property.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>

            {/* install command, styled as a formula */}
            <div className="mt-2 border-t pt-4">
              <p className="mb-2 text-muted-foreground text-xs uppercase tracking-[0.06em]">
                Install formula
              </p>

              <div className="flex flex-wrap items-center gap-2.5 rounded-xl bg-base-950 py-2.5 pr-2.5 pl-3.5">
                <code className="min-w-0 flex-1 overflow-x-auto whitespace-nowrap font-mono text-base-200 text-xs leading-relaxed sm:text-sm">
                  <span className="text-base-500">$</span> curl -fsSL
                  https://run.omni.dev/install.sh |{" "}
                  <span className="text-primary-400">sh</span>
                </code>

                <button
                  type="button"
                  onClick={copyCommand}
                  aria-label="Copy install command"
                  className="flex shrink-0 items-center gap-1.5 rounded-lg bg-primary px-3 py-2 font-semibold text-primary-foreground text-xs transition-colors hover:bg-primary-600"
                >
                  {copied ? (
                    <>
                      <CheckIcon className="size-3.5" />
                      Copied
                    </>
                  ) : (
                    <>
                      <ClipboardIcon className="size-3.5" />
                      Copy
                    </>
                  )}
                </button>
              </div>

              <p className="mt-3 text-muted-foreground text-xs leading-relaxed">
                Also on{" "}
                <a
                  href="https://github.com/omnidotdev/homebrew-tap"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-foreground underline underline-offset-2"
                >
                  Homebrew
                </a>{" "}
                and the{" "}
                <a
                  href="https://aur.archlinux.org/packages/omnidotdev-run-cli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-foreground underline underline-offset-2"
                >
                  AUR
                </a>{" "}
                (
                <code className="font-mono text-[11px]">
                  paru -S omnidotdev-run-cli
                </code>
                ).{" "}
                <a
                  href="https://docs.omni.dev/products/run#installation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-primary-600 underline underline-offset-2 dark:text-primary-400"
                >
                  All install options
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* terminal proof: run up runa streaming to https://localhost */}
        <div className="mt-6">
          <TerminalDemo />
        </div>

        {/* neighboring product elements */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {miniElements.map((element) => (
            <a
              key={element.symbol}
              href={element.href}
              target="blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 rounded-xl border bg-card p-4 shadow-sm transition-transform hover:-translate-y-0.5"
            >
              <div className="relative flex size-14 shrink-0 flex-col items-center justify-center rounded-xl border bg-primary-50 dark:bg-primary-950">
                <span className="absolute top-1 left-1.5 font-bold text-[10px] text-primary-700 dark:text-primary-300">
                  {element.number}
                </span>
                <span className="font-bold text-2xl text-primary-700 leading-none tracking-tight dark:text-primary-300">
                  {element.symbol}
                </span>
              </div>

              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-1.5 font-semibold">
                  {element.name}
                  <img src={element.logo} alt="" className="size-4" />
                  <ArrowUpRightIcon className="size-3.5 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <span className="text-muted-foreground text-sm">
                  {element.description}
                </span>
                <span className="font-mono text-primary-700 text-xs dark:text-primary-400">
                  {element.domain}
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <ExternalLink variant="solid" size="lg" href={app.url}>
            Get started
          </ExternalLink>

          <ExternalLink variant="outline" size="lg" href={app.docsUrl}>
            View docs
          </ExternalLink>
        </div>
      </div>
    </section>
  );
};

export default ElementHero;
