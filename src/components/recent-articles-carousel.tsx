import { Carousel } from "@/components/ui/apple-cards-carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { useRecentArticlesQuery } from "@/hooks/_related/blog/use-recent-articles-query";
import { RecentArticleCard } from "./recent-article-card";

export function RecentArticlesCarousel() {
	const { data: articles = [], isLoading, error } = useRecentArticlesQuery();

	const limitedArticles = articles.slice(0, 6);

	const cards = limitedArticles.map((article, index) => (
		<RecentArticleCard
			card={{
				src: article.imgUrl,
				title: article.title,
				category: article.category,
				description: article.description,
				date: article.date,
				slug: article.slug,
			}}
			clickable={true}
			index={index}
			key={`${article.slug}-${index}`}
		/>
	));

	if (isLoading) {
		return (
			<div className="pb-10 lg:pb-20">
				<div className="flex gap-4 overflow-hidden">
					{Array.from({ length: 6 }).map((_, index) => (
						<Skeleton
							className="h-96 w-80 flex-shrink-0 rounded-xl"
							// biome-ignore lint/suspicious/noArrayIndexKey: required by @Vite
							key={index}
						/>
					))}
				</div>
			</div>
		);
	}

	if (error || !limitedArticles.length) {
		return null;
	}

	return (
		<div className="pb-10 lg:pb-20">
			<Carousel items={cards} />
		</div>
	);
}
