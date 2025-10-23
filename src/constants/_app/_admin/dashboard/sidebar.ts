import {
  ArrowUpDown,
  BadgeDollarSign,
  Banknote,
  BookOpen,
  Box,
  FolderCode,
  HandCoins,
  Link,
  Menu,
  Percent,
  ShoppingBag,
  SquareTerminal,
  Swords,
  User2,
  Webhook,
} from "lucide-react";

export const sidebarData = {
  consolidated: [
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
        // {
        // 	title: "Extratos",
        // 	url: "/admin/extracts",
        // },
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
  ],

  integration: [
    {
      title: "Documentação",
      description:
        "Acesse a documentação da Fyno para desenvolvedores em sua plataforma",
      url: "#",
      icon: FolderCode,
      isActive: false,
    },
    {
      title: "API",
      description:
        "Crie e gerencie suas chaves de API para integrar nossa plataforma em sua loja",
      url: "/admin/integration/api-keys",
      icon: SquareTerminal,
      isActive: false,
    },
    {
      title: "Webhooks",
      description:
        "Crie e gerencie seus webhooks para receber notificações de eventos",
      url: "/admin/integration/webhooks",
      icon: Webhook,
      isActive: false,
    },
  ],

  primary: [
    {
      title: "Produtos",
      description: "Crie e gerencie os produtos disponvéis em sua loja",
      url: "/admin/dashboard",
      icon: ShoppingBag,
    },
    {
      title: "Cobranças",
      description: "Crie e gerencie as cobranças através de nossa plataforma",
      url: "/admin/financial",
      icon: Banknote,
    },
    {
      title: "Links de Pagamento",
      description: "Crie e gerencie links de pagamento para seus clientes",
      url: "/admin/mamagement",
      icon: Link,
    },
    {
      title: "Clientes",
      description: "Crie e gerencie os clientes de sua loja",
      url: "/admin/mamagement",
      icon: User2,
    },
    {
      title: "Cupons",
      description: "Crie e gerencie cupons de desconto para seus clientes",
      url: "/admin/mamagement",
      icon: Percent,
    },
    {
      title: "Saques",
      description: "Realize saques para sua conta através de nossa plataforma",
      url: "/admin/mamagement",
      icon: ArrowUpDown,
    },
    {
      title: "Roadmap",
      description: "Visualize nosso roadmap e sugira novas funcionalidades",
      url: "/admin/mamagement",
      icon: Menu,
    },
    {
      title: "Plugins",
      description:
        "Adicione plugins/funcionalidades de nossa plataforma em sua loja",
      url: "/admin/mamagement",
      icon: Box,
    },
    {
      title: "Parceria",
      description:
        "Saiba mais sobre o programa de parceria de nossa plataforma",
      url: "/admin/mamagement",
      icon: HandCoins,
    },
    {
      title: "Disputas",
      description: "Visualize as disputas de pagamentos realizadas em sua loja",
      url: "/admin/mamagement",
      icon: Swords,
    },
  ],
};
