import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/admin/")({
  component: AdminPage,
  head: () => ({
    meta: [
      {
        title: "Admin | fyno.business",
      },
    ],
  }),
});

function AdminPage() {
  return (
    <div>
      <h1>Admin Page</h1>
    </div>
  );
}
