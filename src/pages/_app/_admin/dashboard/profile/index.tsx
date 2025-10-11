import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/_auth/use-auth";
import { PersonalInformation } from "./~components/personal-information";

export const Route = createFileRoute("/_app/_admin/dashboard/profile/")({
	component: ProfilePage,
	head: () => ({
		meta: [
			{
				title: "Perfil | fyno.business",
			},
		],
	}),
});

function ProfilePage() {
	const { user } = useAuth();

	const navigate = useNavigate();

	return (
		<main className="mx-auto w-full max-w-6xl space-y-8 px-4 py-8">
			<div className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
				<article>
					<h1 className="font-semibold text-2xl tracking-tight">
						Perfil do usuário
					</h1>
					{/* <p className="text-muted-foreground text-sm">
						Visualize e atualize suas informações pessoais através deste painel
					</p> */}
				</article>

				<Badge variant="secondary">ID: {user?.documentId}</Badge>
			</div>

			<Card className="w-full">
				<CardHeader>
					<CardTitle>Informações pessoais</CardTitle>
					<CardDescription>
						Visualize suas informações pessoais cadastradas em nossa plataforma
						através deste painel
					</CardDescription>

					<CardAction>
						<Button onClick={() => navigate({ to: "/dashboard/settings" })}>
							Editar
						</Button>
					</CardAction>
				</CardHeader>

				<CardContent>
					<PersonalInformation />
				</CardContent>

				<CardFooter>
					<p className="text-muted-foreground text-sm">
						Observação: caso deseje atualizar algum dado, clique no botão
						"Editar" para ser redirecionado à página de configurações e alterar
						suas informações.
					</p>
				</CardFooter>
			</Card>
		</main>
	);
}
