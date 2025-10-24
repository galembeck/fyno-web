"use client";

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, LayoutDashboard, Pencil } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/endpoints/auth/use-auth";
import { formatCNPJ } from "./../../../../../../lib/_auth/sign-up/format-masks";

export const Route = createFileRoute(
  "/_app/app/~components/sidebar/elements/team-switcher"
)({
  component: TeamSwitcher,
});

export function TeamSwitcher() {
  const { user, isLoading } = useAuth();

  const { state, isMobile } = useSidebar();

  const navigate = useNavigate();

  if (isLoading || !user) {
    return (
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton disabled size="lg">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarFallback className="animate-pulse rounded-lg bg-gray-300">
                ...
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="h-4 w-20 animate-pulse truncate rounded bg-gray-300 font-medium" />
              <span className="mt-1 h-3 w-24 animate-pulse truncate rounded bg-gray-200 text-xs" />
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    );
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem className="flex flex-col items-center justify-center py-4">
        <Link className="flex gap-2 " to="/">
          {/** biome-ignore lint/performance/noImgElement: required by @Vite */}
          <img alt="Fyno" className="size-7" src="/assets/icons/logo.svg" />
          <h1
            className={`font-semibold text-black text-xl lg:text-2xl dark:text-white ${state === "collapsed" ? "hidden" : "block"}`}
          >
            Fyno
          </h1>
        </Link>

        <Badge
          className={`mt-3 text-center font-bold text-xs uppercase ${state === "collapsed" ? "hidden" : "block"}`}
          variant="outline"
        >
          Dashboard
        </Badge>
      </SidebarMenuItem>

      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              size="lg"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary-green text-sidebar-primary-foreground">
                <LayoutDashboard className="size-5" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {user?.companyName}
                </span>
                <span className="truncate text-muted-foreground text-xs">
                  {user?.businessDescription}
                </span>
              </div>
              <ArrowRight className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="start"
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-muted-foreground">
                Informações empresariais
              </DropdownMenuLabel>

              <DropdownMenuItem>
                <span className="font-bold">CNPJ:</span>
                <p className="text-white/80">{formatCNPJ(user.cnpj)}</p>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <span className="font-bold">Domínio:</span>
                <p className="text-white/80">{user.storeDomain}</p>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <span className="font-bold">Segmento:</span>
                <p className="text-white/80">{user.businessSegment}</p>
              </DropdownMenuItem>

              <DropdownMenuItem>
                <span className="font-bold">Faturamento:</span>
                <p className="text-white/80">{user.monthlyRevenue}</p>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={() => navigate({ to: "/app/settings" })}>
              <Pencil />
              Editar informações
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
