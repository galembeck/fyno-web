import { Link } from "@tanstack/react-router";
import { ArrowRight, Headphones, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

export function Navbar() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const closeMenu = () => {
		setIsMenuOpen(false);
	};

	return (
		<nav className="fixed top-0 right-0 left-0 z-50 bg-primary-black shadow-lg">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between py-6">
					<Link className="flex gap-2" to="/">
						{/** biome-ignore lint/performance/noImgElement: required b @Vite */}
						<img alt="Fyno" className="size-7" src="/assets/icons/logo.svg" />
						<h1 className="font-semibold text-white text-xl lg:text-2xl">
							Fyno
						</h1>
					</Link>

					<div className="hidden items-center gap-8 lg:flex">
						<Link
							className="text-white transition-colors hover:text-gray-300"
							to="/"
						>
							Benefícios
						</Link>
						<Link
							className="text-white transition-colors hover:text-gray-300"
							to="/"
						>
							Recursos
						</Link>
						<Link
							className="text-white transition-colors hover:text-gray-300"
							to="/"
						>
							Taxas
						</Link>
						<Link
							className="text-white transition-colors hover:text-gray-300"
							to="/"
						>
							Premiações
						</Link>
						<Link
							className="text-white transition-colors hover:text-gray-300"
							to="/"
						>
							Blog
						</Link>
					</div>

					<div className="flex items-center gap-2">
						<Button
							className="hidden cursor-pointer rounded-3xl px-6 py-6 text-base lg:flex"
							variant="secondary"
						>
							Entrar
						</Button>
						<Button className="hidden cursor-pointer rounded-3xl bg-secondary-dark px-6 py-6 text-base hover:bg-secondary-dark/70 lg:flex">
							Criar conta
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
					</div>
				</div>
			</div>

			<div
				className={`overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
					isMenuOpen ? "max-h-[450px] opacity-100" : "max-h-0 opacity-0"
				}`}
			>
				<div className="border-gray-800 border-t bg-primary-black">
					<div className="mx-auto max-w-7xl space-y-4 px-4 py-4">
						<Link
							className="block py-2 text-lg text-white transition-colors hover:text-gray-300"
							onClick={closeMenu}
							to="/"
						>
							Benefícios
						</Link>
						<Link
							className="block py-2 text-lg text-white transition-colors hover:text-gray-300"
							onClick={closeMenu}
							to="/"
						>
							Recursos
						</Link>
						<Link
							className="block py-2 text-lg text-white transition-colors hover:text-gray-300"
							onClick={closeMenu}
							to="/"
						>
							Taxas
						</Link>
						<Link
							className="block py-2 text-lg text-white transition-colors hover:text-gray-300"
							onClick={closeMenu}
							to="/"
						>
							Premiações
						</Link>
						<Link
							className="block py-2 text-lg text-white transition-colors hover:text-gray-300"
							onClick={closeMenu}
							to="/"
						>
							Blog
						</Link>

						<Button
							className="w-full cursor-pointer py-6 font-semibold text-base"
							onClick={closeMenu}
							variant="secondary"
						>
							Entrar
						</Button>
						<Button
							className="w-full cursor-pointer bg-secondary-dark py-6 font-semibold text-base"
							onClick={closeMenu}
						>
							Criar conta
						</Button>
					</div>
				</div>
			</div>

			<article className="flex items-center justify-center gap-4 bg-muted-foreground/30 px-6 py-2">
				<p className="truncate text-navbar-paragraph">
					<span className="hidden md:inline">
						Seu negócio fatura mais de R$50 mil mensais? Aproveite condições
						exclusivas!
					</span>
					<span className="md:hidden">Fatura mais de R$50 mil?</span>
				</p>

				<Button className="group relative flex cursor-pointer items-center overflow-hidden border-1 border-muted-foreground/50 bg-muted-foreground/10 text-navbar-paragraph transition-all hover:bg-muted-foreground/10">
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
