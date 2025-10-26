/** biome-ignore-all lint/suspicious/noExplicitAny: required by webhook operations */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "@/api/api";
import type { Webhook } from "@/api/http/routes/types/integration/webhook";

export function useWebhooks() {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("fyno_jwt");

  const { data: webhooks, isLoading } = useQuery<Webhook[]>({
    queryKey: ["integration", "webhook", "list"],
    queryFn: async () => {
      if (!token) {
        toast.error("Usuário não autenticado!");
        return [];
      }

      return await api.webhooks.list(token);
    },
    enabled: !!token,
  });

  const createMutation = useMutation({
    mutationFn: async ({
      name,
      url,
      secret,
      events,
    }: {
      name: string;
      url: string;
      secret: string;
      events: string[];
    }) => {
      if (!token) {
        toast.error("Usuário não autenticado!");
        return;
      }

      return await api.webhooks.create(token, name, url, secret, events);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["integration", "webhook", "list"],
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!token) {
        toast.error("Usuário não autenticado!");
        return;
      }

      return await api.webhooks.remove(token, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["integration", "webhook", "list"],
      });
    },
    onError: (error: any) => {
      toast.error("Erro ao excluir webhook", { description: error.message });
    },
  });

  return {
    webhooks,
    isLoading,
    createWebhook: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    deleteWebhook: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
}
