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
	page?: number;
	pageSize?: number;
}

interface ArticlesResponse {
	articles: Article[] | ArticleWithRichContent[];
	meta: {
		pagination: {
			page: number;
			pageSize: number;
			pageCount: number;
			total: number;
		};
	};
}

export const useArticlesQuery = (
	options?: UseArticlesQueryOptions
): {
	data: ArticlesResponse | undefined;
	isLoading: boolean;
	error: Error | null;
} => {
	return useQuery({
		queryKey: [
			"articles",
			options?.richContent ? "rich" : "simple",
			options?.searchQuery,
			options?.categoryId,
			options?.page || 1,
			options?.pageSize || 10,
		],
		queryFn: async (): Promise<ArticlesResponse> => {
			const page = options?.page || 1;
			const pageSize = options?.pageSize || 10;

			let url = `/articles?populate[0]=image&populate[1]=category&sort[0]=createdAt:desc&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;

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

			let articles: Article[] | ArticleWithRichContent[];
			if (options?.richContent) {
				articles = strapiArticles.map((article) => {
					const imgUrl = buildImageUrl(article.image);
					const categoryName = getCategoryName(article.category);
					const contentText = extractTextFromContent(article.content || []);
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
				});
			} else {
				articles = strapiArticles.map((article) => {
					const imgUrl = buildImageUrl(article.image);
					const categoryName = getCategoryName(article.category);
					const contentText = extractTextFromContent(article.content || []);
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
			}

			return {
				articles,
				meta: responseData.meta || {
					pagination: {
						page: 1,
						pageSize: 10,
						pageCount: 1,
						total: articles.length,
					},
				},
			};
		},
		staleTime: 5 * 60 * 1000,
	});
};
