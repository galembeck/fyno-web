/** biome-ignore-all lint/suspicious/useAwait: required to suppress linting errors */
/** biome-ignore-all lint/style/useBlockStatements: required by email checking */

import { fyno } from "@/api/connections/fyno";
import type { LoginData, RegisterData, User } from "../types/user";

export const authModule = {
  async register(data: RegisterData): Promise<{ token: string }> {
    return fyno.fetch("/auth/register", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async login(data: LoginData): Promise<{ token: string }> {
    return fyno.fetch("/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
  },

  async getMe(token: string): Promise<User> {
    return fyno.fetch("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  async logout(token: string) {
    return fyno.fetch("/auth/logout", {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
  },

  async checkEmailExists(email: string): Promise<boolean> {
    try {
      const res = await fyno.fetch("/auth/register?dryRun=true", {
        method: "POST",
        body: JSON.stringify({ email }),
      });

      if (res === true) return true;
      if (res?.data === true || res?.data === "true") return true;
      if (res?.success && res?.data === true) return true;
      return false;
    } catch {
      return false;
    }
  },

  // async createCustomer(token: string, data: unknown) {
  //   return fyno.fetch("/v1/customers", {
  //     method: "POST",
  //     headers: { Authorization: `Bearer ${token}` },
  //     body: JSON.stringify(data),
  //   });
  // },

  // async listCustomers(token: string) {
  //   return fyno.fetch("/v1/customers", {
  //     headers: { Authorization: `Bearer ${token}` },
  //   });
  // },
};
