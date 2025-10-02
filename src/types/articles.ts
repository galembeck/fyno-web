export interface StrapiArticle {
	id: number;
	documentId: string;
	title: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	description: string;
	author: string;
	slug: string;
	content: Array<{
		type: string;
		children: Array<{
			[x: string]: unknown;
			type: string;
			text: string;
		}>;
		level?: number;
		format?: string;
	}>;
	image?: Array<{
		id: number;
		url: string;
		alternativeText?: string;
		formats?: {
			thumbnail?: { url: string };
			small?: { url: string };
			medium?: { url: string };
			large?: { url: string };
		};
	}>;
	category?:
		| string
		| { id: number; name: string; documentId: string }
		| Array<{ id: number; name: string; documentId: string }>;
	readTime?: string;
	dynamic_zone?: DynamicZoneComponent[];
}

export interface Article {
	id: number;
	documentId: string;
	title: string;
	description: string;
	slug: string;
	date: string;
	category: string;
	author: string;
	readTime: string;
	imgUrl: string;
	content: string;
	createdAt: string;
	updatedAt: string;
	dynamicZone?: DynamicZoneComponent[];
}

export interface ArticleWithRichContent {
	id: number;
	documentId: string;
	title: string;
	description: string;
	slug: string;
	date: string;
	category: string;
	author: string;
	readTime: string;
	imgUrl: string;
	content: Array<{
		type: string;
		children: Array<{
			type: string;
			text: string;
		}>;
		level?: number;
		format?: string;
	}>;
	createdAt: string;
	updatedAt: string;
	dynamicZone?: DynamicZoneComponent[];
}

export interface DynamicZoneComponent {
	__component: string;
	id: number;
	heading?: string;
	sub_heading?: string;
	articles?: Array<{
		id: number;
		title: string;
		slug: string;
		description: string;
		author: string;
		publishedAt: string;
		image?: Array<{
			id: number;
			url: string;
			alternativeText?: string;
		}>;
	}>;
}
