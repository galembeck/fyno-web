import { createFileRoute } from "@tanstack/react-router";
import { articles } from "@/constants/articles";
import { ArticleNotFound } from "./~components/article-not-found";

export const Route = createFileRoute("/_app/_related/blog/$articleId/")({
	component: ArticleContent,
	head: ({ params }) => {
		const article = articles.find(
			// biome-ignore lint/nursery/noShadow: false positive
			(article) => article.slug === params.articleId
		);

		return {
			meta: [
				{
					title: article ? `${article.title} | fyno.blog` : "Blog | fyno.blog",
				},
			],
		};
	},
});

function ArticleContent() {
	const { articleId } = Route.useParams();

	// biome-ignore lint/nursery/noShadow: false positive
	const article = articles.find((article) => article.slug === articleId);

	if (!article) {
		return <ArticleNotFound />;
	}

	return (
		<div className="mx-auto max-w-4xl px-4 py-8">
			<div className="mb-8">
				<span className="mb-8 inline-block rounded-full bg-blue-100 px-3 py-1 text-blue-800 text-sm">
					{article.category}
				</span>
				<h1 className="mb-4 font-bold text-4xl text-gray-900 dark:text-white">
					{article.title}
				</h1>
				<div className="mb-8 flex items-center text-gray-600 text-sm dark:text-muted-foreground">
					<span>{article.author}</span>
					<span className="mx-2">•</span>
					<span>{article.date}</span>
					<span className="mx-2">•</span>
					<span>{article.readTime}</span>
				</div>
				<p className="mb-8 text-gray-700 text-lg dark:text-white/70">
					{article.description}
				</p>
			</div>

			<div className="mb-8">
				{/** biome-ignore lint/performance/noImgElement: required by @Vite */}
				<img
					alt={article.title}
					className="h-64 w-full rounded-lg object-cover"
					src={article.imgUrl}
				/>
			</div>

			<div className="prose max-w-none text-gray-900 dark:text-white">
				<p>Conteúdo do artigo será exibido aqui...</p>
			</div>
		</div>
	);
}
