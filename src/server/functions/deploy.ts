import { createServerFn } from "@tanstack/react-start";
import { parse as parseToml } from "smol-toml";
import { parse as parseYaml } from "yaml";
import { z } from "zod";

/** A single service parsed from a run recipe, reduced to what the review shows. */
export interface DeployService {
  name: string;
  image: string;
  ports?: string[];
}

/** A typed input a recipe prompts for, reduced to what the review shows. */
export interface DeployInput {
  key: string;
  label?: string;
  required?: boolean;
}

/** A run recipe reduced to the fields the deploy review renders. */
export interface DeployRecipe {
  name: string;
  displayName?: string;
  description?: string;
  services: DeployService[];
  inputs: DeployInput[];
  hasSecrets: boolean;
  hasProxy: boolean;
  format: "yaml" | "toml";
  path: string;
}

/** The outcome of resolving a repository into a deployable stack. */
export type DeploySource =
  | {
      status: "ok";
      repo: RepoRef;
      recipe: DeployRecipe;
      fractalManifest: string | null;
    }
  | { status: "unsupported-host"; repo: null }
  | { status: "not-found"; repo: RepoRef }
  | { status: "parse-error"; repo: RepoRef; message: string }
  | { status: "fetch-error"; repo: RepoRef };

interface RepoRef {
  owner: string;
  name: string;
  ref: string;
  url: string;
}

const inputSchema = z.object({
  repo: z.string().min(1),
  ref: z.string().optional(),
});

// Candidate recipe filenames, in resolution order; the first that exists wins
const RECIPE_FILES = ["run.yaml", "run.yml", "run.toml"] as const;
const FRACTAL_FILES = ["fractal.yaml", "fractal.yml"] as const;

/**
 * Parse a GitHub repository URL into owner/name and an optional branch. A
 * `/tree/<branch>` segment is honored as the ref; otherwise `HEAD` resolves to
 * the repository's default branch on the raw host.
 */
const parseGitHubUrl = (raw: string, refOverride?: string): RepoRef | null => {
  let url: URL;

  try {
    url = new URL(raw);
  } catch {
    return null;
  }

  if (url.hostname !== "github.com" && url.hostname !== "www.github.com") {
    return null;
  }

  const segments = url.pathname.split("/").filter(Boolean);

  if (segments.length < 2) {
    return null;
  }

  const [owner, rawName, treeKeyword, branch] = segments;
  const name = rawName.replace(/\.git$/, "");
  const ref =
    refOverride ?? (treeKeyword === "tree" && branch ? branch : "HEAD");

  return { owner, name, ref, url: `https://github.com/${owner}/${name}` };
};

/** Fetch a single path from the raw GitHub host, returning its text or null. */
const fetchRawFile = async (
  repo: RepoRef,
  path: string,
): Promise<string | null> => {
  const rawUrl = `https://raw.githubusercontent.com/${repo.owner}/${repo.name}/${repo.ref}/${path}`;
  const response = await fetch(rawUrl, { headers: { accept: "text/plain" } });

  return response.ok ? response.text() : null;
};

/** Reduce a parsed recipe object into the fields the review renders. */
const toDeployRecipe = (
  parsed: unknown,
  format: "yaml" | "toml",
  path: string,
): DeployRecipe | null => {
  if (!parsed || typeof parsed !== "object") {
    return null;
  }

  const record = parsed as Record<string, unknown>;
  const name = typeof record.name === "string" ? record.name : null;

  if (!name) {
    return null;
  }

  const rawServices = Array.isArray(record.services) ? record.services : [];
  const services: DeployService[] = rawServices
    .filter(
      (svc): svc is Record<string, unknown> => !!svc && typeof svc === "object",
    )
    .map((svc) => ({
      name: typeof svc.name === "string" ? svc.name : "service",
      image: typeof svc.image === "string" ? svc.image : "",
      ports: Array.isArray(svc.ports)
        ? svc.ports.filter((p): p is string => typeof p === "string")
        : undefined,
    }))
    .filter((svc) => svc.image.length > 0);

  const rawInputs = Array.isArray(record.inputs) ? record.inputs : [];
  const inputs: DeployInput[] = rawInputs
    .filter(
      (input): input is Record<string, unknown> =>
        !!input && typeof input === "object",
    )
    .map((input) => ({
      key: typeof input.key === "string" ? input.key : "",
      label: typeof input.label === "string" ? input.label : undefined,
      required:
        typeof input.required === "boolean" ? input.required : undefined,
    }))
    .filter((input) => input.key.length > 0);

  return {
    name,
    displayName:
      typeof record.display_name === "string" ? record.display_name : undefined,
    description:
      typeof record.description === "string" ? record.description : undefined,
    services,
    inputs,
    hasSecrets: !!record.secrets,
    hasProxy: !!record.proxy,
    format,
    path,
  };
};

/**
 * Resolve a repository URL into a deployable stack for the deploy review page:
 * locate and parse a committed run recipe, and note whether the repo also carries
 * a Fractal manifest (which the Fractal dashboard can import directly).
 */
export const resolveDeploySource = createServerFn()
  .inputValidator(inputSchema)
  .handler(async ({ data }): Promise<DeploySource> => {
    const repo = parseGitHubUrl(data.repo, data.ref);

    if (!repo) {
      return { status: "unsupported-host", repo: null };
    }

    let recipe: DeployRecipe | null = null;
    let parseMessage: string | null = null;

    for (const path of RECIPE_FILES) {
      let content: string | null;

      try {
        content = await fetchRawFile(repo, path);
      } catch {
        return { status: "fetch-error", repo };
      }

      if (!content) {
        continue;
      }

      try {
        const format = path.endsWith(".toml") ? "toml" : "yaml";
        const parsed =
          format === "toml" ? parseToml(content) : parseYaml(content);
        recipe = toDeployRecipe(parsed, format, path);

        if (recipe) {
          break;
        }

        parseMessage = `${path} is missing a top-level name or services`;
      } catch (error) {
        parseMessage =
          error instanceof Error ? error.message : `could not parse ${path}`;
      }
    }

    if (!recipe) {
      return parseMessage
        ? { status: "parse-error", repo, message: parseMessage }
        : { status: "not-found", repo };
    }

    let fractalManifest: string | null = null;

    for (const path of FRACTAL_FILES) {
      try {
        if (await fetchRawFile(repo, path)) {
          fractalManifest = path;
          break;
        }
      } catch {
        // A fractal manifest is optional; ignore a probe failure
      }
    }

    return { status: "ok", repo, recipe, fractalManifest };
  });
