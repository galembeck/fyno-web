/** biome-ignore-all lint/suspicious/useAwait: required by API */

import { fyno } from "@/api/connections/fyno";
import type { Product } from "../../types/v1/product";

export const productModule = {
  async create(
    token: string,
    id: string,
    name: string,
    description: string,
    price: number
  ): Promise<Product> {
    return fyno.fetch("/v1/product/create", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ id, name, description, price }),
    });
  },

  async list(token: string): Promise<Product[]> {
    return fyno.fetch("/v1/product/list", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  async update(
    token: string,
    id: string,
    name: string,
    description: string,
    price: number
  ): Promise<Product> {
    return fyno.fetch(`/v1/product/update/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name, description, price }),
    });
  },

  async remove(token: string, id: string): Promise<void> {
    return fyno.fetch(`/v1/product/delete/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
