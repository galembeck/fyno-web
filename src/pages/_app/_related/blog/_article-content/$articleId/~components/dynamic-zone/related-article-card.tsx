import { createFileRoute, Link } from "@tanstack/react-router";
import { strapiAPI } from "@/api/connections/strapi";

export const Route = createFileRoute(
  "/_app/_related/blog/_article-content/$articleId/~components/dynamic-zone/related-article-card"
)({
  component: () => (
    <RelatedArticleCard
      article={{
        author: "Author",
        description: "Description",
        id: 0,
        image: [],
        publishedAt: new Date().toISOString(),
        slug: "slug",
        title: "Title",
      }}
    />
  ),
});

export interface RelatedArticleCardProps {
  id: number;
  title: string;
  slug: string;
  description: string;
  author: string;
  publishedAt: string;
  image?: Array<{
    id: number;
    url: string;
    alternativeText?: string;
  }>;
}

export function RelatedArticleCard({
  article,
}: {
  article: RelatedArticleCardProps;
}) {
  const imageUrl = article.image?.[0]?.url
    ? // biome-ignore lint/style/noNestedTernary: required by @Strapi
      article.image[0].url.startsWith("/")
      ? `${strapiAPI.baseURL}${article.image[0].url}`
      : article.image[0].url
    : "https://via.placeholder.com/300x200/e2e8f0/64748b?text=Sem+Imagem";

  const formattedDate = new Date(article.publishedAt).toLocaleDateString(
    "pt-BR",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );

  return (
    <Link
      className="group block overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-secondary-dark"
      params={{ articleId: article.slug }}
      to="/blog/$articleId"
    >
      <div className="aspect-video overflow-hidden">
        {/** biome-ignore lint/performance/noImgElement: required by @Vite */}
        <img
          alt={article.image?.[0]?.alternativeText || article.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          src={imageUrl}
        />
      </div>

      <div className="px-4 py-6">
        <h3 className="mb-2 line-clamp-2 font-semibold text-gray-900 text-lg transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
          {article.title}
        </h3>

        <p className="mb-3 line-clamp-2 text-gray-600 text-sm dark:text-gray-400">
          {article.description}
        </p>

        <div className="flex items-center justify-between text-gray-500 text-xs dark:text-gray-500">
          <span>{article.author}</span>
          <span>{formattedDate}</span>
        </div>
      </div>
    </Link>
  );
}
