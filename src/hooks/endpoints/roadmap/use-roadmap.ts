/** biome-ignore-all lint/suspicious/noExplicitAny: required by API */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "@/api/api";
import type { Suggestion } from "@/api/http/routes/types/roadmap/suggestion";

export function useRoadmap() {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("fyno_jwt");

  const { data: suggestions, isLoading } = useQuery<Suggestion[]>({
    queryKey: ["roadmap", "list"],
    queryFn: async () => {
      if (!token) {
        toast.error("Usuário não autenticado!");
        return [];
      }
      return await api.roadmap.list(token);
    },
    enabled: !!token,
  });

  const createMutation = useMutation({
    mutationFn: async ({
      title,
      description,
    }: {
      title: string;
      description: string;
    }) => {
      if (!token) {
        toast.error("Usuário não autenticado!");
        return;
      }
      return await api.roadmap.create(token, title, description);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roadmap", "list"] });
    },
  });

  const voteMutation = useMutation({
    mutationFn: async (suggestionId: string) => {
      if (!token) {
        toast.error("Usuário não autenticado!");
        return;
      }
      return await api.roadmap.vote(token, suggestionId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roadmap", "list"] });
    },
    onError: (error: any) => {
      toast.error("Erro ao registrar voto", { description: error.message });
    },
  });

  return {
    suggestions,
    isLoading,
    createSuggestion: createMutation.mutateAsync,
    isCreating: createMutation.isPending,

    vote: voteMutation.mutateAsync,
    isVoting: voteMutation.isPending,
  };
}
