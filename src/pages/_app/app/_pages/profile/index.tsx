import { createFileRoute } from "@tanstack/react-router";
import { Building2, MapPin, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/hooks/endpoints/auth/use-auth";
import { AddressInformationTab } from "./~components/address-information-tab";
import { CompanyInformationTab } from "./~components/company-information-tab";
import { PersonalInformationTab } from "./~components/personal-information-tab";

export const Route = createFileRoute("/_app/app/_pages/profile/")({
  component: ProfilePage,
  head: () => ({
    meta: [
      {
        title: "Perfil | fyno.business",
      },
    ],
  }),
});

function ProfilePage() {
  const { user } = useAuth();

  return (
    <main className="mx-auto w-full max-w-6xl space-y-8 px-4 py-8">
      <div className="flex flex-col items-start justify-between gap-2 md:flex-row md:items-center">
        <article>
          <h1 className="font-semibold text-2xl tracking-tight">
            Perfil do usuário
          </h1>
          <p className="text-muted-foreground text-sm">
            Aqui você pode visualizar todos os dados pessoais que foram
            cadastrados em nossa plataforma
          </p>
        </article>

        <Badge variant="secondary">ID: {user?.id}</Badge>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">
            <User />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="company">
            <Building2 />
            Empresa
          </TabsTrigger>
          <TabsTrigger value="address">
            <MapPin />
            Endereço fiscal
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <PersonalInformationTab />
        </TabsContent>
        <TabsContent value="company">
          <CompanyInformationTab />
        </TabsContent>
        <TabsContent value="address">
          <AddressInformationTab />
        </TabsContent>
      </Tabs>
    </main>
  );
}
