import { createFileRoute } from "@tanstack/react-router";
import { Benefits } from "./~components/sections/benefits";
import { CallToAction } from "./~components/sections/call-to-action";
import { FrequentlyAskedQuestions } from "./~components/sections/frequently-asked-questions";
import { Intro } from "./~components/sections/intro";
import { Resources } from "./~components/sections/resources";

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
			<div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 sm:px-6 lg:gap-32 lg:px-8">
				<Intro />
				<Benefits />
				<Resources />
				{/* <Rewards /> */}
				<FrequentlyAskedQuestions />
				<CallToAction />
			</div>

			{/* <CompaniesMarquee /> */}
		</main>
	);
}
