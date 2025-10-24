import { authModule } from "./http/routes/modules/auth";
import { apiKeyModule } from "./http/routes/modules/integration/api-key";
import { webhookModule } from "./http/routes/modules/integration/webhook";
import { suggestionsModule } from "./http/routes/modules/roadmap/suggestions";
import { productModule } from "./http/routes/modules/v1/product";

export const api = {
  auth: authModule,
  apiKeys: apiKeyModule,
  webhooks: webhookModule,
  products: productModule,
  roadmap: suggestionsModule,
};

export default api;
