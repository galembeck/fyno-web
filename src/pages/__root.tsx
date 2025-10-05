import { createRootRoute, HeadContent, Outlet } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { NotFound } from "./_error/not-found";

export const Route = createRootRoute({
	component: RootComponent,
	notFoundComponent: () => <NotFound />,
});

function RootComponent() {
	return (
		<>
			<HeadContent />
			<Outlet />
			<Toaster />
		</>
	);
}
