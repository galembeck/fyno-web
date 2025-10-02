import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChevronDown, LogIn, Menu, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuPortal,
	DropdownMenuSeparator,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Route = createFileRoute("/_app/_related/blog/~components/navbar")({
	component: Navbar,
});

function CareersDropdown() {
	return (
		<DropdownMenuContent align="start" className="w-56">
			<DropdownMenuLabel>Carreiras</DropdownMenuLabel>
			<DropdownMenuSeparator />
			<DropdownMenuGroup>
				<DropdownMenuItem>Em breve...</DropdownMenuItem>
			</DropdownMenuGroup>
			<DropdownMenuSeparator />
			<DropdownMenuGroup>
				<DropdownMenuSub>
					<DropdownMenuSubTrigger>Em breve...</DropdownMenuSubTrigger>
					<DropdownMenuPortal>
						<DropdownMenuSubContent>
							<DropdownMenuItem>...</DropdownMenuItem>
						</DropdownMenuSubContent>
					</DropdownMenuPortal>
				</DropdownMenuSub>
			</DropdownMenuGroup>
		</DropdownMenuContent>
	);
}

export function Navbar() {
	const navigate = useNavigate();

	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [isMobileDropdownOpen, setIsMobileDropdownOpen] = useState(false);

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};
	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	return (
		<nav className="bg-secondary-white shadow-secondary-white shadow-xs dark:bg-primary-black dark:shadow-primary-dark">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between py-3">
					<Link className="flex gap-2" to="/">
						{/** biome-ignore lint/performance/noImgElement: required b @Vite */}
						<img alt="Fyno" className="size-7" src="/assets/icons/logo.svg" />
						<h1 className="font-semibold text-black text-xl lg:text-2xl dark:text-white">
							Fyno
						</h1>
					</Link>

					<div className="hidden items-center gap-8 lg:flex">
						<Button
							className="font-normal text-base text-black transition-colors hover:text-black/75 dark:text-white dark:hover:text-gray-300"
							onClick={() => navigate({ to: "/", hash: "taxes" })}
							variant="link"
						>
							Taxas
						</Button>
						<Button
							className="font-normal text-base text-black transition-colors hover:text-black/75 dark:text-white dark:hover:text-gray-300"
							onClick={() => navigate({ to: "/contact" })}
							variant="link"
						>
							Contato
						</Button>
						<Button
							className="font-normal text-base text-black transition-colors hover:text-black/75 dark:text-white dark:hover:text-gray-300"
							onClick={() => navigate({ to: "/", hash: "questions" })}
							variant="link"
						>
							FAQ
						</Button>

						<DropdownMenu
							onOpenChange={setIsDropdownOpen}
							open={isDropdownOpen}
						>
							<DropdownMenuTrigger>
								<Button
									className="bg-transparent font-normal text-base text-black transition-colors hover:bg-transparent hover:text-black/75 dark:bg-transparent dark:text-white dark:hover:bg-transparent dark:hover:text-gray-300"
									variant="ghost"
								>
									Carreiras
									<ChevronDown
										className={`transition-transform duration-200 ${
											isDropdownOpen ? "rotate-180" : "rotate-0"
										}`}
									/>
									{/* <Badge className="font-semibold">Contratando</Badge> */}
								</Button>
							</DropdownMenuTrigger>
							<CareersDropdown />
						</DropdownMenu>
					</div>

					<div className="flex items-center gap-3">
						<Button
							className="hidden cursor-pointer rounded-3xl bg-primary-green py-3 text-base text-black hover:bg-primary-green/80 lg:flex"
							onClick={() => navigate({ to: "/sign-up" })}
						>
							Criar conta
							<LogIn className="size-5" />
						</Button>

						<Button
							className="cursor-pointer lg:hidden"
							onClick={toggleMenu}
							size="icon"
							variant="ghost"
						>
							{isMenuOpen ? (
								<X className="size-7" />
							) : (
								<Menu className="size-7" />
							)}
						</Button>

						<ThemeToggle />
					</div>
				</div>
			</div>

			<div
				className={`overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
					isMenuOpen ? "max-h-[450px] opacity-100" : "max-h-0 opacity-0"
				}`}
			>
				<div className="border-gray-800 border-t bg-secondary-white dark:bg-primary-black">
					<div className="mx-auto max-w-7xl space-y-4 px-4 py-4">
						<Button
							className="-px-2 block cursor-pointer py-2 font-normal text-black text-lg transition-colors hover:text-black/75 dark:text-white dark:hover:text-gray-300"
							onClick={() => navigate({ to: "/", hash: "taxes" })}
							variant="link"
						>
							Taxas
						</Button>
						<Button
							className="-px-2 block cursor-pointer py-2 font-normal text-black text-lg transition-colors hover:text-black/75 dark:text-white dark:hover:text-gray-300"
							onClick={() => navigate({ to: "/contact" })}
							variant="link"
						>
							Contato
						</Button>
						<Button
							className="-px-2 block cursor-pointer py-2 font-normal text-black text-lg transition-colors hover:text-black/75 dark:text-white dark:hover:text-gray-300"
							onClick={() => navigate({ to: "/", hash: "questions" })}
							variant="link"
						>
							FAQ
						</Button>
						<DropdownMenu
							onOpenChange={setIsMobileDropdownOpen}
							open={isMobileDropdownOpen}
						>
							<DropdownMenuTrigger>
								<Button
									className="-px-2 relative right-3 flex cursor-pointer py-2 font-normal text-black text-lg transition-colors hover:text-black/75 dark:text-white dark:hover:text-gray-300"
									variant="link"
								>
									Carreiras
									<ChevronDown
										className={`transition-transform duration-200 ${isMobileDropdownOpen ? "rotate-180" : "rotate-0"}`}
									/>
								</Button>
							</DropdownMenuTrigger>
							<CareersDropdown />
						</DropdownMenu>

						<Button
							className="w-full cursor-pointer bg-primary-green py-5 font-semibold text-base text-black hover:bg-primary-green/80"
							onClick={() => {
								closeMenu();
								navigate({ to: "/sign-up" });
							}}
						>
							Criar conta
							<LogIn className="size-5" />
						</Button>
					</div>
				</div>
			</div>
		</nav>
	);
}
