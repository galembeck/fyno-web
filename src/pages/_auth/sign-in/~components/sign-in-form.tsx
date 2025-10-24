/** biome-ignore-all lint/suspicious/noExplicitAny: required by @Vite */
/** biome-ignore-all lint/correctness/noUnusedVariables: required by authentication */

import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
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
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/hooks/endpoints/auth/use-auth";

export const Route = createFileRoute("/_auth/sign-in/~components/sign-in-form")(
  {
    component: SiginInForm,
  }
);

const signInFormSchema = z.object({
  email: z.string().email({
    message: "Email deve ter um formato válido",
  }),
  password: z.string().min(6, {
    message: "Senha deve ter no mínimo 6 caracteres",
  }),
});

export function SiginInForm() {
  const navigate = useNavigate();

  const { login, isLoggingIn } = useAuth();

  const form = useForm<z.infer<typeof signInFormSchema>>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof signInFormSchema>) {
    try {
      await login({
        email: values.email, // E-mail ou username
        password: values.password,
      });

      toast.success("Bem-vindo de volta! :)", {
        description: "Redirecionando para o dashboard...",
      });

      const redirectTo = (URLSearchParams as any)?.redirect || "/app/dashboard";

      navigate({
        to: redirectTo,
        replace: true,
      });
    } catch (error: any) {
      toast.error("Erro! :/", {
        description: "E-mail ou senha incorretos/inválidos! Tente novamente...",
      });
    }
  }

  return (
    <div className="flex flex-col space-y-16">
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="font-semibold text-2xl tracking-tight">
          Faça login em sua conta
        </h1>
        <p className="text-muted-foreground text-sm">
          Digite seu email e senha para acessar
        </p>
      </div>

      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="border-none dark:bg-input-gray"
                    placeholder="nome@exemplo.com"
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
                    {...field}
                    className="border-none dark:bg-input-gray"
                    placeholder="Digite sua senha"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            className="w-full bg-primary-green font-semibold text-black hover:bg-primary-green/80"
            disabled={isLoggingIn}
            type="submit"
            variant="secondary"
          >
            {isLoggingIn ? (
              <div className="flex gap-4">
                <Spinner />
                <p>Entrando...</p>
              </div>
            ) : (
              <div className="group flex items-center gap-2 transition-all">
                <span>Entrar</span>
                <span className="group-hover:-translate-x-4 ml-1 transition-all duration-300 group-hover:opacity-0">
                  <ArrowRight />
                </span>
              </div>
            )}
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm">
        <span className="text-muted-foreground">Não tem uma conta? </span>
        <Link
          className="font-medium text-primary hover:underline"
          to="/sign-up"
        >
          Cadastre-se
        </Link>
      </div>

      {/* <div className="text-center text-sm">
				<Link 
					className="text-muted-foreground hover:text-primary hover:underline"
					to="/forgot-password"
				>
					Esqueceu sua senha?
				</Link>
			</div> */}
    </div>
  );
}
