import { apiKeyModule } from "./modules/api-key";
import { authModule } from "./modules/auth";
import { webhookModule } from "./modules/webhook";

export const api = {
  auth: authModule,
  apiKeys: apiKeyModule,
  webhooks: webhookModule,
};

export default api;
