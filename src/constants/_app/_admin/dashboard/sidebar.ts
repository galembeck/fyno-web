import {
	AudioWaveform,
	BadgeDollarSign,
	BookOpen,
	Command,
	Frame,
	GalleryVerticalEnd,
	MapIcon,
	PieChart,
	Settings2,
	SquareTerminal,
} from "lucide-react";

export const sidebarData = {
	teams: [
		{
			name: "Galembeck's Coorp.",
			logo: GalleryVerticalEnd,
			plan: "Enterprise",
		},
		{
			name: "Acme Corp.",
			logo: AudioWaveform,
			plan: "Startup",
		},
		{
			name: "Evil Corp.",
			logo: Command,
			plan: "Free",
		},
	],

	navMain: [
		{
			title: "Dashboard",
			url: "/admin/dashboard",
			icon: SquareTerminal,
			isActive: true,
			items: [
				{
					title: "Overview",
					url: "/admin/dashboard",
				},
			],
		},
		{
			title: "Financeiro",
			url: "/admin/financial",
			icon: BadgeDollarSign,
			items: [
				{
					title: "Pagamentos",
					url: "/admin/payments",
				},
				{
					title: "Extratos",
					url: "/admin/extracts",
				},
			],
		},
		{
			title: "Gestão",
			url: "/admin/mamagement",
			icon: BookOpen,
			items: [
				{
					title: "Clientes",
					url: "/admin/clients",
				},
			],
		},
		{
			title: "Configurações",
			url: "/admin/settings",
			icon: Settings2,
		},
	],
	projects: [
		{
			name: "Design Engineering",
			url: "#",
			icon: Frame,
		},
		{
			name: "Sales & Marketing",
			url: "#",
			icon: PieChart,
		},
		{
			name: "Travel",
			url: "#",
			icon: MapIcon,
		},
	],
};
