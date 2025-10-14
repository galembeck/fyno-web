import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { type Client, clientsTableColumns } from "./~components/clients-table";

export const Route = createFileRoute("/_app/admin/_management/clients/")({
	component: ClientsPage,
	head: () => ({
		meta: [
			{
				title: "Clientes | fyno.business",
			},
		],
	}),
});

async function getData(): Promise<Client[]> {
	await new Promise((resolve) => setTimeout(resolve, 100));

	return [
		{
			id: "728ed52f",
			name: "Pedro Galembeck",
			email: "galembeckpedro@gmail.com",
			document: "123.456.789-00",
			phone: "(11) 98765-4321",
			address: "Rua Amadeu Martins, 401",
			createdAt: "12-10-2025/23:04",
		},
		{
			id: "489e1d42",
			name: "Pedro Galembeck",
			email: "galembeckpedro@gmail.com",
			document: "123.456.789-00",
			phone: "(11) 98765-4321",
			address: "Rua Amadeu Martins, 401",
			createdAt: "11-10-2025/23:04",
		},
		{
			id: "629ea370",
			name: "Pedro Galembeck",
			email: "galembeckpedro@gmail.com",
			document: "123.456.789-00",
			phone: "(11) 98765-4321",
			address: "Rua Amadeu Martins, 401",
			createdAt: "10-10-2025/23:04",
		},
		{
			id: "674f05da",
			name: "Pedro Galembeck",
			email: "galembeckpedro@gmail.com",
			document: "123.456.789-00",
			phone: "(11) 98765-4321",
			address: "Rua Amadeu Martins, 401",
			createdAt: "09-10-2025/23:04",
		},
		{
			id: "803ad09a",
			name: "Pedro Galembeck",
			email: "galembeckpedro@gmail.com",
			document: "123.456.789-00",
			phone: "(11) 98765-4321",
			address: "Rua Amadeu Martins, 401",
			createdAt: "08-10-2025/23:04",
		},
		{
			id: "90b6ad53",
			name: "Pedro Galembeck",
			email: "galembeckpedro@gmail.com",
			document: "123.456.789-00",
			phone: "(11) 98765-4321",
			address: "Rua Amadeu Martins, 401",
			createdAt: "07-10-2025/23:04",
		},
		{
			id: "a15bcd89",
			name: "Pedro Galembeck",
			email: "galembeckpedro@gmail.com",
			document: "123.456.789-00",
			phone: "(11) 98765-4321",
			address: "Rua Amadeu Martins, 401",
			createdAt: "06-10-2025/23:04",
		},
		{
			id: "b23def45",
			name: "Pedro Galembeck",
			email: "galembeckpedro@gmail.com",
			document: "123.456.789-00",
			phone: "(11) 98765-4321",
			address: "Rua Amadeu Martins, 401",
			createdAt: "05-10-2025/23:04",
		},
	];
}

export function ClientsPage() {
	const [data, setData] = useState<Client[]>([]);
	const [loading, setLoading] = useState(true);

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
		<main className="p-6">
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">Clientes</CardTitle>
					<CardDescription className="text-base">
						Visualize e gerencie todos os clientes cadastrados em sua plataforma
						através da tabela de clientes
					</CardDescription>

					<CardAction>
						<Button>Exportar</Button>
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
							searchableColumn={{
								key: "name",
								placeholder: "Buscar por cliente...",
							}}
						/>
					)}
				</CardContent>
			</Card>
		</main>
	);
}
