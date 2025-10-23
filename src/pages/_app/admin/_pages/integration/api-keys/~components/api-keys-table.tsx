/** biome-ignore-all lint/suspicious/noExplicitAny: required by @TanStack-Table */

import { createFileRoute } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Copy, MoreHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";
import { DataTableColumnSearch } from "@/components/data-table-column-search";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useApiKeys } from "@/hooks/integration/use-api-keys";
import { CreateAPIKey } from "./create-api-key";

export const Route = createFileRoute(
  "/_app/admin/_pages/integration/api-keys/~components/api-keys-table"
)({
  component: APIKeysTable,
});

export type APIKey = {
  id: string;
  keyValue: string;
  notes: string;
  origin: string;
  createdAt: string;
};

export const apiKeysTableColumns: ColumnDef<APIKey>[] = [
  {
    accessorKey: "keyValue",
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
          placeholder="Buscar por chave..."
          title="Chave"
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

        <span>{row.getValue("keyValue")}</span>
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "notes",
    header: ({ column }) => (
      <DataTableColumnSearch
        column={column}
        placeholder="Buscar por notas..."
        title="Notas"
      />
    ),
  },
  {
    accessorKey: "origin",
    header: ({ column }) => (
      <DataTableColumnSearch
        column={column}
        placeholder="Buscar por origem..."
        title="Origem"
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

      const { revokeKey } = useApiKeys();

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
                onClick={() => navigator.clipboard.writeText(client.keyValue)}
              >
                <Copy />
                Copiar chave API
              </DropdownMenuItem>

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

              <AlertDialog onOpenChange={setOpenConfirm} open={openConfirm}>
                <AlertDialogTrigger asChild />

                <AlertDialogContent className="flex flex-col items-center justify-center rounded-lg border-0 text-center">
                  <AlertDialogHeader className="flex flex-col py-4 text-center">
                    <AlertDialogTitle className="flex flex-col items-center justify-center gap-4 font-bold text-white">
                      <Trash2 stroke="red" />
                      Tem certeza que deseja excluir essa chave?
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-muted-foreground">
                      Ao confirmar, a chave API será revogada e excluída de sua
                      conta, não podendo ser mais utilizada. Deseja realmente
                      excluir?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter className="flex flex-row items-center justify-center py-4">
                    <AlertDialogCancel
                      className="border-0 bg-inherit text-white hover:bg-inherit hover:text-white/90"
                      onClick={() => setOpenConfirm(false)}
                    >
                      Cancelar
                    </AlertDialogCancel>
                    <AlertDialogAction
                      className="gap-2 bg-red-500 text-white hover:bg-red-500/90"
                      onClick={() => {
                        revokeKey(client.id);
                        setOpenConfirm(false);
                      }}
                    >
                      <Trash2 />
                      Excluir
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

export function APIKeysTable() {
  const { keys, isLoading } = useApiKeys();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Chaves</CardTitle>
        <CardDescription className="text-base">
          Visualize, gerencie e crie as chaves de API cadastradas para fins de
          desenvolvimento
        </CardDescription>

        <CardAction>
          <CreateAPIKey />
        </CardAction>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <div className="text-muted-foreground">Carregando...</div>
          </div>
        ) : (
          <DataTable
            columns={apiKeysTableColumns}
            data={(keys || []).map((key: any) => ({
              id: key.id,
              keyValue: key.keyValue ?? "",
              notes: key.notes ?? "",
              origin: key.origin ?? "",
              createdAt: key.createdAt ?? "",
            }))}
            filterableColumns={[
              {
                columnKey: "createdAt",
                title: "Data",
                type: "date",
              },
            ]}
            searchableColumn={{
              key: "notes",
              placeholder: "Buscar por notas...",
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}
