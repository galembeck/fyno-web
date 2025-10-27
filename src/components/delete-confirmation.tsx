/** biome-ignore-all lint/suspicious/noEmptyBlockStatements: required by @TanStack-Router */

import { Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteConfirmationProps {
  type: "api-key" | "webhook" | "product" | "client";
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClick: () => void;
}

const TYPE_META: Record<
  DeleteConfirmationProps["type"],
  {
    title: string;
    description: string;
  }
> = {
  "api-key": {
    title: "Excluir chave API",
    description:
      "Ao confirmar, a chave API será revogada e excluída de sua conta e não poderá mais ser utilizada. Deseja realmente excluir?",
  },
  webhook: {
    title: "Excluir webhook",
    description:
      "Ao confirmar, o webhook será revogado e excluído de sua conta e não poderá mais ser utilizado. Deseja realmente excluir?",
  },

  product: {
    title: "Excluir produto",
    description:
      "Ao confirmar, o produto será removido do seu catálogo e todas as cobranças que utilizam esse produto serão canceladas. Tem certeza que deseja continuar?",
  },
  client: {
    title: "Excluir cliente",
    description:
      "Ao confirmar, o cliente será removido do sua plataforma e todas as cobranças que utilizam esse cliente serão canceladas. Tem certeza que deseja continuar?",
  },
};

export function DeleteConfirmation({
  type,
  open,
  onOpenChange,
  onClick,
}: DeleteConfirmationProps) {
  const meta = TYPE_META[type];

  return (
    <AlertDialog onOpenChange={onOpenChange} open={open}>
      <AlertDialogContent className="flex flex-col items-center justify-center rounded-lg border-0 text-center">
        <AlertDialogHeader className="flex flex-col py-4 text-center">
          <AlertDialogTitle className="flex flex-col items-center justify-center gap-4 font-bold text-white text-xl">
            <Trash2 stroke="red" />
            {meta.title}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-base text-muted-foreground">
            {meta.description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row items-center justify-center py-4">
          <AlertDialogCancel
            className="border-0 bg-inherit text-white hover:bg-inherit hover:text-white/90"
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="gap-2 bg-red-500 text-white hover:bg-red-500/90"
            onClick={() => {
              onClick();
              onOpenChange(false);
              window.location.reload();
            }}
          >
            <Trash2 />
            Excluir
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
