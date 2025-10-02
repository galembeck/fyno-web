const STRAPI_URL = import.meta.env.VITE_STRAPI_URL || 'http://localhost:1337';
const STRAPI_API_TOKEN = import.meta.env.VITE_STRAPI_API_TOKEN;

export const strapiAPI = {
  baseURL: STRAPI_URL,
  
  // Helper para construir URLs
  url: (endpoint: string) => `${STRAPI_URL}/api${endpoint}`,
  
  // Helper para fazer requests
  fetch: async (endpoint: string, options?: RequestInit) => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    // Adiciona token se disponível
    if (STRAPI_API_TOKEN) {
      // biome-ignore lint/complexity/useLiteralKeys: not important
      headers['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
    }

    const response = await fetch(`${STRAPI_URL}/api${endpoint}`, {
      headers: {
        ...headers,
        ...options?.headers,
      },
      ...options,
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    return response.json();
  }
};