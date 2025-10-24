import { createFileRoute, Link } from "@tanstack/react-router";
import { BanknoteArrowDown, type LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute(
  "/_app/app/_pages/integration/~components/information-card"
)({
  component: () => (
    <InformationCard
      description=""
      icon={BanknoteArrowDown}
      title={""}
      url=""
      urlMessage=""
    />
  ),
});

interface InformationCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  url: string;
  urlMessage: string;
}

export function InformationCard({
  icon: Icon,
  title,
  description,
  url,
  urlMessage,
}: InformationCardProps) {
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
            <div className="font-extrabold text-2xl">{title}</div>

            <div className="mt-2 flex flex-col text-sm">
              <p className="inline-block flex-row font-medium text-muted-foreground">
                {description}
                <Link
                  className="ml-1 text-primary-green"
                  target="_blank"
                  to={url}
                >
                  {urlMessage}
                </Link>
              </p>
            </div>
          </article>
        </CardContent>
      </div>

      {/** biome-ignore lint/performance/noImgElement: required by @Vite */}
      <img alt="Fyno" className="mr-6 size-20" src="/assets/icons/logo.svg" />
    </Card>
  );
}
