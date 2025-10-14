import { HandCoins, Landmark, Wallet } from "lucide-react";

export const financialSummaryData = [
	{
		id: 1,
		icon: Wallet,
		title: "Saldo total",
		amount: "R$ 1,250.00",
		color: "green",
	},
	{
		id: 2,
		icon: Landmark,
		title: "Saldo disponível (saques)",
		amount: "R$ 250.00",
		color: "blue",
	},
	{
		id: 3,
		icon: HandCoins,
		title: "Saldo retido (disputas)",
		amount: "R$ 1,000.00",
		color: "orange",
	},
];
