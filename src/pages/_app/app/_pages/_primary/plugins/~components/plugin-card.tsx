import { createFileRoute } from "@tanstack/react-router";
import { Badge, type LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ConfigurePluginModal } from "./configure-plugin-modal";

export const Route = createFileRoute(
  "/_app/app/_pages/_primary/plugins/~components/plugin-card"
)({
  component: () => (
    <PluginCard
      available={false}
      description=""
      icon={Badge}
      imageUrl=""
      title=""
    />
  ),
});

interface PluginCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  available?: boolean;
  imageUrl: string;

  configurationTitle?: string;
  configurationDescription?: string;
}

export function PluginCard({
  icon: Icon,
  title,
  description,
  available = false,
  imageUrl,

  configurationTitle,
  configurationDescription,
}: PluginCardProps) {
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

            <p className="text-muted-foreground">{description}</p>

            <div className="mt-2 flex flex-col text-sm">
              {available ? (
                <ConfigurePluginModal
                  description={configurationDescription || ""}
                  title={configurationTitle || "Configuração do Plugin"}
                />
              ) : (
                <span className="text-primary-green">Em breve</span>
              )}
            </div>
          </article>
        </CardContent>
      </div>

      {/** biome-ignore lint/performance/noImgElement: required by @Vite */}
      <img alt="Fyno" className="mr-6 size-20" src={imageUrl} />
    </Card>
  );
}
