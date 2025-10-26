import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
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
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute(
  "/_app/app/_pages/_primary/plugins/~components/configure-plugin-modal"
)({
  component: () => <ConfigurePluginModal description="" title="" />,
});

interface ConfigurePluginModalProps {
  title: string;
  description: string;
}

const configurePluginFormSchema = z.object({
  status: z.boolean().default(false),
  apiKey: z.string().nonempty({
    message: "A chave API é obrigatória",
  }),
});

export function ConfigurePluginModal({
  title,
  description,
}: ConfigurePluginModalProps) {
  const [open, setOpen] = useState(false);

  const form = useForm({
    resolver: zodResolver(configurePluginFormSchema),
    defaultValues: {
      status: false,
      apiKey: "",
    },
  });

  // async function onSubmit(values: z.infer<typeof createFormSchema>) {
  //   try {
  //     await createProduct({
  //       id: values.id,
  //       name: values.name,
  //       description: values.description,
  //       price: values.price,
  //     });

  //     toast.success("Produto criado com sucesso!");
  //     setOpen(false);
  //     form.reset();
  //   } catch (error: any) {
  //     toast.error("Erro ao criar produto", {
  //       description: "Tente novamente mais tarde...",
  //     });
  //   }
  // }

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button
          className="max-w-fit bg-primary-green hover:bg-primary-green/80!"
          onClick={() => setOpen(true)}
        >
          Configurar Plugin
        </Button>
      </DialogTrigger>

      <DialogContent aria-describedby="Configure Plugin">
        <DialogHeader>
          <DialogTitle>Configuração {title}</DialogTitle>
        </DialogHeader>

        <Separator orientation="horizontal" />

        <Form {...form}>
          <form
            className="space-y-10"
            // onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <article>
                      <FormLabel className="text-base">
                        Status do Plugin
                      </FormLabel>
                      <p className="font-normal text-muted-foreground text-sm">
                        {form.watch("status") ? (
                          <p>
                            O plugin está{" "}
                            <span className="font-bold">ativo</span> e pronto
                            para ser configurado
                          </p>
                        ) : (
                          <p>
                            O plugin está{" "}
                            <span className="font-bold">inativo</span> e não
                            pode ser configurado
                          </p>
                        )}
                      </p>
                    </article>

                    <FormControl>
                      <Switch
                        checked={field.value}
                        disabled={field.disabled}
                        name={field.name}
                        onBlur={field.onBlur}
                        onCheckedChange={field.onChange}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="apiKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1 text-base">
                    Chave da API
                    <span className="mt-2 text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-none dark:bg-input-gray/50"
                      placeholder={`Digite sua chave da API ${title}...`}
                    />
                  </FormControl>
                  <FormMessage />

                  <p className="text-muted-foreground text-xs">{description}</p>
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Salvar configurações</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
