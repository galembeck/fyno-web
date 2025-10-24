/** biome-ignore-all lint/suspicious/noExplicitAny: required by @TypeScript */

import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { SelectCombobox } from "@/components/select-combobox";
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
import { Spinner } from "@/components/ui/spinner";
import { useAuth } from "@/hooks/endpoints/auth/use-auth";
import { formatCEP } from "@/lib/_auth/sign-up/format-masks";
import { isValidCEP } from "@/utils/_auth/sign-up/valid-cep";

export const Route = createFileRoute(
  "/_app/app/_pages/settings/~components/address-tab"
)({
  component: AddressTab,
});

interface StateOption {
  value: string;
  label: string;
  id: number;
}

interface CityOption {
  value: string;
  label: string;
}

const addressSchema = z.object({
  street: z.string().min(2, "Rua deve ter no mínimo 2 caracteres").optional(),
  number: z.string().min(1, "Número é obrigatório").optional(),
  cep: z
    .string()
    .min(8, { message: "CEP deve ter 8 dígitos" })
    .refine((value) => isValidCEP(value), {
      message: "CEP inválido",
    })
    .optional(),
  complement: z.string().optional(),
  neighborhood: z
    .string()
    .min(2, "Bairro deve ter no mínimo 2 caracteres")
    .optional(),
  city: z.string().min(2, "Cidade deve ter no mínimo 2 caracteres").optional(),
  state: z.string().min(2, "Estado deve ter no mínimo 2 caracteres").optional(),
});

type AddressFormData = z.infer<typeof addressSchema>;

export function AddressTab() {
  const { user, updateUser, isUpdatingUser } = useAuth();

  const [hasChanges, setHasChanges] = useState(false);

  const [states, setStates] = useState<StateOption[]>([]);
  const [cities, setCities] = useState<CityOption[]>([]);

  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      street: user?.street || "",
      number: user?.number || "",
      cep: formatCEP(user?.cep || ""),
      complement: user?.complement || "",
      neighborhood: user?.neighborhood || "",
      city: user?.city || "",
      state: user?.state || "",
    },
  });

  const selectedState = form.watch("state");

  useEffect(() => {
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a: any, b: any) =>
          a.nome.localeCompare(b.nome)
        );
        setStates(
          sorted.map((state: any) => ({
            value: state.sigla,
            label: state.nome,
            id: state.id,
          }))
        );
      });
  }, []);

  useEffect(() => {
    const stateObj = states.find((s) => s.value === selectedState);
    if (stateObj) {
      fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateObj.id}/municipios`
      )
        .then((res) => res.json())
        .then((data) => {
          setCities(
            data.map((city: any) => ({
              value: city.nome,
              label: city.nome,
            }))
          );
        });
    } else {
      setCities([]);
    }
  }, [selectedState, states]);

  useEffect(() => {
    if (user) {
      form.reset({
        street: user.street || "",
        number: user.number || "",
        cep: formatCEP(user.cep || ""),
        complement: user.complement || "",
        neighborhood: user.neighborhood || "",
        city: user.city || "",
        state: user.state || "",
      });
    }
  }, [user, form]);

  useEffect(() => {
    const subscription = form.watch((values) => {
      const hasChanged =
        values.street !== (user?.street || "") ||
        values.number !== (user?.number || "") ||
        values.cep !== formatCEP(user?.cep || "") ||
        values.complement !== (user?.complement || "") ||
        values.neighborhood !== (user?.neighborhood || "") ||
        values.city !== (user?.city || "") ||
        values.state !== (user?.state || "");

      setHasChanges(Boolean(hasChanged));
    });

    return () => subscription.unsubscribe();
  }, [form, user]);

  const onSubmit = async (data: AddressFormData) => {
    try {
      const cleanData = {
        street: data.street,
        number: data.number,
        cep: data.cep,
        complement: data.complement,
        neighborhood: data.neighborhood,
        city: data.city,
        state: data.state,
      };

      await updateUser(cleanData);

      toast.success("Informações salvas!", {
        description: "Dados de endereço atualizados com sucesso.",
      });

      setHasChanges(false);
      // biome-ignore lint/correctness/noUnusedVariables: handled by useAuth
    } catch (error: any) {
      // Handled by useAuth hook
    }
  };

  const handleReset = () => {
    form.reset({
      street: user?.street || "",
      number: user?.number || "",
      complement: user?.complement || "",
      neighborhood: user?.neighborhood || "",
      city: user?.city || "",
      state: user?.state || "",
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
            <CardTitle>Informações da endereço</CardTitle>
            <CardDescription>
              Gerencie e atualize os dados básicos de endereço fiscal
              cadastrados e registrados em nossa plataforma
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
                  name="street"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Rua</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isUpdatingUser}
                          placeholder="Informe a rua"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="neighborhood"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bairro</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isUpdatingUser}
                          placeholder="Informe o bairro"
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
                  name="cep"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>CEP</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isUpdatingUser}
                          onChange={(e) => {
                            const numbers = e.target.value
                              .replace(/\D/g, "")
                              .slice(0, 8);
                            const masked = formatCEP(numbers);
                            field.onChange(masked);
                          }}
                          placeholder="00000-000"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Número</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isUpdatingUser}
                          placeholder="Informe o número"
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
                  name="complement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Complemento</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isUpdatingUser}
                          placeholder="Informe o complemento"
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
                  name="state"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Estado</FormLabel>
                      <FormControl>
                        <SelectCombobox
                          className="bg-[#222225] text-[#9F9F98] hover:bg-[#222225]"
                          onChange={field.onChange}
                          options={states}
                          placeholder="Selecione o estado"
                          value={field.value ?? ""}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Cidade</FormLabel>
                      <FormControl>
                        <SelectCombobox
                          className="bg-[#222225] text-[#9F9F98] hover:bg-[#222225]"
                          disabled={!selectedState}
                          onChange={field.onChange}
                          options={cities}
                          placeholder={selectedState && "Selecione a cidade"}
                          value={field.value ?? ""}
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
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
