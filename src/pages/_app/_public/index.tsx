import { createFileRoute } from "@tanstack/react-router";
import { FrequentlyAskedQuestions } from "@/components/frequently-asked-questions";
import { CallToAction } from "../../../components/call-to-action";
import { Benefits } from "./~components/sections/benefits";
import { Intro } from "./~components/sections/intro";
import { RecentArticles } from "./~components/sections/recent-articles";
import { Resources } from "./~components/sections/resources";
import { Rewards } from "./~components/sections/rewards";
import { Taxes } from "./~components/sections/taxes";

export const Route = createFileRoute("/_app/_public/")({
	component: Index,
	head: () => ({
		meta: [
			{
				title:
					"Fyno | Pagamentos rápidos, seguros e escaláveis para qualquer negócio",
			},
		],
	}),
});

function Index() {
	return (
		<main className="flex flex-col">
			<div className="bg-gradient-to-b from-white to-third-green-light dark:from-primary-dark dark:to-secondary-dark">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<Intro />
				</div>
			</div>
			<div className="bg-white dark:bg-secondary-dark">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<Benefits />
				</div>
			</div>
			<div className="bg-primary-black text-white">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<Resources />
				</div>
			</div>
			<div className="bg-white dark:bg-primary-dark">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<Rewards />
				</div>
			</div>
			<div className="bg-primary-black text-white">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<Taxes />
				</div>
			</div>
			<div className="bg-white dark:bg-primary-dark">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<RecentArticles />
				</div>
			</div>
			<div className="bg-white dark:bg-secondary-dark">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<CallToAction />
				</div>
			</div>
			<div className="bg-secondary-white dark:bg-primary-dark">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<FrequentlyAskedQuestions
						badge="Dúvidas frequentes"
						layout="landing"
						title="Tire suas dúvidas aqui"
					/>
				</div>
			</div>

			{/* <CompaniesMarquee /> */}
		</main>
	);
}
