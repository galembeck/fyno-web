/** biome-ignore-all lint/suspicious/noExplicitAny: required by multi-value filters */

"use client";

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import {
  CheckCircle2,
  CircleX,
  Copy,
  CreditCard,
  Eye,
  LoaderCircle,
  MoreHorizontal,
  Receipt,
  Smartphone,
  Timer,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
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
import { payments } from "@/constants/_app/_admin/_financial/payments/payments";
import { cn } from "@/lib/utils";

export const Route = createFileRoute(
  "/_app/admin/_pages/_financial/payments/~components/payments-table"
)({
  component: () => <PaymentsTable type="complete" />,
});

export type Payment = {
  id: string;
  client: string;
  email: string;
  status: "pendente" | "processando" | "aprovado" | "falhou";
  paymentMethod: "cartão" | "boleto" | "pix";
  amount: number;
  payedAt: string;
};

export const paymentsTableColumns: ColumnDef<Payment>[] = [
  {
    accessorKey: "id",
    header: ({ table }) => (
      <div className="flex items-center gap-2">
        <Checkbox
          aria-label="Selecionar todas"
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        />

        <span>ID</span>
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
    accessorKey: "client",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cliente" />
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="E-mail" />
    ),
  },
  {
    accessorKey: "status",
    filterFn: "multiValue" as any,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => (
      <Badge
        className={cn(
          row.getValue("status") === "pendente" ? "bg-zinc-200" : "",
          row.getValue("status") === "processando" ? "bg-blue-300" : "",
          row.getValue("status") === "aprovado" ? "bg-green-400" : "",
          row.getValue("status") === "falhou" ? "bg-red-400" : "",
          "capitalize"
        )}
      >
        {row.getValue("status") === "pendente" && <Timer />}
        {row.getValue("status") === "processando" && <LoaderCircle />}
        {row.getValue("status") === "aprovado" && <CheckCircle2 />}
        {row.getValue("status") === "falhou" && <CircleX />}
        {row.getValue("status")}
      </Badge>
    ),
  },
  {
    accessorKey: "paymentMethod",
    filterFn: "multiValue" as any,
    header: ({ column }) => (
      <div className="flex justify-center">
        <DataTableColumnHeader column={column} title="Método de pagamento" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex justify-center">
        <Badge className="flex items-center capitalize" variant="outline">
          {row.getValue("paymentMethod") === "cartão" && <CreditCard />}
          {row.getValue("paymentMethod") === "boleto" && <Receipt />}
          {row.getValue("paymentMethod") === "pix" && <Smartphone />}
          {row.getValue("paymentMethod")}
        </Badge>
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <div className="flex justify-end">
        <DataTableColumnHeader column={column} title="Valor" />
      </div>
    ),
    cell: ({ row }) => {
      const amount = Number.parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "payedAt",
    filterFn: "dateRange" as any,
    header: () => <span className="flex justify-center">Data</span>,
    cell: ({ row }) => (
      <div className="flex justify-center">
        <span>
          {format(
            row.getValue("payedAt")
              ? new Date(
                  (row.getValue("payedAt") as string)
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
      const payment = row.original;

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
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                <Copy />
                Copiar ID do pagamento
              </DropdownMenuItem>

              <DropdownMenuSeparator />

              <DropdownMenuItem>
                <Eye />
                Ver cliente
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Receipt />
                Ver detalhes do pagamento
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

async function getData(): Promise<Payment[]> {
  await new Promise((resolve) => setTimeout(resolve, 100));

  return payments.map((payment) => ({
    ...payment,
    status: payment.status as
      | "pendente"
      | "falhou"
      | "processando"
      | "aprovado",
    paymentMethod: payment.paymentMethod as "cartão" | "boleto" | "pix",
  }));
}

interface PaymentsTableProps {
  type: "summary" | "complete";
}

export function PaymentsTable({ type }: PaymentsTableProps) {
  const [data, setData] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const result = await getData();
        setData(result);
      } catch (error) {
        toast.error("Erro ao carregar dados de pagamentos", {
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
        <CardTitle className="text-2xl">Pagamentos recentes</CardTitle>
        <CardDescription className="text-base">
          Veja e gerencie os últimos pagamentos realizados em sua plataforma
        </CardDescription>

        <CardAction>
          {type === "summary" ? (
            <Button onClick={() => navigate({ to: "/admin/payments" })}>
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
            columns={paymentsTableColumns}
            data={data}
            filterableColumns={[
              {
                columnKey: "status",
                title: "Status",
                options: [
                  { label: "Pendente", value: "pendente", icon: Timer },
                  {
                    label: "Processando",
                    value: "processando",
                    icon: LoaderCircle,
                  },
                  {
                    label: "Aprovado",
                    value: "aprovado",
                    icon: CheckCircle2,
                  },
                  { label: "Falhou", value: "falhou", icon: CircleX },
                ],
              },
              {
                columnKey: "paymentMethod",
                title: "Método",
                options: [
                  { label: "Cartão", value: "cartão", icon: CreditCard },
                  { label: "Boleto", value: "boleto", icon: Receipt },
                  { label: "Pix", value: "pix", icon: Smartphone },
                ],
              },
              {
                columnKey: "payedAt",
                title: "Data",
                type: "date",
              },
            ]}
            searchableColumn={{
              key: "client",
              placeholder: "Buscar por cliente...",
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}
