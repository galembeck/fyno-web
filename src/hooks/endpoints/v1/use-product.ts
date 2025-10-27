import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "@/api/api";
import type { Product } from "@/api/http/routes/types/v1/product";

export function useProducts() {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("fyno_jwt");

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["products", "list"],
    queryFn: async () => {
      if (!token) {
        toast.error("Usuário não autenticado!");
        return [];
      }
      return await api.products.list(token);
    },
    enabled: !!token,
  });

  const createMutation = useMutation({
    mutationFn: async ({
      id,
      name,
      description,
      price,
    }: {
      id: string;
      name: string;
      description: string;
      price: number;
    }) => {
      if (!token) {
        return;
      }

      return await api.products.create(token, id, name, description, price);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", "list"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      name,
      description,
      price,
    }: {
      id: string;
      name: string;
      description: string;
      price: number;
    }) => {
      if (!token) {
        return;
      }

      return await api.products.update(token, id, name, description, price);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", "list"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!token) {
        return;
      }

      return await api.products.remove(token, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products", "list"] });
    },
  });

  return {
    products,
    isLoading,
    createProduct: createMutation.mutateAsync,
    updateProduct: updateMutation.mutateAsync,
    deleteProduct: deleteMutation.mutateAsync,
  };
}
