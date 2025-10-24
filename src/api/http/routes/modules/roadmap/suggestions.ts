/** biome-ignore-all lint/suspicious/useAwait: required by API */

import { fyno } from "@/api/connections/fyno";
import type { Suggestion } from "../../types/roadmap/suggestion";

export const suggestionsModule = {
  async create(
    token: string,
    title: string,
    description: string
  ): Promise<Suggestion> {
    return fyno.fetch("/roadmap/create", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ title, description }),
    });
  },

  async list(token: string): Promise<Suggestion[]> {
    return fyno.fetch("/roadmap/list", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  async vote(token: string, suggestionId: string): Promise<number> {
    return fyno.fetch(`/roadmap/vote/${suggestionId}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
