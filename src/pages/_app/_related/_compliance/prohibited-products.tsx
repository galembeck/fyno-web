import { createFileRoute } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import prohibitedProducts from "./~content/prohibited-products.md?raw";

export const Route = createFileRoute(
	"/_app/_related/_compliance/prohibited-products"
)({
	component: ProhibitedProducts,
});

function ProhibitedProducts() {
	return (
		<main className="flex flex-col">
			<div className="bg-gradient-to-b from-white to-third-green-light py-10 lg:py-20 dark:from-primary-dark dark:to-secondary-dark">
				<div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
					<h1 className="text-center font-bold text-5xl">Produtos Proibidos</h1>
				</div>
			</div>

			<section className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-32 lg:py-20">
				<article className="prose prose-zinc dark:prose-invert max-w-none">
					<ReactMarkdown remarkPlugins={[remarkGfm]}>
						{prohibitedProducts}
					</ReactMarkdown>
				</article>
			</section>
		</main>
	);
}
