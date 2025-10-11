import { createFileRoute } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/_auth/use-auth";
import {
	formatCNPJ,
	formatWhatsApp,
} from "./../../../../../../lib/_auth/sign-up/format-masks";

export const Route = createFileRoute(
	"/_app/_admin/dashboard/profile/~components/personal-information"
)({
	component: PersonalInformation,
});

export function PersonalInformation() {
	const { user } = useAuth();

	return (
		<article className="flex flex-col gap-6">
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:flex-row">
				<div>
					<Label className="mb-2 block font-medium text-sm" htmlFor="nome">
						Nome
					</Label>
					<Input disabled id="nome" value={user?.name} />
				</div>
				<div>
					<Label className="mb-2 block font-medium text-sm" htmlFor="lastname">
						Sobrenome
					</Label>
					<Input disabled id="lastname" value={user?.lastname} />
				</div>
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:flex-row">
				<div>
					<Label className="mb-2 block font-medium text-sm" htmlFor="email">
						E-mail
					</Label>
					<Input disabled id="email" value={user?.email} />
				</div>
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:flex-row">
				<div>
					<Label className="mb-2 block font-medium text-sm" htmlFor="phone">
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

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:flex-row">
				<div>
					<Label className="mb-2 block font-medium text-sm" htmlFor="cnpj">
						CNPJ
					</Label>
					<Input disabled id="cnpj" value={formatCNPJ(user?.cnpj ?? "")} />
				</div>
				<div>
					<Label
						className="mb-2 block font-medium text-sm"
						htmlFor="monthlyRevenue"
					>
						Faturamento mensal
					</Label>
					<Input disabled id="monthlyRevenue" value={user?.monthlyRevenue} />
				</div>
			</div>

			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:flex-row">
				<div>
					<Label className="mb-2 block font-medium text-sm" htmlFor="role">
						Cargo/permissão
					</Label>
					<Input disabled id="role" value={user?.role?.name} />
					<Label
						className="mt-2 block text-muted-foreground text-sm"
						htmlFor="role"
					>
						{user?.role?.description}
					</Label>
				</div>
				<div>
					<Label className="mb-2 block font-medium text-sm" htmlFor="blocked">
						Bloqueado
					</Label>
					<Input disabled id="blocked" value={user?.blocked ? "Sim" : "Não"} />
				</div>
			</div>
		</article>
	);
}
