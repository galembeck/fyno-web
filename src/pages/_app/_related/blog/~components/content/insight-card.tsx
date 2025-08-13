import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute(
	"/_app/_related/blog/~components/content/insight-card"
)({
	component: () => (
		<InsightCard
			author="Author"
			category="Category"
			date="Date"
			description="Description"
			imgUrl="imgUrl"
			readTime="Read Time"
			title="Title"
		/>
	),
});

export interface InsightCardProps {
	date: string;
	title: string;
	description: string;
	category: string;
	author: string;
	readTime: string;
	imgUrl: string;
}

export function InsightCard({
	date,
	title,
	description,
	category,
	author,
	readTime,
	imgUrl,
}: InsightCardProps) {
	return (
		<Card className="flex cursor-pointer flex-col gap-4 p-6 lg:flex-row lg:pb-8 lg:pl-10">
			<div className="max-w-lg flex-1">
				<p className="mb-2 font-medium text-blue-600 text-sm">{date}</p>
				<h2 className="mb-3 font-bold text-xl leading-tight lg:text-2xl dark:text-white">
					{title}
				</h2>
				<p className="mb-4 text-gray-600 text-sm leading-relaxed dark:text-muted-foreground">
					{description}
				</p>
				<div className="flex flex-wrap items-center gap-2 lg:gap-4">
					<Badge
						className="rounded-full bg-gray-100 px-3 py-1 font-normal text-gray-700 text-xs"
						variant="secondary"
					>
						{category}
					</Badge>
					<span className="text-gray-500 text-xs dark:text-muted-foreground">
						By {author}
					</span>
					<div className="rounded-full bg-primary-gray p-1 dark:bg-muted-foreground" />
					<span className="text-blue-600 text-xs">Leitura: {readTime}</span>
				</div>
			</div>
			<div className="w-full lg:w-80 lg:flex-shrink-0">
				{/** biome-ignore lint/performance/noImgElement: required by @Vite */}
				<img
					alt={title}
					className="mt-2 h-48 w-full rounded-lg object-cover md:h-full"
					src={imgUrl}
				/>
			</div>
		</Card>
	);
}
