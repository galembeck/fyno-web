/** biome-ignore-all lint/suspicious/noExplicitAny: not important... */

import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, CheckCircle, Clock, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
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
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/hooks/_auth/use-auth";
import { formatWhatsApp, removeFormat } from "@/lib/_auth/sign-up/format-masks";

export const Route = createFileRoute(
	"/_app/_admin/dashboard/settings/~components/profile-tab"
)({
	component: ProfileTab,
});

const profileSchema = z
	.object({
		name: z.string().min(2, "Nome deve ter no mínimo 2 caracteres").optional(),
		lastname: z
			.string()
			.min(2, "Sobrenome deve ter no mínimo 2 caracteres")
			.optional(),
		newEmail: z.string().email("E-mail inválido").optional().or(z.literal("")),
		confirmEmail: z
			.string()
			.email("E-mail inválido")
			.optional()
			.or(z.literal("")),
		phone: z.string().min(11, "Telefone deve ter 11 dígitos").optional(),
		supportPhone: z
			.string()
			.min(11, "Telefone de suporte deve ter 11 dígitos")
			.optional(),
		language: z.string().optional(),
		timezone: z.string().optional(),
		currency: z.string().optional(),
	})
	.refine(
		(data) => {
			if (data.newEmail || data.confirmEmail) {
				return (
					data.newEmail === data.confirmEmail &&
					data.newEmail &&
					data.confirmEmail
				);
			}
			return true;
		},
		{
			message: "Os e-mails devem ser iguais",
			path: ["confirmEmail"],
		}
	);

type ProfileFormData = z.infer<typeof profileSchema>;

