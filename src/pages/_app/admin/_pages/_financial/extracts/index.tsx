import { createFileRoute } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartAreaInteractive } from "../../dashboard/_overview/~components/chart-area-interactive";
import { FinancialSummary } from "./~components/financial-summary";

export const Route = createFileRoute("/_app/admin/_pages/_financial/extracts/")(
  {
    component: ExtractsPage,
    head: () => ({
      meta: [
        {
          title: "Extratos | fyno.business",
        },
      ],
    }),
  }
);

export function ExtractsPage() {
  return (
    <main className="p-6">
      <div className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
        <article>
          <h1 className="font-semibold text-2xl tracking-tight">
            Extratos (resumo financeiro)
          </h1>
          <p className="max-w-xl text-muted-foreground text-sm">
            Visualize e compreenda seus extratos financeiros, bem como o
            acompanhamento da movimentação de fundos entre saldo (disponível,
            reservado e futuro)
          </p>
        </article>
      </div>

      <div className="mt-8 flex w-full flex-col gap-8 lg:flex-row lg:justify-between">
        <div className="w-full lg:w-full">
          <Card>
            <CardHeader>
              <CardTitle>Fluxo de caixa</CardTitle>
              <CardDescription>
                Entradas (pagamentos confirmados) x saídas (reembolsos,
                estornos, taxas, saques)
              </CardDescription>
            </CardHeader>

            <CardContent>
              <ChartAreaInteractive />
            </CardContent>
          </Card>
        </div>

        <FinancialSummary />
      </div>
    </main>
  );
}
