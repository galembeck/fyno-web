import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/admin/_pages/_management/client-detail/")({
  beforeLoad: () => {
    throw redirect({
      to: "/admin/clients",
      replace: true,
    });
  },
});