// biome-ignore lint/complexity/noExcessiveCognitiveComplexity: required by e-mail verification procedure
export function ProfileTab() {
	const {
		user,
		updateUser,
		isUpdatingUser,
		requestEmailChange,
		resendEmailConfirmation,
		cancelEmailChange,
		isRequestingEmailChange,
		isResendingEmailConfirmation,
		isCancellingEmailChange,
	} = useAuth();

	const [hasChanges, setHasChanges] = useState(false);
	const [showEmailConfirmDialog, setShowEmailConfirmDialog] = useState(false);

	const form = useForm<ProfileFormData>({
		resolver: zodResolver(profileSchema),
		defaultValues: {
			name: user?.name || "",
			lastname: user?.lastname || "",
			newEmail: "",
			confirmEmail: "",
			phone: user?.phone || "",
			supportPhone: user?.supportPhone || "",
			language: "pt-BR",
			timezone: "America/Sao_Paulo",
			currency: "BRL",
		},
	});

	useEffect(() => {
		if (user) {
			form.reset({
				name: user.name || "",
				lastname: user.lastname || "",
				newEmail: "",
				confirmEmail: "",
				phone: user.phone || "",
				supportPhone: user.supportPhone || "",
				language: "pt-BR",
				timezone: "America/Sao_Paulo",
				currency: "BRL",
			});
		}
	}, [user, form]);

	useEffect(() => {
		const subscription = form.watch((values) => {
			const hasChanged =
				values.name !== (user?.name || "") ||
				values.lastname !== (user?.lastname || "") ||
				values.phone !== (user?.phone || "") ||
				values.supportPhone !== (user?.supportPhone || "") ||
				(values.newEmail && values.newEmail !== user?.email);

			setHasChanges(Boolean(hasChanged));
		});

		return () => subscription.unsubscribe();
	}, [form, user]);

	const onSubmit = async (data: ProfileFormData) => {
		try {
			if (data.newEmail && data.newEmail !== user?.email) {
				setShowEmailConfirmDialog(true);
				return;
			}

			const cleanData = {
				name: data.name,
				lastname: data.lastname,
				phone: data.phone ? removeFormat(data.phone) : undefined,
				supportPhone: data.supportPhone
					? removeFormat(data.supportPhone)
					: undefined,
			};

			await updateUser(cleanData);

			toast.success("Perfil atualizado com sucesso!", {
				description: "Suas informações foram salvas.",
			});

			setHasChanges(false);
		} catch (error: any) {
			toast.error("Erro ao atualizar perfil", {
				description: error.message || "Tente novamente mais tarde.",
			});
		}
	};

	const handleEmailChange = async () => {
		const email = form.getValues("newEmail");
		if (!email) {
			return;
		}

		try {
			await requestEmailChange(email);

			toast.success("Email de confirmação enviado!", {
				description: `Verifique sua caixa de entrada em ${email}`,
			});

			form.setValue("newEmail", "");
			form.setValue("confirmEmail", "");
			setShowEmailConfirmDialog(false);
			setHasChanges(false);
		} catch (error: any) {
			toast.error("Erro ao enviar confirmação", {
				description: error.message || "Tente novamente mais tarde.",
			});
		}
	};

	const handleCancelEmailChange = async () => {
		try {
			await cancelEmailChange();
			toast.success("Alteração de email cancelada");
		} catch (error: any) {
			toast.error("Erro ao cancelar alteração", {
				description: error.message || "Tente novamente mais tarde.",
			});
		}
	};

	const handleResendEmailConfirmation = async () => {
		try {
			await resendEmailConfirmation();
			toast.success("Email de confirmação reenviado!", {
				description: `Verifique sua caixa de entrada em ${user?.pendingEmail}`,
			});
		} catch (error: any) {
			toast.error("Erro ao reenviar confirmação", {
				description: error.message || "Tente novamente mais tarde.",
			});
		}
	};

	const handleReset = () => {
		form.reset({
			name: user?.name || "",
			lastname: user?.lastname || "",
			newEmail: "",
			confirmEmail: "",
			phone: user?.phone || "",
			supportPhone: user?.supportPhone || "",
			language: "pt-BR",
			timezone: "America/Sao_Paulo",
			currency: "BRL",
		});
		setHasChanges(false);
	};

	const isTokenExpired = user?.emailChangeTokenExpiration
		? new Date() > new Date(user.emailChangeTokenExpiration)
		: false;

	const hasPendingEmailChange = Boolean(
		user?.pendingEmail && user?.emailChangeToken && !isTokenExpired
	);

	return (
		<>
			<Form {...form}>
				<form
					className="flex flex-col gap-8"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<Card className="w-full">
						<CardHeader>
							<CardTitle>Informações pessoais</CardTitle>
							<CardDescription>
								Dados básicos/pessoais do titular da conta na plataforma
							</CardDescription>

							{hasChanges && (
								<CardAction className="flex gap-2">
									<Button
										disabled={isUpdatingUser}
										onClick={handleReset}
										type="button"
										variant="outline"
									>
										Cancelar
									</Button>
									<Button disabled={isUpdatingUser} type="submit">
										{isUpdatingUser ? (
											<div className="flex items-center gap-2">
												<Spinner className="h-4 w-4" />
												<span>Salvando...</span>
											</div>
										) : (
											"Salvar Alterações"
										)}
									</Button>
								</CardAction>
							)}
						</CardHeader>

						<CardContent>
							<div className="flex flex-col gap-6">
								<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
									<FormField
										control={form.control}
										name="name"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Nome</FormLabel>
												<FormControl>
													<Input
														{...field}
														disabled={isUpdatingUser}
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
												<FormLabel>Sobrenome</FormLabel>
												<FormControl>
													<Input
														{...field}
														disabled={isUpdatingUser}
														placeholder="Seu sobrenome"
													/>
												</FormControl>
												<FormMessage />
											</FormItem>
										)}
									/>
								</div>

								<div className="space-y-4">
									<div>
										<FormLabel className="mb-2 block font-medium text-sm">
											E-mail atual
										</FormLabel>
										<div className="flex items-center gap-2">
											<Input
												disabled
												placeholder="E-mail atual"
												value={user?.email || ""}
											/>
											{user?.confirmed ? (
												<Badge
													className="bg-green-100 text-green-800"
													variant="default"
												>
													<CheckCircle className="mr-1 h-3 w-3" />
													Verificado
												</Badge>
											) : (
												<Badge variant="destructive">
													<AlertTriangle className="mr-1 h-3 w-3" />
													Não verificado
												</Badge>
											)}
										</div>
									</div>

									{hasPendingEmailChange && (
										<div className="rounded-lg border border-orange-200 bg-orange-50 p-4">
											<div className="mb-2 flex items-center gap-2">
												<Clock className="h-4 w-4 text-orange-600" />
												<span className="font-medium text-orange-800 text-sm">
													Alteração de email pendente
												</span>
											</div>
											<p className="mb-3 text-orange-700 text-sm">
												Enviamos um email de confirmação para{" "}
												<strong>{user?.pendingEmail}</strong>. Clique no link
												para confirmar a alteração.
											</p>
											{user?.emailChangeTokenExpiration && (
												<p className="mb-3 text-orange-600 text-xs">
													Expira em:{" "}
													{new Date(
														user?.emailChangeTokenExpiration
													).toLocaleString("pt-BR")}
												</p>
											)}
											<div className="flex gap-2">
												<Button
													disabled={isResendingEmailConfirmation}
													onClick={handleResendEmailConfirmation}
													size="sm"
													type="button"
													variant="outline"
												>
													{isResendingEmailConfirmation ? (
														<Spinner className="mr-2 h-3 w-3" />
													) : (
														<Mail className="mr-2 h-3 w-3" />
													)}
													Reenviar
												</Button>
												<Button
													disabled={isCancellingEmailChange}
													onClick={handleCancelEmailChange}
													size="sm"
													type="button"
													variant="destructive"
												>
													{isCancellingEmailChange ? (
														<Spinner className="mr-2 h-3 w-3" />
													) : (
														"Cancelar alteração"
													)}
												</Button>
											</div>
										</div>
									)}

									{user?.pendingEmail && isTokenExpired && (
										<div className="rounded-lg border border-red-200 bg-red-50 p-4">
											<div className="mb-2 flex items-center gap-2">
												<AlertTriangle className="h-4 w-4 text-red-600" />
												<span className="font-medium text-red-800 text-sm">
													Token de confirmação expirado
												</span>
											</div>
											<p className="mb-3 text-red-700 text-sm">
												O link de confirmação para{" "}
												<strong>{user.pendingEmail}</strong> expirou. Você
												precisará solicitar uma nova alteração de email.
											</p>
											<Button
												disabled={isCancellingEmailChange}
												onClick={handleCancelEmailChange}
												size="sm"
												type="button"
												variant="destructive"
											>
												{isCancellingEmailChange ? (
													<Spinner className="mr-2 h-3 w-3" />
												) : (
													"Limpar alteração expirada"
												)}
											</Button>
										</div>
									)}

									{!(hasPendingEmailChange || isTokenExpired) && (
										<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
											<FormField
												control={form.control}
												name="newEmail"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Novo e-mail</FormLabel>
														<FormControl>
															<Input
																{...field}
																disabled={isUpdatingUser}
																placeholder="novo@email.com"
																type="email"
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>

											<FormField
												control={form.control}
												name="confirmEmail"
												render={({ field }) => (
													<FormItem>
														<FormLabel>Confirmar novo e-email</FormLabel>
														<FormControl>
															<Input
																{...field}
																disabled={isUpdatingUser}
																placeholder="Repita o novo e-mail"
																type="email"
															/>
														</FormControl>
														<FormMessage />
													</FormItem>
												)}
											/>
										</div>
									)}
								</div>

								<div className="grid grid-cols-1 gap-4 md:grid-cols-2">
									<FormField
										control={form.control}
										name="phone"
										render={({ field }) => (
											<FormItem>
												<FormLabel>Telefone</FormLabel>
												<FormControl>
													<Input
														{...field}
														disabled={isUpdatingUser}
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
												<FormLabel>Telefone (suporte)</FormLabel>
												<FormControl>
													<Input
														{...field}
														disabled={isUpdatingUser}
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
							</div>
						</CardContent>
					</Card>

					<Card className="w-full">
						<CardHeader>
							<CardTitle>Preferências pessoais</CardTitle>
							<CardDescription>
								Idioma, fuso horário e moeda padrão para geração de relatórios
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 gap-4 md:grid-cols-3">
								<FormField
									control={form.control}
									name="language"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Idioma</FormLabel>
											<Select
												disabled={isUpdatingUser}
												onValueChange={field.onChange}
												value={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Selecione" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="pt-BR">
														Português (Brasil)
													</SelectItem>
													<SelectItem value="en-US">English (US)</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="timezone"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Fuso Horário</FormLabel>
											<Select
												disabled={isUpdatingUser}
												onValueChange={field.onChange}
												value={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Selecione" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="America/Sao_Paulo">
														America/Sao_Paulo
													</SelectItem>
													<SelectItem value="UTC">UTC</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>

								<FormField
									control={form.control}
									name="currency"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Moeda Padrão</FormLabel>
											<Select
												disabled={isUpdatingUser}
												onValueChange={field.onChange}
												value={field.value}
											>
												<FormControl>
													<SelectTrigger>
														<SelectValue placeholder="Selecione" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="BRL">BRL</SelectItem>
													<SelectItem value="USD">USD</SelectItem>
													<SelectItem value="EUR">EUR</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</CardContent>
					</Card>
				</form>
			</Form>

			<Dialog
				onOpenChange={setShowEmailConfirmDialog}
				open={showEmailConfirmDialog}
			>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Confirmar alteração de email</DialogTitle>
						<DialogDescription>
							Você está prestes a alterar seu email de{" "}
							<strong>{user?.email}</strong> para{" "}
							<strong>{form.getValues("newEmail")}</strong>.
							<br />
							<br />
							Enviaremos um email de confirmação para o novo endereço. Você
							precisará clicar no link de confirmação para efetivar a alteração.
						</DialogDescription>
					</DialogHeader>

					<DialogFooter>
						<Button
							onClick={() => setShowEmailConfirmDialog(false)}
							type="button"
							variant="outline"
						>
							Cancelar
						</Button>
						<Button
							disabled={isRequestingEmailChange}
							onClick={handleEmailChange}
							type="button"
						>
							{isRequestingEmailChange ? (
								<div className="flex items-center gap-2">
									<Spinner className="h-4 w-4" />
									<span>Enviando...</span>
								</div>
							) : (
								"Enviar confirmação"
							)}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
}
