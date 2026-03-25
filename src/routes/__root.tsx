import { Outlet, createRootRoute } from "@tanstack/react-router";

import "@/lib/styles/globals.css";

const Route = createRootRoute({
  component: () => <Outlet />,
});

export { Route };
