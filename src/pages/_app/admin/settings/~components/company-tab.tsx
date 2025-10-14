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
import { formatCNPJ } from "@/lib/_auth/sign-up/format-masks";

export const Route = createFileRoute(
	"/_app/admin/settings/~components/company-tab"
)({
	component: CompanyTab,
});

export function CompanyTab() {
	const { user } = useAuth();

	return (
		<main className="flex flex-col gap-8">
			<Card className="w-full">
				<CardHeader>
					<CardTitle>Informações empresariais</CardTitle>
					<CardDescription>
						Dados físicos e operacionais de sua loja/empresa cadastrada na
						plataforma
					</CardDescription>
				</CardHeader>

				<CardContent>
					<article className="flex flex-col gap-6">
						<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:flex-row">
							<div>
								<Label
									className="mb-2 block font-medium text-sm"
									htmlFor="companyName"
								>
									Nome da empresa
								</Label>
								<Input disabled id="companyName" />
							</div>
							<div>
								<Label
									className="mb-2 block font-medium text-sm"
									htmlFor="cnpj"
								>
									CNPJ
								</Label>
								<Input
									disabled
									id="cnpj"
									value={formatCNPJ(user?.cnpj ?? "")}
								/>
							</div>
						</div>

						<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:flex-row">
							<div>
								<Label
									className="mb-2 block font-medium text-sm"
									htmlFor="fiscalAddress"
								>
									Endereço fiscal
								</Label>
								<Input disabled id="fiscalAddress" />
							</div>
						</div>

						<div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:flex-row">
							<div>
								<Label
									className="mb-2 block font-medium text-sm"
									htmlFor="companyDomain"
								>
									Domínio da loja/empresa
								</Label>
								<Input
									disabled
									id="companyDomain"
									placeholder="meu-dominio.com"
								/>
							</div>
							<div>
								<Label className="mb-2 block font-medium text-sm">
									Categoria/segmento do negócio
								</Label>
								<Select>
									<SelectTrigger className="w-full">
										<SelectValue placeholder="Selecione" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="br_dropshipping">
											Dropshipping BR
										</SelectItem>
										<SelectItem value="global_dropshipping">
											Dropshipping Global
										</SelectItem>
										<SelectItem value="ecommerce">E-Commerce</SelectItem>
										<SelectItem value="infoproducts">Infoprodutos</SelectItem>
										<SelectItem value="nutraceutics">Nutracêuticos</SelectItem>
										<SelectItem value="others">Outros</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
					</article>
				</CardContent>
			</Card>
		</main>
	)
}
