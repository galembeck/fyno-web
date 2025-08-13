import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/sign-up/")({
	component: SignUp,
});

function SignUp() {
	return (
		<main className="min-h-screen w-full bg-secondary-green-dark text-white">
			<div className="mx-auto flex max-w-md flex-col items-center gap-10 py-10 text-center md:max-w-2xl">
				<Link to="/">
					{/** biome-ignore lint/performance/noImgElement: required by @Vite */}
					<img alt="Fyno" className="size-10" src="/assets/icons/logo.svg" />
				</Link>

				<article className="flex flex-col items-center gap-8">
					<h1 className="font-semibold text-5xl leading-tight md:text-6xl">
						Não aceite menos do que estabilidade de verdade
					</h1>

					<p className="text-base text-secondary-gray">
						Estrutura própria, zero instabilidade e acesso ao seu dinheiro
						quando você quiser.
					</p>
				</article>
			</div>
		</main>
	);
}
