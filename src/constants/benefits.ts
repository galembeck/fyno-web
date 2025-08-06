import {
	ArrowRight,
	BadgeDollarSign,
	BadgeQuestionMark,
	Check,
} from "lucide-react";

export const benefits = [
	{
		id: 1,
		badge: "Sem Barreiras, Sem Complicação",
		title: "Segurança e aprovação em cada transação",
		description:
			"Suas transações passam pelas melhores adquirentes, garantindo a maior taxa de aprovação do mercado, e que apenas transações seguras sejam processadas.",
		callToAction: {
			text: "Começar agora",
			path: "/",
			icon: ArrowRight,
			hoverIcon: Check,
		},
		imgUrl:
			"https://framerusercontent.com/images/nReA4jMe5DbulB6yJGlizHOGNw.gif?scale-down-to=1024",
		order: "normal",
	},
	{
		id: 2,
		badge: "Liquidez instantânea",
		title: "Seu saldo disponível para saque imediato",
		description:
			"Aprovou? O valor cai na sua conta automaticamente, sem burocracia. Saque quando quiser, com alta disponibilidade e segurança.",
		callToAction: {
			text: "Saiba mais",
			path: "/",
			icon: BadgeQuestionMark,
			hoverIcon: Check,
		},
		imgUrl:
			"https://framerusercontent.com/images/Mm0AVuiF1lMuk9cFVVwncbeAriU.gif?scale-down-to=1024",
		order: "reverse",
	},
	{
		id: 3,
		badge: "Escalabilidade real",
		title: "Pagamentos que acompanham o seu ritmo",
		description:
			"Seja qual for o volume, processamos suas transações com estabilidade e baixa latência. Escale sem preocupações e sem barreiras.",
		callToAction: {
			text: "Abrir conta",
			path: "/",
			icon: BadgeDollarSign,
			hoverIcon: Check,
		},
		imgUrl:
			"https://framerusercontent.com/images/m38Yb07do9oj4O3MGbGuFGvSSM.gif?scale-down-to=1024",
		order: "normal",
	},
];
