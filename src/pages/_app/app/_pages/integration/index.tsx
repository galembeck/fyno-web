import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/app/_pages/integration/")({
  beforeLoad: () => {
    throw redirect({
      to: "/app/integration/api-keys",
      replace: true,
    });
  },
});
