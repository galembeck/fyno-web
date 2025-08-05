import { createFileRoute } from "@tanstack/react-router";
import { LogIn, PlaneTakeoff } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute(
	"/_landing/~components/sections/call-to-action"
)({
	component: CallToAction,
});

export function CallToAction() {
	return (
		<div className="mt-16 rounded-2xl bg-gradient-to-r from-secondary-green-dark to-primary-green-dark p-8 lg:mt-0 lg:mb-32 lg:p-16">
			<article className="flex max-w-md flex-col items-start gap-5 lg:max-w-full lg:flex-row lg:items-center">
				<div className="flex flex-col items-start gap-5 lg:max-w-md">
					<Badge className="bg-third-green-dark font-semibold text-primary-green uppercase">
						Seja Fyno! ⚡
					</Badge>

					<h1 className="font-bold text-3xl md:text-4xl lg:text-5xl">
						A segurança que você precisa para{" "}
						<span className="text-primary-green">vender mais</span>.
					</h1>
				</div>

				<div className="flex flex-col items-start gap-5 lg:max-w-md lg:pl-16">
					<p className="text-secondary-gray lg:text-lg">
						Transações rápidas, seguras e sem surpresas. Aqui você aprova mais
						vendas, recebe rápido e tem total transparência no controle do seu
						faturamento!
					</p>

					<Button
						className="group relative flex items-center bg-primary-green px-4 py-4 font-semibold transition-all hover:bg-secondary-green"
						variant="secondary"
					>
						<span>Criar minha conta</span>
						<span className="group-hover:-translate-x-4 ml-1 transition-all duration-300 group-hover:opacity-0">
							<LogIn />
						</span>
						<span className="absolute right-4 translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
							<PlaneTakeoff />
						</span>
					</Button>
				</div>
			</article>
		</div>
	);
}
