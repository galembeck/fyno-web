import { createFileRoute } from "@tanstack/react-router";
import { Benefits } from "./~components/sections/benefits";
import { CallToAction } from "./~components/sections/call-to-action";
import { FrequentlyAskedQuestions } from "./~components/sections/frequently-asked-questions";
import { Intro } from "./~components/sections/intro";
import { Resources } from "./~components/sections/resources";
import { Rewards } from "./~components/sections/rewards";
import { Taxes } from "./~components/sections/taxes";

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
		<main className="flex flex-col">
			<div className="bg-primary-dark">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<Intro />
				</div>
			</div>
			<div className="bg-secondary-dark">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<Benefits />
				</div>
			</div>
			<div className="bg-primary-black">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<Resources />
				</div>
			</div>
			<div className="bg-primary-dark">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<Rewards />
				</div>
			</div>
			<div className="bg-secondary-dark">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<Taxes />
				</div>
			</div>
			<div className="bg-primary-black">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<FrequentlyAskedQuestions />
				</div>
			</div>
			<div className="bg-primary-dark">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<CallToAction />
				</div>
			</div>

			{/* <CompaniesMarquee /> */}
		</main>
	);
}
