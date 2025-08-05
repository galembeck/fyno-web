import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_landing/~components/sections/rewards")({
	component: Rewards,
});

export function Rewards() {
	return (
		<section id="rewards">
			<article className="flex flex-col items-center gap-6 py-10">
				<Badge className="bg-third-green-dark font-semibold text-primary-green uppercase">
					Seu sucesso merece ser celebrado
				</Badge>

				<h1 className="text-center font-bold text-4xl md:text-5xl">
					Fyno Rewards
				</h1>

				<p className="max-w-sm text-center text-secondary-gray md:max-w-3xl">
					Aqui, celebramos suas conquistas. Nosso programa de recompensas
					reconhece clientes de alto desempenho com prêmios exclusivos, placas
					de reconhecimento e experiências únicas.
				</p>

				<Button className="mt-7" variant="secondary">
					Conheça todas as premiações
					<ChevronRight />
				</Button>
			</article>
		</section>
	);
}
