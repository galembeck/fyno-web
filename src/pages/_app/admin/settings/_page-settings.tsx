import { TabsContent } from "@radix-ui/react-tabs";
import { createFileRoute } from "@tanstack/react-router";
import {
	Bell,
	Building2,
	CreditCard,
	Database,
	Globe,
	Moon,
	PauseCircle,
	PlugZap,
	ShieldCheck,
	Sun,
	Trash2,
	User,
} from "lucide-react";
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/hooks/_auth/use-auth";
import { formatWhatsApp } from "@/lib/_auth/sign-up/format-masks";

export const Route = createFileRoute("/_app/admin/settings/_page-settings")({
	component: SettingsPage,
	head: () => ({
		meta: [
			{
				title: "Configurações de Conta | fyno.business",
			},
		],
	}),
});

export function SettingsPage() {
	const { user } = useAuth();

	const [theme, setTheme] = useState<"dark" | "light">("dark");
	const [twoFA, setTwoFA] = useState(true);
	const [emailSales, setEmailSales] = useState(true);
	const [emailPayouts, setEmailPayouts] = useState(true);
	const [smsAlerts, setSmsAlerts] = useState(false);

	return (
		<main className="mx-auto w-full max-w-6xl space-y-6 overflow-x-hidden px-4 py-6 md:space-y-8 md:py-8">
			<div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center sm:gap-4">
				<article className="space-y-1">
					<h1 className="font-semibold text-2xl tracking-tight sm:text-3xl">
						Configurações de conta
					</h1>
					<p className="text-muted-foreground text-sm">
						Gerencie dados pessoais, negócios, segurança, integrações e
						preferências
					</p>
				</article>

				<Badge className="shrink-0" variant="secondary">
					ID: {user?.documentId}
				</Badge>
			</div>

			<Tabs className="w-full" defaultValue="profile">
				<div className="relative w-full overflow-hidden rounded-lg border bg-card">
					<ScrollArea className="w-full">
						<div className="whitespace-nowrap">
							<TabsList className="inline-flex w-max min-w-full justify-start bg-transparent">
								<TabsTrigger
									className="flex-shrink-0 text-xs sm:text-sm"
									value="profile"
								>
									<User className="mr-1.5 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
									Perfil
								</TabsTrigger>
								<TabsTrigger
									className="flex-shrink-0 text-xs sm:text-sm"
									value="empresa"
								>
									<Building2 className="mr-1.5 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
									Empresa
								</TabsTrigger>
								<TabsTrigger
									className="flex-shrink-0 text-xs sm:text-sm"
									value="financeiro"
								>
									<CreditCard className="mr-1.5 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
									Financeiro
								</TabsTrigger>
								<TabsTrigger
									className="flex-shrink-0 text-xs sm:text-sm"
									value="seguranca"
								>
									<ShieldCheck className="mr-1.5 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
									Segurança
								</TabsTrigger>
								<TabsTrigger
									className="flex-shrink-0 text-xs sm:text-sm"
									value="notificacoes"
								>
									<Bell className="mr-1.5 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
									Notificações
								</TabsTrigger>
								<TabsTrigger
									className="flex-shrink-0 text-xs sm:text-sm"
									value="integracoes"
								>
									<PlugZap className="mr-1.5 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
									Integrações
								</TabsTrigger>
								<TabsTrigger
									className="flex-shrink-0 text-xs sm:text-sm"
									value="preferencias"
								>
									<Globe className="mr-1.5 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
									Preferências
								</TabsTrigger>
								<TabsTrigger
									className="flex-shrink-0 text-xs sm:text-sm"
									value="plano"
								>
									<CreditCard className="mr-1.5 h-3.5 w-3.5 sm:mr-2 sm:h-4 sm:w-4" />
									Plano
								</TabsTrigger>
							</TabsList>
						</div>
						<ScrollBar className="h-2.5" orientation="horizontal" />
					</ScrollArea>
				</div>

				{/* 1. Perfil */}
				<TabsContent className="space-y-4 sm:space-y-6" value="profile">
					<Card className="w-full overflow-hidden">
						<CardHeader>
							<CardTitle>Informações pessoais</CardTitle>
							<CardDescription>
								Dados básicos/pessoais do titular da conta na plataforma
							</CardDescription>
						</CardHeader>

						<CardContent>
							<div className="space-y-4">
								<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
									<div className="space-y-2">
										<Label className="font-medium text-sm" htmlFor="nome">
											Nome
										</Label>
										<Input disabled id="nome" value={user?.name} />
									</div>
									<div className="space-y-2">
										<Label className="font-medium text-sm" htmlFor="lastname">
											Sobrenome
										</Label>
										<Input disabled id="lastname" value={user?.lastname} />
									</div>
								</div>

								<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
									<div className="space-y-2">
										<Label className="font-medium text-sm" htmlFor="email">
											E-mail
										</Label>
										<Input disabled id="email" value={user?.email} />
									</div>
								</div>

								<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
									<div className="space-y-2">
										<Label className="font-medium text-sm" htmlFor="phone">
											Telefone
										</Label>
										<Input
											disabled
											id="phone"
											value={formatWhatsApp(user?.phone ?? "")}
										/>
									</div>
									<div className="space-y-2">
										<Label
											className="font-medium text-sm"
											htmlFor="supportPhone"
										>
											Telefone (suporte)
										</Label>
										<Input
											disabled
											id="supportPhone"
											value={formatWhatsApp(user?.supportPhone ?? "")}
										/>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="overflow-hidden">
						<CardHeader>
							<CardTitle>Preferências Pessoais</CardTitle>
							<CardDescription>
								Idioma, fuso e moeda padrão para relatórios.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
								<div className="space-y-2">
									<Label>Idioma</Label>
									<Select defaultValue="pt-BR">
										<SelectTrigger>
											<SelectValue placeholder="Selecione" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="pt-BR">Português (Brasil)</SelectItem>
											<SelectItem value="en-US">English (US)</SelectItem>
											<SelectItem value="es-ES">Español</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="space-y-2">
									<Label>Fuso Horário</Label>
									<Select defaultValue="America/Sao_Paulo">
										<SelectTrigger>
											<SelectValue placeholder="Selecione" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="America/Sao_Paulo">
												America/Sao_Paulo
											</SelectItem>
											<SelectItem value="UTC">UTC</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="space-y-2">
									<Label>Moeda Padrão</Label>
									<Select defaultValue="BRL">
										<SelectTrigger>
											<SelectValue placeholder="Selecione" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="BRL">BRL</SelectItem>
											<SelectItem value="USD">USD</SelectItem>
											<SelectItem value="EUR">EUR</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				{/* 2. Empresa */}
				<TabsContent className="space-y-4 sm:space-y-6" value="empresa">
					<Card className="overflow-hidden">
						<CardHeader>
							<CardTitle>Informações Empresariais</CardTitle>
							<CardDescription>
								Dados fiscais e operacionais da sua loja.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
									<div className="space-y-2">
										<Label>Nome da Empresa</Label>
										<Input placeholder="Minha Loja LTDA" />
									</div>
									<div className="space-y-2">
										<Label>CNPJ / Tax ID</Label>
										<Input placeholder="00.000.000/0001-00" />
									</div>
								</div>
								<div className="space-y-2">
									<Label>Endereço Fiscal</Label>
									<Textarea
										className="min-h-[80px]"
										placeholder="Rua Exemplo, 123 - Cidade/UF - CEP"
									/>
								</div>
								<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
									<div className="space-y-2">
										<Label>Domínio da Loja</Label>
										<Input placeholder="https://minhaloja.com" />
									</div>
									<div className="space-y-2">
										<Label>Categoria do Negócio</Label>
										<Select defaultValue="moda">
											<SelectTrigger>
												<SelectValue placeholder="Selecione" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="moda">Moda</SelectItem>
												<SelectItem value="eletronicos">Eletrônicos</SelectItem>
												<SelectItem value="acessorios">Acessórios</SelectItem>
												<SelectItem value="outros">Outros</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				{/* 3. Financeiro */}
				<TabsContent className="space-y-4 sm:space-y-6" value="financeiro">
					<Alert>
						<CreditCard className="h-4 w-4" />
						<AlertTitle>Resumo Financeiro</AlertTitle>
						<AlertDescription className="text-xs sm:text-sm">
							Saldo disponível R$ 14.230,84 • Próximo repasse em 07 dias • Ciclo
							de faturamento: Mensal
						</AlertDescription>
					</Alert>

					<Card className="overflow-hidden">
						<CardHeader>
							<CardTitle>Métodos de Pagamento & Repasse</CardTitle>
							<CardDescription>Vincule bancos, PIX e gateways.</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="space-y-4">
								<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
									<div className="space-y-2">
										<Label>Banco</Label>
										<Input placeholder="Banco ACME - Ag 0001 - CC 12345-6" />
									</div>
									<div className="space-y-2">
										<Label>Chave PIX</Label>
										<Input placeholder="email@empresa.com" />
									</div>
									<div className="space-y-2">
										<Label>Gateway</Label>
										<Select defaultValue="mercado-pago">
											<SelectTrigger>
												<SelectValue placeholder="Selecione" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="stripe">Stripe</SelectItem>
												<SelectItem value="paypal">PayPal</SelectItem>
												<SelectItem value="mercado-pago">
													Mercado Pago
												</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
								<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
									<div className="space-y-2">
										<Label>Ciclo de Faturamento</Label>
										<Select defaultValue="mensal">
											<SelectTrigger>
												<SelectValue />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="semanal">Semanal</SelectItem>
												<SelectItem value="quinzenal">Quinzenal</SelectItem>
												<SelectItem value="mensal">Mensal</SelectItem>
											</SelectContent>
										</Select>
									</div>
								</div>
							</div>
						</CardContent>
					</Card>

					<Card className="overflow-hidden">
						<CardHeader>
							<CardTitle>Fiscal & Contábil</CardTitle>
							<CardDescription>
								Notas, faturas e integrações contábeis.
							</CardDescription>
						</CardHeader>
						<CardContent>
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<div className="space-y-2">
									<Label>Integração Contábil</Label>
									<Select defaultValue="contaazul">
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="contaazul">ContaAzul</SelectItem>
											<SelectItem value="quickbooks">QuickBooks</SelectItem>
											<SelectItem value="omnis">Omie</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="flex items-end">
									<Button className="w-full" variant="outline">
										Baixar últimas faturas
									</Button>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				{/* 4. Segurança */}
				<TabsContent className="space-y-4 sm:space-y-6" value="seguranca">
					<Card className="overflow-hidden">
						<CardHeader>
							<CardTitle>Segurança & Acesso</CardTitle>
							<CardDescription>
								Proteja a conta e gerencie sessões.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
								<div className="flex-1">
									<Label className="text-base">
										Autenticação em Dois Fatores (2FA)
									</Label>
									<p className="text-muted-foreground text-sm">
										Recomendado para contas com movimento financeiro.
									</p>
								</div>
								<Switch
									checked={twoFA}
									className="self-start sm:self-auto"
									onCheckedChange={setTwoFA}
								/>
							</div>
							<Separator />
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
								<div className="space-y-2">
									<Label>Nova Senha</Label>
									<Input placeholder="••••••••" type="password" />
								</div>
								<div className="space-y-2">
									<Label>Confirmar Senha</Label>
									<Input placeholder="••••••••" type="password" />
								</div>
							</div>
							<Separator />
							<div className="space-y-3">
								<Label className="text-base">Dispositivos & Sessões</Label>
								<div className="space-y-2">
									<Card className="border-dashed">
										<CardContent className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
											<span className="text-sm">
												Chrome • Windows • São Paulo • Último acesso há 2h
											</span>
											<Button
												className="w-full sm:w-auto"
												size="sm"
												variant="outline"
											>
												Encerrar
											</Button>
										</CardContent>
									</Card>
									<Card className="border-dashed">
										<CardContent className="flex flex-col gap-3 py-3 sm:flex-row sm:items-center sm:justify-between">
											<span className="text-sm">
												Safari • iOS • Campinas • Último acesso há 1d
											</span>
											<Button
												className="w-full sm:w-auto"
												size="sm"
												variant="outline"
											>
												Encerrar
											</Button>
										</CardContent>
									</Card>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				{/* 5. Notificações */}
				<TabsContent className="space-y-4 sm:space-y-6" value="notificacoes">
					<Card className="overflow-hidden">
						<CardHeader>
							<CardTitle>Preferências de Notificação</CardTitle>
							<CardDescription>
								Escolha quais alertas deseja receber e por qual canal.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="grid grid-cols-1 gap-3 sm:gap-4 xl:grid-cols-2">
								<div className="flex items-center justify-between gap-3 rounded-lg border p-3">
									<div className="min-w-0 flex-1">
										<p className="font-medium text-sm">Vendas realizadas</p>
										<p className="text-muted-foreground text-xs sm:text-sm">
											Um e-mail a cada pedido confirmado.
										</p>
									</div>
									<Switch
										checked={emailSales}
										className="shrink-0"
										onCheckedChange={setEmailSales}
									/>
								</div>
								<div className="flex items-center justify-between gap-3 rounded-lg border p-3">
									<div className="min-w-0 flex-1">
										<p className="font-medium text-sm">Repasses aprovados</p>
										<p className="text-muted-foreground text-xs sm:text-sm">
											Resumo por e-mail quando houver repasse.
										</p>
									</div>
									<Switch
										checked={emailPayouts}
										className="shrink-0"
										onCheckedChange={setEmailPayouts}
									/>
								</div>
								<div className="flex items-center justify-between gap-3 rounded-lg border p-3">
									<div className="min-w-0 flex-1">
										<p className="font-medium text-sm">SMS / WhatsApp</p>
										<p className="text-muted-foreground text-xs sm:text-sm">
											Alertas rápidos (estoque crítico, chargeback).
										</p>
									</div>
									<Switch
										checked={smsAlerts}
										className="shrink-0"
										onCheckedChange={setSmsAlerts}
									/>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				{/* 6. Integrações */}
				<TabsContent className="space-y-4 sm:space-y-6" value="integracoes">
					<Card className="overflow-hidden">
						<CardHeader>
							<CardTitle>Integrações</CardTitle>
							<CardDescription>
								Conecte plataformas, marketplaces e gateways.
							</CardDescription>
						</CardHeader>
						<CardContent className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
							<Card className="border-dashed">
								<CardHeader>
									<CardTitle className="text-base">Shopify</CardTitle>
									<CardDescription>
										Sincronize produtos e pedidos.
									</CardDescription>
								</CardHeader>
								<CardContent className="flex items-center justify-between">
									<Button variant="outline">Conectar</Button>
									<PlugZap className="h-5 w-5" />
								</CardContent>
							</Card>
							<Card className="border-dashed">
								<CardHeader>
									<CardTitle className="text-base">Nuvemshop</CardTitle>
									<CardDescription>Importe catálogo e estoque.</CardDescription>
								</CardHeader>
								<CardContent className="flex items-center justify-between">
									<Button variant="outline">Conectar</Button>
									<PlugZap className="h-5 w-5" />
								</CardContent>
							</Card>
							<Card className="border-dashed">
								<CardHeader>
									<CardTitle className="text-base">Mercado Pago</CardTitle>
									<CardDescription>
										Receba pagamentos com segurança.
									</CardDescription>
								</CardHeader>
								<CardContent className="flex items-center justify-between">
									<Button variant="outline">Conectar</Button>
									<PlugZap className="h-5 w-5" />
								</CardContent>
							</Card>
						</CardContent>
					</Card>
				</TabsContent>

				{/* 7. Preferências do Sistema */}
				<TabsContent className="space-y-4 sm:space-y-6" value="preferencias">
					<Card className="overflow-hidden">
						<CardHeader>
							<CardTitle>Tema & Layout</CardTitle>
							<CardDescription>
								Personalize a aparência e filtros padrão.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
								<div className="flex items-center gap-3">
									{theme === "dark" ? (
										<Moon className="h-4 w-4 shrink-0" />
									) : (
										<Sun className="h-4 w-4 shrink-0" />
									)}
									<div className="min-w-0 flex-1">
										<p className="font-medium">
											Tema {theme === "dark" ? "Escuro" : "Claro"}
										</p>
										<p className="text-muted-foreground text-sm">
											Alterne o modo de exibição do painel.
										</p>
									</div>
								</div>
								<Switch
									checked={theme === "dark"}
									className="shrink-0 self-start sm:self-auto"
									onCheckedChange={(v) => setTheme(v ? "dark" : "light")}
								/>
							</div>
							<Separator />
							<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
								<div className="space-y-2">
									<Label>Intervalo padrão dos relatórios</Label>
									<Select defaultValue="30d">
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="7d">Últimos 7 dias</SelectItem>
											<SelectItem value="30d">Últimos 30 dias</SelectItem>
											<SelectItem value="90d">Últimos 90 dias</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="space-y-2">
									<Label>Layout</Label>
									<Select defaultValue="compacto">
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="compacto">Compacto</SelectItem>
											<SelectItem value="espacado">Espaçado</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="space-y-2">
									<Label>Unidade</Label>
									<Select defaultValue="kg">
										<SelectTrigger>
											<SelectValue />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="kg">kg</SelectItem>
											<SelectItem value="lb">lb</SelectItem>
											<SelectItem value="un">un</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				{/* 8. Plano & Assinatura */}
				<TabsContent className="space-y-4 sm:space-y-6" value="plano">
					<Card className="overflow-hidden">
						<CardHeader>
							<CardTitle>Plano e Assinatura</CardTitle>
							<CardDescription>
								Gerencie limites, cobrança e upgrades.
							</CardDescription>
						</CardHeader>
						<CardContent className="grid grid-cols-1 gap-4 xl:grid-cols-3">
							<Card className="border-dashed xl:col-span-2">
								<CardHeader>
									<CardTitle className="text-base">Plano Atual: Pro</CardTitle>
									<CardDescription className="text-xs sm:text-sm">
										Pedidos ilimitados • 10.000 produtos • Suporte prioritário
									</CardDescription>
								</CardHeader>
								<CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center">
									<Button className="w-full sm:w-auto">Fazer upgrade</Button>
									<Button className="w-full sm:w-auto" variant="outline">
										Ver histórico de pagamentos
									</Button>
								</CardContent>
							</Card>
							<Card className="border-dashed">
								<CardHeader>
									<CardTitle className="text-base">Próxima cobrança</CardTitle>
									<CardDescription className="text-xs sm:text-sm">
										R$ 129,90 em 30/10/2025 no cartão • **** 2211
									</CardDescription>
								</CardHeader>
								<CardContent>
									<Button className="w-full" variant="outline">
										Gerenciar cobrança
									</Button>
								</CardContent>
							</Card>
						</CardContent>
					</Card>

					<Card className="overflow-hidden">
						<CardHeader>
							<CardTitle>Encerramento da Conta</CardTitle>
							<CardDescription>
								Exportar dados, pausar ou excluir permanentemente.
							</CardDescription>
						</CardHeader>
						<CardContent className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
							<Button
								className="flex items-center justify-center gap-2"
								variant="outline"
							>
								<Database className="h-4 w-4" />
								Exportar dados
							</Button>
							<Button
								className="flex items-center justify-center gap-2"
								variant="outline"
							>
								<PauseCircle className="h-4 w-4" />
								Pausar conta
							</Button>
							<Button
								className="flex items-center justify-center gap-2"
								variant="destructive"
							>
								<Trash2 className="h-4 w-4" />
								Excluir conta
							</Button>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</main>
	)
}
