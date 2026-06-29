import { Button } from "@omnidotdev/thornberry/button";
import { CheckIcon, ClipboardIcon } from "lucide-react";
import { useState } from "react";

import { ExternalLink } from "@/components/core";
import app from "@/lib/config/app.config";

const installCommand = "curl -fsSL https://run.omni.dev/install.sh | sh";

const Hero = () => {
  const [copied, setCopied] = useState(false);

  const copyCommand = () => {
    navigator.clipboard.writeText(installCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="flex flex-col items-center justify-center gap-8 px-4 py-24 text-center sm:py-32">
      <div className="flex max-w-3xl flex-col gap-4">
        <h1 className="bg-linear-to-r from-primary-400 to-primary-600 bg-clip-text font-bold text-5xl text-transparent tracking-tight sm:text-6xl">
          Self-hosting made simple
        </h1>

        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Deploy Omni products with a single command. Automatic SSL, reverse
          proxy, secrets, and health checks, all handled for you.
        </p>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 rounded-lg border bg-muted/50 px-4 py-3 font-mono text-sm">
          <code>{installCommand}</code>

          <Button
            variant="ghost"
            size="icon"
            onClick={copyCommand}
            className="ml-2 size-8"
          >
            {copied ? (
              <CheckIcon className="size-4 text-primary" />
            ) : (
              <ClipboardIcon className="size-4" />
            )}
          </Button>
        </div>

        <ExternalLink variant="outline" size="lg" href={app.docsUrl}>
          View Docs
        </ExternalLink>
      </div>
    </section>
  );
};

export default Hero;
