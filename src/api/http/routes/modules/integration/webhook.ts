/** biome-ignore-all lint/suspicious/useAwait: required by webhook operations */

import { fyno } from "@/api/connections/fyno";
import type { Webhook } from "@/pages/_app/admin/_pages/integration/webhooks/~components/webhooks-table";

export const webhookModule = {
  async create(
    token: string,
    name: string,
    url: string,
    secret: string,
    events: string[]
  ): Promise<Webhook> {
    return fyno.fetch("/v1/integration/webhook/create", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name, url, secret, events }),
    });
  },

  async list(token: string): Promise<Webhook[]> {
    return fyno.fetch("/v1/integration/webhook/list", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  async remove(token: string, id: string): Promise<void> {
    return fyno.fetch(`/v1/integration/webhook/delete/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
