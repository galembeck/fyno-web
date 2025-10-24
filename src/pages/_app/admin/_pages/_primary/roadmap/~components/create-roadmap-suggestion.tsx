/** biome-ignore-all lint/suspicious/noExplicitAny: required ti supress linting errors */

import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";
import { useRoadmap } from "@/hooks/endpoints/roadmap/use-roadmap";

export const Route = createFileRoute(
  "/_app/admin/_pages/_primary/roadmap/~components/create-roadmap-suggestion"
)({
  component: CreateRoadmapSuggestion,
});

const createSuggestionFormSchema = z.object({
  title: z.string().nonempty({ message: "O título da sugestão é obrigatório" }),
  description: z.string().nonempty({
    message: "A descrição da sugestão é obrigatória",
  }),
});

export function CreateRoadmapSuggestion() {
  const { createSuggestion, isCreating } = useRoadmap();

  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof createSuggestionFormSchema>>({
    resolver: zodResolver(createSuggestionFormSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof createSuggestionFormSchema>) {
    try {
      await createSuggestion({
        title: values.title,
        description: values.description,
      });

      toast.success("Sugestão registrada com sucesso!", {
        description: "Em breve ela será analisada e aceita para votação...",
      });
      setOpen(false);
      form.reset();
      // biome-ignore lint/correctness/noUnusedVariables: required by error handling
    } catch (error: any) {
      toast.error("Erro ao registrar sugestão :(", {
        description: "Tente novamente mais tarde...",
      });
    }
  }

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button className="bg-primary-green hover:bg-primary-green/80!">
          <Plus />
          Sugestão
        </Button>
      </DialogTrigger>

      <DialogContent aria-describedby="Create suggestion">
        <DialogHeader>
          <DialogTitle>Nos dê sua sugestão</DialogTitle>
        </DialogHeader>

        <Separator orientation="horizontal" />

        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título da sugestão</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-none dark:bg-input-gray"
                      placeholder="Ex: Implementar autenticação 2FA"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição da sugestão</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      className="border-none dark:bg-input-gray"
                      placeholder="Descreva a funcionalidade sugerida..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-4 flex items-center gap-4">
              <Button
                onClick={() => setOpen(false)}
                type="reset"
                variant="outline"
              >
                Cancelar
              </Button>
              <Button disabled={isCreating} type="submit">
                {isCreating ? (
                  <Spinner className="h-4 w-4 animate-spin" />
                ) : (
                  <p>Enviar sugestão</p>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
