import { createFileRoute } from "@tanstack/react-router";

const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <main>
      <h1>Run</h1>
      <p>Self-hosting made simple</p>
    </main>
  );
}

export { Route };
