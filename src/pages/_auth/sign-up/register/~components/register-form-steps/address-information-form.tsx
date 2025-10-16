/** biome-ignore-all lint/suspicious/noExplicitAny: required by form validation */

import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SelectCombobox } from "@/components/select-combobox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { formatCEP, removeFormat } from "@/lib/_auth/sign-up/format-masks";

export const Route = createFileRoute(
  "/_auth/sign-up/register/~components/register-form-steps/address-information-form"
)({
  component: () => <AddressInformationForm form={undefined} />,
});

interface StateOption {
  value: string;
  label: string;
  id: number;
}

interface CityOption {
  value: string;
  label: string;
}

interface AddressInformationFormProps {
  form: any;
}

export function AddressInformationForm({ form }: AddressInformationFormProps) {
  const cep = form.watch("cep");

  const [states, setStates] = useState<StateOption[]>([]);
  const [cities, setCities] = useState<CityOption[]>([]);

  const selectedState = form.watch("state");

  useEffect(() => {
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((res) => res.json())
      .then((data) => {
        const sorted = data.sort((a: any, b: any) =>
          a.nome.localeCompare(b.nome)
        );
        setStates(
          sorted.map((state: any) => ({
            value: state.sigla,
            label: state.nome,
            id: state.id,
          }))
        );
      });
  }, []);

  useEffect(() => {
    const stateObj = states.find((s) => s.value === selectedState);
    if (stateObj) {
      fetch(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${stateObj.id}/municipios`
      )
        .then((res) => res.json())
        .then((data) => {
          setCities(
            data.map((city: any) => ({
              value: city.nome,
              label: city.nome,
            }))
          );
        });
    } else {
      setCities([]);
    }
  }, [selectedState, states]);

  return (
    <>
      <FormField
        control={form.control}
        name="street"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Rua *</FormLabel>
            <FormControl>
              <Input
                {...field}
                className="border-none bg-input-gray"
                placeholder="Informe a rua"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="border-none bg-input-gray"
                  placeholder="Informe o número"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="complement"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Complemento</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="border-none bg-input-gray"
                  placeholder="Complemento (opcional)"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
          name="neighborhood"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bairro *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="border-none bg-input-gray"
                  placeholder="Informe o bairro"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="cep"
          render={({ field }) => (
            <FormItem>
              <FormLabel>CEP *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className={`border-none bg-input-gray ${
                    cep &&
                    removeFormat(cep).length > 0 &&
                    removeFormat(cep).length !== 8
                      ? "border-2 border-red-500 focus:border-red-500"
                      : ""
                  }`}
                  onChange={(e) => {
                    const formatted = formatCEP(e.target.value);
                    field.onChange(formatted);
                  }}
                  placeholder="00000-000"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Estado *</FormLabel>
              <FormControl>
                <SelectCombobox
                  onChange={field.onChange}
                  options={states}
                  placeholder="Selecione o estado"
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cidade *</FormLabel>
              <FormControl>
                <SelectCombobox
                  disabled={!selectedState}
                  onChange={field.onChange}
                  options={cities}
                  placeholder={selectedState && "Selecione a cidade"}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </>
  );
}
