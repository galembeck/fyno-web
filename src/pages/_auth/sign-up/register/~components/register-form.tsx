/** biome-ignore-all lint/performance/useTopLevelRegex: regex structure for password analysis */
/** biome-ignore-all lint/style/useBlockStatements: required by form fields validation */

import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Plane } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Progress } from "@/components/ui/progress";
import { Spinner } from "@/components/ui/spinner";
import {
  firstStepFields,
  type RegisterFormField,
  secondStepFields,
  thirdStepFields,
} from "@/constants/_auth/sign-up/register-fields";
import { useAuth } from "@/hooks/endpoints/auth/use-auth";
import { removeFormat } from "@/lib/_auth/sign-up/format-masks";
import { isValidCNPJ } from "@/utils/_auth/sign-up/valid-cnpj";
import { AddressInformationForm } from "./register-form-steps/address-information-form";
import { CompanyInformationForm } from "./register-form-steps/company-information-form";
import { PersonalInformationForm } from "./register-form-steps/personal-information-form";

export const Route = createFileRoute(
  "/_auth/sign-up/register/~components/register-form"
)({
  component: RegisterForm,
});

export const registerFormSchema = z
  .object({
    // First-step (PersonalInformationForm)
    name: z.string().min(2, {
      message: "Nome deve ter no mínimo 2 caracteres",
    }),
    lastname: z.string().min(2, {
      message: "Sobrenome deve ter no mínimo 2 caracteres",
    }),
    email: z.string().email({
      message: "Email deve ter um formato válido",
    }),
    phone: z.string().min(11, {
      message: "Telefone deve ter 11 dígitos",
    }),
    supportPhone: z.string().min(11, {
      message: "Telefone de suporte deve ter 11 dígitos",
    }),
    password: z.string().min(8, {
      message: "Mínimo de 8 caracteres",
    }),
    confirmPassword: z.string(),

    // Second-step (CompanyInformationForm)
    companyName: z.string().min(2, {
      message: "Nome da empresa deve ter no mínimo 2 caracteres",
    }),
    cnpj: z
      .string()
      .min(14, {
        message: "CNPJ deve ter 14 dígitos",
      })
      .refine(
        (value) => {
          const cleanCNPJ = removeFormat(value);
          return cleanCNPJ.length === 14 && isValidCNPJ(value);
        },
        {
          message: "CNPJ inválido",
        }
      ),
    monthlyRevenue: z.string().min(1, {
      message: "Selecione o faturamento mensal",
    }),
    storeDomain: z.string().url({
      message: "Domínio da loja deve ter um formato válido",
    }),
    businessSegment: z.string().min(1, {
      message: "Selecione o segmento de negócio",
    }),
    businessDescription: z.string().optional(),

    // Third-step (AddressInformationForm)
    street: z.string().min(2, {
      message: "Rua deve ter no mínimo 2 caracteres",
    }),
    number: z.string({
      message: "Número é obrigatório",
    }),
    complement: z.string().optional(),
    neighborhood: z.string().min(2, {
      message: "Bairro deve ter no mínimo 2 caracteres",
    }),
    cep: z.string().min(8, {
      message: "CEP deve ter 8 dígitos",
    }),
    city: z.string().min(2, {
      message: "Cidade deve ter no mínimo 2 caracteres",
    }),
    state: z.string().min(2, {
      message: "Estado deve ter no mínimo 2 caracteres",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Senhas não coincidem",
    path: ["confirmPassword"],
  });

export function RegisterForm() {
  const navigate = useNavigate();

  const [formStep, setFormStep] = useState(1);
  const totalFormSteps = 3;

  const { register, isRegistering } = useAuth();

  const [emailExists, setEmailExists] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function handleNextStep() {
    let fieldsToValidate: RegisterFormField[] = [];

    if (formStep === 1) fieldsToValidate = firstStepFields;
    if (formStep === 2) fieldsToValidate = secondStepFields;
    if (formStep === 3) fieldsToValidate = thirdStepFields;

    const valid = await form.trigger(fieldsToValidate);

    if (formStep === 1 && emailExists) {
      toast.error("E-mail já cadastrado em nossa plataforma", {
        description: "Faça login ou informe outro e-mail para prosseguir...",
      });
      return;
    }

    if (!valid) {
      toast.error("Preencha todos os campos obrigatórios corretamente.");
      return;
    }

    setFormStep(formStep + 1);
  }

  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    mode: "onChange",
    defaultValues: {
      // First-step (PersonalInformationForm)
      name: "",
      lastname: "",
      email: "",
      phone: "",
      supportPhone: "",
      password: "",
      confirmPassword: "",

      // Second-step (CompanyInformationForm)
      companyName: "",
      cnpj: "",
      monthlyRevenue: "",
      storeDomain: "",
      businessSegment: "",
      businessDescription: "",

      // Third-step (AddressInformationForm)
      street: "",
      number: "",
      complement: "",
      neighborhood: "",
      cep: "",
      city: "",
      state: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerFormSchema>) {
    try {
      const cleanPhone = removeFormat(values.phone);
      const cleanSupportPhone = removeFormat(values.supportPhone);
      const cleanCNPJ = removeFormat(values.cnpj);

      await register({
        // First-step (PersonalInformationForm)
        email: values.email,
        password: values.password,
        name: values.name,
        lastname: values.lastname,
        phone: cleanPhone,
        supportPhone: cleanSupportPhone,

        // Second-step (CompanyInformationForm)
        companyName: values.companyName,
        cnpj: cleanCNPJ,
        monthlyRevenue: values.monthlyRevenue,
        storeDomain: values.storeDomain,
        businessSegment: values.businessSegment,
        businessDescription: values.businessDescription,

        // Third-step (AddressInformationForm)
        street: values.street,
        number: values.number,
        complement: values.complement,
        neighborhood: values.neighborhood,
        cep: values.cep,
        city: values.city,
        state: values.state,
      });

      toast.success("Cadastro realizado com sucesso!", {
        description: "Bem-vindo! Redirecionando para o dashboard...",
      });

      navigate({ to: "/app/dashboard" });
      // biome-ignore lint/suspicious/noExplicitAny: required for error handling
    } catch (error: any) {
      toast.error("Erro! :/", {
        description:
          error.message ||
          "Não foi possível completar o cadastro. Tente novamente mais tarde!",
      });
    }
  }

  return (
    <div className="p-6">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="mb-4 font-bold text-3xl">Crie sua conta</h1>
          <p className="text-muted-foreground">
            Registre suas informações pessoais para criar sua conta e ter acesso
            às informações consolidadas em nosso dashboard
          </p>

          <Progress
            className="my-6"
            value={(formStep / totalFormSteps) * 100}
          />
        </div>

        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            {formStep === 1 && (
              <>
                <PersonalInformationForm
                  emailExists={emailExists}
                  form={form}
                  setEmailExists={setEmailExists}
                  setShowConfirmPassword={setShowConfirmPassword}
                  setShowPassword={setShowPassword}
                  showConfirmPassword={showConfirmPassword}
                  showPassword={showPassword}
                />

                <Button
                  className="w-full bg-primary-green py-6 font-semibold text-black text-lg hover:bg-primary-green/80"
                  onClick={handleNextStep}
                  type="button"
                >
                  <div className="group flex items-center gap-2 transition-all">
                    <span>Continuar</span>
                    <span className="group-hover:-translate-x-4 ml-1 transition-all duration-300 group-hover:opacity-0">
                      <ArrowRight />
                    </span>
                  </div>
                </Button>
              </>
            )}

            {formStep === 2 && (
              <>
                <CompanyInformationForm form={form} />

                <Button
                  className="w-full bg-primary-green py-6 font-semibold text-black text-lg hover:bg-primary-green/80"
                  onClick={handleNextStep}
                  type="button"
                >
                  <div className="group flex items-center gap-2 transition-all">
                    <span>Continuar</span>
                    <span className="group-hover:-translate-x-4 ml-1 transition-all duration-300 group-hover:opacity-0">
                      <ArrowRight />
                    </span>
                  </div>
                </Button>
              </>
            )}

            {formStep === 3 && (
              <>
                <AddressInformationForm form={form} />

                <Button
                  className="w-full bg-primary-green py-6 font-semibold text-black text-lg hover:bg-primary-green/80"
                  disabled={isRegistering}
                  type="submit"
                >
                  {isRegistering ? (
                    <div className="flex items-center gap-2">
                      <Spinner />
                      <span>Registrando...</span>
                    </div>
                  ) : (
                    <div className="group flex items-center gap-2 transition-all">
                      <span>Registrar</span>
                      <span className="group-hover:-translate-x-4 ml-1 transition-all duration-300 group-hover:opacity-0">
                        <Plane />
                      </span>
                    </div>
                  )}
                </Button>
              </>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
