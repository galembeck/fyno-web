const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

export const strapiAPI = {
  baseURL: STRAPI_URL,
  
  // Helper para construir URLs
  url: (endpoint: string) => `${STRAPI_URL}/api${endpoint}`,

  // Helper para pegar token do usuário autenticado
  getAuthToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem("strapi_jwt");
    }

    return null;
  },
  
  // Helper para fazer requests
  fetch: async (endpoint: string, options?: RequestInit) => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Prioridade: 1. Headers customizados, 2. Token do usuário, 3. Token de API
    let customAuthHeader: string | undefined;
    if (options?.headers && typeof options.headers === 'object' && !('forEach' in options.headers)) {
      // Only index if it's a plain object, not Headers or array
      customAuthHeader = (options.headers as Record<string, string>)['Authorization'] || (options.headers as Record<string, string>)['authorization'];
    }
    
    if (customAuthHeader) {
      // Se veio Authorization customizado, usar ele
      headers['Authorization'] = customAuthHeader as string;
    } else {
      // Tentar pegar token do usuário autenticado primeiro
      const userToken = strapiAPI.getAuthToken();
      if (userToken) {
        headers['Authorization'] = `Bearer ${userToken}`;
      } else if (STRAPI_API_TOKEN) {
        // Fallback para token de API se não houver usuário logado
        headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
      }
    }

    const response = await fetch(`${STRAPI_URL}/api${endpoint}`, {
      headers: {
        ...headers,
        ...options?.headers,
      },
      ...options,
    });
    
    if (!response.ok) {
      let errorMessage = `API Error: ${response.status} ${response.statusText}`;
      
      try {
        const errorData = await response.json();
        errorMessage = errorData.error?.message || errorData.message || errorMessage;
      } catch {
        // Se não conseguir fazer parse do JSON, usar mensagem padrão
      }
      
      throw new Error(errorMessage);
    }
    
    return response.json();
  }
};