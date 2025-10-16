/** biome-ignore-all lint/suspicious/noExplicitAny: required by form validation */

import { createFileRoute } from "@tanstack/react-router";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatCNPJ, removeFormat } from "@/lib/_auth/sign-up/format-masks";
import { isValidCNPJ } from "@/utils/_auth/sign-up/valid-cnpj";

export const Route = createFileRoute(
  "/_auth/sign-up/register/~components/register-form-steps/company-information-form"
)({
  component: () => <CompanyInformationForm form={undefined} />,
});

interface CompanyInformationFormProps {
  form: any;
}

export function CompanyInformationForm({ form }: CompanyInformationFormProps) {
  const cnpj = form.watch("cnpj");

  const cnpjValidation = {
    isValid: cnpj.length >= 18 && isValidCNPJ(cnpj),
    hasMinLength: removeFormat(cnpj).length === 14,
  };

  return (
    <>
      <FormField
        control={form.control}
        name="companyName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nome da empresa *</FormLabel>
            <FormControl>
              <Input
                {...field}
                className="border-none bg-input-gray"
                placeholder="Informe o nome da empresa"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
          name="cnpj"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CNPJ *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className={`border-none bg-input-gray ${
                    cnpj &&
                    cnpjValidation.hasMinLength &&
                    !cnpjValidation.isValid
                      ? "border-2 border-red-500 focus:border-red-500"
                      : ""
                  }`}
                  onChange={(e) => {
                    const formatted = formatCNPJ(e.target.value);
                    field.onChange(formatted);
                  }}
                  placeholder="00.000.000/0000-00"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="monthlyRevenue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Faturamento mensal *</FormLabel>
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full border-none bg-input-gray">
                    <SelectValue placeholder="Até R$ 10.000" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="0-10k">Até R$ 10.000</SelectItem>
                  <SelectItem value="10k-50k">R$ 10.000 - R$ 50.000</SelectItem>
                  <SelectItem value="50k-100k">
                    R$ 50.000 - R$ 100.000
                  </SelectItem>
                  <SelectItem value="100k-500k">
                    R$ 100.000 - R$ 500.000
                  </SelectItem>
                  <SelectItem value="500k+">Acima de R$ 500.000</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
          name="storeDomain"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Domínio da loja *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="border-none bg-input-gray"
                  placeholder="Informe a domínio da loja"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="businessSegment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Segmento de negócio *</FormLabel>
              <Select defaultValue={field.value} onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger className="w-full border-none bg-input-gray">
                    <SelectValue placeholder="Dropshipping-BR" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Dropshipping-BR">
                    Dropshipping BR
                  </SelectItem>
                  <SelectItem value="Dropshipping-Global">
                    Dropshipping Global
                  </SelectItem>
                  <SelectItem value="E-Commerce">E-Commerce</SelectItem>
                  <SelectItem value="Infoprodutos">Infoprodutos</SelectItem>
                  <SelectItem value="Nutracêuticos">Nutracêuticos</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="businessDescription"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Descrição do negócio</FormLabel>
            <FormControl>
              <Input
                {...field}
                className="border-none bg-input-gray"
                placeholder="Descrição breve do negócio (opcional)"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}
