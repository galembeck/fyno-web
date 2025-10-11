import { createFileRoute } from "@tanstack/react-router";
import { AnalyticsOverview } from "./~components/analytics-overview";

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
		<main className="container mx-auto p-4">
			<AnalyticsOverview />
		</main>
	);
}
