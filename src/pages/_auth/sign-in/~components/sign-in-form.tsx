import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link } from "@tanstack/react-router";
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
	const form = useForm<z.infer<typeof signInFormSchema>>({
		resolver: zodResolver(signInFormSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	function onSubmit(values: z.infer<typeof signInFormSchema>) {
		// biome-ignore lint/suspicious/noConsole: only used in development
		console.log(values);

		toast("Login realizado com sucesso!", {
			description: "Redirecionando para o dashboard...",
		});
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
						type="submit"
						variant="secondary"
					>
						Entrar
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
		</div>
	);
}
