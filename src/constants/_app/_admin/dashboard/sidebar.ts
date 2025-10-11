import {
	AudioWaveform,
	BookOpen,
	Bot,
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
			url: "/dashboard",
			icon: SquareTerminal,
			isActive: true,
			items: [
				{
					title: "Overview",
					url: "/dashboard",
				},
				{
					title: "Starred",
					url: "#",
				},
				{
					title: "Settings",
					url: "#",
				},
			],
		},
		{
			title: "Models",
			url: "#",
			icon: Bot,
			items: [
				{
					title: "Genesis",
					url: "#",
				},
				{
					title: "Explorer",
					url: "#",
				},
				{
					title: "Quantum",
					url: "#",
				},
			],
		},
		{
			title: "Documentation",
			url: "#",
			icon: BookOpen,
			items: [
				{
					title: "Introduction",
					url: "#",
				},
				{
					title: "Get Started",
					url: "#",
				},
				{
					title: "Tutorials",
					url: "#",
				},
				{
					title: "Changelog",
					url: "#",
				},
			],
		},
		{
			title: "Configurações",
			url: "/dashboard/settings",
			icon: Settings2,
			// items: [
			// 	{
			// 		title: "General",
			// 		url: "/dashboard/settings",
			// 	},
			// 	{
			// 		title: "Team",
			// 		url: "#",
			// 	},
			// 	{
			// 		title: "Billing",
			// 		url: "#",
			// 	},
			// 	{
			// 		title: "Limits",
			// 		url: "#",
			// 	},
			// ],
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
