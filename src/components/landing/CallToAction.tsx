import { ExternalLink } from "@/components/core";
import app from "@/lib/config/app.config";

const CallToAction = () => (
  <section className="bg-primary px-4 py-20 text-primary-foreground">
    <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
      <h2 className="font-bold text-3xl tracking-tight">Ready to self-host?</h2>

      <p className="text-primary-foreground/80">
        Install run and bring up your first app in under a minute
      </p>

      <div className="max-w-full overflow-x-auto rounded-lg bg-base-950 px-4 py-3 font-mono text-sm">
        <code className="whitespace-nowrap text-base-200">
          <span className="text-base-500">$</span> curl -fsSL
          https://run.omni.dev/install.sh |{" "}
          <span className="text-primary-400">sh</span>
        </code>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <ExternalLink
          variant="outline"
          size="lg"
          href={app.docsUrl}
          className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
        >
          View Docs
        </ExternalLink>

        <ExternalLink
          variant="outline"
          size="lg"
          href={app.links.github}
          className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
        >
          GitHub
        </ExternalLink>
      </div>
    </div>
  </section>
);

export default CallToAction;
