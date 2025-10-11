import {
	createFileRoute,
	Outlet,
	redirect,
	useLocation,
} from "@tanstack/react-router";
import { ThemeToggle } from "@/components/theme-toggle";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@/components/ui/sidebar";
import { ThemeProvider } from "@/providers/theme/theme-provider";
import { DashboardSidebar } from "./dashboard/~components/sidebar/dashboard-sidebar";

export const Route = createFileRoute("/_app/_admin")({
	component: Layout,
	beforeLoad: ({ location }) => {
		const token = localStorage.getItem("strapi_jwt");

		if (!token) {
			throw redirect({
				to: "/sign-in",
				search: {
					redirect: location.href,
				},
			});
		}
	},
});

function Layout() {
	const location = useLocation();

	const pageLabels: Record<string, string> = {
		"/dashboard": "Dashboard",
		"/dashboard/settings": "Configurações de Conta",
		"/dashboard/profile": "Perfil",
	};

	const currentPageLabel = pageLabels[location.pathname] || "Página";

	return (
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<div className="min-h-screen w-full dark:bg-app-background dark:text-white">
				<SidebarProvider>
					<DashboardSidebar />

					<SidebarInset>
						<header className="flex h-16 shrink-0 items-center justify-between gap-2 pr-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
							<div className="flex items-center gap-2 px-4">
								<SidebarTrigger className="-ml-1" />
								<Separator
									className="mr-2 data-[orientation=vertical]:h-4"
									orientation="vertical"
								/>
								<Breadcrumb>
									<BreadcrumbList>
										{location.pathname !== "/dashboard" && (
											<>
												<BreadcrumbItem>
													<BreadcrumbLink href="/dashboard">
														Dashboard
													</BreadcrumbLink>
												</BreadcrumbItem>
												<BreadcrumbSeparator />
											</>
										)}
										<BreadcrumbItem>
											<BreadcrumbPage>{currentPageLabel}</BreadcrumbPage>
										</BreadcrumbItem>
									</BreadcrumbList>
								</Breadcrumb>
							</div>

							<ThemeToggle />
						</header>

						<Outlet />
					</SidebarInset>
				</SidebarProvider>
			</div>
		</ThemeProvider>
	);
}
