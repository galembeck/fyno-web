import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import {
	RelatedArticleCard,
	type RelatedArticleCardProps,
} from "./related-article-card";

export const Route = createFileRoute(
	"/_app/_related/blog/_article-content/$articleId/~components/dynamic-zone/related-articles"
)({
	component: () => (
		<RelatedArticles
			articles={[]}
			heading="Artigos Relacionados"
			subHeading="Explore mais conteúdos que podem te interessar."
		/>
	),
});

interface RelatedArticlesProps {
	heading: string;
	subHeading: string;
	articles: RelatedArticleCardProps[];
}

export function RelatedArticles({
	heading,
	subHeading,
	articles,
}: RelatedArticlesProps) {
	const navigate = useNavigate();

	if (!articles || articles.length === 0) {
		return null;
	}

	return (
		<section>
			<div className="mb-8">
				<div className="flex items-center justify-between">
					<h2 className="mb-4 font-bold text-3xl text-gray-900 dark:text-white">
						{heading}
					</h2>

					<Button onClick={() => navigate({ to: "/blog" })} variant="secondary">
						Ver todas
					</Button>
				</div>
				<p className="text-gray-600 text-lg leading-relaxed dark:text-gray-400">
					{subHeading}
				</p>
			</div>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{articles.map((article) => (
					<RelatedArticleCard article={article} key={article.id} />
				))}
			</div>
		</section>
	);
}
