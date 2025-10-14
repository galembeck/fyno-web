/** biome-ignore-all lint/suspicious/noExplicitAny: required by multi-value filters */

"use client";

import { createFileRoute } from "@tanstack/react-router";
import type { ColumnDef } from "@tanstack/react-table";
import { Copy, Eye, MapPin, MoreHorizontal, Receipt } from "lucide-react";
import { DataTableColumnHeader } from "@/components/data-table-column-header";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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

export const Route = createFileRoute(
	"/_app/admin/_management/clients/~components/clients-table"
)({
	component: ClientsTableColumns,
});

export type Client = {
	id: string;
	name: string;
	email: string;
	document: string;
	phone: string;
	address: string;
	createdAt: string;
};

export const clientsTableColumns: ColumnDef<Client>[] = [
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
		accessorKey: "name",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Nome" />
		),
	},
	{
		accessorKey: "email",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="E-mail" />
		),
	},
	{
		accessorKey: "document",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Documento" />
		),
		cell: ({ row }) => (
			<div className="flex justify-center">{row.getValue("document")}</div>
		),
	},
	{
		accessorKey: "phone",
		header: ({ column }) => (
			<DataTableColumnHeader column={column} title="Telefone" />
		),
		cell: ({ row }) => (
			<div className="flex justify-center">{row.getValue("phone")}</div>
		),
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
		header: ({ column }) => (
			<div className="flex justify-center">
				<DataTableColumnHeader column={column} title="Data" />
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

function ClientsTableColumns() {
	return;
}
