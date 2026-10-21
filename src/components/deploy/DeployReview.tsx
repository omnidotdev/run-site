import {
  ArrowUpRight,
  Boxes,
  CircleAlert,
  KeyRound,
  Package,
  ShieldCheck,
  SlidersHorizontal,
  Terminal,
} from "lucide-react";

import { ExternalLink } from "@/components/core";
import app from "@/lib/config/app.config";

import type { DeploySource } from "@/server/functions/deploy";

const fractalUrl = app.fractal.url;

/** Monospace inline command. */
const Code = ({ children }: { children: string }) => (
  <code className="rounded bg-base-900 px-1.5 py-0.5 font-mono text-base-200 text-sm">
    {children}
  </code>
);

const ServiceCard = ({
  name,
  image,
  ports,
}: {
  name: string;
  image: string;
  ports?: string[];
}) => (
  <div className="flex flex-col gap-1 rounded-lg border border-base-200 bg-card p-4 dark:border-base-800">
    <div className="flex items-center gap-2">
      <Package className="size-4 text-muted-foreground" aria-hidden />
      <span className="font-medium text-sm">{name}</span>
    </div>
    <span className="break-all font-mono text-muted-foreground text-xs">
      {image}
    </span>
    {ports && ports.length > 0 && (
      <span className="text-muted-foreground text-xs">
        ports: <span className="font-mono">{ports.join(", ")}</span>
      </span>
    )}
  </div>
);

