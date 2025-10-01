import { createFileRoute } from "@tanstack/react-router";
import { articles } from "@/constants/articles";
import { ArticleCard } from "./content/article-card";
import { ArticlesFilters } from "./content/articles-filters";

export const Route = createFileRoute(
	"/_app/_related/blog/~components/blog-articles"
)({
	component: BlogArticles,
});

export function BlogArticles() {
	return (
		<div className="flex flex-col gap-8 lg:flex-row">
			<ArticlesFilters />

			<div className="flex-1">
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
			</div>
		</div>
	);
}
