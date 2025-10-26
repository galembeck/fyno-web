// src/pages/confirm-email-change.tsx

import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CheckCircle, Loader2, Mail, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const Route = createFileRoute("/_auth/confirm-email-change/")({
  component: ConfirmEmailChangePage,
  validateSearch: (search: Record<string, unknown>) => ({
    token: search.token as string,
  }),
});

function ConfirmEmailChangePage() {
  // const { token } = useSearch({ from: "/_auth/confirm-email-change/" });
  const navigate = useNavigate();
  // const { confirmEmailChange } = useAuth();

  // const [status, setStatus] = useState<"loading" | "success" | "error">(
  //   "loading"
  // );
  // const [message, setMessage] = useState("");
  // const [newEmail, setNewEmail] = useState("");

  // useEffect(() => {
  //   const confirm = async () => {
  //     if (!token) {
  //       setStatus("error");
  //       setMessage("Token de confirmação não encontrado na URL");
  //       return;
  //     }

  //     try {
  //       const result = await confirmEmailChange(token);

  //       if (result.success) {
  //         setStatus("success");
  //         setNewEmail(result.newEmail || "");
  //         setMessage("Email alterado com sucesso!");

  //         setTimeout(() => {
  //           navigate({ to: "/app/settings" });
  //         }, 3000);
  //       }
  //       // biome-ignore lint/suspicious/noExplicitAny: not important...
  //     } catch (error: any) {
  //       setStatus("error");
  //       setMessage(error.message || "Erro ao confirmar alteração de email");
  //     }
  //   };

  //   confirm();
  // }, [token, confirmEmailChange, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Mail className="h-6 w-6" />
            Confirmação de Email
          </CardTitle>
          <CardDescription>
            Processando sua solicitação de alteração de email...
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6 text-center">
          {status === "loading" && (
            <>
              <div className="flex justify-center">
                <Loader2 className="h-12 w-12 animate-spin text-blue-500" />
              </div>
              <div>
                <h3 className="mb-2 font-medium text-gray-900">
                  Confirmando alteração...
                </h3>
                <p className="text-gray-600 text-sm">
                  Por favor, aguarde enquanto processamos sua solicitação.
                </p>
              </div>
            </>
          )}

          {status === "success" && (
            <>
              <div className="flex justify-center">
                <div className="rounded-full bg-green-100 p-3">
                  <CheckCircle className="h-12 w-12 text-green-600" />
                </div>
              </div>
              <div>
                {/* <h3 className="mb-2 font-medium text-green-800">{message}</h3> */}
                {/* {newEmail && (
                  <p className="mb-4 text-green-700 text-sm">
                    Seu email foi alterado para: <strong>{newEmail}</strong>
                  </p>
                )} */}
                <p className="text-gray-600 text-sm">
                  Você será redirecionado para as configurações em instantes...
                </p>
              </div>
              <Button
                className="w-full"
                onClick={() => navigate({ to: "/app/settings" })}
              >
                Ir para Configurações
              </Button>
            </>
          )}

          {status === "error" && (
            <>
              <div className="flex justify-center">
                <div className="rounded-full bg-red-100 p-3">
                  <XCircle className="h-12 w-12 text-red-600" />
                </div>
              </div>
              <div>
                <h3 className="mb-2 font-medium text-red-800">
                  Erro na confirmação
                </h3>
                {/* <p className="mb-4 text-red-700 text-sm">{message}</p> */}
                <div className="space-y-2">
                  <p className="text-gray-600 text-xs">Possíveis causas:</p>
                  <ul className="list-inside list-disc space-y-1 text-left text-gray-600 text-xs">
                    <li>Token inválido ou expirado</li>
                    <li>Link já utilizado anteriormente</li>
                    <li>Solicitação cancelada</li>
                  </ul>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Button
                  className="w-full"
                  onClick={() => navigate({ to: "/app/settings" })}
                >
                  Voltar às Configurações
                </Button>
                <Button
                  className="w-full"
                  onClick={() => window.location.reload()}
                  variant="outline"
                >
                  Tentar Novamente
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
