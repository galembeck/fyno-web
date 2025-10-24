/** biome-ignore-all lint/suspicious/noExplicitAny: required by @TanStack-Table */

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
import { useProducts } from "@/hooks/endpoints/v1/use-product";
import { createFileRoute } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { Copy, Edit, MoreHorizontal, Trash2 } from "lucide-react";
import { useState } from "react";
import { CreateProduct } from "./create-product";
import { UpdateProduct } from "./update-product";

export const Route = createFileRoute(
  "/_app/app/_pages/_primary/products/~components/products-table"
)({
  component: ProductsTable,
});

export type Product = {
  id: string;
  name: string;
  description: string;
  price: string;
  createdAt: string;
};

export const productsTableColumns: ColumnDef<Product>[] = [
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
          title="ID do produto"
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
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Preço" />
    ),
    cell: ({ row }) => {
      const price = Number.parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(price);

      return <div className="font-bold">{formatted}</div>;
    },
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

      const { deleteProduct } = useProducts();

      const [openEdition, setOpenEdition] = useState(false);
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
                Copiar ID (produto)
              </DropdownMenuItem>

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

          <UpdateProduct
            open={openEdition}
            onOpenChange={setOpenEdition}
            product={{
              id: client.id,
              name: client.name,
              description: client.description,
              price: Number(client.price),
              createdAt: client.createdAt,
            }}
          />

          <DeleteConfirmation
            onClick={() => deleteProduct(client.id)}
            onOpenChange={setOpenConfirm}
            open={openConfirm}
            type="product"
          />
        </div>
      );
    },
  },
];

export function ProductsTable() {
  const { products, isLoading } = useProducts();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Produtos</CardTitle>
        <CardDescription className="text-base">
          Crie, visualize e gerencie os produtos de sua loja através do botão ao
          lado e a tabela abaixo, respectivamente
        </CardDescription>

        <CardAction>
          <CreateProduct />
        </CardAction>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <div className="text-muted-foreground">Carregando...</div>
          </div>
        ) : (
          <DataTable
            columns={productsTableColumns}
            data={(products || []).map((product: any) => ({
              id: product.id,
              name: product.name ?? "",
              description: product.description ?? "",
              price: product.price ?? 0,
              createdAt: product.createdAt ?? "",
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
              placeholder: "Buscar por nome...",
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}
