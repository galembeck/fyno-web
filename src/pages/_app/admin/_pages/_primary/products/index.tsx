import { useProducts } from "@/hooks/endpoints/v1/use-product";
import { createFileRoute } from "@tanstack/react-router";
import { Box, DollarSign } from "lucide-react";
import { AnalyticsCard } from "../~components/analytics-card";
import { ProductsTable } from "./~components/products-table";

export const Route = createFileRoute("/_app/admin/_pages/_primary/products/")({
  component: ProductsPage,
});

function ProductsPage() {
  const { products } = useProducts();

  return (
    <main className="container space-y-8 p-4">
      <div className="flex items-center gap-4">
        <h1 className="font-semibold text-3xl">Produtos</h1>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <AnalyticsCard
          hint="Este valor não considera a taxa de R$0,80"
          icon={DollarSign}
          label="Total bruto recebido em vendas"
          tooltip={true}
          type="currency"
          value="0,00"
        />

        <AnalyticsCard
          icon={Box}
          label="Produtos cadastrados em sua plataforma"
          type="number"
          value={products?.length.toString() || "0"}
        />
      </div>

      <ProductsTable />
    </main>
  );
}
