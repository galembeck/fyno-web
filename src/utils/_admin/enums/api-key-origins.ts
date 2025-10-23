export const ApiKeyOrigins = {
  DASHBOARD: "DASHBOARD" as const,
};

export type ApiKeyOrigins = (typeof ApiKeyOrigins)[keyof typeof ApiKeyOrigins];
