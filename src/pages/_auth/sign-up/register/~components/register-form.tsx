/** biome-ignore-all lint/performance/useTopLevelRegex: regex structure for password analysis */

import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, Plane } from "lucide-react";
import { useState } from "react";
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
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/hooks/_auth/use-auth";
import {
	formatCNPJ,
	formatWhatsApp,
	removeFormat,
} from "@/lib/_auth/sign-up/format-masks";
import { isValidCNPJ } from "@/utils/_auth/sign-up/valid-cnpj";

export const Route = createFileRoute(
	"/_auth/sign-up/register/~components/register-form"
)({
	component: RegisterForm,
});

const registerFormSchema = z
	.object({
		name: z.string().min(2, {
			message: "Nome deve ter no mínimo 2 caracteres",
		}),
		lastname: z.string().min(2, {
			message: "Sobrenome deve ter no mínimo 2 caracteres",
		}),
		email: z.string().email({
			message: "Email deve ter um formato válido",
		}),
		cnpj: z
			.string()
			.min(14, {
				message: "CNPJ deve ter 14 dígitos",
			})
			.refine(
				(value) => {
					const cleanCNPJ = removeFormat(value);
					return cleanCNPJ.length === 14 && isValidCNPJ(value);
				},
				{
					message: "CNPJ inválido",
				}
			),
		monthlyRevenue: z.string().min(1, {
			message: "Selecione o faturamento mensal",
		}),
		phone: z.string().min(11, {
			message: "Telefone deve ter 11 dígitos",
		}),
		supportPhone: z.string().min(11, {
			message: "Telefone de suporte deve ter 11 dígitos",
		}),
		password: z.string().min(8, {
			message: "Mínimo de 8 caracteres",
		}),
		confirmPassword: z.string(),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Senhas não coincidem",
		path: ["confirmPassword"],
	});

