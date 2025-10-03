import { createFileRoute } from "@tanstack/react-router";
import { RecentArticlesCarousel } from "@/components/recent-articles-carousel";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute(
	"/_app/_public/~components/sections/recent-articles"
)({
	component: RecentArticles,
});

export function RecentArticles() {
	return (
		<section id="recent-articles">
			<article className="flex flex-col items-center gap-6 py-10">
				<Badge className="bg-third-green-light font-semibold text-black uppercase dark:bg-third-green-dark dark:text-primary-green">
					Publicações recentes
				</Badge>

				<h1 className="text-center font-bold text-4xl md:text-6xl">
					Fique por dentro das novidades
					<br /> através de nosso{" "}
					<span className="text-primary-green">fyno.blog</span>
				</h1>
			</article>

			<RecentArticlesCarousel />
		</section>
	);
}
