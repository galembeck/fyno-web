"use client";

import { createFileRoute, Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";

export const Route = createFileRoute(
  "/_app/admin/~components/sidebar/elements/team-switcher"
)({
  component: TeamSwitcher,
});

export function TeamSwitcher() {
  // const { user, isLoading } = useAuth();

  // const { isMobile } = useSidebar();

  // const [activeTeam, setActiveTeam] = useState(teams[0]);

  // if (!activeTeam) {
  //   return null;
  // }

  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex flex-col items-center justify-center py-4">
        <Link className="flex gap-2 " to="/">
          {/** biome-ignore lint/performance/noImgElement: required b @Vite */}
          <img alt="Fyno" className="size-7" src="/assets/icons/logo.svg" />
          <h1 className="font-semibold text-black text-xl lg:text-2xl dark:text-white">
            Fyno
          </h1>
        </Link>

        <Badge
          className="mt-3 text-center font-bold text-xs uppercase"
          variant="outline"
        >
          Dashboard
        </Badge>

        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              size="lg"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary-green text-sidebar-primary-foreground">
                <GalleryVerticalEnd className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">Galembeck's Coorp.</span>
                <span className="truncate text-xs">Entreprise</span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Teams
            </DropdownMenuLabel>
            {teams.map((team, index) => (
              <DropdownMenuItem
                className="gap-2 p-2"
                key={team.name}
                onClick={() => setActiveTeam(team)}
              >
                <div className="flex size-6 items-center justify-center rounded-md border">
                  <team.logo className="size-3.5 shrink-0" />
                </div>
                {team.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">Add team</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu> */}
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
