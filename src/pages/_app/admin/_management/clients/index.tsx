import { createFileRoute } from "@tanstack/react-router";
import { ClientsTable } from "./~components/clients-table";

export const Route = createFileRoute("/_app/admin/_management/clients/")({
  component: ClientsPage,
  head: () => ({
    meta: [
      {
        title: "Clientes | fyno.business",
      },
    ],
  }),
});

export function ClientsPage() {
  return (
    <main className="p-6">
      <ClientsTable type="complete" />
    </main>
  );
}
