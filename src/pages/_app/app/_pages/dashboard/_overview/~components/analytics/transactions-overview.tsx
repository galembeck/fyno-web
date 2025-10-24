import { createFileRoute } from "@tanstack/react-router";
import { transactions } from "@/constants/_app/_admin/dashboard/transactions";
import { TransactionsOverviewCard } from "./transactions-overview-card";

export const Route = createFileRoute(
  "/_app/app/_pages/dashboard/_overview/~components/analytics/transactions-overview"
)({
  component: TransactionsOverview,
});

export function TransactionsOverview() {
  return (
    <article className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      {transactions.map((item) => (
        <TransactionsOverviewCard
          badge={item.badge}
          description={item.description}
          icon={item.icon}
          key={item.title}
          title={item.title}
          type={
            item.type === "currency" || item.type === "number"
              ? item.type
              : "number"
          }
        />
      ))}
    </article>
  );
}
