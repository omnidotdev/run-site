const reasons = [
  {
    title: "One command, whole stack",
    body: "No compose files to hand-write, no reverse proxy to wire up, no certificates to chase, no secrets to manage. One command generates and starts the whole stack, then waits for every service to report healthy.",
  },
  {
    title: "Bring anything",
    body: "A curated catalog, your own docker-compose file or recipe, or any container image. If it runs in a container, run brings it up on your machine.",
  },
  {
    title: "Local-first and private",
    body: "A single binary on your own machine. Your data stays there, and there is nothing hosted to trust. Open source under Apache 2.0.",
  },
  {
    title: "Backups built in",
    body: "Snapshot and restore any stack's data with one command, and wiping a stack always takes a safety backup first.",
  },
];

const WhyRun = () => (
  <section className="px-4 py-20">
    <div className="mx-auto max-w-5xl">
      <h2 className="text-center font-bold text-3xl tracking-tight">Why run</h2>

      <p className="mx-auto mt-3 max-w-2xl text-center text-muted-foreground leading-relaxed">
        Self-hosting is mostly busywork: compose files by hand, a reverse proxy
        to wire up, certificates to chase, secrets to manage, backups to
        remember. Most tools make you choose between a locked-down appliance and
        a server-only platform. run is neither. It is your own machine, with the
        busywork handled.
      </p>

      <div className="mt-10 grid gap-5 sm:grid-cols-2">
        {reasons.map((reason) => (
          <div
            key={reason.title}
            className="rounded-2xl border bg-card p-6 shadow-sm"
          >
            <h3 className="font-bold text-lg">{reason.title}</h3>
            <p className="mt-2 text-muted-foreground leading-relaxed">
              {reason.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhyRun;
