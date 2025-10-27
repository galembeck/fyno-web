import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "@/api/api";
import type { Customer } from "@/api/http/routes/types/v1/customer";

export function useCustomers() {
  const queryClient = useQueryClient();
  const token = localStorage.getItem("fyno_jwt");

  const { data: customers, isLoading } = useQuery<Customer[]>({
    queryKey: ["customers", "list"],
    queryFn: async () => {
      if (!token) {
        toast.error("Usuário não autenticado!");
        return [];
      }
      return await api.customers.list(token);
    },
    enabled: !!token,
  });

  const createMutation = useMutation({
    mutationFn: async (data: Omit<Customer, "id" | "createdAt">) => {
      if (!token) {
        return;
      }

      return await api.customers.create(
        token,
        data.name,
        data.phone,
        data.email,
        data.document,
        data.address
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers", "list"] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<Omit<Customer, "id" | "createdAt">>;
    }) => {
      if (!token) {
        toast.error("Usuário não autenticado!");
        return;
      }

      return await api.customers.update(token, id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customer", "list"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      if (!token) {
        return;
      }

      return await api.customers.remove(token, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers", "list"] });
    },
  });

  return {
    customers,
    isLoading,
    createCustomer: createMutation.mutateAsync,
    updateCustomer: updateMutation.mutateAsync,
    deleteCustomer: deleteMutation.mutateAsync,
  };
}
