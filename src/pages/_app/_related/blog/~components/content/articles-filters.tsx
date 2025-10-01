import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { blogContent } from "@/constants/articles";

export const Route = createFileRoute(
	"/_app/_related/blog/~components/content/articles-filters"
)({
	component: ArticlesFilters,
});

interface ArticlesFiltersProps {
	isMobileView?: boolean;
}

export function ArticlesFilters({
	isMobileView = false,
}: ArticlesFiltersProps) {
	const topics = blogContent.categories.topics;
	const categories = blogContent.categories.categories;

	if (isMobileView) {
		return (
			<div className="space-y-6">
				<div>
					<h3 className="mb-4 font-medium text-blue-600 text-sm">
						Tópicos em alta
					</h3>
					<ScrollArea className="w-full whitespace-nowrap">
						<div className="flex gap-2 pb-4">
							{topics.map((topic) => (
								<Badge
									className="cursor-pointer rounded-full bg-gray-100 px-3 py-1 font-normal text-gray-700 text-xs hover:bg-gray-200"
									key={topic}
									variant="secondary"
								>
									{topic}
								</Badge>
							))}
						</div>
						<ScrollBar orientation="horizontal" />
					</ScrollArea>
				</div>

				<div>
					<h3 className="mb-4 font-medium text-blue-600 text-sm">Categorias</h3>
					<div className="grid grid-cols-2 gap-2">
						{categories.map((category) => (
							<Button
								className="cursor-pointer justify-start px-3 font-normal text-gray-700 text-sm hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
								key={category}
								variant="ghost"
							>
								{category}
							</Button>
						))}
					</div>
				</div>
			</div>
		);
	}

	return (
		<aside className="hidden w-64 flex-shrink-0 lg:block">
			<div className="mb-8">
				<h3 className="mb-4 font-medium text-blue-600 text-sm">
					Tópicos em alta
				</h3>
				<div className="flex flex-wrap gap-2">
					{topics.map((topic) => (
						<Badge
							className="cursor-pointer rounded-full bg-gray-100 px-3 py-1 font-normal text-gray-700 text-xs hover:bg-gray-200"
							key={topic}
							variant="secondary"
						>
							{topic}
						</Badge>
					))}
				</div>
			</div>

			<div className="mb-8">
				<h3 className="mb-4 font-medium text-blue-600 text-sm">Categorias</h3>
				<div className="space-y-2">
					{categories.map((category) => (
						<Button
							className="w-full cursor-pointer justify-start px-3 font-normal text-gray-500 text-sm hover:text-gray-900 dark:text-muted-foreground dark:hover:text-gray-300"
							key={category}
							variant="ghost"
						>
							{category}
						</Button>
					))}
				</div>
			</div>
		</aside>
	);
}
