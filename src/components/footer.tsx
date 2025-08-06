/** biome-ignore-all lint/a11y/noSvgWithoutTitle: required */
import { Link } from "@tanstack/react-router";
import { Instagram, Linkedin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary-black">
      <div className="mx-auto max-w-screen-xl px-4 pt-10 sm:px-6 lg:px-8 lg:pt-12">
        <div className="grid grid-cols-1 gap-8 pb-10 lg:grid-cols-3">
          <div>
            <Link
              className="flex items-center justify-center gap-2 sm:justify-start"
              to="/"
            >
              {/** biome-ignore lint/performance/noImgElement: required by @Vite */}
              <img alt="Fyno" className="size-7" src="/assets/icons/logo.svg" />
              <h1 className="font-semibold text-2xl text-white md:text-2xl">
                Fyno
              </h1>
            </Link>

            <p className="mt-6 text-center text-secondary-gray leading-relaxed sm:max-w-xs sm:text-left">
              Impulsione seu negócio com o Fyno: uma plataforma completa para
              gestão e recebimento de pagamentos online. Tenha controle total
              das suas transações, segurança avançada, integração facilitada e
              suporte dedicado para crescer com tranquilidade e eficiência.
            </p>

            <ul className="mt-8 flex justify-center gap-6 sm:justify-start md:gap-8">
              <li>
                <Link rel="noreferrer" target="_blank" to="/">
                  <span className="sr-only">Instagram</span>
                  <Instagram />
                </Link>
              </li>

              <li>
                <Link rel="noreferrer" target="_blank" to="/">
                  <span className="sr-only">LinkedIn</span>
                  <Linkedin />
                </Link>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:col-span-2">
            <div className="text-center sm:text-left">
              <p className="font-medium text-lg">Sobre</p>

              <ul className="mt-8 space-y-4 text-sm">
                <li>
                  <Link
                    className="text-secondary-gray transition hover:text-secondary-gray/75"
                    to="/"
                  >
                    Taxas
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-secondary-gray transition hover:text-secondary-gray/75"
                    to="/"
                  >
                    Contato
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-secondary-gray transition hover:text-secondary-gray/75"
                    to="/"
                  >
                    Ajuda com compras
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-secondary-gray transition hover:text-secondary-gray/75"
                    to="/"
                  >
                    Carreiras
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="font-medium text-lg">Soluções</p>

              <ul className="mt-8 space-y-4 text-sm">
                <li>
                  <Link
                    className="text-secondary-gray transition hover:text-secondary-gray/75"
                    to="/"
                  >
                    Dropshipping
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-secondary-gray transition hover:text-secondary-gray/75"
                    to="/"
                  >
                    Infoprodutos
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-secondary-gray transition hover:text-secondary-gray/75"
                    to="/"
                  >
                    E-commerce
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-secondary-gray transition hover:text-secondary-gray/75"
                    to="/"
                  >
                    SaaS
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-secondary-gray transition hover:text-secondary-gray/75"
                    to="/"
                  >
                    Nutracênicos
                  </Link>
                </li>
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="font-medium text-lg">Compliance</p>

              <ul className="mt-8 space-y-4 text-sm">
                <li>
                  <Link
                    className="text-secondary-gray transition hover:text-secondary-gray/75"
                    to="/"
                  >
                    Termos de Uso
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-secondary-gray transition hover:text-secondary-gray/75"
                    to="/"
                  >
                    Políticas de Privacidade
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-secondary-gray transition hover:text-secondary-gray/75"
                    to="/"
                  >
                    Produtos Proibidos
                  </Link>
                </li>

                <li>
                  <Link
                    className="text-secondary-gray transition hover:text-secondary-gray/75"
                    to="/"
                  >
                    Denúncias
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="border-gray-100 border-t py-6">
          <p className="truncate text-center text-base sm:order-first sm:mt-0">
            &copy; {new Date().getFullYear()} All rights reserved. Fyno LTDA |
            CNPJ XX.XXX.XXX/XXXX-XX
          </p>
        </div>
      </div>
    </footer>
  );
}
