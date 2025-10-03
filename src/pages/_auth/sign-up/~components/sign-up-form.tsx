import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
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
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/_auth/use-auth";
import {
  removeWhatsAppFormat,
  removeCNPJFormat,
  formatWhatsApp,
  formatCNPJ,
} from "@/lib/_auth/sign-up/format-masks";
import { Plane } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";

export const Route = createFileRoute("/_auth/sign-up/~components/sign-up-form")(
  {
    component: SignUpForm,
  }
);

const signUpFormSchema = z
  .object({
    name: z.string().min(2, {
      message: "Nome deve ter no mínimo 2 caracteres",
    }),
    lastname: z.string().min(2, {
      message: "Sobrenome deve ter no mínimo 2 caracteres",
    }),
    whatsapp: z.string().min(11, {
      message: "WhatsApp deve ter 11 dígitos",
    }),
    cnpj: z.string().min(14, {
      message: "CNPJ deve ter 14 dígitos",
    }),
    email: z.string().email({
      message: "Email deve ter um formato válido",
    }),
    password: z.string().min(6, {
      message: "Senha deve ter no mínimo 6 caracteres",
    }),
    confirmPassword: z.string(),
    monthlyRevenue: z.string().min(1, {
      message: "Selecione o faturamento médio mensal",
    }),
    currentGateway: z.string().min(1, {
      message: "Gateway de pagamento atual é obrigatório",
    }),
    knowledge: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não coincidem",
    path: ["confirmPassword"],
  });

export function SignUpForm() {
  const navigate = useNavigate();

  const { register, isRegistering, registerError } = useAuth();

  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      name: "",
      lastname: "",
      whatsapp: "",
      cnpj: "",
      email: "",
      password: "",
      confirmPassword: "",
      monthlyRevenue: "",
      currentGateway: "",
      knowledge: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signUpFormSchema>) {
    try {
      const username = values.email.split("@")[0];

      const cleanWhatsApp = removeWhatsAppFormat(values.whatsapp);
      const cleanCNPJ = removeCNPJFormat(values.cnpj);

      await register({
        username,
        email: values.email,
        password: values.password,
        name: values.name,
        lastname: values.lastname,
        whatsapp: cleanWhatsApp,
        cnpj: cleanCNPJ,
        monthlyRevenue: values.monthlyRevenue,
        currentGateway: values.currentGateway,
        knowledge: values.knowledge,
      });

      toast.success("Cadastro realizado com sucesso!", {
        description: "Bem-vindo! Redirecionando para o dashboard...",
      });

      navigate({ to: "/dashboard" });
    } catch (error: any) {
      toast.error("Erro! :/", {
        description:
          error.message ||
          "Não foi possível completar o cadastro. Tente novamente mais tarde!",
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
                  placeholder="(11) 99999-9999"
                  onChange={(e) => {
                    const formatted = formatWhatsApp(e.target.value);
                    field.onChange(formatted);
                  }}
                  onBlur={(e) => {
                    const numbers = removeWhatsAppFormat(e.target.value);
                    field.onBlur();
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cnpj"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CNPJ</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="border-none bg-input-gray"
                  placeholder="00.000.000/0000-00"
                  onChange={(e) => {
                    const formatted = formatCNPJ(e.target.value);
                    field.onChange(formatted);
                  }}
                  onBlur={(e) => {
                    const numbers = removeCNPJFormat(e.target.value);
                    field.onBlur();
                  }}
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  className="border-none bg-input-gray"
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar Senha</FormLabel>
              <FormControl>
                <Input
                  className="border-none bg-input-gray"
                  type="password"
                  placeholder="Digite a senha novamente"
                  {...field}
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
              <FormLabel>Faturamento médio mensal</FormLabel>
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
          name="currentGateway"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gateway de pagamento atual</FormLabel>
              <FormControl>
                <Input className="border-none bg-input-gray" {...field} />
              </FormControl>
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
          disabled={isRegistering}
        >
          {isRegistering ? (
            <div className="flex gap-4">
              <Spinner />
              <p>Cadastrando...</p>
            </div>
          ) : (
            <div className="flex gap-2 items-center group transition-all">
              <span>Continuar</span>
              <span className="group-hover:-translate-x-4 ml-1 transition-all duration-300 group-hover:opacity-0">
                <Plane />
              </span>
            </div>
          )}
        </Button>
      </form>
    </Form>
  );
}