export function RegisterForm() {
	const navigate = useNavigate();

	const { register, isRegistering } = useAuth();

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const form = useForm<z.infer<typeof registerFormSchema>>({
		resolver: zodResolver(registerFormSchema),
		mode: "onChange",
		defaultValues: {
			name: "",
			lastname: "",
			email: "",
			cnpj: "",
			monthlyRevenue: "",
			phone: "",
			supportPhone: "",
			password: "",
			confirmPassword: "",
		},
	});

	const password = form.watch("password");
	const confirmPassword = form.watch("confirmPassword");

	const cnpj = form.watch("cnpj");

	const validations = {
		minLength: password.length >= 8,
		hasLowercase: /[a-z]/.test(password),
		hasUppercase: /[A-Z]/.test(password),
		hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
		hasNumber: /[0-9]/.test(password),
		passwordsMatch: password === confirmPassword && confirmPassword.length > 0,
	};

	const cnpjValidation = {
		isValid: cnpj.length >= 18 && isValidCNPJ(cnpj),
		hasMinLength: removeFormat(cnpj).length === 14,
	};

	async function onSubmit(values: z.infer<typeof registerFormSchema>) {
		try {
			const username = values.email.split("@")[0];

			const cleanPhone = removeFormat(values.phone);
			const cleanSupportPhone = removeFormat(values.supportPhone);
			const cleanCNPJ = removeFormat(values.cnpj);

			await register({
				username,
				email: values.email,
				password: values.password,
				name: values.name,
				lastname: values.lastname,
				cnpj: cleanCNPJ,
				monthlyRevenue: values.monthlyRevenue,
				phone: cleanPhone,
				supportPhone: cleanSupportPhone,
			});

			toast.success("Cadastro realizado com sucesso!", {
				description: "Bem-vindo! Redirecionando para o dashboard...",
			});

			navigate({ to: "/dashboard" });
			// biome-ignore lint/suspicious/noExplicitAny: required for error handling
		} catch (error: any) {
			toast.error("Erro! :/", {
				description:
					error.message ||
					"Não foi possível completar o cadastro. Tente novamente mais tarde!",
			});
		}
	}

	return (
		<div className="p-6">
			<div className="mx-auto max-w-2xl">
				<div className="mb-8 text-center">
					<h1 className="mb-4 font-bold text-3xl">Crie sua conta</h1>
					<p className="text-muted-foreground">
						Registre suas informações pessoais para criar sua conta e ter acesso
						às informações consolidadas em nosso dashboard.
					</p>

					{/* Progress Bar | TODO: Adicionar Progress Bar de acordo com as etapas de preenchimento do formulário de registro */}
				</div>

				<Form {...form}>
					<form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
						<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nome *</FormLabel>
										<FormControl>
											<Input
												{...field}
												className="border-none bg-input-gray"
												placeholder="Seu nome"
											/>
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
										<FormLabel>Sobrenome *</FormLabel>
										<FormControl>
											<Input
												{...field}
												className="border-none bg-input-gray"
												placeholder="Seu sobrenome"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email *</FormLabel>
									<FormControl>
										<Input
											{...field}
											className="border-none bg-input-gray"
											placeholder="seu@email.com"
											type="email"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
							<FormField
								control={form.control}
								name="cnpj"
								render={({ field }) => (
									<FormItem>
										<FormLabel>CNPJ *</FormLabel>
										<FormControl>
											<Input
												{...field}
												className={`border-none bg-input-gray ${
													cnpj &&
													cnpjValidation.hasMinLength &&
													!cnpjValidation.isValid
														? "border-2 border-red-500 focus:border-red-500"
														: ""
												}`}
												onChange={(e) => {
													const formatted = formatCNPJ(e.target.value);
													field.onChange(formatted);
												}}
												placeholder="00.000.000/0000-00"
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
										<FormLabel>Faturamento mensal *</FormLabel>
										<Select
											defaultValue={field.value}
											onValueChange={field.onChange}
										>
											<FormControl>
												<SelectTrigger className="w-full border-none bg-input-gray">
													<SelectValue placeholder="Até R$ 10.000" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="0-10k">Até R$ 10.000</SelectItem>
												<SelectItem value="10k-50k">
													R$ 10.000 - R$ 50.000
												</SelectItem>
												<SelectItem value="50k-100k">
													R$ 50.000 - R$ 100.000
												</SelectItem>
												<SelectItem value="100k-500k">
													R$ 100.000 - R$ 500.000
												</SelectItem>
												<SelectItem value="500k+">
													Acima de R$ 500.000
												</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
							<FormField
								control={form.control}
								name="phone"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Telefone *</FormLabel>
										<FormControl>
											<Input
												{...field}
												className="border-none bg-input-gray"
												onChange={(e) => {
													const formatted = formatWhatsApp(e.target.value);
													field.onChange(formatted);
												}}
												placeholder="(00) 00000-0000"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="supportPhone"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Telefone de suporte *</FormLabel>
										<FormControl>
											<Input
												{...field}
												className="border-none bg-input-gray"
												onChange={(e) => {
													const formatted = formatWhatsApp(e.target.value);
													field.onChange(formatted);
												}}
												placeholder="(00) 00000-0000"
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="grid grid-cols-1 gap-6 md:grid-cols-2">
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Senha *</FormLabel>
										<FormControl>
											<div className="relative">
												<Input
													{...field}
													className="border-none bg-input-gray"
													placeholder="Crie uma senha forte"
													type={showPassword ? "text" : "password"}
												/>
												<button
													className="-translate-y-1/2 absolute top-1/2 right-3 transform cursor-pointer text-gray-400 hover:text-white"
													onClick={() => setShowPassword(!showPassword)}
													type="button"
												>
													{showPassword ? (
														<EyeOff size={20} />
													) : (
														<Eye size={20} />
													)}
												</button>
											</div>
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
										<FormLabel>Confirmar senha *</FormLabel>
										<FormControl>
											<div className="relative">
												<Input
													{...field}
													className="border-none bg-input-gray"
													placeholder="Digite sua senha novamente"
													type={showConfirmPassword ? "text" : "password"}
												/>
												<button
													className="-translate-y-1/2 absolute top-1/2 right-3 transform cursor-pointer text-gray-400 hover:text-white"
													onClick={() =>
														setShowConfirmPassword(!showConfirmPassword)
													}
													type="button"
												>
													{showConfirmPassword ? (
														<EyeOff size={20} />
													) : (
														<Eye size={20} />
													)}
												</button>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className="grid grid-cols-1 gap-2 text-sm md:grid-cols-2 md:gap-x-6 md:gap-y-2">
							<div
								className={`flex items-center gap-2 ${validations.minLength ? "text-green-500" : "text-red-500"}`}
							>
								<span>{validations.minLength ? "✓" : "✗"}</span>
								<span>Mínimo de 8 caracteres</span>
							</div>

							<div
								className={`flex items-center gap-2 ${validations.hasLowercase ? "text-green-500" : "text-red-500"}`}
							>
								<span>{validations.hasLowercase ? "✓" : "✗"}</span>
								<span>Pelo menos 1 letra minúscula</span>
							</div>

							<div
								className={`flex items-center gap-2 ${validations.hasUppercase ? "text-green-500" : "text-red-500"}`}
							>
								<span>{validations.hasUppercase ? "✓" : "✗"}</span>
								<span>Pelo menos 1 letra maiúscula</span>
							</div>

							<div
								className={`flex items-center gap-2 ${validations.hasNumber ? "text-green-500" : "text-red-500"}`}
							>
								<span>{validations.hasNumber ? "✓" : "✗"}</span>
								<span>Pelo menos 1 número</span>
							</div>

							<div
								className={`flex items-center gap-2 ${validations.hasSpecialChar ? "text-green-500" : "text-red-500"}`}
							>
								<span>{validations.hasSpecialChar ? "✓" : "✗"}</span>
								<span>Pelo menos 1 caractere especial</span>
							</div>

							<div
								className={`flex items-center gap-2 ${validations.passwordsMatch ? "text-green-500" : "text-red-500"}`}
							>
								<span>{validations.passwordsMatch ? "✓" : "✗"}</span>
								<span>Senhas coincidem</span>
							</div>
						</div>

						<div className="text-center text-gray-400 text-sm">
							Ao continuar, você concorda com os{" "}
							<Link
								className="text-primary-green hover:underline"
								rel="noopener noreferrer"
								target="_blank"
								to="/terms-of-use"
							>
								Termos de serviço
							</Link>
						</div>

						<Button
							className="w-full bg-primary-green py-6 font-semibold text-black text-lg hover:bg-primary-green/80"
							disabled={isRegistering}
							type="submit"
						>
							{isRegistering ? (
								<div className="flex items-center gap-2">
									<Spinner />
									<span>Registrando...</span>
								</div>
							) : (
								<div className="group flex items-center gap-2 transition-all">
									<span>Criar conta</span>
									<span className="group-hover:-translate-x-4 ml-1 transition-all duration-300 group-hover:opacity-0">
										<Plane />
									</span>
								</div>
							)}
						</Button>
					</form>
				</Form>
			</div>
		</div>
	);
}
