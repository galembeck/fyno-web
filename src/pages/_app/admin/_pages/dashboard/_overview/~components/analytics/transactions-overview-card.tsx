import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDownRight,
  ArrowUpRight,
  BanknoteArrowDown,
  type LucideIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute(
  "/_app/admin/_pages/dashboard/_overview/~components/analytics/transactions-overview-card"
)({
  component: () => (
    <TransactionsOverviewCard
      badge={BanknoteArrowDown}
      description=""
      icon={BanknoteArrowDown}
      rate={{
        percentage: "",
        type: "increase",
      }}
      title={""}
      type="currency"
    />
  ),
});

interface TransactionsOverviewCardProps {
  badge: LucideIcon;
  type: "currency" | "number";
  title: string;
  rate?: {
    percentage: string;
    type: "increase" | "decrease";
  };
  description: string;
  icon: LucideIcon;
}

export function TransactionsOverviewCard({
  badge: BadgeIcon,
  type = "currency",
  title,
  rate,
  description,
  icon: Icon,
}: TransactionsOverviewCardProps) {
  return (
    <Card className="flex flex-row items-center justify-between">
      <div className="flex flex-col gap-2 px-2">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="font-medium text-muted-foreground text-sm">
            <div className="rounded-2xl border bg-white p-3 dark:bg-card">
              <BadgeIcon />
            </div>
          </CardTitle>

          {rate !== undefined && (
            <Badge
              className={`${
                rate.type === "increase"
                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                  : "bg-red-100 text-red-800 hover:bg-red-100"
              } flex flex-row items-center`}
              variant={rate.type === "increase" ? "default" : "secondary"}
            >
              {rate.type === "increase" ? (
                <ArrowUpRight className="h-4 w-4" />
              ) : (
                <ArrowDownRight className="h-4 w-4" />
              )}
              {rate.type === "increase" ? "+" : "-"}
              {rate.percentage}
            </Badge>
          )}
        </CardHeader>

        <CardContent className="flex justify-between">
          <article className="flex flex-col">
            <div className="font-bold font-dm-sans text-2xl">
              {type === "currency" ? "R$ " : ""}
              {title}
            </div>

            <div className="mt-2 flex flex-col text-sm">
              <span className="flex items-center gap-1 font-medium text-muted-foreground">
                {description}
              </span>
            </div>
          </article>
        </CardContent>
      </div>

      <Icon className="mr-6 text-muted-foreground" size="70" />
    </Card>
  );
}
