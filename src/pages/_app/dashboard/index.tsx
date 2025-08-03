import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/dashboard/")({
	component: Dashboard,
	head: () => ({
		meta: [
			{
				title: "Dashboard | fyno.business",
			},
		],
	}),
});

function Dashboard() {
	return (
		<div>
			<h1>Dashboard</h1>
		</div>
	)
}

