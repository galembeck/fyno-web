import { useQuery } from "@tanstack/react-query";
import { strapiAPI } from "@/api/connections/strapi";

interface StrapiCategory {
  id: number;
  documentId: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface Category {
  id: number;
  documentId: string;
  name: string;
  slug: string;
}

const fetchCategories = async (): Promise<Category[]> => {
  const responseData = await strapiAPI.fetch("/categories");
  const strapiCategories: StrapiCategory[] = responseData.data || [];

  return strapiCategories.map((category) => ({
    id: category.id,
    documentId: category.documentId,
    name: category.name,
    slug: category.name.toLowerCase().replace(/\s+/g, "-"),
  }));
};

export const useCategoriesQuery = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 10 * 60 * 1000, // 10 minutos
  });
};
