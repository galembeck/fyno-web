import { createFileRoute } from "@tanstack/react-router";
import {
	ArrowRight,
	BadgeDollarSign,
	BadgeQuestionMark,
	Check,
} from "lucide-react";
import { BenefitCard } from "@/components/benefit-card";

export const Route = createFileRoute("/_landing/~components/sections/benefits")(
	{
		component: Benefits,
	}
);

export function Benefits() {
	return (
		<section className="flex flex-col lg:py-16">
			<BenefitCard
				badge="Sem Barreiras, Sem Complicação"
				callToAction={{
					text: "Começar agora",
					path: "/",
					icon: <ArrowRight />,
					hoverIcon: <Check />,
				}}
				description="Suas transações passam pelas melhores adquirentes, garantindo a
						maior taxa de aprovação do mercado, e que apenas transações seguras
						sejam processadas."
				imgUrl="https://framerusercontent.com/images/nReA4jMe5DbulB6yJGlizHOGNw.gif?scale-down-to=1024"
				title="Segurança e aprovação em cada transação"
			/>

			<BenefitCard
				badge="Liquidez instantânea"
				callToAction={{
					text: "Saiba mais",
					path: "/",
					icon: <BadgeQuestionMark />,
					hoverIcon: <Check />,
				}}
				description="Aprovou? O valor cai na sua conta automaticamente, sem burocracia. Saque quando quiser, com alta disponibilidade e segurança."
				imgUrl="https://framerusercontent.com/images/Mm0AVuiF1lMuk9cFVVwncbeAriU.gif?scale-down-to=1024"
				order="reverse"
				title="Seu saldo disponível para saque imediato"
			/>

			<BenefitCard
				badge="Escalabilidade real"
				callToAction={{
					text: "Abrir conta",
					path: "/",
					icon: <BadgeDollarSign />,
					hoverIcon: <Check />,
				}}
				description="Seja qual for o volume, processamos suas transações com estabilidade e baixa latência. Escale sem preocupações e sem barreiras."
				imgUrl="https://framerusercontent.com/images/m38Yb07do9oj4O3MGbGuFGvSSM.gif?scale-down-to=1024"
				title="Pagamentos que acompanham o seu ritmo"
			/>
		</section>
	);
}
