import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";

export const Route = createFileRoute("/_app/_related/_compliance")({
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
