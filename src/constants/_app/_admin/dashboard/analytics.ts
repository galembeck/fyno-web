import { MoveDownRight, MoveUpRight } from "lucide-react";

export const analytics = [
	{
		id: 1,
		title: "Total Revenue",
		icon: MoveUpRight,
		rate: {
			percentage: "12,5%",
			type: "increase" as const,
		},
		value: "$1,250.00",
		message: "Trending up this month",
		comment: "Visitors for the last 6 months",
	},
	{
		id: 2,
		title: "New Customers",
		icon: MoveUpRight,
		rate: {
			percentage: "20,0%",
			type: "decrease" as const,
		},
		value: "1,234",
		message: "Down 20% this period",
		comment: "Acquisition needs attention",
	},
	{
		id: 3,
		title: "Active Accounts",
		icon: MoveDownRight,
		rate: {
			percentage: "12,5%",
			type: "increase" as const,
		},
		value: "45,678",
		message: "Strong user retention",
		comment: "Engagement exceed targets",
	},
	{
		id: 4,
		title: "Growth Rate",
		icon: MoveUpRight,
		rate: {
			percentage: "4,5%",
			type: "increase" as const,
		},
		value: "4.5%",
		message: "Steady performance increase",
		comment: "Meets growth projections",
	},
];
