import { CheckIcon } from "lucide-react";
import { useEffect, useState } from "react";

const prompt = "$ run up runa";

interface OutputLine {
  id: string;
  kind: "step" | "ok" | "blank" | "final";
  text: string;
}

// output streamed after `run up runa`, mirroring the real CLI
const outputLines: OutputLine[] = [
  { id: "pull", kind: "step", text: "pulling images" },
  { id: "secrets", kind: "step", text: "generating secrets" },
  { id: "services", kind: "step", text: "starting services" },
  { id: "db", kind: "ok", text: "db healthy" },
  { id: "auth", kind: "ok", text: "auth healthy" },
  { id: "api", kind: "ok", text: "api healthy" },
  { id: "app", kind: "ok", text: "app healthy" },
  { id: "spacer", kind: "blank", text: "" },
  { id: "final", kind: "final", text: "Runa is running at https://localhost" },
];

// full transcript, exposed to screen readers regardless of animation state
const transcript = [
  prompt,
  ...outputLines.map((line) => {
    if (line.kind === "step") return `-> ${line.text}`;
    if (line.kind === "ok") return `[ok] ${line.text}`;
    return line.text;
  }),
].join("\n");

const Blink = () => (
  <span
    aria-hidden
    className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-primary-400"
  />
);

const TerminalDemo = () => {
  const [typedCount, setTypedCount] = useState(0);
  const [shownLines, setShownLines] = useState(0);

  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) {
      setTypedCount(prompt.length);
      setShownLines(outputLines.length);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];

    // type the prompt one character at a time
    for (let i = 1; i <= prompt.length; i += 1) {
      timers.push(setTimeout(() => setTypedCount(i), i * 55));
    }

    // then stream the output lines with a short stagger
    const afterPrompt = prompt.length * 55 + 450;
    for (let i = 1; i <= outputLines.length; i += 1) {
      timers.push(setTimeout(() => setShownLines(i), afterPrompt + i * 320));
    }

    return () => {
      for (const timer of timers) clearTimeout(timer);
    };
  }, []);

  const typingDone = typedCount >= prompt.length;
  const finished = shownLines >= outputLines.length;

  return (
    <div className="w-full overflow-hidden rounded-xl border border-base-800 bg-base-950 text-left shadow-xl">
      {/* title bar */}
      <div className="flex items-center gap-2 border-base-800 border-b px-4 py-3">
        <span className="size-3 rounded-full bg-red-500" />
        <span className="size-3 rounded-full bg-yellow-500" />
        <span className="size-3 rounded-full bg-green-500" />
        <span className="ml-2 font-mono text-base-400 text-xs">run</span>
      </div>

      {/* body */}
      <div className="min-h-72 whitespace-pre-wrap break-words px-4 py-4 font-mono text-base-200 text-xs leading-relaxed sm:min-h-80 sm:px-5 sm:text-sm">
        {/* full transcript for assistive technology */}
        <span className="sr-only">{transcript}</span>

        <div aria-hidden>
          <div>
            <span className="text-primary-400">
              {prompt.slice(0, typedCount)}
            </span>
            {!typingDone && <Blink />}
          </div>

          {outputLines.slice(0, shownLines).map((line) => {
            if (line.kind === "blank") {
              return <div key={line.id} className="h-3" />;
            }

            if (line.kind === "step") {
              return (
                <div key={line.id} className="text-base-400">
                  <span className="text-base-500">-&gt;</span> {line.text}
                </div>
              );
            }

            if (line.kind === "final") {
              return (
                <div key={line.id}>
                  <span>Runa is running at </span>
                  <span className="font-semibold text-primary-400">
                    https://localhost
                  </span>
                  {finished && <Blink />}
                </div>
              );
            }

            return (
              <div
                key={line.id}
                className="flex items-center gap-1.5 text-base-200"
              >
                <CheckIcon className="size-3.5 shrink-0 text-primary-400" />
                {line.text}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TerminalDemo;
