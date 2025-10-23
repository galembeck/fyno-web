import { createFileRoute } from "@tanstack/react-router";
import { Bug, Info, Receipt, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PaymentsTable } from "../_financial/payments/~components/payments-table";
import { ClientsTable } from "../_management/clients/~components/clients-table";
import { TransactionsOverview } from "./_overview/~components/analytics/transactions-overview";
import { ChartAreaInteractive } from "./_overview/~components/chart-area-interactive";
import { PayedOrdersCard } from "./_overview/~components/payed-orders-card";

export const Route = createFileRoute("/_app/admin/_pages/dashboard/")({
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
    <main className="container space-y-8 p-4">
      <div className="flex items-center gap-4">
        <h1 className="font-semibold text-3xl">Overview</h1>

        <HoverCard>
          <HoverCardTrigger>
            <Badge className="flex items-center bg-primary-green font-semibold uppercase dark:bg-white">
              <Info />
              Aviso importante
            </Badge>
          </HoverCardTrigger>

          <HoverCardContent className="w-80">
            <div className="flex items-center gap-4">
              <Bug size="120" />

              <article className="flex flex-col gap-2 text-sm">
                <p>
                  Nossa plataforma está em constante{" "}
                  <span className="font-bold text-primary-green">
                    desenvolvimento
                  </span>
                  !
                </p>
                <p className="text-muted-foreground">
                  Caso perceba algum erro, por favor, reporte à nossa equipe.
                </p>
              </article>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>

      <TransactionsOverview />

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

      <div className="flex w-full flex-col gap-4 xl:flex-row">
        <PayedOrdersCard />

        <ChartAreaInteractive />
      </div>
    </main>
  );
}
