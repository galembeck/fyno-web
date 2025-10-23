/** biome-ignore-all lint/suspicious/noExplicitAny: required by multi-value filters */

"use client";

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Copy, Eye, MapPin, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { DataTableColumnSearch } from "@/components/data-table-column-search";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTable } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { clients } from "@/constants/_app/_admin/_management/clients";
import { formatCPF, formatWhatsApp } from "@/lib/_auth/sign-up/format-masks";

export const Route = createFileRoute(
  "/_app/admin/_pages/_management/clients/~components/clients-table"
)({
  component: () => <ClientsTable type="complete" />,
});

export type Client = {
  clientId: string;
  name: string;
  email: string;
  document: string;
  phone: string;
  address: string;
  createdAt: string;
};

export const clientsTableColumns: ColumnDef<Client>[] = [
  {
    accessorKey: "clientId",
    header: ({ table, column }) => (
      <div className="flex items-center gap-4">
        <Checkbox
          aria-label="Selecionar todas"
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />

        <DataTableColumnSearch
          column={column}
          placeholder="Buscar por ID"
          title="ID"
        />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <Checkbox
          aria-label="Selecionar linha"
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
        />

        <span>{row.getValue("clientId")}</span>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnSearch
        column={column}
        placeholder="Buscar por nome"
        title="Nome"
      />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnSearch
        column={column}
        placeholder="Buscar por e-mail"
        title="E-mail"
      />
    ),
  },
  {
    accessorKey: "document",
    header: ({ column }) => (
      <DataTableColumnSearch
        column={column}
        placeholder="Buscar por documento"
        title="Documento"
      />
    ),
    cell: ({ row }) => <span>{formatCPF(row.getValue("document"))}</span>,
  },
  {
    accessorKey: "phone",
    header: ({ column }) => (
      <DataTableColumnSearch
        column={column}
        placeholder="Buscar por telefone"
        title="Telefone"
      />
    ),
    cell: ({ row }) => <span>{formatWhatsApp(row.getValue("phone"))}</span>,
  },
  {
    accessorKey: "address",
    header: ({ column }) => (
      <div className="flex justify-center">
        <DataTableColumnHeader column={column} title="Endereço" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="ghost">
              <MapPin className="h-4 w-4" />
            </Button>
          </TooltipTrigger>

          <TooltipContent>{row.getValue("address")}</TooltipContent>
        </Tooltip>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    filterFn: "dateRange" as any,
    header: () => <span className="flex justify-center">Data</span>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span>
          {format(
            row.getValue("createdAt")
              ? new Date(
                  (row.getValue("createdAt") as string)
                    .split("/")
                    .reverse()
                    .join("-")
                )
              : "",
            "dd/MM/yyyy"
          )}
        </span>
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const client = row.original;

      const navigate = useNavigate();

      return (
        <div className="flex justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="flex h-8 w-8 items-center justify-center p-0"
                variant="ghost"
              >
                <span className="sr-only">Abrir menu de opções</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Opções</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(client.clientId)}
              >
                <Copy />
                Copiar ID do cliente
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() =>
                  navigate({ to: `/admin/client-detail/${client.clientId}` })
                }
              >
                <Eye />
                Ver informações do cliente
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

async function getData(): Promise<Client[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  return clients;
}

interface ClientsTableProps {
  type: "summary" | "complete";
}

export function ClientsTable({ type }: ClientsTableProps) {
  const [data, setData] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const result = await getData();
        setData(result);
      } catch (error) {
        toast.error("Erro ao carregar dados de clientes", {
          description: error instanceof Error ? error.message : String(error),
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Clientes</CardTitle>
        <CardDescription className="text-base">
          Visualize e gerencie todos os clientes cadastrados em sua plataforma
          através da tabela de clientes
        </CardDescription>

        <CardAction>
          {type === "summary" ? (
            <Button onClick={() => navigate({ to: "/admin/clients" })}>
              Ver todos
            </Button>
          ) : (
            <Button>Exportar</Button>
          )}
        </CardAction>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center p-8">
            <div className="text-muted-foreground">Carregando...</div>
          </div>
        ) : (
          <DataTable
            columns={clientsTableColumns}
            data={data}
            filterableColumns={[
              {
                columnKey: "createdAt",
                title: "Data",
                type: "date",
              },
            ]}
            searchableColumn={{
              key: "name",
              placeholder: "Buscar por cliente...",
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}
