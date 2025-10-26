import {
  ArrowUpDown,
  BadgeDollarSign,
  Banknote,
  BookOpen,
  Box,
  Crown,
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

export const dashboardData = {
  consolidated: [
    {
      title: "Dashboard",
      url: "/app/dashboard",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/app/dashboard",
        },
      ],
    },
    {
      title: "Financeiro",
      url: "/app/financial",
      icon: BadgeDollarSign,
      items: [
        {
          title: "Pagamentos",
          url: "/app/payments",
        },
        // {
        // 	title: "Extratos",
        // 	url: "/app/extracts",
        // },
      ],
    },
    {
      title: "Gestão",
      url: "/app/mamagement",
      icon: BookOpen,
      items: [
        {
          title: "Clientes",
          url: "/app/clients",
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
      url: "/app/integration/api-keys",
      icon: SquareTerminal,
      isActive: false,
    },
    {
      title: "Webhooks",
      description:
        "Crie e gerencie seus webhooks para receber notificações de eventos",
      url: "/app/integration/webhooks",
      icon: Webhook,
      isActive: false,
    },
  ],

  primary: [
    {
      title: "Produtos",
      description: "Crie e gerencie os produtos disponvéis em sua loja",
      url: "/app/products",
      icon: ShoppingBag,
    },
    {
      title: "Cobranças",
      description: "Crie e gerencie as cobranças através de nossa plataforma",
      url: "/app/financial",
      icon: Banknote,
    },
    {
      title: "Links de Pagamento",
      description: "Crie e gerencie links de pagamento para seus clientes",
      url: "/app/mamagement",
      icon: Link,
    },
    {
      title: "Clientes",
      description: "Crie e gerencie os clientes de sua loja",
      url: "/app/mamagement",
      icon: User2,
    },
    {
      title: "Cupons",
      description: "Crie e gerencie cupons de desconto para seus clientes",
      url: "/app/mamagement",
      icon: Percent,
    },
    {
      title: "Saques",
      description: "Realize saques para sua conta através de nossa plataforma",
      url: "/app/mamagement",
      icon: ArrowUpDown,
    },
    {
      title: "Roadmap",
      description: "Visualize nosso roadmap e sugira novas funcionalidades",
      url: "/app/roadmap",
      icon: Menu,
    },
    {
      title: "Plugins",
      description:
        "Adicione plugins/funcionalidades de nossa plataforma em sua loja",
      url: "/app/plugins",
      icon: Box,
    },
    {
      title: "Parceria",
      description:
        "Saiba mais sobre o programa de parceria de nossa plataforma",
      url: "/app/partnership",
      icon: HandCoins,
      badge: Crown,
    },
    {
      title: "Disputas",
      description: "Visualize as disputas de pagamentos realizadas em sua loja",
      url: "/app/mamagement",
      icon: Swords,
    },
  ],
};

export const adminData = {
  consolidated: [
    {
      title: "Dashboard",
      url: "/app/dashboard",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Overview",
          url: "/app/dashboard",
        },
      ],
    },
  ],
};
