/** biome-ignore-all lint/suspicious/noExplicitAny: required by webhook operations */

import type { Product } from "@/api/http/routes/types/v1/product";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useProducts } from "@/hooks/endpoints/v1/use-product";
import { formatCurrencyFromNumber } from "@/utils/_admin/format-currency-from-number";
import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute } from "@tanstack/react-router";
import { Check, Info, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export const Route = createFileRoute(
  "/_app/admin/_pages/_primary/products/~components/update-product"
)({
  component: () => (
    <UpdateProduct
      open={true}
      onOpenChange={() => {}}
      product={{ id: "", name: "", description: "", price: 0, createdAt: "" }}
    />
  ),
});

const updateFormSchema = z.object({
  id: z.string().nonempty({
    message: "O ID do produto é obrigatório",
  }),
  name: z.string().min(2).max(100).nonempty({
    message: "O nome do produto é obrigatório",
  }),
  description: z.string().min(2).max(1000).nonempty({
    message: "A descrição do produto deve ser válida",
  }),
  price: z.number().min(1, {
    message: "O preço do produto deve ser maior ou igual a R$ 1,00",
  }),
});

interface UpdateProductProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product;
}

export function UpdateProduct({
  open,
  onOpenChange,
  product,
}: UpdateProductProps) {
  const { updateProduct } = useProducts();

  const form = useForm<z.infer<typeof updateFormSchema>>({
    resolver: zodResolver(updateFormSchema),
    defaultValues: {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
    },
  });

  async function onSubmit(values: z.infer<typeof updateFormSchema>) {
    try {
      await updateProduct({
        id: values.id,
        name: values.name,
        description: values.description,
        price: values.price,
      });

      toast.success("Produto atualizado com sucesso!");
      onOpenChange(false);
      form.reset();
    } catch (error: any) {
      toast.error("Erro ao atualizar produto", {
        description: "Tente novamente mais tarde...",
      });
    }
  }

  return (
    <Dialog onOpenChange={onOpenChange} open={open}>
      <DialogContent aria-describedby="Edit product">
        <DialogHeader>
          <DialogTitle>Editar produto</DialogTitle>
        </DialogHeader>

        <Separator orientation="horizontal" />

        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    ID do Produto
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4" stroke="blue" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          O ID do produto é utilizado para identificar o produto
                          na sua plataforma
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled
                      {...field}
                      className="border-none dark:bg-input-gray"
                      placeholder="ID do produto..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome do produto</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-none dark:bg-input-gray"
                      placeholder="Nome do produto..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="border-none dark:bg-input-gray"
                      placeholder="Descrição do produto..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Preço/valor</FormLabel>
                  <FormControl>
                    <Input
                      value={formatCurrencyFromNumber(field.value)}
                      onChange={(e) => {
                        const digits = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 12);
                        const cents = digits === "" ? 0 : parseInt(digits, 10);

                        const numberValue = cents / 100;

                        field.onChange(numberValue);
                      }}
                      className="border-none dark:bg-input-gray"
                      placeholder="R$ 0,00"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="mt-4 flex gap-4">
              <Button
                type="reset"
                onClick={() => onOpenChange(false)}
                variant="outline"
              >
                <div className="flex gap-4">
                  <p>Voltar</p>
                  <X className="h-4 w-4" />
                </div>
              </Button>
              <Button type="submit">
                <div className="flex gap-4">
                  <p>Salvar</p>
                  <Check className="h-4 w-4" />
                </div>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
