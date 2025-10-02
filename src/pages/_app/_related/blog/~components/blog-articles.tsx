import { createFileRoute } from "@tanstack/react-router";
import { useArticlesQuery } from "@/hooks/_related/blog/use-articles-query";
import { ArticleCard } from "./content/article-card";

export const Route = createFileRoute(
	"/_app/_related/blog/~components/blog-articles"
)({
	component: BlogArticles,
});

interface BlogArticlesProps {
	searchQuery?: string;
	selectedCategory?: number | null;
}

export function BlogArticles({
	searchQuery,
	selectedCategory,
}: BlogArticlesProps) {
	const {
		data: articles = [],
		isLoading,
		error,
	} = useArticlesQuery({
		searchQuery,
		categoryId: selectedCategory,
	});

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
		</div>
	);
}
