/** biome-ignore-all lint/style/useBlockStatements: required by @Strapi */

import { strapiAPI } from "@/api/strapi";
import type { StrapiArticle } from "@/types/articles";

export const formatDate = (dateString: string): string => {
	const date = new Date(dateString);
	const monthsAbbreviated = [
		"Jan.",
		"Fev.",
		"Mar.",
		"Abr.",
		"Mai.",
		"Jun.",
		"Jul.",
		"Ago.",
		"Set.",
		"Out.",
		"Nov.",
		"Dez.",
	];
	const month = monthsAbbreviated[date.getMonth()];
	const day = date.getDate();
	const year = date.getFullYear();
	return `${month} ${day}, ${year}`;
};

export const extractTextFromContent = (
	content: StrapiArticle["content"]
): string => {
	return content
		.map((block) => {
			if (block.type === "paragraph" || block.type === "heading") {
				return (
					block.children
						?.map((child) => child.text)
						.join("")
						.trim() || ""
				);
			}
			if (block.type === "list") {
				return (
					block.children
						?.map(
							(item) =>
								`• ${
									Array.isArray(item.children)
										? item.children
												// biome-ignore lint/suspicious/noExplicitAny: not important...
												.map((child: any) => child.text)
												.join("")
										: ""
								}`
						)
						.join("\n") || ""
				);
			}
			return "";
		})
		.filter((text) => text.length > 0)
		.join("\n\n");
};

export const calculateReadTime = (content: string): string => {
	const wordsPerMinute = 200;
	const wordCount = content.split(" ").length;
	const minutes = Math.ceil(wordCount / wordsPerMinute);
	return `${minutes} min`;
};

export const buildImageUrl = (imageArray?: StrapiArticle["image"]): string => {
	if (!imageArray || imageArray.length === 0) {
		return "https://via.placeholder.com/400x200/e2e8f0/64748b?text=Sem+Imagem";
	}

	const image = imageArray[0];
	const imageUrl =
		image.formats?.medium?.url || image.formats?.large?.url || image.url;

	return imageUrl.startsWith("/")
		? `${strapiAPI.baseURL}${imageUrl}`
		: imageUrl;
};

export const getCategoryName = (
	category: StrapiArticle["category"]
): string => {
	if (!category) return "Geral";
	if (typeof category === "object" && "name" in category) return category.name;
	if (Array.isArray(category) && category.length > 0) return category[0].name;
	if (typeof category === "string") return category;
	return "Geral";
};
