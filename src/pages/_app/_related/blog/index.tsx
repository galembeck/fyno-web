import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Filter, Search } from "lucide-react";
import { useState } from "react";
import { CallToAction } from "@/components/call-to-action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { BlogInsights } from "./~components/blog-insights";
import { InsightsFilters } from "./~components/content/insights-filters";

export const Route = createFileRoute("/_app/_related/blog/")({
	component: Blog,
	head: () => ({
		meta: [
			{
				title: "Blog | fyno.blog",
			},
		],
	}),
});

function Blog() {
	const [isFiltersOpen, setIsFiltersOpen] = useState(false);

	const toggleFilters = () => {
		setIsFiltersOpen(!isFiltersOpen);
	};

	return (
		<main className="flex flex-col">
			<div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:pt-20">
				{/** biome-ignore lint/performance/noImgElement: required by @Vite */}
				<img
					alt="Blog"
					className="w-full rounded-2xl"
					src="https://blog.hypercash.com.br/wp-content/uploads/2025/03/Capa-LinkdlnEmpresarial.jpg"
				/>

				<Separator className="my-10 lg:my-20" />

				<article className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
					<div className="flex flex-col gap-3">
						<h1 className="font-bold text-4xl text-black lg:text-5xl dark:text-white">
							Insights do nosso time
						</h1>

						<p className="text-base text-gray-600 dark:text-gray-400">
							Informações úteis e relevantes sobre o mercado e as tecnologias
							importantes para seu negócio.
						</p>
					</div>

					<div className="flex w-full items-center gap-2 md:w-auto">
						<div className="relative flex flex-1 items-center gap-2 md:w-80">
							<Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-gray-400" />
							<Input className="pl-10" placeholder="Procure por um tema..." />

							<Button>
								<ArrowRight />
							</Button>
						</div>

						<Button
							className="lg:hidden"
							onClick={toggleFilters}
							variant="secondary"
						>
							<Filter />
						</Button>
					</div>
				</article>
				<div
					className={`overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
						isFiltersOpen
							? "mt-10 max-h-[600px] opacity-100"
							: "mt-0 max-h-0 opacity-0"
					}`}
				>
					<div className="rounded-md border border-input bg-secondary-white dark:bg-primary-dark">
						<div className="mx-auto max-w-7xl px-4 py-4">
							<InsightsFilters isMobileView={true} />
						</div>
					</div>
				</div>
			</div>

			<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 lg:pb-10">
				<BlogInsights />
			</div>

			<Separator className="mt-10" />

			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<CallToAction />
			</div>
		</main>
	);
}
