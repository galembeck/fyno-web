/** biome-ignore-all lint/suspicious/noExplicitAny: required by webhook operations */
/** biome-ignore-all lint/correctness/noUnusedVariables: required by webhook operations */

import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { Check, Info, Plus } from "lucide-react";
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
import { MultiSelect } from "@/components/ui/multi-select";
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { webhookEvents } from "@/constants/_app/_admin/integrations/webhook-events";
import { useWebhooks } from "@/hooks/endpoints/integration/use-webhooks";

export const Route = createFileRoute(
  "/_app/admin/_pages/integration/webhooks/~components/create-webhook"
)({
  component: CreateWebhook,
});

const createFormSchema = z.object({
  name: z.string().nonempty({
    message: "O nome do webhook é obrigatório",
  }),
  url: z.string().url({
    message: "A URL do webhook deve ser válida",
  }),
  secret: z.string().url({
    message: "A chave-secreta do webhook deve ser válida",
  }),
  events: z.array(z.string()).min(1, {
    message: "Selecione ao menos um evento para o webhook",
  }),
});

export function CreateWebhook() {
  const { createWebhook, isCreating } = useWebhooks();

  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof createFormSchema>>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      name: "",
      url: "",
      secret: "",
      events: [],
    },
  });

  async function onSubmit(values: z.infer<typeof createFormSchema>) {
    try {
      await createWebhook({
        name: values.name,
        url: values.url,
        secret: values.secret,
        events: values.events,
      });

      toast.success("Webhook criado com sucesso!");
      setOpen(false);
      form.reset();
    } catch (error: any) {
      toast.error("Erro ao criar webhook", {
        description: "Tente novamente mais tarde...",
      });
    }
  }

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Criar webhook
        </Button>
      </DialogTrigger>

      <DialogContent aria-describedby="Create webhook">
        <DialogHeader>
          <DialogTitle>Criar webhook</DialogTitle>
        </DialogHeader>

        <Separator orientation="horizontal" />

        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Nome do Webhook
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4" stroke="blue" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Nome do webhook para identificá-lo no painel de
                          controle
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-none dark:bg-input-gray"
                      placeholder="Nome do webhook..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    URL
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4" stroke="blue" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>URL do webhook para receber as notificações</p>
                      </TooltipContent>
                    </Tooltip>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-none dark:bg-input-gray"
                      placeholder="https://url..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="secret"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Secret
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4" stroke="blue" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          Chave usada para identificar que o evento fo webhook
                          foi enviado pela Fyno. Ela vem como uma "query param"
                          na URL da requisição
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-none dark:bg-input-gray"
                      placeholder="https://secret..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="events"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Selecione os eventos</FormLabel>
                  <FormControl>
                    <MultiSelect
                      modalPopover={true}
                      onValueChange={field.onChange}
                      options={webhookEvents}
                      placeholder="Selecione o(s) evento(s)..."
                      value={field.value}
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
