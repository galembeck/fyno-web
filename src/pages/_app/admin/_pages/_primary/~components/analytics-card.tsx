import { createFileRoute } from "@tanstack/react-router";
import { DollarSign, Info, type LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Route = createFileRoute(
  "/_app/admin/_pages/_primary/~components/analytics-card"
)({
  component: () => (
    <AnalyticsCard icon={DollarSign} label="" type="currency" value="" />
  ),
});

interface AnalyticsCardProps {
  icon: LucideIcon;
  type: "currency" | "number";
  value: string;
  label: string;
  tooltip?: boolean;
  hint?: string;
}

export function AnalyticsCard({
  icon: Icon,
  type,
  value,
  label,
  tooltip = false,
  hint,
}: AnalyticsCardProps) {
  return (
    <Card className="flex flex-row items-center justify-between">
      <div className="flex flex-col gap-2">
        <CardHeader className="flex items-center justify-between">
          <CardTitle className="font-medium text-muted-foreground text-sm">
            <div className="rounded-2xl border bg-white p-3 dark:bg-card">
              <Icon />
            </div>
          </CardTitle>
        </CardHeader>

        <CardContent className="flex justify-between">
          <article className="flex flex-col">
            <div className="font-bold font-dm-sans text-2xl">
              {type === "currency" ? (
                <span>R$ {value}</span>
              ) : (
                <span>{value}</span>
              )}
            </div>

            <div className="mt-2 flex gap-2 text-sm">
              <p className="inline-block flex-row font-medium text-muted-foreground">
                {label}
              </p>

              {tooltip && hint && (
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4" />
                  </TooltipTrigger>

                  <TooltipContent>{hint}</TooltipContent>
                </Tooltip>
              )}
            </div>
          </article>
        </CardContent>
      </div>

      {/** biome-ignore lint/performance/noImgElement: required by @Vite */}
      <img alt="Fyno" className="mr-6 size-20" src="/assets/icons/logo.svg" />
    </Card>
  );
}
