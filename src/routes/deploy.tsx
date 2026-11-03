import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import {
  CatalogDeployReview,
  DeployReview,
  EmptyState,
} from "@/components/deploy";
import { BASE_URL } from "@/lib/config/env.config";
import createMetaTags from "@/lib/util/createMetaTags";
import {
  resolveCatalogApp,
  resolveDeploySource,
} from "@/server/functions/deploy";

import type {
  CatalogDeploySource,
  DeploySource,
} from "@/server/functions/deploy";

const searchSchema = z.object({
  // a GitHub repository to deploy (the README-button flow)
  repo: z.string().optional(),
  ref: z.string().optional(),
  // a built-in run catalog app id to deploy (e.g. "runa")
  app: z.string().optional(),
});

type DeployLoaderData =
  | { mode: "repo"; source: DeploySource }
  | { mode: "catalog"; source: CatalogDeploySource }
  | { mode: "empty" };

export const Route = createFileRoute("/deploy")({
  validateSearch: searchSchema,
  loaderDeps: ({ search }) => ({
    repo: search.repo,
    ref: search.ref,
    app: search.app,
  }),
  loader: async ({ deps: { repo, ref, app } }): Promise<DeployLoaderData> => {
    if (app) {
      return {
        mode: "catalog",
        source: await resolveCatalogApp({ data: { app } }),
      };
    }

    if (repo) {
      return {
        mode: "repo",
        source: await resolveDeploySource({ data: { repo, ref } }),
      };
    }

    return { mode: "empty" };
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
  const data = Route.useLoaderData();

  if (data.mode === "catalog") {
    if (data.source.kind === "catalog-not-found") {
      return <EmptyState />;
    }

    return <CatalogDeployReview app={data.source.app} />;
  }

  if (data.mode === "repo") {
    return <DeployReview source={data.source} />;
  }

  return <EmptyState />;
}
