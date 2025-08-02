import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Navbar } from "@/components/navbar";

export const Route = createFileRoute("/_app")({
	component: Layout,
});

function Layout() {
	return (
		<main className="min-h-screen w-full bg-primary-dark text-white">
			<div>
				<Navbar />

				<div>
					<Outlet />
				</div>
			</div>
		</main>
	);
}
