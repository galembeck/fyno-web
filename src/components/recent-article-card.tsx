import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Badge } from "./ui/badge";

interface RecentArticleCardData {
	src: string;
	title: string;
	category: string;
	description: string;
	date: string;
	slug: string;
}

interface RecentArticleCardProps {
	card: RecentArticleCardData;
	index: number;
	clickable?: boolean;
}

export function RecentArticleCard({
	card,
	index,
	clickable = true,
}: RecentArticleCardProps) {
	const CardContent = (
		<motion.div
			animate={{ opacity: 1, y: 0 }}
			className="group relative h-fit w-80 flex-shrink-0 overflow-hidden rounded-xl bg-white shadow-lg dark:bg-secondary-dark"
			initial={{ opacity: 0, y: 20 }}
			transition={{ duration: 0.5, delay: index * 0.1 }}
		>
			<div className="relative h-60 overflow-hidden">
				{/** biome-ignore lint/performance/noImgElement: required by @Vite */}
				<img
					alt={card.title}
					className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
					src={card.src}
				/>

				<div className="absolute top-3 left-3">
					<Badge className="bg-third-green-dark text-primary-green text-xs">
						{card.category}
					</Badge>
				</div>
			</div>

			<div className="flex h-48 flex-col justify-between p-4">
				<div>
					<h3 className="my-4 line-clamp-2 font-bold text-gray-900 text-lg dark:text-white">
						{card.title}
					</h3>
					<p className="line-clamp-2 text-gray-600 text-sm dark:text-gray-400">
						{card.description}
					</p>
				</div>

				<div className="mt-4 flex justify-end text-gray-500 text-xs dark:text-gray-400">
					<span>{card.date}</span>
				</div>
			</div>
		</motion.div>
	);

	if (clickable) {
		return (
			<Link params={{ articleId: card.slug }} to="/blog/$articleId">
				{CardContent}
			</Link>
		);
	}

	return CardContent;
}
