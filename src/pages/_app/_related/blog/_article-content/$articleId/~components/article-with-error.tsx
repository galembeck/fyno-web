import { createFileRoute } from "@tanstack/react-router";
import { Frown } from "lucide-react";

export const Route = createFileRoute(
	"/_app/_related/blog/_article-content/$articleId/~components/article-with-error"
)({
	component: ArticleWithError,
});

export function ArticleWithError() {
	return (
		<div className="mx-auto flex max-w-4xl items-center justify-center gap-10 px-4 py-44">
			<Frown className="size-20" />

			<article className="flex flex-col gap-2">
				<h1 className="font-bold text-2xl text-gray-900 dark:text-white/80">
					Houve um erro ao carregar o artigo :/
				</h1>
				<p className="text-gray-600">Que tal tentar novamente mais tarde?</p>
			</article>
		</div>
	);
}
