import { Link, useNavigate } from "@tanstack/react-router";
import {
	ArrowRight,
	ChevronRight,
	Headphones,
	LogIn,
	Menu,
	X,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/_auth/use-auth";
import { ProfileDropdown } from "./profile-dropdown";
import { ThemeToggle } from "./theme-toggle";
import { Button } from "./ui/button";

export function Navbar() {
	const navigate = useNavigate();

	const { user } = useAuth();

	function navigateToBlog() {
		navigate({ to: "/blog" });
	}

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	function scrollToSection(id: string) {
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ behavior: "smooth" });
		}
	}

	return (
		<nav className="sticky top-0 right-0 left-0 z-50 bg-secondary-white shadow-lg dark:bg-primary-black">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between py-3">
					<Link className="flex gap-2" to="/">
						{/** biome-ignore lint/performance/noImgElement: required b @Vite */}
						<img alt="Fyno" className="size-7" src="/assets/icons/logo.svg" />
						<h1 className="font-semibold text-xl lg:text-2xl">Fyno</h1>
					</Link>

					<div className="hidden items-center gap-8 lg:flex">
						<Button
							className="cursor-pointer font-normal text-base text-black transition-colors hover:text-black/75 dark:text-white dark:hover:text-gray-300"
							onClick={() => scrollToSection("benefits")}
							variant="link"
						>
							Benefícios
						</Button>
						<Button
							className="cursor-pointer font-normal text-base text-black transition-colors hover:text-black/75 dark:text-white dark:hover:text-gray-300"
							onClick={() => scrollToSection("resources")}
							variant="link"
						>
							Recursos
						</Button>
						<Button
							className="cursor-pointer font-normal text-base text-black transition-colors hover:text-black/75 dark:text-white dark:hover:text-gray-300"
							onClick={() => scrollToSection("rewards")}
							variant="link"
						>
							Premiações
						</Button>
						<Button
							className="cursor-pointer font-normal text-base text-black transition-colors hover:text-black/75 dark:text-white dark:hover:text-gray-300"
							onClick={() => scrollToSection("taxes")}
							variant="link"
						>
							Taxas
						</Button>
						<Button
							className="cursor-pointer font-normal text-base text-black transition-colors hover:text-black/75 dark:text-white dark:hover:text-gray-300"
							onClick={navigateToBlog}
							variant="link"
						>
							Blog
						</Button>
					</div>

					<div className="flex items-center gap-2">
						{user ? (
							<ProfileDropdown />
						) : (
							<>
								<Button
									className="hidden cursor-pointer rounded-3xl px-6 py-5 text-base lg:flex"
									onClick={() => navigate({ to: "/sign-in" })}
									variant="secondary"
								>
									Entrar
									<ChevronRight className="size-5" />
								</Button>
								<Button
									className="hidden cursor-pointer rounded-3xl bg-primary-green px-6 py-5 text-base text-black hover:bg-primary-green/80 lg:flex"
									onClick={() => navigate({ to: "/sign-up" })}
								>
									Criar conta
									<LogIn className="size-5" />
								</Button>
							</>
						)}

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
				<div className="border-input border-t bg-secondary-white dark:bg-primary-black">
					<div className="mx-auto max-w-7xl space-y-4 px-4 py-4">
						<Button
							className="-px-2 block cursor-pointer py-2 font-normal text-black text-lg transition-colors hover:text-black/75 dark:text-white dark:hover:text-gray-300"
							onClick={() => scrollToSection("benefits")}
							variant="link"
						>
							Benefícios
						</Button>
						<Button
							className="-px-2 block cursor-pointer py-2 font-normal text-black text-lg transition-colors hover:text-black/75 dark:text-white dark:hover:text-gray-300"
							onClick={() => scrollToSection("resources")}
							variant="link"
						>
							Recursos
						</Button>
						<Button
							className="-px-2 block cursor-pointer py-2 font-normal text-black text-lg transition-colors hover:text-black/75 dark:text-white dark:hover:text-gray-300"
							onClick={() => scrollToSection("taxes")}
							variant="link"
						>
							Premiações
						</Button>
						<Button
							className="-px-2 block cursor-pointer py-2 font-normal text-black text-lg transition-colors hover:text-black/75 dark:text-white dark:hover:text-gray-300"
							onClick={() => scrollToSection("awards")}
							variant="link"
						>
							Taxas
						</Button>
						<Button
							className="-px-2 block cursor-pointer py-2 font-normal text-black text-lg transition-colors hover:text-black/75 dark:text-white dark:hover:text-gray-300"
							onClick={navigateToBlog}
							variant="link"
						>
							Blog
						</Button>

						{!user && (
							<>
								<Button
									className="w-full cursor-pointer py-5 font-semibold text-base"
									onClick={() => {
										closeMenu();
										navigate({ to: "/sign-in" });
									}}
									variant="secondary"
								>
									Entrar
									<ChevronRight className="size-5" />
								</Button>
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
							</>
						)}
					</div>
				</div>
			</div>

			<article className="flex items-center justify-center gap-4 bg-primary-black px-6 py-2 dark:bg-muted-foreground/30">
				<p className="truncate text-primary-green">
					<span className="hidden md:inline">
						Seu negócio fatura mais de R$50 mil mensais? Aproveite condições
						exclusivas!
					</span>
					<span className="md:hidden">Fatura mais de R$50 mil?</span>
				</p>

				<Button
					className="group relative flex cursor-pointer items-center overflow-hidden border-1 border-muted-foreground/50 bg-muted-foreground/10 text-primary-green transition-all hover:bg-muted-foreground/10"
					onClick={() => navigate({ to: "/sign-up" })}
				>
					<span className="transition-all duration-300 group-hover:translate-x-2 group-hover:opacity-0">
						<Headphones className="size-3.5" />
					</span>
					<span className="group-hover:-translate-x-4 transition-all duration-300">
						Fale com especialistas
					</span>
					<span className="absolute right-2 translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
						<ArrowRight />
					</span>
				</Button>
			</article>
		</nav>
	);
}
