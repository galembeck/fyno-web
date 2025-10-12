import { createFileRoute } from "@tanstack/react-router";
import { AnalyticsOverview } from "./~components/analytics/analytics-overview";
import { ChartAreaInteractive } from "./~components/chart-area-interactive";

export const Route = createFileRoute("/_app/_admin/dashboard/")({
	component: DashboardPage,
	head: () => ({
		meta: [
			{
				title: "Dashboard | fyno.business",
			},
		],
	}),
});

function DashboardPage() {
	return (
		<main className="container mx-auto space-y-8 p-4">
			<AnalyticsOverview />

			<ChartAreaInteractive />
		</main>
	);
}
