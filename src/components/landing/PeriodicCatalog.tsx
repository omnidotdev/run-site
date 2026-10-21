// group columns occupied in each period, forming the periodic-table silhouette
const layout: Record<number, number[]> = {
  1: [1, 18],
  2: [1, 2, 13, 14, 15, 16, 17, 18],
  3: [1, 2, 13, 14, 15, 16, 17, 18],
  4: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
  5: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
  6: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
  7: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
};

interface Element {
  number: number;
  symbol: string;
  name: string;
  // the product's logo mark (shown recolored white on the cell)
  mark: string;
  href: string;
  // product accent, applied to the filled cell
  color: string;
}

// highlighted Omni products, keyed by `period-group`
const elements: Record<string, Element> = {
  "4-15": {
    number: 18,
    symbol: "Vx",
    name: "Vortex",
    mark: "/vortex-mark.png",
    href: "https://vortex.omni.dev",
    color: "bg-cyan-600",
  },
  "5-8": {
    number: 16,
    symbol: "Ru",
    name: "Runa",
    mark: "/runa-mark.svg",
    href: "https://runa.omni.dev",
    color: "bg-indigo-600",
  },
  "7-11": {
    number: 42,
    symbol: "Bf",
    name: "Backfeed",
    mark: "/backfeed-mark.svg",
    href: "https://backfeed.omni.dev",
    color: "bg-orange-600",
  },
};

type Node =
  | { kind: "spacer"; key: string; span: number }
  | { kind: "empty"; key: string }
  | { kind: "element"; key: string; element: Element };

// flatten the layout into an ordered list of cells and gap spacers
const buildNodes = (): Node[] => {
  const nodes: Node[] = [];

  for (let period = 1; period <= 7; period += 1) {
    const columns = layout[period];
    let previous = 0;

    for (const column of columns) {
      const gap = column - previous - 1;

      if (gap > 0) {
        nodes.push({
          kind: "spacer",
          key: `spacer-${period}-${column}`,
          span: gap,
        });
      }

      previous = column;

      const key = `${period}-${column}`;
      const element = elements[key];

      nodes.push(
        element
          ? { kind: "element", key, element }
          : { kind: "empty", key: `empty-${key}` },
      );
    }
  }

  return nodes;
};

const nodes = buildNodes();

const legend = [
  { label: "Project management", swatch: "bg-indigo-600" },
  { label: "Customer feedback", swatch: "bg-orange-600" },
  { label: "Event bus", swatch: "bg-cyan-600" },
];

const PeriodicCatalog = () => (
  <section className="bg-muted/30 px-4 py-20">
    <div className="mx-auto max-w-5xl">
      <h2 className="text-center font-bold text-3xl tracking-tight">
        What you can run
      </h2>
      <p className="mx-auto mt-2 max-w-xl text-center text-muted-foreground">
        Every app is one element. run brings any of them up locally with a
        single command, TLS, reverse proxy, secrets, and health checks included.
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-2">
        {legend.map((entry) => (
          <span
            key={entry.label}
            className="flex items-center gap-2 font-semibold text-muted-foreground text-xs"
          >
            <i className={`inline-block size-3 rounded-sm ${entry.swatch}`} />
            {entry.label}
          </span>
        ))}
      </div>

      <div className="mt-6 overflow-x-auto pb-2">
        <div className="mx-auto max-w-3xl">
          <div className="grid min-w-[680px] grid-cols-[repeat(18,minmax(0,1fr))] gap-1">
            {nodes.map((node) => {
              if (node.kind === "spacer") {
                return (
                  <div
                    key={node.key}
                    style={{ gridColumn: `span ${node.span}` }}
                    aria-hidden
                  />
                );
              }

              if (node.kind === "element") {
                const { element } = node;

                return (
                  <a
                    key={node.key}
                    href={element.href}
                    target="blank"
                    rel="noopener noreferrer"
                    title={element.name}
                    className={`relative flex aspect-square items-center justify-center overflow-hidden rounded-md text-white transition-transform hover:z-10 hover:-translate-y-0.5 hover:scale-105 ${element.color}`}
                  >
                    <span className="absolute top-1 left-1 font-semibold text-[0.5rem] text-white/85 leading-none">
                      {element.number}
                    </span>
                    <img
                      src={element.mark}
                      alt=""
                      aria-hidden
                      className="h-1/2 w-1/2 object-contain [filter:brightness(0)_invert(1)]"
                    />
                    <span className="sr-only">{element.name}</span>
                  </a>
                );
              }

              return (
                <div
                  key={node.key}
                  className="flex aspect-square items-center justify-center rounded-md border bg-muted"
                  aria-hidden
                >
                  <span className="font-bold text-base-400 text-sm leading-none">
                    ·
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <p className="mt-5 text-center text-muted-foreground text-xs">
        Omni apps are in the catalog today. Bring your own compose file, image,
        or recipe too, or pull any app from the internet. Helm charts are on the
        way.
      </p>
    </div>
  </section>
);

export default PeriodicCatalog;
