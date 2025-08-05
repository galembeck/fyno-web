import { createFileRoute } from "@tanstack/react-router";
import { QuestionsAccordion } from "@/components/questions-accordion";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute(
	"/_landing/~components/sections/frequently-asked-questions"
)({
	component: FrequentlyAskedQuestions,
});

export function FrequentlyAskedQuestions() {
	return (
		<section className="py-20" id="questions">
			<article className="flex flex-col items-center gap-6 pb-10">
				<Badge className="bg-primary-green-light font-semibold text-black uppercase">
					Dúvidas frequentes
				</Badge>

				<h1 className="text-center font-semibold text-5xl md:text-6xl">
					Tire suas dúvidas aqui!
				</h1>
			</article>

			<div className="flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:gap-12">
				<div className="order-2 w-full lg:order-2 lg:flex-1">
					<QuestionsAccordion />
				</div>

				{/** biome-ignore lint/performance/noImgElement: required by @Vite */}
				<img
					alt="Frequently Asked Questions"
					className="order-1 w-full rounded-2xl lg:order-1 lg:max-w-md lg:flex-1"
					src="https://framerusercontent.com/images/RpVXrgxEjJvnyFxEtC0k1WVw.png"
				/>
			</div>
		</section>
	);
}
