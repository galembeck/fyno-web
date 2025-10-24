/** biome-ignore-all lint/suspicious/useAwait: required to suppress linting errors */

import { fyno } from "@/api/connections/fyno";
import type { ApiKey } from "../../types/integration/api-key";

export const apiKeyModule = {
  async create(
    token: string,
    notes: string,
    origin = "dashboard"
  ): Promise<ApiKey> {
    return fyno.fetch("/v1/integration/apikey/create", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ notes, origin }),
    });
  },

  async list(token: string): Promise<ApiKey[]> {
    return fyno.fetch("/v1/integration/apikey/list", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  async revoke(token: string, keyId: string): Promise<void> {
    return fyno.fetch(`/v1/integration/apikey/revoke/${keyId}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
