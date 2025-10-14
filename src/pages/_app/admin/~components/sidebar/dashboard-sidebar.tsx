import { createFileRoute } from "@tanstack/react-router";
import type { ComponentProps } from "react";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarRail,
} from "@/components/ui/sidebar";
import { sidebarData } from "@/constants/_app/_admin/dashboard/sidebar";
import { NavigationContent } from "./elements/nagivation-content";
import { NavigationProjects } from "./elements/navigation-projects";
import { SearchSection } from "./elements/search-section";
import { TeamSwitcher } from "./elements/team-switcher";
import { UserProfile } from "./elements/user-profile";

export const Route = createFileRoute(
	"/_app/admin/~components/sidebar/dashboard-sidebar"
)({
	component: DashboardSidebar,
});

export function DashboardSidebar({ ...props }: ComponentProps<typeof Sidebar>) {
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<TeamSwitcher />
				<SearchSection />
			</SidebarHeader>

			<SidebarContent>
				<NavigationContent items={sidebarData.navMain} />
				<NavigationProjects projects={sidebarData.projects} />
			</SidebarContent>

			<SidebarFooter>
				<UserProfile />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	)
}
