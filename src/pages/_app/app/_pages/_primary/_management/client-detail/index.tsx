import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_app/app/_pages/_primary/_management/client-detail/"
)({
  beforeLoad: () => {
    throw redirect({
      to: "/app/clients",
      replace: true,
    });
  },
});
