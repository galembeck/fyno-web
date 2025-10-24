import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
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
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/hooks/endpoints/auth/use-auth";
import { formatCNPJ, removeFormat } from "@/lib/_auth/sign-up/format-masks";
import { isValidCNPJ } from "@/utils/_auth/sign-up/valid-cnpj";

export const Route = createFileRoute(
  "/_app/app/_pages/settings/~components/company-tab"
)({
  component: CompanyTab,
});

const companySchema = z.object({
  companyName: z
    .string()
    .min(2, "Nome da empresa deve ter no mínimo 2 caracteres")
    .optional(),
  cnpj: z
    .string()
    .min(14, {
      message: "CNPJ deve ter 14 dígitos",
    })
    .refine(
      (value) => {
        const cleanCNPJ = removeFormat(value);
        return cleanCNPJ.length === 14 && isValidCNPJ(value);
      },
      {
        message: "CNPJ inválido",
      }
    )
    .optional(),
  storeDomain: z.string().url("Domínio inválido").optional(),
  monthlyRevenue: z
    .string()
    .min(1, {
      message: "Selecione o faturamento mensal",
    })
    .optional(),
  businessSegment: z
    .string()
    .min(1, {
      message: "Selecione o segmento de negócio",
    })
    .optional(),
  businessDescription: z.string().optional(),
});

type CompanyFormData = z.infer<typeof companySchema>;

export function CompanyTab() {
  const { user, updateUser, isUpdatingUser } = useAuth();

  const [hasChanges, setHasChanges] = useState(false);

  const form = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: {
      companyName: user?.companyName || "",
      cnpj: formatCNPJ(user?.cnpj || ""),
      storeDomain: user?.storeDomain || "",
      monthlyRevenue: user?.monthlyRevenue || "",
      businessSegment: user?.businessSegment || "",
      businessDescription: user?.businessDescription || "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        companyName: user.companyName || "",
        cnpj: formatCNPJ(user.cnpj || ""),
        storeDomain: user.storeDomain || "",
        monthlyRevenue: user.monthlyRevenue || "",
        businessSegment: user.businessSegment || "",
        businessDescription: user.businessDescription || "",
      });
    }
  }, [user, form]);

  useEffect(() => {
    const subscription = form.watch((values) => {
      const hasChanged =
        values.companyName !== (user?.companyName || "") ||
        values.cnpj !== removeFormat(user?.cnpj || "") ||
        values.storeDomain !== (user?.storeDomain || "") ||
        values.monthlyRevenue !== (user?.monthlyRevenue || "") ||
        values.businessSegment !== (user?.businessSegment || "") ||
        values.businessDescription !== (user?.businessDescription || "");

      setHasChanges(Boolean(hasChanged));
    });

    return () => subscription.unsubscribe();
  }, [form, user]);

  const onSubmit = async (data: CompanyFormData) => {
    try {
      const cleanData = {
        companyName: data.companyName,
        cnpj: data.cnpj ? removeFormat(data.cnpj) : undefined,
        storeDomain: data.storeDomain,
        monthlyRevenue: data.monthlyRevenue,
        businessSegment: data.businessSegment,
        businessDescription: data.businessDescription,
      };

      await updateUser(cleanData);

      toast.success("Informações salvas!", {
        description: "Dados empresariais atualizados com sucesso.",
      });

      setHasChanges(false);
      // biome-ignore lint/suspicious/noExplicitAny: handled by useAuth
      // biome-ignore lint/correctness/noUnusedVariables: handled by useAuth
    } catch (error: any) {
      // Handled by useAuth hook
    }
  };

  const handleReset = () => {
    form.reset({
      companyName: user?.companyName || "",
      cnpj: user?.cnpj || "",
      storeDomain: user?.storeDomain || "",
      monthlyRevenue: user?.monthlyRevenue || "",
      businessSegment: user?.businessSegment || "",
      businessDescription: user?.businessDescription || "",
    });

    setHasChanges(false);
  };

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-8"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Informações da empresa</CardTitle>
            <CardDescription>
              Gerencie e atualize os dados básicos da empresa cadastrados e
              registrados em nossa plataforma
            </CardDescription>

            {hasChanges && (
              <CardAction className="flex gap-2">
                <Button
                  disabled={isUpdatingUser}
                  onClick={handleReset}
                  type="button"
                  variant="outline"
                >
                  Cancelar
                </Button>
                <Button disabled={isUpdatingUser} type="submit">
                  {isUpdatingUser ? (
                    <div className="flex items-center gap-2">
                      <Spinner className="h-4 w-4" />
                      <span>Salvando...</span>
                    </div>
                  ) : (
                    "Salvar Alterações"
                  )}
                </Button>
              </CardAction>
            )}
          </CardHeader>

          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome da empresa</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isUpdatingUser}
                          placeholder="Informe o nome da empresa"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="cnpj"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CNPJ</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          className={`border-none bg-input-gray ${
                            field.value &&
                            removeFormat(field.value).length === 14 &&
                            !isValidCNPJ(field.value)
                              ? "border-2 border-red-500 focus:border-red-500"
                              : ""
                          }`}
                          disabled
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
                  name="storeDomain"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Domínio da loja</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isUpdatingUser}
                          placeholder="Informe o domínio da loja"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="monthlyRevenue"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Faturamento mensal</FormLabel>
                      <Select
                        defaultValue={field.value}
                        disabled
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full border-none bg-input-gray">
                            <SelectValue placeholder="Até R$ 10.000" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="0-10k">Até R$ 10.000</SelectItem>
                          <SelectItem value="10k-50k">
                            R$ 10.000 - R$ 50.000
                          </SelectItem>
                          <SelectItem value="50k-100k">
                            R$ 50.000 - R$ 100.000
                          </SelectItem>
                          <SelectItem value="100k-500k">
                            R$ 100.000 - R$ 500.000
                          </SelectItem>
                          <SelectItem value="500k+">
                            Acima de R$ 500.000
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="businessSegment"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Segmento de negócio</FormLabel>
                      <Select
                        defaultValue={field.value}
                        disabled
                        onValueChange={field.onChange}
                      >
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
                          <SelectItem value="Infoprodutos">
                            Infoprodutos
                          </SelectItem>
                          <SelectItem value="Nutracêuticos">
                            Nutracêuticos
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormField
                  control={form.control}
                  name="businessDescription"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Descrição do negócio</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isUpdatingUser}
                          placeholder="Informe a descrição do negócio"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex flex-col items-start gap-3 text-muted-foreground text-sm">
            <p>
              As informações fornecidas são confidenciais e não serão
              compartilhadas com terceiros.
            </p>

            <p>
              * OBS: Para alterar informações como CNPJ, faturamento mensal e
              segmento do negócio, entre em contato com o suporte.
            </p>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
