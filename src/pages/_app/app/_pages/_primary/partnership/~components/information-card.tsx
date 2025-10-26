import { createFileRoute } from "@tanstack/react-router";
import { type LucideIcon, Users } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute(
  "/_app/app/_pages/_primary/partnership/~components/information-card"
)({
  component: () => (
    <InformationCard
      color=""
      description=""
      icon={Users}
      iconStroke=""
      title=""
    />
  ),
});

interface InformationCardProps {
  color: string;
  icon: LucideIcon;
  iconStroke: string;
  title: string;
  description: string;
}

export function InformationCard({
  color,
  icon: Icon,
  iconStroke,
  title,
  description,
}: InformationCardProps) {
  return (
    <Card className="rounded-sm!">
      <CardHeader className="flex flex-col items-center justify-center gap-4">
        <div
          className={`flex items-center justify-center rounded-md ${color} max-w-fit p-3`}
        >
          <Icon className="h-6 w-6" stroke={iconStroke} />
        </div>

        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="text-center text-base text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
