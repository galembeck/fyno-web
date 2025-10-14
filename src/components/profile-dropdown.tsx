import { useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, LogOut } from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/_auth/use-auth";
import { getInitials } from "@/lib/get-initials";
import { Avatar, AvatarFallback } from "./ui/avatar";

export function ProfileDropdown() {
	const { user, logout } = useAuth();

	const navigate = useNavigate();

	const userInitials = getInitials(user?.name, user?.lastname);

	const handleLogout = () => {
		logout();
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Avatar className="h-8 w-8 cursor-pointer rounded-lg">
					<AvatarFallback className="rounded-lg bg-primary font-semibold text-primary-foreground">
						{userInitials}
					</AvatarFallback>
				</Avatar>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="start" className="w-56">
				<DropdownMenuLabel className="text-muted-foreground">
					Painel administrativo
				</DropdownMenuLabel>
				<DropdownMenuGroup>
					<DropdownMenuItem
						onClick={() => navigate({ to: "/admin/dashboard" })}
					>
						<LayoutDashboard />
						Dashboard
					</DropdownMenuItem>
				</DropdownMenuGroup>

				<DropdownMenuSeparator />

				<DropdownMenuItem className="focus:text-red-400" onClick={handleLogout}>
					<LogOut />
					Sair
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
