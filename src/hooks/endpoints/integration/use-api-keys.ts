/** biome-ignore-all lint/suspicious/useAwait: required by API key operations */
/** biome-ignore-all lint/suspicious/noExplicitAny: required by API key operations */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "@/api/api";
import type { ApiKey } from "@/api/types/integration/api-key";

export function useApiKeys() {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("fyno_jwt");

  const { data: keys, isLoading } = useQuery<ApiKey[]>({
    queryKey: ["integration", "apikey", "list"],
    queryFn: async () => {
      if (!token) {
        toast.error("Usuário não autenticado!");
        return [];
      }

      return await api.apiKeys.list(token);
    },
    enabled: !!token,
  });

  const createMutation = useMutation({
    mutationFn: async ({
      notes,
      origin,
    }: {
      notes: string;
      origin?: string;
    }) => {
      if (!token) {
        toast.error("Usuário não autenticado!");
        return;
      }

      return await api.apiKeys.create(token, notes, origin);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["integration", "apikey", "list"],
      });
    },
  });

  const revokeMutation = useMutation({
    mutationFn: async (keyId: string) => {
      if (!token) {
        toast.error("Usuário não autenticado!");
        return;
      }

      return await api.apiKeys.revoke(token, keyId);
    },
    onSuccess: () => {
      toast.success("Chave API revogada com sucesso!", {
        description: "A chave selecionada foi excluída de sua lista...",
      });
      queryClient.invalidateQueries({
        queryKey: ["integration", "apikey", "list"],
      });
    },
  });

  return {
    keys,
    isLoading,
    createKey: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    revokeKey: revokeMutation.mutateAsync,
    isRevoking: revokeMutation.isPending,
  };
}
