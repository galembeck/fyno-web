import { createFileRoute } from "@tanstack/react-router";
import { Receipt, User } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PaymentsTable } from "../_financial/payments/~components/payments-table";
import { ClientsTable } from "../_management/clients/~components/clients-table";
import { AnalyticsOverview } from "./_overview/~components/analytics/analytics-overview";
import { ChartAreaInteractive } from "./_overview/~components/chart-area-interactive";

export const Route = createFileRoute("/_app/admin/dashboard/")({
  component: DashboardPage,
  head: () => ({
    meta: [
      {
        title: "Dashboard | fyno.business",
      },
    ],
  }),
});

function DashboardPage() {
  return (
    <main className="container mx-auto space-y-8 p-4">
      <AnalyticsOverview />

      <ChartAreaInteractive />

      <Tabs defaultValue="payments">
        <TabsList>
          <TabsTrigger value="payments">
            <Receipt />
            Pagamentos
          </TabsTrigger>
          <TabsTrigger value="clients">
            <User />
            Clientes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="payments">
          <PaymentsTable type="summary" />
        </TabsContent>
        <TabsContent value="clients">
          <ClientsTable type="summary" />
        </TabsContent>
      </Tabs>
    </main>
  );
}
