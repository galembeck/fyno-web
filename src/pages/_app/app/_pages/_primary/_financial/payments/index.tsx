import { createFileRoute } from "@tanstack/react-router";
import { PaymentsTable } from "./~components/payments-table";

export const Route = createFileRoute("/_app/app/_pages/_primary/_financial/payments/")(
  {
    component: PaymentsPage,
    head: () => ({
      meta: [
        {
          title: "Pagamentos | fyno.business",
        },
      ],
    }),
  }
);

export function PaymentsPage() {
  return (
    <main className="p-6">
      <PaymentsTable type="complete" />
    </main>
  );
}
