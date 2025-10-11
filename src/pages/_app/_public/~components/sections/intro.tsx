import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, LogIn, MessageCircleIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { useTheme } from "@/providers/theme/theme-provider";

export const Route = createFileRoute(
	"/_app/_public/~components/sections/intro"
)({
	component: Intro,
});

export function Intro() {
	const { theme } = useTheme();

	const navigate = useNavigate();

	return (
		<div className="flex flex-col justify-center py-10 text-center lg:py-20">
			<Link to="/blog">
				<Badge className="items-center gap-2 rounded-full bg-third-green-light py-2 dark:bg-primary-green-dark">
					<Badge className="rounded-full bg-primary-green font-normal text-sm">
						Novo
					</Badge>
					<p className="flex items-center gap-2 font-light text-base text-black dark:text-primary-green">
						Automação & Revisão com IA
						<ArrowRight className="size-4" />
					</p>
				</Badge>
			</Link>

			<TypingAnimation className="pt-4 font-semibold text-5xl leading-tight tracking-tight md:pt-0 md:text-6xl lg:text-7xl xl:text-8xl">
				Venda com segurança e receba com tranquilidade
			</TypingAnimation>

			{/* <div className="flex justify-center pb-9">
				<Badge className="gap-2 rounded-full px-2 py-2">
					<Sparkle className="fill-white" />
					<p className="font-extralight text-base md:text-lg">
						+367 empresas confiam
					</p>
					<div className="-space-x-3 flex *:data-[slot=avatar]:size-7">
						<Avatar>
							<AvatarImage alt="@shadcn" src="https://github.com/shadcn.png" />
							<AvatarFallback>CN</AvatarFallback>
						</Avatar>
						<Avatar>
							<AvatarImage alt="@leerob" src="https://github.com/leerob.png" />
							<AvatarFallback>LR</AvatarFallback>
						</Avatar>
						<Avatar>
							<AvatarImage
								alt="@evilrabbit"
								src="https://github.com/evilrabbit.png"
							/>
							<AvatarFallback>ER</AvatarFallback>
						</Avatar>
					</div>
				</Badge>
			</div> */}

			<p className="font-light text-lg text-muted-foreground leading-relaxed md:mx-auto md:max-w-3xl md:text-center md:text-2xl lg:max-w-4xl dark:text-secondary-gray">
				Projetada para suportar operações de alto nível, nossa plataforma
				garante pagamentos rápidos, seguros e sem complicação.
			</p>

			<div className="flex flex-col justify-center gap-4 py-10 md:flex-row md:py-16 lg:py-12">
				<Button
					className="cursor-pointer items-center rounded-full bg-primary-green px-8 py-6 text-black text-lg hover:bg-primary-green/80"
					onClick={() => navigate({ to: "/sign-up" })}
					variant="secondary"
				>
					Criar minha conta
					<LogIn className="size-5" />
				</Button>

				<Button
					className="cursor-pointer items-center rounded-full border-2 bg-transparent px-8 py-6 text-black text-lg hover:bg-secondary-white dark:text-white dark:hover:text-black"
					onClick={() => navigate({ to: "/sign-up" })}
				>
					Fale com nossa equipe
					<MessageCircleIcon className="size-5" />
				</Button>
			</div>

			{/** biome-ignore lint/performance/noImgElement: required by @Vite */}
			<img
				alt="Dashboard"
				src={`${theme === "dark" || theme === "system" ? "/assets/images/dashboard-dark.png" : "/assets/images/dashboard-light.png"}`}
			/>
		</div>
	);
}
