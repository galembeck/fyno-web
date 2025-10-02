import { createFileRoute } from "@tanstack/react-router";
import { Skeleton } from "@/components/ui/skeleton";

export const Route = createFileRoute(
	"/_app/_related/blog/_article-content/$articleId/~components/article-skeleton"
)({
	component: ArticleSkeleton,
});

export function ArticleSkeleton() {
	return (
		<div className="mx-auto max-w-4xl px-4 py-8">
			<div className="mb-8">
				<Skeleton className="mb-8 h-6 w-20 rounded-full" />
				<Skeleton className="mb-4 h-12 w-full" />
				<Skeleton className="mb-4 h-12 w-3/4" />
				<div className="mb-8 flex items-center gap-2">
					<Skeleton className="h-4 w-24" />
					<Skeleton className="h-4 w-4" />
					<Skeleton className="h-4 w-20" />
					<Skeleton className="h-4 w-4" />
					<Skeleton className="h-4 w-16" />
				</div>
				<Skeleton className="mb-4 h-6 w-full" />
				<Skeleton className="mb-8 h-6 w-4/5" />
			</div>

			<Skeleton className="mb-8 h-64 w-full rounded-lg" />

			<div className="space-y-4">
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-3/4" />
				<Skeleton className="h-4 w-full" />
				<Skeleton className="h-4 w-5/6" />
			</div>
		</div>
	);
}
