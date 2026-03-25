import { createRouter as createTanStackRouter } from "@tanstack/react-router";

import { routeTree } from "./routeTree.gen";

const createRouter = () => {
  const router = createTanStackRouter({
    routeTree,
  });

  return router;
};

export { createRouter };

declare module "@tanstack/react-router" {
  interface Register {
    router: ReturnType<typeof createRouter>;
  }
}
