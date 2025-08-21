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
		message: "WhatsApp deve ter no mínimo 11 dígitos",
	}),
	cnpj: z.string().min(14, {
		message: "CNPJ deve ter 14 dígitos",
	}),
	email: z.string().email({
		message: "Email deve ter um formato válido",
	}),
	monthlyRevenue: z.string().min(1, {
		message: "Selecione o faturamento médio mensal",
	}),
	currentGateway: z.string().min(1, {
		message: "Gateway de pagamento atual é obrigatório",
	}),
	knowledge: z.string().optional(),
});

export function SignUpForm() {
	const form = useForm<z.infer<typeof signUpFormSchema>>({
		resolver: zodResolver(signUpFormSchema),
		defaultValues: {
			name: "",
			lastname: "",
			whatsapp: "",
			cnpj: "",
			email: "",
			monthlyRevenue: "",
			currentGateway: "",
			knowledge: "",
		},
	});

	function onSubmit(values: z.infer<typeof signUpFormSchema>) {
		// biome-ignore lint/suspicious/noConsole: only used in development
		console.log(values);

		toast("You submitted the following values", {
			description: (
				<pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
					<code className="text-white">{JSON.stringify(values, null, 2)}</code>
				</pre>
			),
		});
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
									placeholder="Telefone necessário para prosseguir"
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
								<Input className="border-none bg-input-gray" {...field} />
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
				>
					Continuar
				</Button>
			</form>
		</Form>
	);
}
