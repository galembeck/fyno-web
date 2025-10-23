import { createFileRoute, useNavigate } from "@tanstack/react-router";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/auth/use-auth";
import { formatWhatsApp } from "@/lib/_auth/sign-up/format-masks";

export const Route = createFileRoute(
  "/_app/admin/_pages/profile/~components/personal-information-tab"
)({
  component: PersonalInformationTab,
});

export function PersonalInformationTab() {
  const { user } = useAuth();

  const navigate = useNavigate();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Informações pessoais</CardTitle>
        <CardDescription>
          Visualize seus dados pessoais cadastrados, como nome, e-mail, telefone
          e documento
        </CardDescription>

        <CardAction>
          <Button onClick={() => navigate({ to: "/admin/settings" })}>
            Editar
          </Button>
        </CardAction>
      </CardHeader>

      <CardContent>
        <article className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:flex-row">
            <div>
              <Label className="mb-2 block font-medium text-sm" htmlFor="name">
                Nome
              </Label>
              <Input disabled id="name" value={user?.name} />
            </div>
            <div>
              <Label
                className="mb-2 block font-medium text-sm"
                htmlFor="lastname"
              >
                Sobrenome
              </Label>
              <Input disabled id="lastname" value={user?.lastname} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:flex-row">
            <div>
              <Label className="mb-2 block font-medium text-sm" htmlFor="email">
                E-mail
              </Label>
              <Input disabled id="email" value={user?.email} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:flex-row">
            <div>
              <Label className="mb-2 block font-medium text-sm" htmlFor="phone">
                Telefone
              </Label>
              <Input
                disabled
                id="phone"
                value={formatWhatsApp(user?.phone ?? "")}
              />
            </div>
            <div>
              <Label
                className="mb-2 block font-medium text-sm"
                htmlFor="supportPhone"
              >
                Telefone (suporte)
              </Label>
              <Input
                disabled
                id="supportPhone"
                value={formatWhatsApp(user?.supportPhone ?? "")}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:flex-row">
            <div>
              <Label className="mb-2 block font-medium text-sm" htmlFor="role">
                Cargo/permissão
              </Label>
              <Input
                disabled
                id="role"
                value={
                  user?.role === "AUTHENTICATED"
                    ? "Autenticado"
                    : "Não autenticado"
                }
              />
              <Label className="mt-2 text-muted-foreground text-sm">
                {user?.role === "authenticated"
                  ? "Usuário registrado e autenticado em nossa plataforma"
                  : "Usuário não registrado em nossa plataforma"}
              </Label>
            </div>
            {/* <div>
              <Label
                className="mb-2 block font-medium text-sm"
                htmlFor="blocked"
              >
                Bloqueado
              </Label>
              <Input
                disabled
                id="blocked"
                value={user?.blocked ? "Sim" : "Não"}
              />
            </div> */}
          </div>
        </article>
      </CardContent>

      <CardFooter>
        <p className="text-muted-foreground text-sm">
          Observação: caso deseje atualizar algum dado, clique no botão "Editar"
          para ser redirecionado à página de configurações e alterar suas
          informações.
        </p>
      </CardFooter>
    </Card>
  );
}
