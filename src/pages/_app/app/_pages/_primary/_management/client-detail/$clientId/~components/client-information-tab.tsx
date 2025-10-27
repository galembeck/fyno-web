import { createFileRoute } from "@tanstack/react-router";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { clients } from "@/constants/_app/_admin/_management/clients";
import { formatCPF, formatWhatsApp } from "@/lib/_auth/sign-up/format-masks";
import type { Client } from "../../../clients/~components/clients-table";

export const Route = createFileRoute(
  "/_app/app/_pages/_primary/_management/client-detail/$clientId/~components/client-information-tab"
)({
  component: () => {
    // For demonstration, use the first client from the imported clients array.
    // Replace this with your actual client fetching logic as needed.
    const client = clients[0];

    return <ClientInformationTab client={client} />;
  },
});

interface ClientInformationTabProps {
  client: Client;
}

const fields: {
  key: keyof Client;
  label: string;
  format: (v: string) => string;
  copy: boolean;
}[] = [
  {
    key: "name",
    label: "Nome completo",
    format: (v: string) => v,
    copy: true,
  },
  {
    key: "email",
    label: "E-mail",
    format: (v: string) => v,
    copy: true,
  },
  {
    key: "phone",
    label: "Telefone",
    format: formatWhatsApp,
    copy: false,
  },
  {
    key: "document",
    label: "CPF",
    format: formatCPF,
    copy: true,
  },
  {
    key: "address",
    label: "Endereço",
    format: (v: string) => v,
    copy: false,
  },
];

export function ClientInformationTab({ client }: ClientInformationTabProps) {
  return (
    <Card>
      <CardContent>
        <article className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {fields.map((field) => (
              <div key={field.key}>
                <Label
                  className="mb-2 block font-medium text-sm"
                  htmlFor={field.key}
                >
                  {field.label}
                </Label>

                {field.copy ? (
                  <InputGroup>
                    <InputGroupInput
                      disabled
                      id={field.key}
                      value={field.format(client?.[field.key] ?? "")}
                    />

                    <InputGroupAddon align="inline-end">
                      <Button
                        onClick={() => {
                          navigator.clipboard.writeText(
                            field.format(client?.[field.key] ?? "")
                          );
                          toast.success(
                            `${field.label} copiado para a área de transferência`
                          );
                        }}
                        size="sm"
                        variant="ghost"
                      >
                        <Copy />
                        <span className="sr-only">Copiar</span>
                      </Button>
                    </InputGroupAddon>
                  </InputGroup>
                ) : (
                  <Input
                    disabled
                    id={field.key}
                    value={field.format(client?.[field.key] ?? "")}
                  />
                )}
              </div>
            ))}
          </div>
        </article>
      </CardContent>
    </Card>
  );
}
