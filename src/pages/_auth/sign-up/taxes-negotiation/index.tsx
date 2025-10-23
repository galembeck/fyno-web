import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { LogIn, MessageCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_auth/sign-up/taxes-negotiation/")({
  component: TaxesNegotiation,
  beforeLoad: () => {
    const token = localStorage.getItem("fyno_jwt");

    if (token) {
      throw redirect({
        to: "/admin/dashboard",
      });
    }
  },
});

function TaxesNegotiation() {
  const navigate = useNavigate();

  const handleNegotiateTaxes = () => {
    window.open("https://api.whatsapp.com/send/?phone=5519995733011", "_blank");
  };

  return (
    <article className="flex flex-col items-center gap-8">
      <h1 className="font-bold text-5xl text-primary-green leading-tight md:text-5xl">
        Falta pouco para ser Fyno!
      </h1>

      <p className="text-base text-secondary-gray">
        Dê o próximo passo para transformar seus pagamentos. Negocie taxas
        exclusivas com nosso time e comece agora!
      </p>

      <div className="flex flex-col justify-center gap-4 md:flex-row">
        <Button
          className="cursor-pointer items-center rounded-full bg-primary-green px-8 py-6 text-black text-lg hover:bg-primary-green/80"
          onClick={() => navigate({ to: "/sign-up/register" })}
          variant="secondary"
        >
          Criar minha conta
          <LogIn className="size-5" />
        </Button>

        <Button
          className="cursor-pointer items-center rounded-full border-2 bg-white px-8 py-6 text-black text-lg hover:bg-white/90"
          onClick={handleNegotiateTaxes}
        >
          <MessageCircleIcon className="size-5" />
          Negociar minhas taxas
        </Button>
      </div>
    </article>
  );
}
