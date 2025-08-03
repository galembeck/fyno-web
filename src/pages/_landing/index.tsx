import { createFileRoute } from "@tanstack/react-router";
import { Intro } from "./~components/sections/intro";

export const Route = createFileRoute("/_landing/")({
	component: RouteComponent,
	head: () => ({
		meta: [
			{
				title:
					"Fyno | Pagamentos rápidos, seguros e escaláveis para qualquer negócio",
			},
		],
	}),
});

function RouteComponent() {
	return (
		<main>
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<Intro />
			</div>

			{/* <CompaniesMarquee /> */}
		</main>
	)
}
