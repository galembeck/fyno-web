// biome-ignore assist: not important...
// biome-ignore-all lint: not important...
// biome-ignore-start lint: not important...
// biome-ignore-end lint: not important...

import { createFileRoute } from "@tanstack/react-router";
import type { JSX } from "react";
import { strapiAPI } from "@/api/strapi";

export const Route = createFileRoute(
	"/_app/_related/blog/_article-content/$articleId/~components/content-renderer/rich-content-renderer"
)({
	component: RichContentRenderer,
});

export function RichContentRenderer(props: { content?: any[] }) {
	const content = props.content;

	if (!content || content.length === 0) {
		return <div className="text-gray-500">Conteúdo não disponível.</div>;
	}

	return (
		<div className="prose max-w-none text-gray-900 dark:text-white">
			{content.map((block, index) => {
				if (block.type === "paragraph") {
					return (
						<p className="mb-6 leading-relaxed" key={index}>
							{block.children?.map((child: any, childIndex: number) => (
								<span key={childIndex}>{child.text}</span>
							))}
						</p>
					);
				}

				if (block.type === "heading") {
					const level = block.level || 2;
					const Tag = `h${level}` as keyof JSX.IntrinsicElements;
					return (
						<Tag
							className="font-bold dark:text-white text-gray-900 mb-4 mt-6"
							key={index}
						>
							{block.children?.map((child: any) => child.text).join("")}
						</Tag>
					);
				}

				if (block.type === "list") {
					const ListTag = block.format === "ordered" ? "ol" : "ul";
					return (
						<ListTag className="mb-6 list-inside list-disc" key={index}>
							{block.children?.map((item: any, itemIndex: number) => (
								<li className="mb-2" key={itemIndex}>
									{item.children?.map((child: any) => child.text).join("")}
								</li>
							))}
						</ListTag>
					);
				}

				if (block.type === "image" && block.image) {
					const imageUrl = block.image.url.startsWith("/")
						? `${strapiAPI.baseURL}${block.image.url}`
						: block.image.url;

					return (
						<div className="mb-8" key={index}>
							<img
								alt={block.image.alternativeText || "Imagem"}
								className="w-full rounded-lg"
								src={imageUrl}
							/>
						</div>
					);
				}

				return (
					<div className="mb-4" key={index}>
						{block.children?.map((child: any) => child.text).join("") || ""}
					</div>
				);
			})}
		</div>
	);
}
