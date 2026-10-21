# run-site

The marketing and install site for [Run](https://run.omni.dev), Omni's CLI for self-hosting Omni products. Built with [TanStack Start](https://tanstack.com/start).

## Setup

```bash
bun install
cp .env.local.template .env.local   # optional, every variable is optional
```

## Run

```bash
bun dev      # start the dev server
bun build    # production build
bun start    # serve the production build
```

## Dev commands

| Command | Purpose |
| --- | --- |
| `bun check` | Biome lint and format check (errors only) |
| `bun format` | Format with Biome |
| `bun lint` | Lint with Biome |
| `bun knip` | Report unused files, dependencies, and exports |

## Diagnostics

- `bunx tsc --noEmit` type-checks the project
- `bun check` must pass before committing
- The production image builds from the `Dockerfile` (TanStack Start on Node)

Product documentation lives at [docs.omni.dev/products/run](https://docs.omni.dev/products/run).

## License

Apache-2.0 © Omni LLC
