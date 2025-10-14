import type { LucideIcon } from "lucide-react";
import { sidebarData } from "./sidebar";

export interface NavigationItem {
	id: string;
	title: string;
	url: string;
	description: string;
	group: string;
	icon?: LucideIcon;
	keywords: string[];
}

export const searchNavigationItems: NavigationItem[] = [
	{
		id: "dashboard-overview",
		title: "Dashboard",
		url: "/admin/dashboard",
		description: "Visão geral do dashboard",
		group: "Principal",
		icon: sidebarData.navMain.find((item) => item.title === "Dashboard")?.icon,
		keywords: ["inicio", "home", "principal", "overview", "dashboard"],
	},

	{
		id: "financial-payments",
		title: "Pagamentos",
		url: "/admin/payments",
		description:
			"Visualize e gerencie todos os pagamentos realizados em sua plataforma",
		group: "Financeiro",
		icon: sidebarData.navMain.find((item) => item.title === "Financeiro")?.icon,
		keywords: ["financeiro", "overview", "pagamentos", "payments"],
	},
	{
		id: "financial-extracts",
		title: "Extratos",
		url: "/admin/extracts",
		description:
			"Histórico de entrada x saídas e saldos (total, disponível para saque e retido)",
		group: "Financeiro",
		icon: sidebarData.navMain.find((item) => item.title === "Financeiro")?.icon,
		keywords: ["financeiro", "overview", "extratos", "payments"],
	},

	{
		id: "management-clients",
		title: "Clientes",
		url: "/admin/clients",
		description: "Visualize e gerencie todos os clientes de sua plataforma",
		group: "Gestão",
		icon: sidebarData.navMain.find((item) => item.title === "Gestão")?.icon,
		keywords: [
			"gestão",
			"usuários",
			"membros",
			"equipe",
			"pessoas",
			"clientes",
			"clients",
			"gerenciamento",
		],
	},
	// {
	// 	id: "analytics",
	// 	title: "Analytics",
	// 	url: "/admin/dashboard/analytics",
	// 	description: "Métricas e relatórios",
	// 	group: "Relatórios",
	// 	keywords: ["analytics", "metricas", "relatorios", "estatisticas", "dados"],
	// },
	// {
	// 	id: "users",
	// 	title: "Usuários",
	// 	url: "/admin/dashboard/users",
	// 	description: "Gerenciar usuários do sistema",
	// 	group: "Administração",
	// 	keywords: ["usuarios", "membros", "equipe", "pessoas", "administracao"],
	// },
	// {
	// 	id: "orders",
	// 	title: "Pedidos",
	// 	url: "/admin/dashboard/orders",
	// 	description: "Visualizar e gerenciar pedidos",
	// 	group: "Vendas",
	// 	keywords: ["pedidos", "vendas", "compras", "transacoes", "orders"],
	// },
	// {
	// 	id: "products",
	// 	title: "Produtos",
	// 	url: "/admin/dashboard/products",
	// 	description: "Gerenciar catálogo de produtos",
	// 	group: "Inventário",
	// 	keywords: ["produtos", "catalogo", "inventario", "estoque", "items"],
	// },
	{
		id: "profile",
		title: "Perfil",
		url: "/admin/profile",
		description: "Gerenciar informações do perfil",
		group: "Conta",
		keywords: ["perfil", "usuario", "conta", "configuracoes pessoais", "dados"],
	},
	{
		id: "settings",
		title: "Configurações",
		url: "/admin/settings",
		description: "Configurações do sistema",
		group: "Sistema",
		keywords: [
			"configuracoes",
			"settings",
			"opcoes",
			"preferencias",
			"sistema",
		],
	},
	// {
	// 	id: "blog",
	// 	title: "Blog",
	// 	url: "/blog",
	// 	description: "Visualizar e gerenciar artigos do blog",
	// 	group: "Conteúdo",
	// 	keywords: ["blog", "artigos", "posts", "conteudo", "publicacoes"],
	// },
	// {
	// 	id: "blog-categories",
	// 	title: "Categorias do Blog",
	// 	url: "/admin/blog/categories",
	// 	description: "Gerenciar categorias dos artigos",
	// 	group: "Conteúdo",
	// 	keywords: ["categorias", "blog", "organizacao", "tags"],
	// },
	// {
	// 	id: "reports",
	// 	title: "Relatórios",
	// 	url: "/admin/reports",
	// 	description: "Relatórios detalhados do sistema",
	// 	group: "Relatórios",
	// 	keywords: ["relatorios", "reports", "dados", "estatisticas"],
	// },
	// {
	// 	id: "notifications",
	// 	title: "Notificações",
	// 	url: "/admin/notifications",
	// 	description: "Central de notificações",
	// 	group: "Sistema",
	// 	keywords: ["notificacoes", "alertas", "avisos", "mensagens"],
	// },
	// {
	// 	id: "security",
	// 	title: "Segurança",
	// 	url: "/admin/security",
	// 	description: "Configurações de segurança",
	// 	group: "Sistema",
	// 	keywords: ["seguranca", "senha", "autenticacao", "privacidade"],
	// },
	// {
	// 	id: "integrations",
	// 	title: "Integrações",
	// 	url: "/admin/integrations",
	// 	description: "Gerenciar integrações externas",
	// 	group: "Sistema",
	// 	keywords: ["integracoes", "apis", "conectores", "webhooks"],
	// },
	// {
	// 	id: "backup",
	// 	title: "Backup",
	// 	url: "/admin/backup",
	// 	description: "Backup e restauração de dados",
	// 	group: "Sistema",
	// 	keywords: ["backup", "restauracao", "dados", "recuperacao"],
	// },
	// {
	// 	id: "logs",
	// 	title: "Logs",
	// 	url: "/admin/logs",
	// 	description: "Visualizar logs do sistema",
	// 	group: "Sistema",
	// 	keywords: ["logs", "historico", "auditoria", "registros"],
	// },
];

export const getAllNavigationItems = (): NavigationItem[] => {
	const projectItems: NavigationItem[] = sidebarData.projects.map(
		(project) => ({
			id: `project-${project.name.toLowerCase().replace(/\s+/g, "-")}`,
			title: project.name,
			url: project.url === "#" ? "/admin/dashboard" : project.url,
			description: `Projeto: ${project.name}`,
			group: "Projetos",
			icon: project.icon,
			keywords: ["projeto", "project", project.name.toLowerCase()],
		})
	);

	return [...searchNavigationItems, ...projectItems];
};

export const groupNavigationItems = (items: NavigationItem[]) => {
	return items.reduce(
		(acc, item) => {
			const group = item.group;
			if (!acc[group]) {
				acc[group] = [];
			}
			acc[group].push(item);
			return acc;
		},
		{} as Record<string, NavigationItem[]>
	);
};
