/** biome-ignore-all lint/suspicious/noEmptyBlockStatements: required by @TanStack-Router */

import { createFileRoute } from "@tanstack/react-router";
import { useArticlesQuery } from "@/hooks/_related/blog/use-articles-query";
import { ArticleCard } from "./content/article-card";
import { BlogPagination } from "./pagination/blog-pagination";

export const Route = createFileRoute(
	"/_app/_related/blog/~components/blog-articles"
)({
	component: () => (
		<BlogArticles
			currentPage={1}
			itemsPerPage={10}
			onItemsPerPageChange={() => {}}
			onPageChange={() => {}}
		/>
	),
});

interface BlogArticlesProps {
	searchQuery?: string;
	selectedCategory?: number;
	currentPage: number;
	itemsPerPage: number;
	onPageChange: (page: number) => void;
	onItemsPerPageChange: (itemsPerPage: number) => void;
}

export function BlogArticles({
	searchQuery,
	selectedCategory,
	currentPage,
	itemsPerPage,
	onPageChange,
	onItemsPerPageChange,
}: BlogArticlesProps) {
	const {
		data: articlesResponse,
		isLoading,
		error,
	} = useArticlesQuery({
		searchQuery,
		categoryId: selectedCategory,
		page: currentPage,
		pageSize: itemsPerPage,
	});

	const articles = articlesResponse?.articles ?? [];

	if (isLoading) {
		return (
			<div className="flex h-80 cursor-pointer flex-col items-center justify-center gap-4 p-6">
				<div className="h-12 w-12 animate-spin rounded-full border-blue-500 border-b-2" />
				<p className="text-gray-500">Carregando artigos...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
				Erro ao carregar artigos: {error.message}
			</div>
		);
	}

	if (articles.length === 0) {
		return (
			<div className="py-8 text-center">
				<p className="text-gray-500">Nenhum artigo encontrado :/</p>
			</div>
		);
	}

	return (
		<div className="space-y-8">
			{articles.map((article) => (
				<ArticleCard
					author={article.author}
					category={article.category}
					date={article.date}
					description={article.description}
					imgUrl={article.imgUrl}
					key={article.id}
					readTime={article.readTime}
					slug={article.slug}
					title={article.title}
				/>
			))}

			<BlogPagination
				currentPage={articlesResponse?.meta.pagination.page ?? 1}
				itemsPerPage={
					articlesResponse?.meta.pagination.pageSize ?? itemsPerPage
				}
				onItemsPerPageChange={onItemsPerPageChange}
				onPageChange={onPageChange}
				totalItems={articlesResponse?.meta.pagination.total ?? 0}
				totalPages={articlesResponse?.meta.pagination.pageCount ?? 1}
			/>
		</div>
	);
}
