import { createFileRoute } from "@tanstack/react-router";
import { FolderClosed, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { InformationCard } from "../~components/information-card";
import { WebhooksTable } from "./~components/webhooks-table";

export const Route = createFileRoute(
  "/_app/admin/_pages/integration/webhooks/"
)({
  component: WebhooksPage,
});

export function WebhooksPage() {
  return (
    <main className="container space-y-8 p-4">
      <div className="flex items-center gap-4">
        <h1 className="font-semibold text-3xl">Webhooks</h1>

        <Badge className="bg-primary-green font-bold text-xs uppercase">
          Integração
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <InformationCard
          description="Acesse toda a nossa"
          icon={FolderClosed}
          title="Documentação"
          url="https://fyno.mintlify.app/"
          urlMessage="documentação"
        />

        <InformationCard
          description="Aprenda com vídeos práticos direto de nosso"
          icon={GraduationCap}
          title="Academia Fyno"
          url="https://youtube.com/@fyno"
          urlMessage="canal do YouTube"
        />
      </div>

      <WebhooksTable />
    </main>
  );
}
