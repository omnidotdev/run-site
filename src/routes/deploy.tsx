import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { DeployReview, EmptyState } from "@/components/deploy";
import { BASE_URL } from "@/lib/config/env.config";
import createMetaTags from "@/lib/util/createMetaTags";
import { resolveDeploySource } from "@/server/functions/deploy";

import type { DeploySource } from "@/server/functions/deploy";

const searchSchema = z.object({
  repo: z.string().optional(),
  ref: z.string().optional(),
});

export const Route = createFileRoute("/deploy")({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({ repo: search.repo, ref: search.ref }),
  loader: async ({ deps: { repo, ref } }): Promise<DeploySource | null> => {
    if (!repo) {
      return null;
    }

    return resolveDeploySource({ data: { repo, ref } });
  },
  head: () => ({
    meta: createMetaTags({
      title: "Deploy to Fractal",
      description:
        "Review a stack and deploy it to Fractal cloud, or self-host it locally with run.",
      url: `${BASE_URL}/deploy`,
    }),
  }),
  component: DeployPage,
});

function DeployPage() {
  const source = Route.useLoaderData();

  if (!source) {
    return <EmptyState />;
  }

  return <DeployReview source={source} />;
}
