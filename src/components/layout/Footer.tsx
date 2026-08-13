import { AppFooter } from "@omnidotdev/thornberry/app-footer";

import { ExternalLink } from "@/components/core";
import app from "@/lib/config/app.config";

/**
 * Layout footer. Renders the shared Omni `<AppFooter>`, which bakes in the
 * "Made with <symbol> by Omni" credit, the omni.dev link, and the legal links so
 * they can't drift. Run supplies only its own catalog symbol, docs link, and
 * social block.
 */
const Footer = () => (
  <AppFooter
    appSymbol={app.icon}
    docsUrl={app.docsUrl}
    orgUrl={app.organization.url}
    socials={
      <>
        <ExternalLink variant="ghost" href={app.socials.discord}>
          Discord
        </ExternalLink>

        <ExternalLink variant="ghost" href={app.socials.x}>
          X
        </ExternalLink>

        <ExternalLink variant="ghost" href={app.socials.threads}>
          Threads
        </ExternalLink>
      </>
    }
  />
);

export default Footer;
