import { createFileRoute } from "@tanstack/react-router";
import { analytics } from "@/constants/_app/_admin/dashboard/analytics";
import { AnalyticOverviewCard } from "./analytic-overview-card";

export const Route = createFileRoute(
	"/_app/_admin/dashboard/~components/analytics-overview"
)({
	component: AnalyticsOverview,
});

export function AnalyticsOverview() {
	return (
		<article className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
			{analytics.map((item) => (
				<AnalyticOverviewCard
					comment={item.comment}
					icon={item.icon}
					key={item.id}
					message={item.message}
					rate={item.rate}
					title={item.title}
					value={item.value}
				/>
			))}
		</article>
	);
}
