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

export const Route = createFileRoute(
  "/_app/admin/_pages/profile/~components/address-information-tab"
)({
  component: AddressInformationTab,
});

export function AddressInformationTab() {
  const { user } = useAuth();

  const navigate = useNavigate();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Informaçõs de endereço</CardTitle>
        <CardDescription>
          Visualize os dados do endereço fiscal de sua loja/empresa cadastrados,
          como rua, bairro, cidade e estado
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
              <Label
                className="mb-2 block font-medium text-sm"
                htmlFor="street"
              >
                Rua
              </Label>
              <Input disabled id="street" value={user?.street ?? ""} />
            </div>
            <div>
              <Label
                className="mb-2 block font-medium text-sm"
                htmlFor="neighborhood"
              >
                Bairro
              </Label>
              <Input
                disabled
                id="neighborhood"
                value={user?.neighborhood ?? ""}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:flex-row">
            <div>
              <Label className="mb-2 block font-medium text-sm" htmlFor="cep">
                CEP
              </Label>
              <Input disabled id="cep" value={user?.cep ?? ""} />
            </div>
            <div>
              <Label
                className="mb-2 block font-medium text-sm"
                htmlFor="number"
              >
                Número
              </Label>
              <Input disabled id="number" value={user?.number ?? ""} />
            </div>
            <div>
              <Label
                className="mb-2 block font-medium text-sm"
                htmlFor="complement"
              >
                Complemento
              </Label>
              <Input disabled id="complement" value={user?.complement ?? ""} />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:flex-row">
            <div>
              <Label className="mb-2 block font-medium text-sm" htmlFor="city">
                Cidade
              </Label>
              <Input disabled id="city" value={user?.city ?? ""} />
            </div>
            <div>
              <Label className="mb-2 block font-medium text-sm" htmlFor="state">
                Estado
              </Label>
              <Input disabled id="state" value={user?.state ?? ""} />
            </div>
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
