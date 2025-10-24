import { createFileRoute } from "@tanstack/react-router";
import { CreditCard } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const Route = createFileRoute(
  "/_app/app/_pages/_financial/extracts/~components/financial-summary-card"
)({
  component: () => (
    <FinancialSummaryCard amount="" color="" icon={CreditCard} title="" />
  ),
});

interface FinancialSummaryCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  amount: string;
  color: string;
}

export function FinancialSummaryCard({
  icon: Icon,
  title,
  amount,
  color,
}: FinancialSummaryCardProps) {
  return (
    <Card className="w-full lg:w-full">
      <CardContent className="flex flex-row items-center gap-4">
        <div className={`w-fit rounded-full bg-${color}-400 p-3`}>
          <Icon className="h-4 w-4 text-white" />
        </div>

        <article className="flex flex-col gap-1">
          <span className="whitespace-nowrap text-muted-foreground">
            {title}
          </span>
          <h1 className="whitespace-nowrap font-bold text-2xl">{amount}</h1>
        </article>
      </CardContent>
    </Card>
  );
}
