/** biome-ignore-all lint/suspicious/useAwait: required by authentication */
/** biome-ignore-all lint/correctness/noUnusedVariables: required by authentication */
/** biome-ignore-all lint/correctness/noUndeclaredVariables: required by authentication */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { api } from "@/api/modules/auth.api";

export function useAuth() {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      const token = localStorage.getItem("fyno_jwt");
      if (!token) {
        return null;
      }

      try {
        return await api.auth.getMe(token);
      } catch (error) {
        toast.error("Erro ao obter dados do usuário", {
          description: error instanceof Error ? error.message : undefined,
        });
        localStorage.removeItem("fyno_jwt");
        return null;
      }
    },
    staleTime: 5 * 60 * 1000,
    retry: false,
  });

  const registerMutation = useMutation({
    mutationFn: api.auth.register,
    onSuccess: (data) => {
      localStorage.setItem("fyno_jwt", data.token);
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    },
  });

  const loginMutation = useMutation({
    mutationFn: api.auth.login,
    onSuccess: (data) => {
      localStorage.setItem("fyno_jwt", data.token);
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    },
  });

  const logout = async () => {
    const token = localStorage.getItem("fyno_jwt");
    if (token) {
      try {
        await api.auth.logout(token);
      } catch (error) {
        // Handled by register-form
      }
    }
    localStorage.removeItem("fyno_jwt");
    queryClient.clear();
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,

    register: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,

    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,

    logout,
    checkEmailExists: api.auth.checkEmailExists,
  };
}
