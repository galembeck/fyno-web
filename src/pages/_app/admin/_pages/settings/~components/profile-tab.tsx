/** biome-ignore-all lint/suspicious/noExplicitAny: not important... */

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
import { useAuth } from "@/hooks/auth/use-auth";
import { formatWhatsApp, removeFormat } from "@/lib/_auth/sign-up/format-masks";

export const Route = createFileRoute(
  "/_app/admin/_pages/settings/~components/profile-tab"
)({
  component: ProfileTab,
});

const profileSchema = z.object({
  name: z.string().min(2, "Nome deve ter no mínimo 2 caracteres").optional(),
  lastname: z
    .string()
    .min(2, "Sobrenome deve ter no mínimo 2 caracteres")
    .optional(),
  // newEmail: z.string().email("E-mail inválido").optional().or(z.literal("")),
  // confirmEmail: z
  // 	.string()
  // 	.email("E-mail inválido")
  // 	.optional()
  // 	.or(z.literal("")),
  phone: z.string().min(11, "Telefone deve ter 11 dígitos").optional(),
  supportPhone: z
    .string()
    .min(11, "Telefone de suporte deve ter 11 dígitos")
    .optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export function ProfileTab() {
  const { user, updateUser, isUpdatingUser } = useAuth();

  const [hasChanges, setHasChanges] = useState(false);

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      lastname: user?.lastname || "",
      phone: user?.phone || "",
      supportPhone: user?.supportPhone || "",
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || "",
        lastname: user.lastname || "",
        phone: user.phone || "",
        supportPhone: user.supportPhone || "",
      });
    }
  }, [user, form]);

  useEffect(() => {
    const subscription = form.watch((values) => {
      const hasChanged =
        values.name !== (user?.name || "") ||
        values.lastname !== (user?.lastname || "") ||
        values.phone !== (user?.phone || "") ||
        values.supportPhone !== (user?.supportPhone || "");

      setHasChanges(Boolean(hasChanged));
    });

    return () => subscription.unsubscribe();
  }, [form, user]);

  const onSubmit = async (data: ProfileFormData) => {
    try {
      const changedData = Object.entries(data).reduce(
        (acc, [key, value]) => {
          if (!value) {
            return acc;
          }

          const userValue = user?.[key as keyof typeof user];
          const currentValue = key.includes("Phone")
            ? removeFormat(value as string)
            : (value as string).trim();

          if (currentValue && currentValue !== userValue) {
            acc[key] = currentValue;
          }

          return acc;
        },
        {} as Record<string, string>
      );

      if (Object.keys(changedData).length === 0) {
        return;
      }

      await updateUser(changedData);

      toast.success("Informações salvas!", {
        description: "Dados pessoais atualizados com sucesso.",
      });

      setHasChanges(false);
      // biome-ignore lint/correctness/noUnusedVariables: handled by useAuth
    } catch (error: any) {
      // Handled by useAuth
    }
  };

  const handleReset = () => {
    form.reset({
      name: user?.name || "",
      lastname: user?.lastname || "",
      phone: user?.phone || "",
      supportPhone: user?.supportPhone || "",
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
            <CardTitle>Informações pessoais</CardTitle>
            <CardDescription>
              Gerencie e altere os dados básicos/pessoais do titular da conta na
              plataforma
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
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nome</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isUpdatingUser}
                          placeholder="Seu nome"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="lastname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sobrenome</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isUpdatingUser}
                          placeholder="Seu sobrenome"
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
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isUpdatingUser}
                          onChange={(e) => {
                            const formatted = formatWhatsApp(e.target.value);
                            field.onChange(formatted);
                          }}
                          placeholder="(00) 00000-0000"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="supportPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Telefone (suporte)</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isUpdatingUser}
                          onChange={(e) => {
                            const formatted = formatWhatsApp(e.target.value);
                            field.onChange(formatted);
                          }}
                          placeholder="(00) 00000-0000"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  );
}
