import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<main>
			<h1>Fyno</h1>
		</main>
	);
}
