import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
	CheckCircle2,
	CircleX,
	CreditCard,
	LoaderCircle,
	Receipt,
	Smartphone,
	Timer,
} from "lucide-react";
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
import { paymentsTableColumns, type Payment } from "../../../_financial/payments/~components/payments-table";

export const Route = createFileRoute(
	"/_app/admin/dashboard/_overview/~components/payments-summary"
)({
	component: PaymentsSummary,
});

async function getData(): Promise<Payment[]> {
	await new Promise((resolve) => setTimeout(resolve, 100));

	return [
		{
			id: "728ed52f",
			client: "Pedro Galembeck",
			email: "galembeckpedro@gmail.com",
			status: "pendente",
			paymentMethod: "cartão",
			amount: 100,
			payedAt: "12-10-2025/23:04",
		},
		{
			id: "489e1d42",
			client: "Pedro Galembeck",
			email: "galembeckpedro@gmail.com",
			status: "falhou",
			paymentMethod: "boleto",
			amount: 100,
			payedAt: "11-10-2025/23:04",
		},
		{
			id: "629ea370",
			client: "Pedro Galembeck",
			email: "galembeckpedro@gmail.com",
			status: "processando",
			paymentMethod: "pix",
			amount: 100,
			payedAt: "10-10-2025/23:04",
		},
		{
			id: "674f05da",
			client: "Pedro Galembeck",
			email: "galembeckpedro@gmail.com",
			status: "processando",
			paymentMethod: "pix",
			amount: 100,
			payedAt: "09-10-2025/23:04",
		},
		{
			id: "803ad09a",
			client: "Pedro Galembeck",
			email: "galembeckpedro@gmail.com",
			status: "aprovado",
			paymentMethod: "cartão",
			amount: 100,
			payedAt: "08-10-2025/23:04",
		},
		{
			id: "90b6ad53",
			client: "Pedro Galembeck",
			email: "galembeckpedro@gmail.com",
			status: "aprovado",
			paymentMethod: "pix",
			amount: 100,
			payedAt: "07-10-2025/23:04",
		},
		{
			id: "a15bcd89",
			client: "Pedro Galembeck",
			email: "galembeckpedro@gmail.com",
			status: "pendente",
			paymentMethod: "boleto",
			amount: 100,
			payedAt: "06-10-2025/23:04",
		},
		{
			id: "b23def45",
			client: "Pedro Galembeck",
			email: "galembeckpedro@gmail.com",
			status: "aprovado",
			paymentMethod: "boleto",
			amount: 100,
			payedAt: "05-10-2025/23:04",
		},
	];
}

export function PaymentsSummary() {
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
				<CardTitle>Pagamentos recentes</CardTitle>
				<CardDescription>
					Veja e gerencie os últimos pagamentos realizados em sua plataforma
				</CardDescription>

				<CardAction>
					<Button onClick={() => navigate({ to: "/admin/payments" })}>
						Ver todos
					</Button>
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
