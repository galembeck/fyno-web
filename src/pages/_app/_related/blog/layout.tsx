import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Footer } from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "./~components/navbar";

export const Route = createFileRoute("/_app/_related/blog")({
	component: Layout,
});

function Layout() {
	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<main className="min-h-screen w-full bg-white dark:bg-primary-dark">
				<Navbar />

				<Outlet />

				<Footer />
			</main>
		</ThemeProvider>
	);
}
