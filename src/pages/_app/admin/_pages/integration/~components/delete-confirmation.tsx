/** biome-ignore-all lint/suspicious/noEmptyBlockStatements: required by @TanStack-Router */

import { createFileRoute } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute(
  "/_app/admin/_pages/integration/~components/delete-confirmation"
)({
  component: () => (
    <DeleteConfirmation
      onClick={() => {}}
      onOpenChange={() => {}}
      open={false}
      type="api-key"
    />
  ),
});

interface DeleteConfirmationProps {
  type: "api-key" | "webhook";
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClick: () => void;
}

export function DeleteConfirmation({
  type,
  open,
  onOpenChange,
  onClick,
}: DeleteConfirmationProps) {
  const [_openConfirm, setOpenConfirm] = useState(false);

  return (
    <AlertDialog onOpenChange={onOpenChange} open={open}>
      <AlertDialogTrigger asChild />

      <AlertDialogContent className="flex flex-col items-center justify-center rounded-lg border-0 text-center">
        <AlertDialogHeader className="flex flex-col py-4 text-center">
          <AlertDialogTitle className="flex flex-col items-center justify-center gap-4 font-bold text-white">
            <Trash2 stroke="red" />
            {type === "api-key"
              ? "Tem certeza que deseja excluir a chave API?"
              : "Tem certeza que deseja excluir o webhook?"}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-muted-foreground">
            {type === "api-key"
              ? "Ao confirmar, a chave API será revogada e excluída de sua conta, não podendo ser mais utilizada. Deseja realmente excluir?"
              : "Ao confirmar, o webhook será revogado e excluído de sua conta, não podendo ser mais utilizado. Deseja realmente excluir?"}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row items-center justify-center py-4">
          <AlertDialogCancel
            className="border-0 bg-inherit text-white hover:bg-inherit hover:text-white/90"
            onClick={() => setOpenConfirm(false)}
          >
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className="gap-2 bg-red-500 text-white hover:bg-red-500/90"
            onClick={() => {
              onClick();
              setOpenConfirm(false);
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
