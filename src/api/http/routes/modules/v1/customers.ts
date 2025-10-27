/** biome-ignore-all lint/suspicious/useAwait: required by API */

import { fyno } from "@/api/connections/fyno";
import type { Customer } from "../../types/v1/customer";

export const customersModule = {
  async create(
    token: string,
    name: string,
    phone: string,
    email: string,
    document: string,
    address: string
  ): Promise<Customer> {
    return fyno.fetch("/v1/customer/create", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify({ name, phone, email, document, address }),
    });
  },

  async list(token: string): Promise<Customer[]> {
    return fyno.fetch("/v1/customer/list", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  async update(
    token: string,
    id: string,
    data: Partial<Omit<Customer, "id" | "createdAt">>
  ): Promise<Customer> {
    return fyno.fetch(`/v1/customer/update/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    });
  },

  async remove(token: string, id: string): Promise<void> {
    return fyno.fetch(`/v1/customer/delete/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};
