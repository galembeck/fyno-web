import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Settings2 } from "lucide-react";
import type { ComponentProps } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { sidebarData } from "@/constants/_app/_admin/dashboard/sidebar";
import { NavigationContent } from "./elements/nagivation-content";
import { SearchSection } from "./elements/search-section";
import { TeamSwitcher } from "./elements/team-switcher";
import { UserProfile } from "./elements/user-profile";

export const Route = createFileRoute(
  "/_app/admin/~components/sidebar/dashboard-sidebar"
)({
  component: DashboardSidebar,
});

export function DashboardSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  const navigate = useNavigate();

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
        <SearchSection />
      </SidebarHeader>

      <SidebarContent>
        <NavigationContent items={sidebarData.primary} section="Principal" />
        <NavigationContent
          items={sidebarData.integration}
          section="Integração"
        />
        <NavigationContent
          items={sidebarData.transactions}
          section="Transações"
        />

        <SidebarMenuItem className="px-2">
          <SidebarMenuButton
            onClick={() => navigate({ to: "/admin/settings" })}
            tooltip="Configurações"
          >
            <Settings2 />
            <span>Configurações</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarContent>

      <SidebarFooter>
        <UserProfile />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
