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
import { NotificationDropdown } from "./~components/notification-dropdown";
import { DashboardSidebar } from "./~components/sidebar/dashboard-sidebar";
import { SearchSection } from "./~components/sidebar/elements/search-section";

export const Route = createFileRoute("/_app/app")({
  component: Layout,
  beforeLoad: ({ location }) => {
    const token = localStorage.getItem("fyno_jwt");

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
    "/app/dashboard": "Dashboard",

    "/app/payments": "Pagamentos",
    // "/app/extracts": "Extratos",

    "/app/clients": "Clientes",
    "/app/client-detail/$clientId": "Detalhes do Cliente",

    "/app/profile": "Perfil",
    "/app/settings": "Configurações de Conta",

    "/app/integration/api-keys": "Integração > API Keys",
    "/app/integration/webhooks": "Integração > Webhooks",

    "/app/products": "Produtos",
    "/app/roadmap": "Roadmap",
    "/app/plugins": "Plugins",
    "/app/partnership": "Programa de Parceria",
  };

  function derivativePaths(path: string) {
    if (path.startsWith("/app/client-detail")) {
      return "/app/client-detail/$clientId";
    }

    return path;
  }

  const currentPageLabel =
    pageLabels[derivativePaths(location.pathname)] || "Página";

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
                    {location.pathname !== "/app" && (
                      <>
                        <BreadcrumbItem>
                          <BreadcrumbLink href="/app/dashboard">
                            Painel Administrativo
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

              <div className="flex items-center gap-2">
                <div className="hidden lg:block">
                  <SearchSection />
                </div>

                <NotificationDropdown />

                <ThemeToggle />
              </div>
            </header>

            <Outlet />
          </SidebarInset>
        </SidebarProvider>
      </div>
    </ThemeProvider>
  );
}
