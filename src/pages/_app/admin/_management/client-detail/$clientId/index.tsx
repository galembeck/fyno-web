import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, Search, User } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { clients } from "@/constants/_app/_admin/_management/clients";
import type { Client } from "../../clients/~components/clients-table";
import { ClientInformationTab } from "./~components/client-information-tab";

export const Route = createFileRoute(
  "/_app/admin/_management/client-detail/$clientId/"
)({
  component: ClientDetailsPage,
});

// biome-ignore lint/suspicious/useAwait: required by @TanStack-Router
async function getClientById(clientId: string): Promise<Client | null> {
  return clients.find((client) => client.clientId === clientId) ?? null;
}

function ClientDetailsPage() {
  const navigate = useNavigate();

  const { clientId } = Route.useParams();

  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState(true);

  const [searchDocument, setSearchDocument] = useState("");

  // biome-ignore lint/suspicious/useAwait: required by client-document search/navigation
  async function handleSearchDocument() {
    if (!searchDocument) {
      return;
    }

    const found = clients.find((c) => c.document === searchDocument);
    if (found) {
      navigate({ to: `/admin/client-detail/${found.clientId}` });
    } else {
      toast.error("Cliente não encontrado!", {
        description: "Tente buscar por outro documento...",
      });
    }
  }

  useEffect(() => {
    const load = async () => {
      setLoading(true);

      const result = await getClientById(clientId);
      setClient(result);
      setLoading(false);
    };

    load();
  }, [clientId]);

  if (loading) {
    return <div className="p-8 text-muted-foreground">Carregando...</div>;
  }

  if (!client) {
    return <div className="p-8 text-red-500">Cliente não encontrado.</div>;
  }

  return (
    <main className="mx-auto w-full max-w-6xl space-y-8 px-4 py-8">
      <div className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
        <article>
          <Button
            className="mb-4"
            onClick={() => window.history.back()}
            variant="secondary"
          >
            <ArrowLeft />
          </Button>

          <h1 className="font-semibold text-2xl tracking-tight">
            Detalhes de cliente
          </h1>
          <p className="text-muted-foreground text-sm">
            Visualize todas as informações detalhadas do cliente selecionado,
            incluindo dados cadastrais, documentos e histórico de criação.
          </p>

          <InputGroup className="mt-4 max-w-xs">
            <InputGroupInput
              className="max-w-xs"
              onChange={(event) => setSearchDocument(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearchDocument();
                }
              }}
              placeholder="Buscar por detalhes de cliente..."
              value={searchDocument}
            />

            <InputGroupAddon>
              <Search />
            </InputGroupAddon>
          </InputGroup>
        </article>

        <Badge
          className="mt-4 h-8 rounded-lg p-4 text-sm lg:mt-0"
          variant="secondary"
        >
          ID: {client.clientId}
        </Badge>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">
            <User />
            Dados do cliente
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ClientInformationTab client={client} />
        </TabsContent>
      </Tabs>
    </main>

    // <main className="p-6">
    //   <h1 className="mb-4 font-bold text-2xl">Detalhes do Cliente</h1>
    //   <div className="space-y-2">
    //     <div>
    //       <strong>ID:</strong> {client.clientId}
    //     </div>
    //     <div>
    //       <strong>Nome:</strong> {client.name}
    //     </div>
    //     <div>
    //       <strong>E-mail:</strong> {client.email}
    //     </div>
    //     <div>
    //       <strong>Documento:</strong> {client.document}
    //     </div>
    //     <div>
    //       <strong>Telefone:</strong> {client.phone}
    //     </div>
    //     <div>
    //       <strong>Endereço:</strong> {client.address}
    //     </div>
    //     <div>
    //       <strong>Criado em:</strong>{" "}
    //       {new Date(client.createdAt).toLocaleString()}
    //     </div>
    //   </div>
    // </main>
  );
}
