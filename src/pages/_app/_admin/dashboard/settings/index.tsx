import { createFileRoute } from "@tanstack/react-router";
import { Building, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/_auth/use-auth";
import { CompanyTab } from "./~components/company-tab";
import { ProfileTab } from "./~components/profile-tab";

export const Route = createFileRoute("/_app/_admin/dashboard/settings/")({
	component: SettingsPage,
	head: () => ({
		meta: [
			{
				title: "Configurações de Conta | fyno.business",
			},
		],
	}),
});

function SettingsPage() {
	const { user } = useAuth();

	return (
		<main className="mx-auto w-full max-w-6xl space-y-8 px-4 py-8">
			<div className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
				<article>
					<h1 className="font-semibold text-2xl tracking-tight">
						Configurações de conta
					</h1>
					<p className="text-muted-foreground text-sm">
						Visualize e atualize suas informações pessoais através deste painel
					</p>
				</article>

				<Badge variant="secondary">ID: {user?.documentId}</Badge>
			</div>

			<Tabs defaultValue="profile">
				<TabsList>
					<TabsTrigger value="profile">
						<User />
						Perfil
					</TabsTrigger>
					<TabsTrigger value="company">
						<Building />
						Empresa
					</TabsTrigger>
				</TabsList>

				<TabsContent value="profile">
					<ProfileTab />
				</TabsContent>
				<TabsContent value="company">
					<CompanyTab />
				</TabsContent>
			</Tabs>
		</main>
	);
}
