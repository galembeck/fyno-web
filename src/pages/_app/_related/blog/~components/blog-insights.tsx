import { createFileRoute } from "@tanstack/react-router";
import { insights } from "@/constants/insights";
import { InsightCard } from "./content/insight-card";
import { InsightsFilters } from "./content/insights-filters";

export const Route = createFileRoute(
	"/_app/_related/blog/~components/blog-insights"
)({
	component: BlogInsights,
});

export function BlogInsights() {
	return (
		<div className="flex flex-col gap-8 lg:flex-row">
			<InsightsFilters />

			<div className="flex-1">
				<div className="space-y-8">
					{insights.map((insight) => (
						<InsightCard
							author={insight.author}
							category={insight.category}
							date={insight.date}
							description={insight.description}
							imgUrl={insight.imgUrl}
							key={insight.id}
							readTime={insight.readTime}
							title={insight.title}
						/>
					))}
				</div>
			</div>
		</div>
	)
}
