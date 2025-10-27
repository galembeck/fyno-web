/** biome-ignore-all lint/suspicious/noExplicitAny: required by multi-value filters */

"use client";

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Copy, Edit, Eye, MapPin, MoreHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { DataTableColumnSearch } from "@/components/data-table-column-search";
import { DeleteConfirmation } from "@/components/delete-confirmation";
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
import { useCustomers } from "@/hooks/endpoints/v1/use-customer";
import { formatCPF, formatWhatsApp } from "@/lib/_auth/sign-up/format-masks";
import { CreateClient } from "./create-client";
import { UpdateClient } from "./update-client";

export const Route = createFileRoute(
  "/_app/app/_pages/_primary/_management/clients/~components/clients-table"
)({
  component: () => <ClientsTable type="complete" />,
});

export type Client = {
  id: string;
  name: string;
  email: string;
  phone: string;
  document: string;
  address: string;
  createdAt: string;
};

export const clientsTableColumns: ColumnDef<Client>[] = [
  {
    accessorKey: "id",
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

        <span>{row.getValue("id")}</span>
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
      const { deleteCustomer } = useCustomers();

      const navigate = useNavigate();

      const [openConfirm, setOpenConfirm] = useState(false);
      const [openEdition, setOpenEdition] = useState(false);

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
                onClick={() => navigator.clipboard.writeText(client.id)}
              >
                <Copy />
                Copiar ID do cliente
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={() =>
                  navigate({ to: `/app/client-detail/${client.id}` })
                }
              >
                <Eye />
                Ver informações do cliente
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpenEdition(true);
                }}
              >
                <Edit />
                <p>Editar</p>
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setOpenConfirm(true);
                }}
              >
                <Trash2 className="text-red-500" />
                <p className="text-red-500 hover:text-red-500/80">Excluir</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <UpdateClient
            client={{
              id: client.id,
              name: client.name,
              email: client.email,
              phone: client.phone,
              document: client.document,
              address: client.address,
              createdAt: client.createdAt,
            }}
            onOpenChange={setOpenEdition}
            open={openEdition}
          />

          <DeleteConfirmation
            onClick={() => deleteCustomer(client.id)}
            onOpenChange={setOpenConfirm}
            open={openConfirm}
            type="client"
          />
        </div>
      );
    },
  },
];

interface ClientsTableProps {
  type: "summary" | "complete";
}

export function ClientsTable({ type }: ClientsTableProps) {
  const { customers, isLoading } = useCustomers();

  const navigate = useNavigate();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Clientes</CardTitle>
        <CardDescription className="text-base">
          Crie, visualize e gerencie os clientes de sua loja através do botão ao
          lado e a tabela abaixo, respectivamente
        </CardDescription>

        <CardAction className="flex flex-row items-center gap-2">
          {type === "summary" ? (
            <Button onClick={() => navigate({ to: "/app/clients" })}>
              Ver todos
            </Button>
          ) : (
            <>
              <Button variant="outline">Exportar</Button>

              <CreateClient />
            </>
          )}
        </CardAction>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <div className="text-muted-foreground">Carregando...</div>
          </div>
        ) : (
          <DataTable
            columns={clientsTableColumns}
            data={(customers || []).map((customer: any) => ({
              id: customer.id,
              name: customer.name ?? "",
              email: customer.email ?? "",
              phone: customer.phone ?? "",
              document: customer.document ?? "",
              address: customer.address ?? "",
              createdAt: customer.createdAt ?? "",
            }))}
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
