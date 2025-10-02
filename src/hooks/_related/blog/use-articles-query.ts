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

interface UseArticlesQueryOptions {
	richContent?: boolean;
	searchQuery?: string;
	categoryId?: number | null;
}

export const useArticlesQuery = (options?: UseArticlesQueryOptions) => {
	return useQuery({
		queryKey: [
			"articles",
			options?.richContent ? "rich" : "simple",
			options?.searchQuery,
			options?.categoryId,
		],
		queryFn: async () => {
			let url =
				"/articles?populate[0]=image&populate[1]=category&sort[0]=createdAt:desc";

			const filters: string[] = [];

			// biome-ignore lint/complexity/useOptionalChain: required by @Strapi
			if (options?.searchQuery && options.searchQuery.trim()) {
				const searchTerm = encodeURIComponent(options.searchQuery.trim());
				filters.push(`filters[$or][0][title][$containsi]=${searchTerm}`);
				filters.push(`filters[$or][1][description][$containsi]=${searchTerm}`);
				filters.push(`filters[$or][2][author][$containsi]=${searchTerm}`);
			}

			if (options?.categoryId) {
				filters.push(`filters[category][id][$eq]=${options.categoryId}`);
			}

			if (filters.length > 0) {
				url += `&${filters.join("&")}`;
			}

			const responseData = await strapiAPI.fetch(url);
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
