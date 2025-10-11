/** biome-ignore-all lint/suspicious/noEmptyBlockStatements: required by @TanStack-Router */

import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute(
	"/_app/_related/blog/~components/pagination/blog-pagination"
)({
	component: () => (
		<BlogPagination
			currentPage={1}
			itemsPerPage={10}
			onItemsPerPageChange={() => {}}
			onPageChange={() => {}}
			totalItems={10}
			totalPages={1}
		/>
	),
});

interface BlogPaginationProps {
	currentPage: number;
	totalPages: number;
	itemsPerPage: number;
	totalItems: number;
	onPageChange: (page: number) => void;
	onItemsPerPageChange: (itemsPerPage: number) => void;
}

export function BlogPagination({
	currentPage,
	totalPages,
	itemsPerPage,
	totalItems,
	onPageChange,
	onItemsPerPageChange,
}: BlogPaginationProps) {
	const generatePageNumbers = () => {
		const pages: (number | string)[] = [];

		if (totalPages <= 5) {
			for (let i = 1; i <= totalPages; i++) {
				pages.push(i);
			}
		} else {
			pages.push(1);

			if (currentPage <= 3) {
				pages.push(2);
				pages.push(3);
				pages.push("...");
				pages.push(totalPages);
			} else if (currentPage >= totalPages - 2) {
				pages.push("...");
				pages.push(totalPages - 2);
				pages.push(totalPages - 1);
				pages.push(totalPages);
			} else {
				pages.push("...");
				pages.push(currentPage);
				pages.push("...");
				pages.push(totalPages);
			}
		}

		return pages;
	};

	const pageNumbers = generatePageNumbers();
	// const startItem = (currentPage - 1) * itemsPerPage + 1;
	// const endItem = Math.min(currentPage * itemsPerPage, totalItems);

	if (!totalItems || totalItems === 0) {
		return null;
	}

	return (
		<div className="flex flex-col items-center justify-center gap-4 md:flex-row md:items-center md:justify-between">
			<div className="order-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6 md:order-1">
				{/* <span className="text-gray-600 text-sm dark:text-gray-400">
					Visualizando {startItem} a {endItem} de {totalItems} artigos
				</span> */}

				<div className="flex items-center gap-2">
					<span className="text-gray-600 text-sm dark:text-gray-400">
						Visualizar
					</span>
					<Select
						onValueChange={(value) => onItemsPerPageChange(Number(value))}
						value={itemsPerPage.toString()}
					>
						<SelectTrigger className="w-20">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="1">1</SelectItem>
							<SelectItem value="5">5</SelectItem>
							<SelectItem value="10">10</SelectItem>
							<SelectItem value="15">15</SelectItem>
							<SelectItem value="25">25</SelectItem>
						</SelectContent>
					</Select>
					<span className="text-gray-600 text-sm dark:text-gray-400">
						/ página
					</span>
				</div>
			</div>

			{totalPages > 1 && (
				<div className="order-1 flex items-center gap-1 md:order-2">
					<Button
						className="h-9 w-9 p-0"
						disabled={currentPage === 1}
						onClick={() => onPageChange(currentPage - 1)}
						size="sm"
						variant="outline"
					>
						<ChevronLeft className="h-4 w-4" />
					</Button>

					{pageNumbers.map((page, index) => (
						// biome-ignore lint/suspicious/noArrayIndexKey: required by @Biome
						<div key={index}>
							{page === "..." ? (
								<span className="flex h-9 w-9 items-center justify-center text-gray-500 text-sm">
									...
								</span>
							) : (
								<Button
									className="h-9 w-9 p-0"
									onClick={() => onPageChange(page as number)}
									size="sm"
									variant={currentPage === page ? "default" : "outline"}
								>
									{page}
								</Button>
							)}
						</div>
					))}

					<Button
						className="h-9 w-9 p-0"
						disabled={currentPage === totalPages}
						onClick={() => onPageChange(currentPage + 1)}
						size="sm"
						variant="outline"
					>
						<ChevronRight className="h-4 w-4" />
					</Button>
				</div>
			)}
		</div>
	);
}
