/** biome-ignore-all lint/suspicious/noConsole: only used during development procedures */
/** biome-ignore-all lint/style/useBlockStatements: only used during development prcedures */

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { strapiAPI } from "@/api/strapi";

export interface User {
	id: number;
	documentId: string;
	username: string;
	email: string;
	confirmed: boolean;
	blocked: boolean;
	createdAt: string;
	updatedAt: string;

	name?: string;
	lastname?: string;
	cnpj?: string;
	monthlyRevenue?: string;
	phone?: string;
	supportPhone?: string;

	pendingEmail?: string;
	emailChangeToken?: string;
	emailChangeTokenExpiration?: string;

	role?: {
		id: number;
		name: string;
		description: string;
		type: string;
	};
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
	cnpj?: string;
	monthlyRevenue?: string;
	phone?: string;
	supportPhone?: string;
}

interface LoginData {
	identifier: string;
	password: string;
}

export interface EmailChangeRequest {
	id: number;
	documentId: string;
	newEmail: string;
	token: string;
	confirmed: boolean;
	expiresAt: string;
	createdAt: string;
	updatedAt: string;
	publishedAt: string;
	user?:
		| {
				id: number;
				email: string;
				username: string;
				name?: string;
		  }
		| number;
}

async function updateUserProfile(
	token: string,
	userId: number,
	// biome-ignore lint/suspicious/noExplicitAny: not important...
	profileData: any
): Promise<User> {
	const response = await strapiAPI.fetch(`/users/${userId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
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

		if (
			response.jwt &&
			(data.name ||
				data.lastname ||
				data.cnpj ||
				data.monthlyRevenue ||
				data.phone ||
				data.supportPhone)
		) {
			try {
				const updatedUser = await updateUserProfile(
					response.jwt,
					response.user.id,
					{
						name: data.name,
						lastname: data.lastname,
						cnpj: data.cnpj,
						monthlyRevenue: data.monthlyRevenue,
						phone: data.phone,
						supportPhone: data.supportPhone,
					}
				);

				return {
					jwt: response.jwt,
					user: updatedUser,
				};
			} catch (updateError) {
				console.error(
					"Erro ao atualizar perfil, mas usuário foi criado:",
					updateError
				);
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
		const response = await strapiAPI.fetch("/users/me?populate=role", {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		});

		return response;
	},

	async requestEmailChange(
		token: string,
		newEmail: string
	): Promise<EmailChangeRequest> {
		const response = await strapiAPI.fetch("/users/request-email-change", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				newEmail,
			}),
		});

		return response.data;
	},

	async confirmEmailChange(
		token: string
	): Promise<{ success: boolean; newEmail?: string }> {
		const response = await strapiAPI.fetch("/users/confirm-email-change", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				token,
			}),
		});

		return {
			success: response.success,
			newEmail: response.newEmail,
		};
	},

	async resendEmailConfirmation(token: string): Promise<{ success: boolean }> {
		const response = await strapiAPI.fetch("/users/resend-email-confirmation", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({}),
		});

		return response;
	},

	async cancelEmailChange(token: string): Promise<{ success: boolean }> {
		const response = await strapiAPI.fetch("/users/cancel-email-change", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({}),
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
				// biome-ignore lint/correctness/noUnusedVariables: not important...
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

	const updateUserMutation = useMutation({
		mutationFn: async (data: Partial<User>) => {
			const token = authService.getToken();
			if (!(token && user)) throw new Error("Token ou usuário não encontrado");

			return await updateUserProfile(token, user.id, data);
		},
		onSuccess: (updatedUser) => {
			queryClient.setQueryData(["auth", "me"], updatedUser);
			queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
		},
	});

	const requestEmailChangeMutation = useMutation({
		mutationFn: (newEmail: string) => {
			const token = authService.getToken();
			if (!token) throw new Error("Token não encontrado");
			return authService.requestEmailChange(token, newEmail);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
		},
	});

	const confirmEmailChangeMutation = useMutation({
		mutationFn: authService.confirmEmailChange,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
		},
	});

	const resendEmailConfirmationMutation = useMutation({
		mutationFn: () => {
			const token = authService.getToken();
			if (!token) throw new Error("Token não encontrado");
			return authService.resendEmailConfirmation(token);
		},
	});

	const cancelEmailChangeMutation = useMutation({
		mutationFn: () => {
			const token = authService.getToken();
			if (!token) throw new Error("Token não encontrado");
			return authService.cancelEmailChange(token);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
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
		updateUser: updateUserMutation.mutateAsync,
		logout,
		isRegistering: registerMutation.isPending,
		isLoggingIn: loginMutation.isPending,
		isUpdatingUser: updateUserMutation.isPending,
		registerError: registerMutation.error,
		loginError: loginMutation.error,
		updateError: updateUserMutation.error,

		requestEmailChange: requestEmailChangeMutation.mutateAsync,
		isRequestingEmailChange: requestEmailChangeMutation.isPending,

		confirmEmailChange: confirmEmailChangeMutation.mutateAsync,
		isConfirmingEmailChange: confirmEmailChangeMutation.isPending,

		resendEmailConfirmation: resendEmailConfirmationMutation.mutateAsync,
		isResendingEmailConfirmation: resendEmailConfirmationMutation.isPending,

		cancelEmailChange: cancelEmailChangeMutation.mutateAsync,
		isCancellingEmailChange: cancelEmailChangeMutation.isPending,
	};
}
