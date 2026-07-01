import { ExternalLink } from "@/components/core";
import app from "@/lib/config/app.config";

const Footer = () => (
  <footer className="flex w-full items-center justify-center gap-1 p-4 text-muted-foreground">
    <p className="px-3">
      &copy; {new Date().getFullYear()} {app.organization.name}
    </p>

    <div className="h-1/2 w-px bg-muted-foreground/30" />

    <ExternalLink variant="ghost" href={app.docsUrl}>
      Docs
    </ExternalLink>

    <div className="h-1/2 w-px bg-muted-foreground/30" />

    <div className="flex items-center gap-1">
      <ExternalLink variant="ghost" href={app.socials.discord}>
        Discord
      </ExternalLink>

      <ExternalLink variant="ghost" href={app.socials.x}>
        X
      </ExternalLink>

      <ExternalLink variant="ghost" href={app.socials.threads}>
        Threads
      </ExternalLink>
    </div>

    <div className="h-1/2 w-px bg-muted-foreground/30" />

    <div className="flex items-center gap-1">
      <ExternalLink variant="ghost" href={app.legal.privacy}>
        Privacy
      </ExternalLink>

      <ExternalLink variant="ghost" href={app.legal.terms}>
        Terms
      </ExternalLink>
    </div>
  </footer>
);

export default Footer;
