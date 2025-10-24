import { createFileRoute, redirect } from "@tanstack/react-router";
import { SignUpForm } from "./~components/sign-up-form";

export const Route = createFileRoute("/_auth/sign-up/")({
  component: SignUp,
  beforeLoad: () => {
    const token = localStorage.getItem("fyno_jwt");

    if (token) {
      throw redirect({
        to: "/app/dashboard",
      });
    }
  },
});

function SignUp() {
  return (
    <>
      <article className="flex flex-col items-center gap-8">
        <h1 className="font-semibold text-5xl leading-tight md:text-6xl">
          Não aceite menos do que estabilidade de verdade
        </h1>

        <p className="text-base text-secondary-gray">
          Estrutura própria, zero instabilidade e acesso ao seu dinheiro quando
          você quiser.
        </p>
      </article>

      <SignUpForm />
    </>
  );
}
