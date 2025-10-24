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
    url: "/app/dashboard",
    description: "Visão geral do dashboard",
    group: "Consolidado",
    icon: sidebarData.consolidated.find((item) => item.title === "Dashboard")
      ?.icon,
    keywords: ["inicio", "home", "consolidado", "overview", "dashboard"],
  },

  {
    id: "financial-payments",
    title: "Pagamentos",
    url: "/app/payments",
    description:
      "Visualize e gerencie todos os pagamentos realizados em sua plataforma",
    group: "Consolidado",
    icon: sidebarData.consolidated.find((item) => item.title === "Financeiro")
      ?.icon,
    keywords: ["financeiro", "overview", "pagamentos", "payments"],
  },
  // {
  // 	id: "financial-extracts",
  // 	title: "Extratos",
  // 	url: "/app/extracts",
  // 	description:
  // 		"Histórico de entrada x saídas e saldos (total, disponível para saque e retido)",
  // 	group: "Financeiro",
  // 	icon: sidebarData.navMain.find((item) => item.title === "Financeiro")?.icon,
  // 	keywords: ["financeiro", "overview", "extratos", "payments"],
  // },

  {
    id: "management-clients",
    title: "Clientes",
    url: "/app/clients",
    description: "Visualize e gerencie todos os clientes de sua plataforma",
    group: "Consolidado",
    icon: sidebarData.consolidated.find((item) => item.title === "Gestão")
      ?.icon,
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

  {
    id: "profile",
    title: "Perfil",
    url: "/app/profile",
    description: "Gerenciar informações do perfil",
    group: "Conta",
    keywords: ["perfil", "usuario", "conta", "configuracoes pessoais", "dados"],
  },
  {
    id: "settings",
    title: "Configurações",
    url: "/app/settings",
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
];

export const getAllNavigationItems = (): NavigationItem[] => {
  const integrationItems: NavigationItem[] = sidebarData.integration.map(
    (item) => ({
      id: `item-${item.title}`,
      title: item.title,
      url: item.url === "#" ? "/app/dashboard" : item.url,
      description: item.description,
      group: "Integração",
      icon: item.icon,
      keywords: [
        "projeto",
        "documentação",
        "developers",
        "desenvolvedores",
        "developer",
        "development",
        "desenvolvedor",
        "integração",
        "integrations",
        "api",
        "docs",
        item.title.toLowerCase(),
      ],
    })
  );

  const transactionItems: NavigationItem[] = sidebarData.primary.map(
    (item) => ({
      id: `item-${item.title}`,
      title: item.title,
      url: item.url === "#" ? "/app/dashboard" : item.url,
      description: item.description,
      group: "Transações",
      icon: item.icon,
      keywords: [
        "transações",
        "transactions",
        "produtos",
        "cobranças",
        "links de pagamento",
        "clientes",
        "cupons",
        "saques",
        "roadmap",
        "plugins",
        "parceria",
        "disputas",
        item.title.toLowerCase(),
      ],
    })
  );

  return [...searchNavigationItems, ...integrationItems, ...transactionItems];
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
