import { createFileRoute } from "@tanstack/react-router";
import { KeyRound, Phone, ReceiptText, ShoppingBag } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { PluginCard } from "./~components/plugin-card";

export const Route = createFileRoute("/_app/app/_pages/_primary/plugins/")({
  component: PluginsPage,
  head: () => ({
    meta: [
      {
        title: "Plugins | fyno.business",
      },
    ],
  }),
});

function PluginsPage() {
  return (
    <main className="container space-y-8 p-4">
      <div className="flex items-center gap-4">
        <h1 className="font-semibold text-3xl">Fyno &copy; Plugins</h1>
        <Badge variant="secondary">BETA</Badge>
      </div>

      <article className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <PluginCard
          available={false}
          description="Transforme seu WhatsApp em uma máquina de vendas"
          icon={Phone}
          imageUrl="/assets/icons/logo.svg"
          title="Venda usando seu WhatsApp"
        />

        <PluginCard
          available={false}
          description="Receba no PIX com sua loja Shopify"
          icon={ShoppingBag}
          imageUrl="/assets/icons/logo.svg"
          title="Shopify"
        />

        <PluginCard
          available={false}
          description="Integre a plataforma Fyno em seu site Wordpress"
          icon={KeyRound}
          imageUrl="/assets/icons/logo.svg"
          title="Wordpress"
        />

        <PluginCard
          available={true}
          configurationDescription="Sua chave da API será usada para conectar com o serviço UTMify e rastrear parâmetros UTM a cada nova venda"
          configurationTitle="UTMfy"
          description="Rastreie parâmetros UTM e analise suas campanhas"
          icon={ReceiptText}
          imageUrl="/assets/icons/logo.svg"
          title="UTMfy"
        />
      </article>
    </main>
  );
}
