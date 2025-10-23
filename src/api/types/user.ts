export interface User {
  id: string;

  // Personal Information
  email: string;
  name: string;
  lastname: string;
  phone: string;
  supportPhone: string;
  role: string;

  // Company Information
  companyName: string;
  cnpj: string;
  monthlyRevenue: string;
  storeDomain: string;
  businessSegment: string;
  businessDescription?: string;

  // Address Information
  street: string;
  number: string;
  complement?: string;
  neighborhood: string;
  cep: string;
  city: string;
  state: string;
  createdAt: string;
}

export interface RegisterData extends Omit<User, "id" | "createdAt" | "role"> {
  password: string;
}

export interface LoginData {
  email: string;
  password: string;
}
