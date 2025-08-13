import { createFileRoute } from "@tanstack/react-router";
import { QuestionsAccordion } from "@/components/questions-accordion";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute(
	"/_app/_public/~components/frequently-asked-questions"
)({
	component: () => (
		<FrequentlyAskedQuestions badge="Badge" layout="landing" title="Title" />
	),
});

interface FrequentlyAskedQuestionsProps {
	layout: "landing" | "rewards";
	badge: string;
	title: string;
}

export function FrequentlyAskedQuestions({
	layout = "landing",
	badge,
	title,
}: FrequentlyAskedQuestionsProps) {
	return (
		<section className="py-10 lg:py-20" id="questions">
			<article className="flex flex-col items-center gap-6 pb-10">
				<Badge className="bg-primary-green-light font-semibold text-black uppercase">
					{badge}
				</Badge>

				<h1 className="text-center font-semibold text-5xl md:text-6xl">
					{title}
				</h1>
			</article>

			{layout === "landing" ? (
				<div className="flex flex-col items-center gap-6 lg:flex-row lg:items-center lg:gap-12">
					<div className="order-2 w-full lg:order-2 lg:flex-1">
						<QuestionsAccordion layout={layout} />
					</div>

					{/** biome-ignore lint/performance/noImgElement: required by @Vite */}
					<img
						alt="Frequently Asked Questions"
						className="order-1 w-full rounded-2xl lg:order-1 lg:max-w-md lg:flex-1"
						src="https://framerusercontent.com/images/RpVXrgxEjJvnyFxEtC0k1WVw.png"
					/>
				</div>
			) : (
				<div className="w-full">
					<QuestionsAccordion layout={layout} />
				</div>
			)}
		</section>
	)
}
