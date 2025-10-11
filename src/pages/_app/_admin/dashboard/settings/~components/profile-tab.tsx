import { createFileRoute } from "@tanstack/react-router";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useAuth } from "@/hooks/_auth/use-auth";
import { formatWhatsApp } from "@/lib/_auth/sign-up/format-masks";

export const Route = createFileRoute(
	"/_app/_admin/dashboard/settings/~components/profile-tab"
)({
	component: ProfileTab,
});

export function ProfileTab() {
	const { user } = useAuth();

	return (
		<main className="flex flex-col gap-8">
			<Card className="w-full">
				<CardHeader>
					<CardTitle>Informações pessoais</CardTitle>
					<CardDescription>
						Dados básicos/pessoais do titular da conta na plataforma
					</CardDescription>
				</CardHeader>

				<CardContent>
					<article className="flex flex-col gap-6">
						<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:flex-row">
							<div>
								<Label
									className="mb-2 block font-medium text-sm"
									htmlFor="nome"
								>
									Nome
								</Label>
								<Input disabled id="nome" value={user?.name} />
							</div>
							<div>
								<Label
									className="mb-2 block font-medium text-sm"
									htmlFor="lastname"
								>
									Sobrenome
								</Label>
								<Input disabled id="lastname" value={user?.lastname} />
							</div>
						</div>

						<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:flex-row">
							<div>
								<Label
									className="mb-2 block font-medium text-sm"
									htmlFor="email"
								>
									E-mail
								</Label>
								<Input disabled id="email" value={user?.email} />
							</div>
							<div>
								<Label
									className="mb-2 block font-medium text-sm"
									htmlFor="confirmEmail"
								>
									Confirmar e-mail
								</Label>
								<Input disabled id="confirmEmail" />
							</div>
						</div>

						<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:flex-row">
							<div>
								<Label
									className="mb-2 block font-medium text-sm"
									htmlFor="phone"
								>
									Telefone
								</Label>
								<Input
									disabled
									id="phone"
									value={formatWhatsApp(user?.phone ?? "")}
								/>
							</div>
							<div>
								<Label
									className="mb-2 block font-medium text-sm"
									htmlFor="supportPhone"
								>
									Telefone (suporte)
								</Label>
								<Input
									disabled
									id="supportPhone"
									value={formatWhatsApp(user?.supportPhone ?? "")}
								/>
							</div>
						</div>
					</article>
				</CardContent>
			</Card>

			<Card className="w-full">
				<CardHeader>
					<CardTitle>Preferências pessoais</CardTitle>
					<CardDescription>
						Idioma, fuso horário e moeda padrão para geração de relatórios
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<div>
							<Label className="mb-2 block font-medium text-sm">Idioma</Label>
							<Select defaultValue="pt-BR">
								<SelectTrigger>
									<SelectValue placeholder="Selecione" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="pt-BR">Português (Brasil)</SelectItem>
									<SelectItem value="en-US">English (US)</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div>
							<Label className="mb-2 block font-medium text-sm">
								Fuso Horário
							</Label>
							<Select defaultValue="America/Sao_Paulo">
								<SelectTrigger>
									<SelectValue placeholder="Selecione" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="America/Sao_Paulo">
										America/Sao_Paulo
									</SelectItem>
									<SelectItem value="UTC">UTC</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div>
							<Label className="mb-2 block font-medium text-sm">
								Moeda Padrão
							</Label>
							<Select defaultValue="BRL">
								<SelectTrigger>
									<SelectValue placeholder="Selecione" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="BRL">BRL</SelectItem>
									<SelectItem value="USD">USD</SelectItem>
									<SelectItem value="EUR">EUR</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				</CardContent>
			</Card>
		</main>
	);
}
