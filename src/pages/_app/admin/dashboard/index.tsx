import { createFileRoute } from "@tanstack/react-router";
import { AnalyticsOverview } from "./_overview/~components/analytics/analytics-overview";
import { ChartAreaInteractive } from "./_overview/~components/chart-area-interactive";
import { PaymentsSummary } from "./_overview/~components/payments-summary";

export const Route = createFileRoute("/_app/admin/dashboard/")({
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

			<PaymentsSummary />
		</main>
	);
}
