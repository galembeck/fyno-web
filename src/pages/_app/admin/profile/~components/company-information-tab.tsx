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
import { useAuth } from "@/hooks/_auth/use-auth";
import { formatCNPJ } from "@/lib/_auth/sign-up/format-masks";

export const Route = createFileRoute(
  "/_app/admin/profile/~components/company-information-tab"
)({
  component: CompanyInformationTab,
});

export function CompanyInformationTab() {
  const { user } = useAuth();

  const navigate = useNavigate();

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Informaçõs da empresa</CardTitle>
        <CardDescription>
          Visualize os dados de sua empresa cadastrados, como nome, CNPJ,
          endereço e faturamento mensal
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
                htmlFor="companyName"
              >
                Nome da empresa
              </Label>
              <Input
                disabled
                id="companyName"
                value={user?.companyName ?? ""}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:flex-row">
            <div>
              <Label className="mb-2 block font-medium text-sm" htmlFor="cnpj">
                CNPJ
              </Label>
              <Input disabled id="cnpj" value={formatCNPJ(user?.cnpj ?? "")} />
            </div>
            <div>
              <Label
                className="mb-2 block font-medium text-sm"
                htmlFor="storeDomain"
              >
                Domínio da loja
              </Label>
              <Input
                disabled
                id="storeDomain"
                value={user?.storeDomain ?? ""}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:flex-row">
            <div>
              <Label
                className="mb-2 block font-medium text-sm"
                htmlFor="monthlyRevenue"
              >
                Faturamento mensal
              </Label>
              <Input
                disabled
                id="monthlyRevenue"
                value={user?.monthlyRevenue ?? ""}
              />
            </div>
            <div>
              <Label
                className="mb-2 block font-medium text-sm"
                htmlFor="businessSegment"
              >
                Segmento do negócio
              </Label>
              <Input
                disabled
                id="businessSegment"
                value={user?.businessSegment ?? ""}
              />
              {user?.businessDescription !== "" && (
                <Label
                  className="mt-2 block text-muted-foreground text-sm"
                  htmlFor="role"
                >
                  <span className="font-bold">Descrição do negócio: </span>
                  {user?.businessDescription}
                </Label>
              )}
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
