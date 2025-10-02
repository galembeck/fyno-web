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

export const useRecentArticlesQuery = (options?: { richContent?: boolean }) => {
	return useQuery({
		queryKey: ["recent-articles", options?.richContent ? "rich" : "simple"],
		queryFn: async () => {
			const responseData = await strapiAPI.fetch(
				"/articles?sort[0]=createdAt:desc&populate[0]=image&populate[1]=category"
			);
			const strapiArticles: StrapiArticle[] = responseData.data || [];

			return strapiArticles.map((article) => {
				const imgUrl = buildImageUrl(article.image);
				const categoryName = getCategoryName(article.category);
				const contentText = extractTextFromContent(article.content || []);

				if (options?.richContent) {
					return {
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
						content: article.content || [],
						createdAt: article.createdAt,
						updatedAt: article.updatedAt,
					} as ArticleWithRichContent;
				}

				return {
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
					content: contentText,
					createdAt: article.createdAt,
					updatedAt: article.updatedAt,
				} as Article;
			});
		},
		staleTime: 5 * 60 * 1000,
	});
};