const Facet = ({
  icon,
  children,
}: {
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <div className="flex items-center gap-2 text-muted-foreground text-sm">
    {icon}
    <span>{children}</span>
  </div>
);

const Step = ({ n, children }: { n: number; children: React.ReactNode }) => (
  <li className="flex gap-3">
    <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground text-xs">
      {n}
    </span>
    <span className="text-sm leading-6">{children}</span>
  </li>
);

const Shell = ({ children }: { children: React.ReactNode }) => (
  <main className="mx-auto flex w-full max-w-3xl flex-col gap-10 px-4 py-16">
    {children}
  </main>
);

/** Empty state: no repo given, so explain how the button works. */
const EmptyState = () => {
  const snippet = `[![Deploy to Fractal](${app.url}/button.svg)](${app.url}/deploy?repo=https://github.com/you/your-repo)`;

  return (
    <Shell>
      <header className="flex flex-col gap-3">
        <h1 className="font-bold text-3xl tracking-tight">Deploy to Fractal</h1>
        <p className="text-muted-foreground">
          Add a one-click deploy button to any repository that ships a{" "}
          <Code>run.yaml</Code>. Visitors land here, review the stack, and send
          it to Fractal cloud.
        </p>
      </header>

      <section className="flex flex-col gap-3">
        <h2 className="font-semibold text-lg">Add the button</h2>
        <p className="text-muted-foreground text-sm">
          Drop this into your README:
        </p>
        <div className="max-w-full overflow-x-auto rounded-lg bg-base-950 px-4 py-3">
          <code className="whitespace-pre font-mono text-base-200 text-xs">
            {snippet}
          </code>
        </div>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="font-semibold text-lg">How it works</h2>
        <ol className="flex flex-col gap-3">
          <Step n={1}>
            A visitor clicks the button and arrives at{" "}
            <Code>{`${app.url}/deploy?repo=...`}</Code>.
          </Step>
          <Step n={2}>
            This page reads the repo's recipe and shows exactly what will run.
          </Step>
          <Step n={3}>
            They continue to Fractal to provision it, or copy the same recipe to
            self-host with run.
          </Step>
        </ol>
      </section>

      <div className="flex flex-wrap gap-3">
        <ExternalLink variant="outline" size="lg" href={app.docsUrl}>
          Read the docs
        </ExternalLink>
      </div>
    </Shell>
  );
};

/** Error/unsupported states. */
const ProblemState = ({
  title,
  detail,
}: {
  title: string;
  detail: React.ReactNode;
}) => (
  <Shell>
    <header className="flex flex-col gap-3">
      <div className="flex items-center gap-2 text-amber-600 dark:text-amber-500">
        <CircleAlert className="size-5" aria-hidden />
        <h1 className="font-bold text-2xl tracking-tight">{title}</h1>
      </div>
      <p className="text-muted-foreground">{detail}</p>
    </header>

    <div className="flex flex-wrap gap-3">
      <ExternalLink variant="outline" size="lg" href={app.docsUrl}>
        Read the docs
      </ExternalLink>
    </div>
  </Shell>
);

const DeployReview = ({ source }: { source: DeploySource }) => {
  if (source.status === "unsupported-host") {
    return (
      <ProblemState
        title="Only GitHub repositories are supported"
        detail={
          <>
            Pass a public GitHub URL, for example{" "}
            <Code>?repo=https://github.com/you/your-repo</Code>.
          </>
        }
      />
    );
  }

  if (source.status === "not-found") {
    return (
      <ProblemState
        title="No recipe found"
        detail={
          <>
            <ExternalLink
              className="h-auto p-0 underline"
              href={source.repo.url}
            >
              {source.repo.owner}/{source.repo.name}
            </ExternalLink>{" "}
            has no <Code>run.yaml</Code>, <Code>run.yml</Code>, or{" "}
            <Code>run.toml</Code> at its root. Commit one to enable one-click
            deploy.
          </>
        }
      />
    );
  }

  if (source.status === "parse-error") {
    return (
      <ProblemState title="Could not read the recipe" detail={source.message} />
    );
  }

  if (source.status === "fetch-error") {
    return (
      <ProblemState
        title="Could not reach the repository"
        detail="GitHub did not respond. Try again in a moment."
      />
    );
  }

  const { repo, recipe, fractalManifest } = source;
  const title = recipe.displayName ?? recipe.name;

  return (
    <Shell>
      <header className="flex flex-col gap-3">
        <h1 className="font-bold text-3xl tracking-tight">Deploy {title}</h1>
        {recipe.description && (
          <p className="text-muted-foreground">{recipe.description}</p>
        )}
        <ExternalLink
          className="h-auto w-fit p-0 text-sm underline"
          href={repo.url}
        >
          {repo.owner}/{repo.name}
        </ExternalLink>
      </header>

      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Boxes className="size-5 text-primary" aria-hidden />
          <h2 className="font-semibold text-lg">
            {recipe.services.length}{" "}
            {recipe.services.length === 1 ? "service" : "services"}
          </h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {recipe.services.map((svc) => (
            <ServiceCard
              key={svc.name}
              name={svc.name}
              image={svc.image}
              ports={svc.ports}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2">
          {recipe.hasProxy && (
            <Facet icon={<ShieldCheck className="size-4" aria-hidden />}>
              Automatic HTTPS and reverse proxy
            </Facet>
          )}
          {recipe.hasSecrets && (
            <Facet icon={<KeyRound className="size-4" aria-hidden />}>
              Secrets generated on first run
            </Facet>
          )}
        </div>
      </section>

      {recipe.inputs.length > 0 && (
        <section className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="size-5 text-primary" aria-hidden />
            <h2 className="font-semibold text-lg">You will be asked for</h2>
          </div>
          <ul className="flex flex-col gap-2">
            {recipe.inputs.map((input) => (
              <li key={input.key} className="text-muted-foreground text-sm">
                <span className="font-medium text-foreground">
                  {input.label ?? input.key}
                </span>
                {input.required && (
                  <span className="ml-2 text-amber-600 text-xs dark:text-amber-500">
                    required
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="flex flex-col gap-5 rounded-xl border border-base-200 bg-card p-6 dark:border-base-800">
        <h2 className="font-semibold text-lg">Send it to Fractal</h2>
        <ol className="flex flex-col gap-3">
          <Step n={1}>
            Sign in to Fractal and choose (or create) a workspace.
          </Step>
          <Step n={2}>Create a project, then open its Import panel.</Step>
          <Step n={3}>
            {fractalManifest ? (
              <>
                Load from this repository. Fractal reads its committed{" "}
                <Code>{fractalManifest}</Code> automatically.
              </>
            ) : (
              <>
                Paste the stack's <Code>fractal.yaml</Code>. Generate it with{" "}
                <Code>{`run deploy ${recipe.name}`}</Code> and commit it to
                enable repository import.
              </>
            )}
          </Step>
        </ol>
        <div className="flex flex-wrap gap-3">
          <ExternalLink variant="solid" size="lg" href={fractalUrl}>
            Continue to Fractal
            <ArrowUpRight className="size-4" aria-hidden />
          </ExternalLink>
        </div>
      </section>

      <section className="flex flex-col gap-3">
        <div className="flex items-center gap-2">
          <Terminal className="size-5 text-muted-foreground" aria-hidden />
          <h2 className="font-semibold text-lg">Or self-host it locally</h2>
        </div>
        <div className="max-w-full overflow-x-auto rounded-lg bg-base-950 px-4 py-3">
          <code className="block whitespace-nowrap font-mono text-base-200 text-sm">
            <span className="text-base-500">$</span> git clone {repo.url}
          </code>
          <code className="block whitespace-nowrap font-mono text-base-200 text-sm">
            <span className="text-base-500">$</span> run up ./{repo.name}
          </code>
        </div>
      </section>
    </Shell>
  );
};

export { DeployReview, EmptyState };
