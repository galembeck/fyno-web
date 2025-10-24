/** biome-ignore-all lint/suspicious/noExplicitAny: required by @TanStack-Table */

import { createFileRoute } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import {
  BanknoteArrowDown,
  BanknoteArrowUp,
  BanknoteX,
  Copy,
  Logs,
  MoreHorizontal,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import { DataTableColumnSearch } from "@/components/data-table-column-search";
import { Badge } from "@/components/ui/badge";
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
import { useWebhooks } from "@/hooks/endpoints/integration/use-webhooks";
import { CreateWebhook } from "./create-webhook";
import { DeleteConfirmation } from "@/components/delete-confirmation";

export const Route = createFileRoute(
  "/_app/app/_pages/integration/webhooks/~components/webhooks-table"
)({
  component: WebhooksTable,
});

export type Webhook = {
  id: string;
  name: string;
  events: string[];
  url: string;
  createdAt: string;
};

export const webhooksTableColumns: ColumnDef<Webhook>[] = [
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
          placeholder="Buscar por ID..."
          title="ID público"
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
        placeholder="Buscar por nome..."
        title="Nome"
      />
    ),
  },
  {
    accessorKey: "events",
    header: ({ column }) => (
      <DataTableColumnSearch
        column={column}
        placeholder="Buscar por eventos..."
        title="Eventos"
      />
    ),
    // novo: filtro que entende que events é um array de strings
    filterFn: (row: any, columnId: string, filterValue: string | string[]) => {
      const events = (row.getValue(columnId) as string[]) || [];

      if (!events || events.length === 0) {
        return false;
      }

      // Se filterValue for array (multi-select), exige que todos os filtros estejam presentes
      if (Array.isArray(filterValue)) {
        return filterValue.every((fv) => events.includes(fv));
      }

      // Se for string, verifica se o evento está presente
      return events.includes(filterValue as string);
    },
    cell: ({ row }) => {
      const events = (row.getValue("events") as string[]) || [];

      return (
        <div className="flex flex-wrap gap-2">
          {events.map((event) => {
            const lower = event.toLowerCase();
            const badgeClass = lower.includes("billing")
              ? "bg-emerald-600 text-white"
              : // biome-ignore lint/style/noNestedTernary: required by webhook-events styling...
                lower.includes("withdraw")
                ? "bg-sky-600 text-white"
                : "bg-slate-100 text-muted-foreground";

            return (
              <Badge
                className={`px-2 py-0.5 text-xs ${badgeClass}`}
                key={event}
              >
                {event}
              </Badge>
            );
          })}
        </div>
      );
    },
  },
  {
    accessorKey: "url",
    header: ({ column }) => (
      <DataTableColumnSearch
        column={column}
        placeholder="Buscar por URL..."
        title="URL"
      />
    ),
  },
  {
    accessorKey: "createdAt",
    filterFn: "dateRange" as any,
    header: () => <span className="flex justify-center">Data de criação</span>,
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
    header: () => <span className="flex justify-center">Ações</span>,
    cell: ({ row }) => {
      const client = row.original;

      const { deleteWebhook } = useWebhooks();

      const [openConfirm, setOpenConfirm] = useState(false);

      return (
        <div className="flex justify-center">
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
                Copiar ID (webhook)
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Logs />
                Ver logs
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

              <DeleteConfirmation
                onClick={() => deleteWebhook(client.id)}
                onOpenChange={setOpenConfirm}
                open={openConfirm}
                type="webhook"
              />
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

export function WebhooksTable() {
  const { webhooks, isLoading } = useWebhooks();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Webhooks</CardTitle>
        <CardDescription className="text-base">
          Visualize, gerencie e crie webhooks para fins de desenvolvimento
        </CardDescription>

        <CardAction>
          <CreateWebhook />
        </CardAction>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <div className="text-muted-foreground">Carregando...</div>
          </div>
        ) : (
          <DataTable
            columns={webhooksTableColumns}
            data={(webhooks || []).map((webhook: any) => ({
              id: webhook.id,
              name: webhook.name ?? "",
              events: webhook.events ?? [],
              url: webhook.url ?? "",
              createdAt: webhook.createdAt ?? "",
            }))}
            filterableColumns={[
              {
                columnKey: "events",
                title: "Eventos",
                options: [
                  {
                    label: "billing.paid",
                    value: "billing.paid",
                    icon: BanknoteArrowUp,
                  },
                  {
                    label: "withdraw.done",
                    value: "withdraw.done",
                    icon: BanknoteArrowDown,
                  },
                  {
                    label: "withdraw.failed",
                    value: "withdraw.failed",
                    icon: BanknoteX,
                  },
                ],
              },
              {
                columnKey: "createdAt",
                title: "Data",
                type: "date",
              },
            ]}
            searchableColumn={{
              key: "name",
              placeholder: "Buscar por nome...",
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}
