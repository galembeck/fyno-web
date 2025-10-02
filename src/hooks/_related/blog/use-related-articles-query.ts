import { useQuery } from "@tanstack/react-query";
import { strapiAPI } from "@/api/strapi";
import type { StrapiArticle } from "@/types/articles";

export const useRelatedArticles = (articleIds: number[]) => {
	return useQuery({
		queryKey: ["related-articles", articleIds],
		queryFn: async () => {
			// biome-ignore lint/style/useBlockStatements: required by @Strapi
			if (articleIds.length === 0) return [];

			const filters = articleIds
				.map((id) => `filters[id][$in][]=${id}`)
				.join("&");
			const responseData = await strapiAPI.fetch(
				`/articles?${filters}&populate=image`
			);
			const strapiArticles: StrapiArticle[] = responseData.data || [];

			return strapiArticles.map((article) => ({
				id: article.id,
				title: article.title,
				slug: article.slug,
				description: article.description,
				author: article.author,
				publishedAt: article.publishedAt,
				image: article.image,
			}));
		},
		enabled: articleIds.length > 0,
		staleTime: 5 * 60 * 1000,
	});
};
