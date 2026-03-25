const steps = [
  {
    number: 1,
    title: "Install",
    command: "curl -fsSL https://run.omni.dev/install.sh | sh",
  },
  {
    number: 2,
    title: "Deploy",
    command: "run up runa",
  },
  {
    number: 3,
    title: "Visit",
    command: "open https://localhost",
  },
];

const HowItWorks = () => (
  <section className="px-4 py-20">
    <div className="mx-auto max-w-3xl">
      <div className="mb-12 text-center">
        <h2 className="font-bold text-3xl tracking-tight">
          Up and running in seconds
        </h2>
        <p className="mt-2 text-muted-foreground">
          Three commands from zero to a running stack
        </p>
      </div>

      <div className="flex flex-col gap-8">
        {steps.map((step) => (
          <div key={step.number} className="flex items-start gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-primary font-bold text-primary-foreground">
              {step.number}
            </div>

            <div className="flex flex-1 flex-col gap-2">
              <h3 className="font-semibold text-lg">{step.title}</h3>
              <div className="rounded-lg border bg-muted/50 px-4 py-3 font-mono text-sm">
                <code>{step.command}</code>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default HowItWorks;
