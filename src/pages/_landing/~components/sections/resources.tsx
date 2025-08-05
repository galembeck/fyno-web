import { createFileRoute } from "@tanstack/react-router";
import {
	CheckCircle2,
	CloudCheck,
	History,
	Landmark,
	ShieldCheck,
	SquaresExclude,
} from "lucide-react";
import { ResourceCard } from "@/components/resource-card";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute(
	"/_landing/~components/sections/resources"
)({
	component: Resources,
});

export function Resources() {
	return (
		<section className="flex flex-col items-center" id="resources">
			<article className="flex flex-col items-center gap-6 py-10">
				<Badge className="bg-third-green-dark font-semibold text-primary-green uppercase">
					Tecnologia que impulsiona
				</Badge>

				<h1 className="text-center font-bold text-4xl md:text-5xl">
					Mais vendas, menos preocupações
				</h1>

				<p className="max-w-sm text-center text-secondary-gray md:max-w-full">
					Transforme a maneira como você vende na internet.
				</p>
			</article>

			<div className="grid grid-cols-1 gap-5 py-6 md:grid-cols-2 lg:grid-cols-3">
				<ResourceCard
					description="Receba seus pagamentos sem complicação. Configure saques automáticos para sua conta e tenha controle total sobre o fluxo de caixa."
					icon={<Landmark />}
					title="Saque automático"
				/>
				<ResourceCard
					description="Proteção de alto nível para cada transação. Detectamos riscos em tempo real, minimizando fraudes sem interferir na conversão."
					icon={<ShieldCheck />}
					title="Antifraude"
				/>
				<ResourceCard
					description="Mais pagamentos aprovados, menos obstáculos. Nossa tecnologia de otimização aumenta as conversões com inteligência adaptativa."
					icon={<CheckCircle2 />}
					title="Taxa de aprovação de 98%"
				/>
				<ResourceCard
					description="Processamentos sem interrupções. Nossa infraestrutura robusta garante pagamentos contínuos, mesmo em grandes volumes."
					icon={<CloudCheck />}
					title="Alta disponibilidade"
				/>
				<ResourceCard
					description="Menos falhas, mais vendas. Nosso sistema identifica o momento certo para tentativas de pagamento, reduzindo recusas."
					icon={<History />}
					title="Retentativa inteligente"
				/>
				<ResourceCard
					description="Processamos pagamentos com diversas adquirentes, garantindo taxas de aprovação mais altas e performance superior."
					icon={<SquaresExclude />}
					title="Multiadquirência"
				/>
			</div>
		</section>
	);
}
