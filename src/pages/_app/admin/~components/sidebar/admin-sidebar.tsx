import { createFileRoute } from "@tanstack/react-router";
import type { ComponentProps } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { adminData } from "@/constants/_app/_admin/dashboard/sidebar";
import { NavigationContent } from "@/pages/_app/app/~components/sidebar/elements/nagivation-content";
import { TeamSwitcher } from "@/pages/_app/app/~components/sidebar/elements/team-switcher";
import { UserProfile } from "@/pages/_app/app/~components/sidebar/elements/user-profile";

export const Route = createFileRoute(
  "/_app/admin/~components/sidebar/admin-sidebar"
)({
  component: AdminSidebar,
});

export function AdminSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher type="admin" />
        {/* <SearchSection /> */}
      </SidebarHeader>

      <SidebarContent>
        <NavigationContent
          items={adminData.consolidated}
          section="Consolidado"
        />
      </SidebarContent>

      <SidebarFooter>
        <UserProfile />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
