import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/providers/theme/theme-provider";

export const Route = createFileRoute("/_app/_public")({
	component: Layout,
});

function Layout() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<main className="min-h-screen w-full text-black dark:text-white">
				<div>
					<Navbar />

					<div>
						<Outlet />
					</div>

					<Footer />
				</div>
			</main>
		</ThemeProvider>
	);
}
