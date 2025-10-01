import { createFileRoute } from "@tanstack/react-router";
import { SearchX } from "lucide-react";

export const Route = createFileRoute(
	"/_app/_related/blog/$articleId/~components/article-not-found"
)({
	component: ArticleNotFound,
});

export function ArticleNotFound() {
	return (
		<div className="mx-auto flex max-w-4xl items-center justify-center gap-10 px-4 py-44">
			<SearchX className="size-20" />

			<article className="flex flex-col gap-2">
				<h1 className="font-bold text-2xl text-gray-900 dark:text-white/80">
					Artigo não encontrado :(
				</h1>
				<p className="text-gray-600">O artigo solicitado não existe...</p>
			</article>
		</div>
	);
}
