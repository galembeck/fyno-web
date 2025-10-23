import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/admin/_pages/integration/")({
  beforeLoad: () => {
    throw redirect({
      to: "/admin/integration/api-keys",
      replace: true,
    });
  },
});
