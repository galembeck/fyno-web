/** biome-ignore-all lint/style/useBlockStatements: not important... */

import { useQuery } from "@tanstack/react-query";

import { strapiAPI } from "@/api/strapi";
import type {
	Article,
	ArticleWithRichContent,
	StrapiArticle,
} from "@/types/articles";

import {
	buildImageUrl,
	calculateReadTime,
	extractTextFromContent,
	formatDate,
	getCategoryName,
} from "@/utils/_related/blog";

export const useArticleQuery = (
	slug: string,
	options?: { richContent?: boolean }
) => {
	return useQuery({
		queryKey: ["article", slug, options?.richContent ? "rich" : "simple"],
		queryFn: async () => {
			const responseData = await strapiAPI.fetch(
				`/articles?filters[slug][$eq]=${slug}&populate[image]=true&populate[category]=true&populate[dynamic_zone][populate]=*&populate[dynamic_zone][on][dynamic-zone.related-articles][populate][articles][populate]=*&pagination[pageSize]=1
`
			);
			const strapiArticles: StrapiArticle[] = responseData.data || [];

			if (strapiArticles.length === 0) return null;

			const article = strapiArticles[0];
			const imgUrl = buildImageUrl(article.image);
			const categoryName = getCategoryName(article.category);
			const contentText = extractTextFromContent(article.content || []);

			const baseArticle = {
				id: article.id,
				documentId: article.documentId,
				title: article.title,
				description: article.description,
				slug: article.slug,
				date: formatDate(article.publishedAt),
				category: categoryName,
				author: article.author,
				readTime: article.readTime || calculateReadTime(contentText),
				imgUrl,
				dynamicZone: article.dynamic_zone || [],
				createdAt: article.createdAt,
				updatedAt: article.updatedAt,
			};

			return options?.richContent
				? ({
						...baseArticle,
						content: article.content || [],
					} as ArticleWithRichContent)
				: ({ ...baseArticle, content: contentText } as Article);
		},
		enabled: !!slug,
		staleTime: 5 * 60 * 1000,
	});
};
