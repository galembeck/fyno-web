import { createFileRoute } from "@tanstack/react-router";
import { CallToAction } from "../~components/call-to-action";
import { FrequentlyAskedQuestions } from "../~components/frequently-asked-questions";
import { Intro } from "./~components/sections/intro";
import { PicturesCarousel } from "./~components/sections/pictures-carousel";
import { RewardsList } from "./~components/sections/rewards-list";

export const Route = createFileRoute("/_landing/rewards/")({
	component: Rewards,
});

function Rewards() {
	return (
		<main className="flex flex-col">
			<div className="bg-primary-dark">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<Intro />
				</div>
			</div>

			<div className="bg-secondary-dark">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<PicturesCarousel />
				</div>
			</div>

			<div className="bg-primary-dark">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<RewardsList />
				</div>
			</div>

			<div className="bg-primary-black">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<FrequentlyAskedQuestions
						badge="FAQ | FREQUENTLY ASKED QUESTIONS"
						layout="rewards"
						title="Perguntas frequentes"
					/>
				</div>
			</div>

			<div className="bg-primary-dark">
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					<CallToAction />
				</div>
			</div>
		</main>
	);
}
