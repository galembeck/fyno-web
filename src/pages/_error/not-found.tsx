import { createFileRoute, Link } from "@tanstack/react-router";
import { Bot, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_error/not-found")({
	component: NotFound,
});

export function NotFound() {
	return (
		<div className="flex h-screen w-full items-center justify-center bg-secondary-green-dark text-white">
			<div className="flex max-w-4xl flex-col items-center justify-center gap-10 text-center">
				<Bot className="size-40 text-primary-green" />

				<article className="flex flex-col gap-4">
					<h1 className="font-bold text-6xl text-white md:text-8xl">4 0 4</h1>
					<p className="text-gray-300 text-lg md:text-xl">
						Página não encontrada :/
					</p>
					<p className="text-gray-400 text-sm">
						A página que você está procurando não existe ou foi movida.
					</p>

					<Button
						asChild
						className="mt-4 bg-primary-green text-black hover:bg-primary-green/80"
					>
						<Link to="/">
							<Home className="mr-2 size-4" />
							Voltar ao início
						</Link>
					</Button>
				</article>
			</div>
		</div>
	);
}
