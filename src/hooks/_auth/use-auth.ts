import { strapiAPI } from "@/api/strapi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export interface User {
  id: number;
  username: string;
  email: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  name?: string;
  lastname?: string;
  whatsapp?: string;
  cnpj?: string;
  monthlyRevenue?: string;
  currentGateway?: string;
  knowledge?: string;
}

interface AuthResponse {
  jwt: string;
  user: User;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  name?: string;
  lastname?: string;
  whatsapp?: string;
  cnpj?: string;
  monthlyRevenue?: string;
  currentGateway?: string;
  knowledge?: string;
}

interface LoginData {
  identifier: string;
  password: string;
}

async function updateUserProfile(token: string, userId: number, profileData: any): Promise<User> {
  const response = await strapiAPI.fetch(`/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(profileData),
  });

  return response;
}

const authService = {
  async register(data: RegisterData): Promise<AuthResponse> {
    const basicData = {
      username: data.username,
      email: data.email,
      password: data.password,
    };

    const response = await strapiAPI.fetch("/auth/local/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(basicData),
    });

    if (response.jwt && (data.name || data.lastname || data.whatsapp || data.cnpj || data.monthlyRevenue || data.currentGateway || data.knowledge)) {
      try {
        const updatedUser = await updateUserProfile(response.jwt, response.user.id, {
          name: data.name,
          lastname: data.lastname,
          whatsapp: data.whatsapp,
          cnpj: data.cnpj,
          monthlyRevenue: data.monthlyRevenue,
          currentGateway: data.currentGateway,
          knowledge: data.knowledge,
        });

        return {
          jwt: response.jwt,
          user: updatedUser,
        };
      } catch (updateError) {
        console.error('Erro ao atualizar perfil, mas usuário foi criado:', updateError);
        return response;
      }
    }

    return response;
  },

  async login(data: LoginData): Promise<AuthResponse> {
    const response = await strapiAPI.fetch("/auth/local", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    return response;
  },

  async getMe(token: string): Promise<User> {
    const response = await strapiAPI.fetch("/users/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  },

  setToken(token: string) {
    localStorage.setItem("strapi_jwt", token);
  },

  getToken(): string | null {
    return localStorage.getItem("strapi_jwt");
  },

  removeToken() {
    localStorage.removeItem("strapi_jwt");
  },
};

export function useAuth() {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      const token = authService.getToken();

      if (!token) return null;

      try {
        return await authService.getMe(token);
      } catch (error) {
        authService.removeToken();
        return null;
      }
    },
    staleTime: 5 * 60 * 1000,
  });

  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      authService.setToken(data.jwt);
      queryClient.setQueryData(["auth", "me"], data.user);
    },
  });

  const loginMutation = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      authService.setToken(data.jwt);
      queryClient.setQueryData(["auth", "me"], data.user);
    },
  });

  const logout = () => {
    authService.removeToken();
    queryClient.setQueryData(["auth", "me"], null);
    queryClient.invalidateQueries({ queryKey: ["auth"] });
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    register: registerMutation.mutateAsync,
    login: loginMutation.mutateAsync,
    logout,
    isRegistering: registerMutation.isPending,
    isLoggingIn: loginMutation.isPending,
    registerError: registerMutation.error,
    loginError: loginMutation.error,
  };
}