import { createFileRoute, useParams } from "@tanstack/react-router";
import { Facebook, Linkedin, Phone, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useArticleQuery } from "@/hooks/_related/blog/use-article-query";

export const Route = createFileRoute(
	"/_app/_related/blog/_article-content/$articleId/~components/article-sharing"
)({
	component: ArticleSharing,
});

export function ArticleSharing() {
	const { articleId } = useParams({
		from: "/_app/_related/blog/_article-content/$articleId/",
	});
	const { data: article } = useArticleQuery(articleId);

	const currentUrl = typeof window !== "undefined" ? window.location.href : "";

	const shareTitle = article?.title || "Confira este artigo";

	const shareUrls = {
		linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(`${shareTitle} - ${currentUrl}`)}`,
		facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}&quote=${encodeURIComponent(`${shareTitle} - ${currentUrl}`)}`,
		twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(`${shareTitle} - ${currentUrl}`)}`,
		whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareTitle} - ${currentUrl}`)}`,
	};

	const openSharePopup = (url: string) => {
		if (typeof window !== "undefined") {
			window.open(
				url,
				"share-popup",
				"width=600,height=400,scrollbars=yes,resizable=yes"
			);
		}
	};

	return (
		<div className="flex items-center justify-between rounded-4xl bg-secondary-white p-6 dark:bg-gray-200">
			<h1 className="font-bold text-black text-xl">Compartilhar</h1>

			<article className="flex items-center gap-2">
				<Button
					aria-label="Share on LinkedIn"
					className="rounded-[50%] bg-gray-300 hover:bg-gray-400 dark:bg-gray-300 dark:hover:bg-gray-400"
					onClick={() => openSharePopup(shareUrls.linkedin)}
					variant="link"
				>
					<Linkedin stroke="#000000" />
				</Button>

				<Button
					aria-label="Share on Facebook"
					className="rounded-[50%] bg-gray-300 hover:bg-gray-400 dark:bg-gray-300 dark:hover:bg-gray-400"
					onClick={() => openSharePopup(shareUrls.facebook)}
					variant="link"
				>
					<Facebook stroke="#000000" />
				</Button>

				<Button
					aria-label="Share on Twitter"
					className="rounded-[50%] bg-gray-300 hover:bg-gray-400 dark:bg-gray-300 dark:hover:bg-gray-400"
					onClick={() => openSharePopup(shareUrls.twitter)}
					variant="link"
				>
					<Twitter stroke="#000000" />
				</Button>

				<Button
					aria-label="Share on WhatsApp"
					className="rounded-[50%] bg-gray-300 hover:bg-gray-400 dark:bg-gray-300 dark:hover:bg-gray-400"
					onClick={() => openSharePopup(shareUrls.whatsapp)}
					variant="link"
				>
					<Phone stroke="#000000" />
				</Button>
			</article>
		</div>
	);
}
