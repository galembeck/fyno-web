/** biome-ignore-all lint/correctness/noUnusedVariables: ignoring unused variables */

import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatWhatsApp, removeFormat } from "@/lib/_auth/sign-up/format-masks";

export const Route = createFileRoute("/_auth/sign-up/~components/sign-up-form")(
  {
    component: SignUpForm,
  }
);

const signUpFormSchema = z.object({
  name: z.string().min(2, {
    message: "Nome deve ter no mínimo 2 caracteres",
  }),
  lastname: z.string().min(2, {
    message: "Sobrenome deve ter no mínimo 2 caracteres",
  }),
  whatsapp: z.string().min(11, {
    message: "WhatsApp deve ter 11 dígitos",
  }),
  email: z.string().email({
    message: "Email deve ter um formato válido",
  }),
  monthlyRevenue: z.string().min(1, {
    message: "Selecione o faturamento médio mensal",
  }),
  contactReason: z.string().min(1, {
    message: "Selecione o motivo do contato",
  }),
  segment: z.string().min(1, {
    message: "Selecione o segmento",
  }),
  knowledge: z.string().optional(),
});

export function SignUpForm() {
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      lastname: "",
      whatsapp: "",
      email: "",
      monthlyRevenue: "",
      contactReason: "",
      segment: "",
      knowledge: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signUpFormSchema>) {
    try {
      const cleanWhatsApp = removeFormat(values.whatsapp);
      if (cleanWhatsApp.length !== 11) {
        toast.error("WhatsApp inválido", {
          description: "O WhatsApp deve ter exatamente 11 dígitos",
        });
        return;
      }

      await navigate({ to: "/sign-up/taxes-negotiation" });
    } catch (error) {
      toast.error("Erro! :/", {
        description: "Ocorreu um erro. Tente novamente.",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        className="mx-auto w-full max-w-sm space-y-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input className="border-none bg-input-gray" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sobrenome</FormLabel>
              <FormControl>
                <Input className="border-none bg-input-gray" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="whatsapp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>WhatsApp</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="border-none bg-input-gray"
                  onChange={(e) => {
                    const formatted = formatWhatsApp(e.target.value);
                    field.onChange(formatted);
                  }}
                  placeholder="(11) 99999-9999"
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
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  className="border-none bg-input-gray"
                  {...field}
                  type="email"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="monthlyRevenue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Faturamento no último mês</FormLabel>
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full border-none bg-input-gray">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="0-10k">Até R$ 10.000</SelectItem>
                  <SelectItem value="10k-50k">R$ 10.000 - R$ 50.000</SelectItem>
                  <SelectItem value="50k-100k">
                    R$ 50.000 - R$ 100.000
                  </SelectItem>
                  <SelectItem value="100k-500k">
                    R$ 100.000 - R$ 500.000
                  </SelectItem>
                  <SelectItem value="500k+">Acima de R$ 500.000</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contactReason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Qual o motivo do contato?</FormLabel>
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full border-none bg-input-gray">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="already_selling">
                    Já vendo online e quero conhecer a solução
                  </SelectItem>
                  <SelectItem value="start_selling">
                    Quero começar a vender online
                  </SelectItem>
                  <SelectItem value="bought_product">
                    Comprei um produto
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="segment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Qual seu segmento?</FormLabel>
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full border-none bg-input-gray">
                    <SelectValue placeholder="Selecione..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="dropshipping_br">
                    Dropshipping BR
                  </SelectItem>
                  <SelectItem value="global_dropshipping">
                    Dropshipping Global
                  </SelectItem>
                  <SelectItem value="e-commerce">E-Commerce</SelectItem>
                  <SelectItem value="infoproducts">Infoprodutos</SelectItem>
                  <SelectItem value="nutraceuticals">Nutracêuticos</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="knowledge"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Como conheceu a HyperCash?</FormLabel>
              <FormControl>
                <Input
                  className="border-none bg-input-gray"
                  {...field}
                  placeholder="Preenchimento opcional"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="w-full bg-primary-green font-semibold text-black hover:bg-primary-green/80"
          type="submit"
          variant="secondary"
        >
          Continuar
        </Button>
      </form>
    </Form>
  );
}
