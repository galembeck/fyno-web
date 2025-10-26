import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, HandCoins, Plane, TrendingUp, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { InformationCard } from "./~components/information-card";

export const Route = createFileRoute("/_app/app/_pages/_primary/partnership/")({
  component: PartnershipPage,
  head: () => ({
    meta: [
      {
        title: "Programa de Parceria | fyno.business",
      },
    ],
  }),
});

function PartnershipPage() {
  return (
    <main className="flex flex-col items-center justify-center gap-12 px-10 py-10 md:gap-16">
      <div className="rounded-full bg-secondary-green-light p-6">
        <HandCoins className="h-12 w-12" stroke="#65A30D" />
      </div>

      <article className="flex max-w-2xl flex-col gap-6 text-center">
        <h1 className="font-bold text-3xl">Programa de Parceria</h1>

        <p className="text-base">
          Ganhe dinheiro indicando a Fyno para outras pessoas Ganhe comissão
          recorrente por cada cliente que se tornar pagante através de seu link.
        </p>
      </article>

      <div className="grid w-full max-w-5xl grid-cols-1 gap-6 lg:grid-cols-3">
        <InformationCard
          color="bg-sky-200"
          description="Compartilhe seu link de parceiro e ajude outras pessoas a descobrir a Fyno"
          icon={Users}
          iconStroke="#2563EB"
          title="Indique amigos"
        />

        <InformationCard
          color="bg-secondary-green-light"
          description="Receba um percentual recorrente sobre o faturamento dos clientes que você indicar"
          icon={TrendingUp}
          iconStroke="#1BA54E"
          title="Ganhe comissão"
        />

        <InformationCard
          color="bg-violet-100"
          description="Acompanhe seus ganhos em tempo real e receba os pagamentos automaticamente"
          icon={HandCoins}
          iconStroke="#9333EA"
          title="Receba pagamentos"
        />
      </div>

      <Card className="w-full max-w-4xl">
        <CardHeader>
          <CardTitle className="text-center font-bold text-lg">
            Como funciona?
          </CardTitle>
        </CardHeader>

        <CardContent>
          <ol className="grid gap-8 text-base md:grid-cols-3 md:gap-12">
            <li className="flex flex-row items-center justify-center text-center md:flex-col">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-lime-500 font-bold text-white">
                1
              </div>
              <article className="mt-3 max-w-xs">
                <strong className="block">Cadastre-se no programa</strong>
                <p className="mt-2 text-muted-foreground text-sm">
                  Entre em contato conosco para participar do programa de
                  parceria Fyno
                </p>
              </article>
            </li>

            <li className="flex flex-row items-center justify-center text-center md:flex-col">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-lime-500 font-bold text-white">
                2
              </div>
              <article className="mt-3 max-w-xs">
                <strong className="block">Compartilhe seu link</strong>
                <p className="mt-2 text-muted-foreground text-sm">
                  Use seu link personalizado para indicar a Fyno
                </p>
              </article>
            </li>

            <li className="flex flex-row items-center justify-center text-center md:flex-col">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-lime-500 font-bold text-white">
                3
              </div>
              <article className="mt-3 max-w-xs">
                <strong className="block">Ganhe comissão</strong>
                <p className="mt-2 text-muted-foreground text-sm">
                  Receba pagamentos recorrentes pelos clientes ativos
                </p>
              </article>
            </li>
          </ol>
        </CardContent>
      </Card>

      <Button
        className="group relative flex cursor-pointer items-center overflow-hidden bg-primary-green transition-all hover:bg-primary-green/80!"
        // onClick={() => navigate({ to: "/sign-up" })}
      >
        <span>Participar do programa</span>
        <span className="transition-all duration-300 group-hover:translate-x-4 group-hover:opacity-0">
          <ArrowRight className="size-3.5" />
        </span>
        <span className="absolute right-3 translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
          <Plane />
        </span>
      </Button>
    </main>
  );
}
