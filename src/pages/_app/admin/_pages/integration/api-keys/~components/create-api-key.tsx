/** biome-ignore-all lint/suspicious/noExplicitAny: required by API key creation */
/** biome-ignore-all lint/correctness/noUnusedVariables: required by API key creation */

import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { Check, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { useApiKeys } from "@/hooks/integration/use-api-keys";
import { ApiKeyOrigins } from "@/utils/_admin/enums/api-key-origins";

export const Route = createFileRoute(
  "/_app/admin/_pages/integration/api-keys/~components/create-api-key"
)({
  component: CreateAPIKey,
});

const createFormSchema = z.object({
  notes: z.string().nonempty({
    message: "As notas da chave são obrigatórias",
  }),
});

export function CreateAPIKey() {
  const { createKey, isCreating } = useApiKeys();

  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof createFormSchema>>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      notes: "",
    },
  });

  async function onSubmit(values: z.infer<typeof createFormSchema>) {
    try {
      await createKey({
        notes: values.notes,
        origin: ApiKeyOrigins.DASHBOARD,
      });

      toast.success("Chave API criada com sucesso!");
      setOpen(false);
      form.reset();
    } catch (error: any) {
      toast.error("Erro ao criar chave API", {
        description: "Tente novamente mais tarde...",
      });
    }
  }

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Criar chave API
        </Button>
      </DialogTrigger>

      <DialogContent aria-describedby="Create API key">
        <DialogHeader>
          <DialogTitle>Criar chave API</DialogTitle>
        </DialogHeader>

        <Separator orientation="horizontal" />

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notas</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-none dark:bg-input-gray"
                      placeholder="Notas/descrição para indetificação da chave..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-4">
              <Button disabled={isCreating} type="submit">
                {isCreating ? (
                  <div className="flex gap-4">
                    <Spinner className="h-4 w-4 animate-spin" />
                    <p>Salvando...</p>
                  </div>
                ) : (
                  <div className="flex gap-4">
                    <p>Salvar</p>
                    <Check className="h-4 w-4" />
                  </div>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
