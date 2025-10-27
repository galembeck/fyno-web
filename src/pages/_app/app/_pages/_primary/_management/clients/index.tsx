import { createFileRoute } from "@tanstack/react-router";
import { DollarSign, Users } from "lucide-react";
import { useCustomers } from "@/hooks/endpoints/v1/use-customer";
import { AnalyticsCard } from "../../~components/analytics-card";
import { ClientsTable } from "./~components/clients-table";

export const Route = createFileRoute(
  "/_app/app/_pages/_primary/_management/clients/"
)({
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
  const { customers } = useCustomers();

  return (
    <main className="container space-y-8 p-4">
      <div className="flex items-center gap-4">
        <h1 className="font-semibold text-3xl">Clientes</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <AnalyticsCard
          icon={DollarSign}
          label={`Ticket médio por cliente com base em ${customers?.length.toString() || "0"} clientes que efetuaram ao menos uma compra`}
          type="currency"
          value="0,00"
        />

        <AnalyticsCard
          icon={Users}
          label="Clientes cadastrados em sua plataforma"
          type="number"
          value={customers?.length.toString() || "0"}
        />
      </div>

      <ClientsTable type="complete" />
    </main>
  );
}
