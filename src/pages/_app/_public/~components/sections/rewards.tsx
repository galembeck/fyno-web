/** biome-ignore-all lint/performance/noImgElement: required by @Vite */

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Building2, ChevronRight, Crown, Plane } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute(
	"/_app/_public/~components/sections/rewards"
)({
	component: Rewards,
});

export function Rewards() {
	const navigate = useNavigate();

	const handleNavigateToRewards = () => {
		navigate({ to: "/rewards" });
	};

	return (
		<section className="px-4 py-10 md:px-8 lg:px-16 lg:py-20" id="rewards">
			<article className="flex flex-col items-center gap-6 pb-10">
				<Badge className="bg-third-green-light font-semibold text-black uppercase dark:bg-third-green-dark dark:text-primary-green">
					Seu sucesso merece ser celebrado
				</Badge>

				<h1 className="text-center font-bold text-4xl md:text-5xl">
					Fyno Rewards
				</h1>

				<p className="max-w-sm text-center text-muted-foreground md:max-w-3xl dark:text-secondary-gray">
					Aqui, celebramos suas conquistas. Nosso programa de recompensas
					reconhece clientes de alto desempenho com prêmios exclusivos, placas
					de reconhecimento e experiências únicas.
				</p>

				<Button
					className="mt-7"
					onClick={handleNavigateToRewards}
					variant="secondary"
				>
					Conheça todas as premiações
					<ChevronRight />
				</Button>
			</article>

			<div className="mx-auto max-w-7xl space-y-4 md:grid md:grid-cols-3 md:gap-4 md:space-y-0 lg:gap-6">
				<div className="rounded-2xl bg-gradient-to-br from-lime-300 to-lime-400 p-10 text-black md:col-span-2">
					<div className="mb-4">
						<Building2 className="h-8 w-8" />
					</div>
					<h3 className="mb-3 font-bold text-xl">Saque Automático</h3>
					<p className="text-sm leading-relaxed">
						Receba seus pagamentos sem complicação. Configure saques automáticos
						para sua conta e tenha previsibilidade no fluxo de caixa.
					</p>
				</div>

				<div className="relative flex min-h-[200px]">
					<img
						alt="Board Reward"
						className="absolute h-full w-full rounded-2xl object-cover"
						src="https://framerusercontent.com/images/P9HOA6jFv9DvYCci4Or63wlnxCw.png"
					/>
				</div>

				<div className="relative h-64">
					<img
						alt="Person"
						className="absolute inset-0 h-full w-full rounded-2xl object-cover"
						src="https://framerusercontent.com/images/0TbGyB6OaV7Vbf7Es4xFdXFE0.png"
					/>
				</div>

				<div className="rounded-2xl bg-black p-10 text-white">
					<div className="mb-4">
						<Crown className="h-8 w-8 text-yellow-400" />
					</div>
					<h3 className="mb-3 font-bold text-xl">Fyno Elite</h3>
					<p className="text-gray-300 text-sm leading-relaxed">
						Tenha acesso a condições diferenciadas, suporte prioritário e
						benefícios exclusivos para impulsionar ainda mais o seu negócio.
					</p>
				</div>

				<div className="relative h-64">
					<img
						alt="Person"
						className="absolute inset-0 h-full w-full rounded-2xl object-cover"
						src="https://framerusercontent.com/images/GVBydWfB2wk28qy1sUmKg9reixA.jpg"
					/>
				</div>

				<div className="relative h-52 overflow-hidden rounded-2xl md:col-span-1">
					<img
						alt="Yatch"
						className="absolute inset-0 h-full w-full object-cover"
						src="https://framerusercontent.com/images/ESrKE7Ybglu2MIi5mPPDlV0uNt8.png"
					/>
				</div>

				<div className="rounded-2xl bg-gradient-to-br from-green-800 to-green-900 p-6 text-white md:col-span-2">
					<div className="mb-4">
						<Plane className="h-8 w-8" />
					</div>
					<h3 className="mb-3 font-bold text-xl">Viagens Exclusivas</h3>
					<p className="text-green-100 text-sm leading-relaxed">
						Alcance novos patamares e celebre suas metas com viagens incríveis,
						totalmente custeadas pela Fyno.
					</p>
				</div>
			</div>
		</section>
	);
}
