import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useCategoriesQuery } from "@/hooks/_related/blog/use-categories-query";

export const Route = createFileRoute(
	"/_app/_related/blog/~components/content/articles-filters"
)({
	component: ArticlesFilters,
});

interface ArticlesFiltersProps {
	isMobileView?: boolean;
	selectedCategory?: number | null;
	onCategoryChange?: (categoryId: number | null) => void;
}

export function ArticlesFilters({
	isMobileView = false,
	selectedCategory,
	onCategoryChange,
}: ArticlesFiltersProps) {
	const { data: categories = [] } = useCategoriesQuery();

	const handleCategoryClick = (categoryId: number) => {
		if (Number(selectedCategory) === categoryId) {
			onCategoryChange?.(null);
		} else {
			onCategoryChange?.(categoryId);
		}
	};

	if (isMobileView) {
		return (
			<div className="space-y-6">
				<div>
					<h3 className="mb-4 font-medium text-blue-600 text-sm">
						Tópicos em alta
					</h3>
					<ScrollArea className="w-full whitespace-nowrap">
						<div className="flex gap-2 pb-4">
							{categories.slice(0, 6).map((category) => (
								<Badge
									className="rounded-full bg-gray-100 px-3 py-1 font-normal text-gray-700 text-xs hover:bg-gray-200"
									key={category.id}
									variant="secondary"
								>
									{category.name}
								</Badge>
							))}
						</div>
						<ScrollBar orientation="horizontal" />
					</ScrollArea>
				</div>

				<div>
					<h3 className="mb-4 font-medium text-blue-600 text-sm">Categorias</h3>
					<div className="grid grid-cols-2 gap-2">
						<Button
							className={`cursor-pointer justify-start px-3 font-normal text-sm ${
								selectedCategory
									? "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
									: "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300"
							}`}
							onClick={() => onCategoryChange?.(null)}
							variant="ghost"
						>
							Todas as categorias
						</Button>

						{categories.map((category) => (
							<Button
								className={`cursor-pointer justify-start px-3 font-normal text-sm ${
									selectedCategory === category.id
										? "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300"
										: "text-gray-700 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-100"
								}`}
								key={category.id}
								onClick={() => handleCategoryClick(category.id)}
								variant="ghost"
							>
								{category.name}
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
					{categories.slice(0, 6).map((category) => (
						<Badge
							className="rounded-full bg-gray-100 px-3 py-1 font-normal text-gray-700 text-xs hover:bg-gray-200"
							key={category.id}
							variant="secondary"
						>
							{category.name}
						</Badge>
					))}
				</div>
			</div>

			<div className="mb-8">
				<h3 className="mb-4 font-medium text-blue-600 text-sm">Categorias</h3>
				<div className="space-y-2">
					<Button
						className={`w-full cursor-pointer justify-start px-3 font-normal text-sm ${
							selectedCategory
								? "text-gray-500 hover:text-gray-900 dark:text-muted-foreground dark:hover:text-gray-300"
								: "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300"
						}`}
						onClick={() => onCategoryChange?.(null)}
						variant="ghost"
					>
						Todas as categorias
					</Button>

					{categories.map((category) => (
						<Button
							className={`w-full cursor-pointer justify-start px-3 font-normal text-sm ${
								selectedCategory === category.id
									? "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900 dark:text-blue-300"
									: "text-gray-500 hover:text-gray-900 dark:text-muted-foreground dark:hover:text-gray-300"
							}`}
							key={category.id}
							onClick={() => handleCategoryClick(category.id)}
							variant="ghost"
						>
							{category.name}
						</Button>
					))}
				</div>
			</div>
		</aside>
	);
}
