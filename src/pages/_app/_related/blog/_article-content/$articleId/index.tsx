/** biome-ignore-all lint/suspicious/noArrayIndexKey: required by @Vite */

import { createFileRoute } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { strapiAPI } from "@/api/connections/strapi";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useArticleQuery } from "@/hooks/_related/blog/use-article-query";
import { useRelatedArticles } from "@/hooks/_related/blog/use-related-articles-query";
import { ArticleNotFound } from "./~components/article-not-found";
import { ArticleSharing } from "./~components/article-sharing";
import { ArticleSkeleton } from "./~components/article-skeleton";
import { ArticleWithError } from "./~components/article-with-error";
import { RichContentRenderer } from "./~components/content-renderer/rich-content-renderer";
import { RelatedArticles } from "./~components/dynamic-zone/related-articles";

export const Route = createFileRoute(
  "/_app/_related/blog/_article-content/$articleId/"
)({
  component: ArticleContent,
  loader: async ({ params }) => {
    try {
      const responseData = await strapiAPI.fetch(
        `/articles?filters[slug][$eq]=${params.articleId}&populate[image]=true&populate[category]=true&populate[dynamic_zone][populate]=*&populate[dynamic_zone][on][dynamic-zone.related-articles][populate][articles][populate]=*&pagination[pageSize]=1
`
      );
      const articles = responseData.data || [];

      if (articles.length > 0) {
        return { article: articles[0] };
      }
      return { article: null };
      // biome-ignore lint/correctness/noUnusedVariables: not catching error...
    } catch (error) {
      // Handle error
      return { article: null };
    }
  },
  head: ({ loaderData }) => {
    const article = loaderData?.article;

    return {
      meta: [
        {
          title: article ? `${article.title} | fyno.blog` : "Blog | fyno.blog",
        },
        {
          name: "description",
          content: article?.description || "Blog fyno.blog",
        },
      ],
    };
  },
});

function ArticleContent() {
  const { articleId } = Route.useParams();
  const {
    data: article,
    isLoading,
    error,
  } = useArticleQuery(articleId, { richContent: true });

  const relatedArticlesComponent = article?.dynamicZone?.find(
    (component) => component.__component === "dynamic-zone.related-articles"
  );

  const relatedArticleIds =
    // biome-ignore lint/suspicious/noExplicitAny: not important...
    // biome-ignore lint/nursery/noShadow: not important...
    relatedArticlesComponent?.articles?.map((article: any) => article.id) || [];

  const { data: relatedArticles = [] } = useRelatedArticles(relatedArticleIds);

  if (isLoading) {
    return <ArticleSkeleton />;
  }

  if (error) {
    return <ArticleWithError />;
  }

  if (!article) {
    return <ArticleNotFound />;
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <article>
        <div className="mb-8">
          <div className="mb-6 flex items-center justify-between">
            <Button onClick={() => window.history.back()} variant="secondary">
              <ArrowLeft />
            </Button>

            <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-blue-800 text-sm">
              {article.category}
            </span>
          </div>

          <h1 className="mb-4 font-bold text-4xl text-gray-900 dark:text-white">
            {article.title}
          </h1>
          <div className="mb-8 flex items-center text-gray-600 text-sm dark:text-muted-foreground">
            <span>{article.author}</span>
            <span className="mx-2">•</span>
            <span>{article.date}</span>
            <span className="mx-2">•</span>
            <span>{article.readTime}</span>
          </div>
          <p className="mb-8 text-gray-700 text-lg dark:text-white/70">
            {article.description}
          </p>
        </div>

        <div className="mb-8">
          {/** biome-ignore lint/performance/noImgElement: required by @Vite */}
          <img
            alt={article.title}
            className="h-64 w-full rounded-lg object-cover"
            src={article.imgUrl}
          />
        </div>

        <RichContentRenderer
          content={Array.isArray(article.content) ? article.content : []}
        />
      </article>

      <Separator className="my-10" />

      <ArticleSharing />

      <Separator className="my-10" />

      {relatedArticlesComponent && relatedArticles.length > 0 && (
        <RelatedArticles
          articles={relatedArticles}
          heading={
            relatedArticlesComponent.heading || "Publicações relacionadas"
          }
          subHeading={relatedArticlesComponent.sub_heading || ""}
        />
      )}
    </div>
  );
}
