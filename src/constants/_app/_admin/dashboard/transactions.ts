import {
  ArrowLeftRight,
  ArrowUp,
  BanknoteArrowDown,
  Lock,
  PiggyBank,
  RefreshCcw,
} from "lucide-react";

export const transactions = [
  {
    badge: ArrowUp,
    type: "currency",
    title: "1250,45",
    description: "Total disponível",
    icon: BanknoteArrowDown,
  },
  {
    badge: RefreshCcw,
    type: "number",
    title: "125",
    description: "Transações completas",
    icon: ArrowLeftRight,
  },
  {
    badge: Lock,
    type: "currency",
    title: "575,70",
    description: "Total bloqueado em disputas",
    icon: PiggyBank,
  },
];
