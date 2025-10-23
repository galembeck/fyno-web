/** biome-ignore-all lint/suspicious/noExplicitAny: required by form validation */
/** biome-ignore-all lint/suspicious/noEmptyBlockStatements: required by @TanStack-Router */
/** biome-ignore-all lint/suspicious/noDuplicateJsxProps: required by @TanStack-Router */
/** biome-ignore-all lint/performance/useTopLevelRegex: required by password validation */

import { createFileRoute, Link } from "@tanstack/react-router";
import { Eye, EyeOff } from "lucide-react";
import { useEffect, useRef } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/auth/use-auth";
import { formatWhatsApp } from "@/lib/_auth/sign-up/format-masks";

export const Route = createFileRoute(
  "/_auth/sign-up/register/~components/register-form-steps/personal-information-form"
)({
  component: () => (
    <PersonalInformationForm
      emailExists={false}
      form={undefined}
      setEmailExists={() => {}}
      setShowConfirmPassword={() => {}}
      setShowPassword={() => {}}
      showConfirmPassword={false}
      showPassword={false}
    />
  ),
});

interface PersonalInformationFormProps {
  form: any;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (show: boolean) => void;
  emailExists: boolean;
  setEmailExists: (exists: boolean) => void;
}

export function PersonalInformationForm({
  form,
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  emailExists,
  setEmailExists,
}: PersonalInformationFormProps) {
  const email = form.watch("email");
  const { checkEmailExists } = useAuth();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!(email && isValidEmail)) {
      setEmailExists(false);
      return;
    }

    timeoutRef.current = setTimeout(async () => {
      try {
        const exists = await checkEmailExists(email);
        setEmailExists(exists);
        // biome-ignore lint/correctness/noUnusedVariables: not required...
      } catch (error) {
        setEmailExists(false);
      }
    }, 500);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [email, checkEmailExists, setEmailExists]);

  const password = form.watch("password");
  const confirmPassword = form.watch("confirmPassword");

  const validations = {
    minLength: password.length >= 8,
    hasLowercase: /[a-z]/.test(password),
    hasUppercase: /[A-Z]/.test(password),
    hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    hasNumber: /[0-9]/.test(password),
    passwordsMatch: password === confirmPassword && confirmPassword.length > 0,
  };

  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="border-none bg-input-gray"
                  placeholder="Seu nome"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sobrenome *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="border-none bg-input-gray"
                  placeholder="Seu sobrenome"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Email *</FormLabel>
            <FormControl>
              <Input
                {...field}
                className="border-none bg-input-gray"
                placeholder="seu@email.com"
                type="email"
              />
            </FormControl>
            <FormMessage />
            {Boolean(emailExists) && (
              <div className="mt-2 text-muted-foreground text-sm">
                E-mail já registrado.{" "}
                <Link
                  className="text-primary-green underline hover:text-primary-green/80"
                  to="/sign-in"
                >
                  Fazer login
                </Link>
              </div>
            )}
          </FormItem>
        )}
      />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="border-none bg-input-gray"
                  onChange={(e) => {
                    const formatted = formatWhatsApp(e.target.value);
                    field.onChange(formatted);
                  }}
                  placeholder="(00) 00000-0000"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="supportPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefone de suporte *</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="border-none bg-input-gray"
                  onChange={(e) => {
                    const formatted = formatWhatsApp(e.target.value);
                    field.onChange(formatted);
                  }}
                  placeholder="(00) 00000-0000"
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha *</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    className="border-none bg-input-gray"
                    placeholder="Crie uma senha forte"
                    type={showPassword ? "text" : "password"}
                  />
                  <button
                    className="-translate-y-1/2 absolute top-1/2 right-3 transform cursor-pointer text-gray-400 hover:text-white"
                    onClick={() => setShowPassword(!showPassword)}
                    type="button"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar senha *</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    {...field}
                    className="border-none bg-input-gray"
                    placeholder="Digite sua senha novamente"
                    type={showConfirmPassword ? "text" : "password"}
                  />
                  <button
                    className="-translate-y-1/2 absolute top-1/2 right-3 transform cursor-pointer text-gray-400 hover:text-white"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    type="button"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 gap-2 text-sm md:grid-cols-2 md:gap-x-6 md:gap-y-2">
        <div
          className={`flex items-center gap-2 ${validations.minLength ? "text-green-500" : "text-red-500"}`}
        >
          <span>{validations.minLength ? "✓" : "✗"}</span>
          <span>Mínimo de 8 caracteres</span>
        </div>

        <div
          className={`flex items-center gap-2 ${validations.hasLowercase ? "text-green-500" : "text-red-500"}`}
        >
          <span>{validations.hasLowercase ? "✓" : "✗"}</span>
          <span>Pelo menos 1 letra minúscula</span>
        </div>

        <div
          className={`flex items-center gap-2 ${validations.hasUppercase ? "text-green-500" : "text-red-500"}`}
        >
          <span>{validations.hasUppercase ? "✓" : "✗"}</span>
          <span>Pelo menos 1 letra maiúscula</span>
        </div>

        <div
          className={`flex items-center gap-2 ${validations.hasNumber ? "text-green-500" : "text-red-500"}`}
        >
          <span>{validations.hasNumber ? "✓" : "✗"}</span>
          <span>Pelo menos 1 número</span>
        </div>

        <div
          className={`flex items-center gap-2 ${validations.hasSpecialChar ? "text-green-500" : "text-red-500"}`}
        >
          <span>{validations.hasSpecialChar ? "✓" : "✗"}</span>
          <span>Pelo menos 1 caractere especial</span>
        </div>

        <div
          className={`flex items-center gap-2 ${validations.passwordsMatch ? "text-green-500" : "text-red-500"}`}
        >
          <span>{validations.passwordsMatch ? "✓" : "✗"}</span>
          <span>Senhas coincidem</span>
        </div>
      </div>

      <div className="text-center text-gray-400 text-sm">
        Ao continuar, você concorda com os{" "}
        <Link
          className="text-primary-green hover:underline"
          rel="noopener noreferrer"
          target="_blank"
          to="/terms-of-use"
        >
          Termos de serviço
        </Link>
      </div>
    </>
  );
}
