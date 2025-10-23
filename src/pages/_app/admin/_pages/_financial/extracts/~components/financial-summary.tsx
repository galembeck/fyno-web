import { createFileRoute } from "@tanstack/react-router";
import { financialSummaryData } from "@/constants/_app/_admin/_financial/extracts/financial-summary";
import { FinancialSummaryCard } from "./financial-summary-card";

export const Route = createFileRoute(
  "/_app/admin/_pages/_financial/extracts/~components/financial-summary"
)({
  component: FinancialSummary,
});

export function FinancialSummary() {
  return (
    <div className="w-full space-y-4 lg:w-fit">
      <h1 className="mb-4 text-center font-medium text-xl [text-center">
        Resumo Financeiro
      </h1>

      {financialSummaryData.map((item) => (
        <FinancialSummaryCard
          amount={item.amount}
          color={item.color}
          icon={item.icon}
          key={item.id}
          title={item.title}
        />
      ))}
    </div>
  );
}
