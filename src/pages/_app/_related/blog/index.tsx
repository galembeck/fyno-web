import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Filter, Search, X } from "lucide-react";
import { useState } from "react";
import z from "zod";
import { CallToAction } from "@/components/call-to-action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { useCategoriesQuery } from "@/hooks/_related/blog/use-categories-query";
import { BlogArticles } from "./~components/blog-articles";
import { ArticlesFilters } from "./~components/content/articles-filters";

const blogSearchSchema = z.object({
	search: z.string().optional().catch(undefined),
	category: z.number().optional().catch(undefined),
	page: z.number().min(1).optional().catch(1),
	pageSize: z.number().min(1).max(25).optional().catch(10),
});

export const Route = createFileRoute("/_app/_related/blog/")({
	component: Blog,
	validateSearch: blogSearchSchema,
	head: () => ({
		meta: [
			{
				title: "Blog | fyno.blog",
			},
		],
	}),
});

function Blog() {
	const navigate = useNavigate({ from: "/blog" });

	const { data: categories = [] } = useCategoriesQuery();
	const {
		search: searchQuery,
		category: selectedCategory,
		page: currentPage = 1,
		pageSize: itemsPerPage = 10,
	} = Route.useSearch();

	const [isFiltersOpen, setIsFiltersOpen] = useState(false);
	const [searchArticle, setSearchArticle] = useState(searchQuery || "");

	const toggleFilters = () => {
		setIsFiltersOpen(!isFiltersOpen);
	};

	const updateURL = (params: {
		search?: string;
		category?: number | null;
		page?: number;
		pageSize?: number;
	}) => {
		// biome-ignore lint/suspicious/noExplicitAny: required by search-params
		const searchParams: any = {};

		// biome-ignore lint/complexity/useOptionalChain: required by @Strapi
		if (params.search && params.search.trim()) {
			searchParams.search = params.search.trim();
		}

		if (params.category) {
			searchParams.category = params.category;
		}

		if (params.page && params.page > 1) {
			searchParams.page = params.page;
		}

		if (params.pageSize && params.pageSize !== 10) {
			searchParams.pageSize = params.pageSize;
		}

		navigate({
			search: searchParams,
			replace: true,
		});
	};

	const handleSearch = () => {
		const trimmedSearch = searchArticle.trim();
		updateURL({
			search: trimmedSearch,
			category: selectedCategory,
			page: 1,
			pageSize: itemsPerPage,
		});
		setSearchArticle(trimmedSearch);
	};

	const handleKeyPress = (e: React.KeyboardEvent) => {
		if (e.key === "Enter") {
			handleSearch();
		}
	};

	const handleCategoryChange = (categoryId: number | null) => {
		updateURL({
			search: searchQuery,
			category: categoryId,
			page: 1,
			pageSize: itemsPerPage,
		});
	};

	const handlePageChange = (page: number) => {
		updateURL({
			search: searchQuery,
			category: selectedCategory,
			page,
			pageSize: itemsPerPage,
		});
	};

	const handleItemsPerPageChange = (newPageSize: number) => {
		updateURL({
			search: searchQuery,
			category: selectedCategory,
			page: 1,
			pageSize: newPageSize,
		});
	};

	const clearAllFilters = () => {
		setSearchArticle("");
		navigate({
			search: {},
			replace: true,
		});
	};

	const clearSearch = () => {
		setSearchArticle("");
		updateURL({
			search: "",
			category: selectedCategory,
			page: 1,
			pageSize: itemsPerPage,
		});
	};

	const clearCategory = () => {
		updateURL({
			search: searchQuery,
			category: null,
			page: 1,
			pageSize: itemsPerPage,
		});
	};

	const selectedCategoryName = categories.find(
		(category) => category.id === selectedCategory
	)?.name;

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
							Publicações relevantes
						</h1>

						<p className="text-base text-gray-600 dark:text-gray-400">
							Informações úteis e relevantes sobre o mercado e as tecnologias
							importantes para seu negócio.
						</p>
					</div>

					<div className="flex w-full flex-col gap-4 md:w-auto">
						<div className="flex w-full items-center gap-2 md:w-auto">
							<div className="relative flex flex-1 items-center gap-2 md:w-80">
								<Search className="-translate-y-1/2 absolute top-1/2 left-3 h-4 w-4 text-gray-400" />

								<Input
									className="pl-10"
									onChange={(e) => setSearchArticle(e.target.value)}
									onKeyPress={handleKeyPress}
									placeholder="Procure por um artigo..."
									value={searchArticle}
								/>

								<Button onClick={handleSearch}>
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
					</div>
				</article>

				{(searchQuery || selectedCategory) && (
					<div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
						<div className="flex flex-wrap items-center gap-2">
							<span className="text-gray-600 text-sm dark:text-gray-400">
								Filtros ativos:
							</span>

							{searchQuery && (
								<span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-blue-800 text-sm dark:bg-blue-900 dark:text-blue-200">
									Pesquisa: "{searchQuery}"
									<Button
										className="h-4 w-4 p-0 hover:bg-blue-200 dark:hover:bg-blue-800"
										onClick={clearSearch}
										size="sm"
										variant="ghost"
									>
										<X className="h-3 w-3" />
									</Button>
								</span>
							)}

							{selectedCategory && (
								<span className="inline-flex items-center gap-1 rounded-full bg-green-100 px-3 py-1 text-green-800 text-sm dark:bg-green-900 dark:text-green-200">
									Categoria: {selectedCategoryName}
									<Button
										className="h-4 w-4 p-0 hover:bg-green-200 dark:hover:bg-green-800"
										onClick={clearCategory}
										size="sm"
										variant="ghost"
									>
										<X className="h-3 w-3" />
									</Button>
								</span>
							)}
						</div>

						<Button
							className="w-full self-start text-xs md:w-fit md:self-auto"
							onClick={clearAllFilters}
							size="sm"
							variant="outline"
						>
							Limpar tudo
						</Button>
					</div>
				)}

				<div
					className={`overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
						isFiltersOpen
							? "mt-10 max-h-[600px] opacity-100"
							: "mt-0 max-h-0 opacity-0"
					}`}
				>
					<div className="rounded-md border border-input bg-secondary-white dark:bg-primary-dark">
						<div className="mx-auto max-w-7xl px-4 py-4">
							<ArticlesFilters
								isMobileView={true}
								onCategoryChange={handleCategoryChange}
								selectedCategory={selectedCategory}
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 lg:pb-10">
				<div className="flex flex-col gap-8 lg:flex-row">
					<ArticlesFilters
						isMobileView={false}
						onCategoryChange={handleCategoryChange}
						selectedCategory={selectedCategory}
					/>

					<div className="flex-1">
						<BlogArticles
							currentPage={currentPage}
							itemsPerPage={itemsPerPage}
							onItemsPerPageChange={handleItemsPerPageChange}
							onPageChange={handlePageChange}
							searchQuery={searchQuery}
							selectedCategory={selectedCategory}
						/>
					</div>
				</div>
			</div>

			<Separator className="mt-10" />

			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<CallToAction />
			</div>
		</main>
	);
}
