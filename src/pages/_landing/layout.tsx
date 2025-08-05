import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export const Route = createFileRoute("/_landing")({
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

				<Footer />
			</div>
		</main>
	);
}
