/** biome-ignore-all lint/suspicious/noExplicitAny: required by webhook operations */
/** biome-ignore-all lint/correctness/noUnusedVariables: required by webhook operations */

import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { Check, Plus, X } from "lucide-react";
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
import { useCustomers } from "@/hooks/endpoints/v1/use-customer";
import {
  formatCNPJ,
  formatCPF,
  formatWhatsApp,
} from "@/lib/_auth/sign-up/format-masks";

export const Route = createFileRoute(
  "/_app/app/_pages/_primary/_management/clients/~components/create-client"
)({
  component: CreateClient,
});

const createFormSchema = z.object({
  name: z.string().min(2).max(100).nonempty({
    message: "O nome do cliente é obrigatório",
  }),
  phone: z.string().min(10).max(15).nonempty({
    message: "O telefone do cliente é obrigatório",
  }),
  email: z.string().email().nonempty({
    message: "O email do cliente é obrigatório",
  }),
  document: z.string().min(11).max(14).nonempty({
    message: "O documento do cliente é obrigatório",
  }),
  address: z.string().nonempty({
    message: "O endereço do cliente é obrigatório",
  }),
});

export function CreateClient() {
  const { createCustomer } = useCustomers();

  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof createFormSchema>>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      document: "",
      address: "",
    },
  });

  async function onSubmit(values: z.infer<typeof createFormSchema>) {
    try {
      await createCustomer({
        name: values.name,
        phone: values.phone,
        email: values.email,
        document: values.document,
        address: values.address,
      });

      toast.success("Cliente criado com sucesso!");
      setOpen(false);
      form.reset();
    } catch (error: any) {
      toast.error("Erro ao criar cliente", {
        description: "Tente novamente mais tarde...",
      });
    }
  }

  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Criar cliente
        </Button>
      </DialogTrigger>
      <DialogContent aria-describedby="Create client/customer">
        <DialogHeader>
          <DialogTitle>Criar client</DialogTitle>
        </DialogHeader>

        <Separator orientation="horizontal" />

        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-none dark:bg-input-gray"
                      placeholder="Nome do cliente..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-none dark:bg-input-gray"
                      onChange={(e) => {
                        const formatted = formatWhatsApp(e.target.value);
                        field.onChange(formatted);
                      }}
                      placeholder="(99) 99999-9999"
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-none dark:bg-input-gray"
                      placeholder="E-mail do cliente..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="document"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF/CNPJ</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-none dark:bg-input-gray"
                      inputMode="numeric"
                      onChange={(e) => {
                        const digits = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 14);
                        const formatted =
                          digits.length > 11
                            ? formatCNPJ(digits)
                            : formatCPF(digits);
                        field.onChange(formatted);
                      }}
                      placeholder="000.000.000-00 ou 00.000.000/0000-00"
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Endereço</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-none dark:bg-input-gray"
                      placeholder="Endereço do cliente..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-4 flex gap-4">
              <Button
                onClick={() => setOpen(false)}
                type="reset"
                variant="outline"
              >
                <div className="flex gap-4">
                  <p>Voltar</p>
                  <X className="h-4 w-4" />
                </div>
              </Button>
              <Button type="submit">
                <div className="flex gap-4">
                  <p>Salvar</p>
                  <Check className="h-4 w-4" />
                </div>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
