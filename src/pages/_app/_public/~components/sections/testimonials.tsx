import { createFileRoute } from "@tanstack/react-router";
import { Marquee } from "@/components/ui/marquee";
import { cn } from "@/lib/utils";

export const Route = createFileRoute(
  "/_app/_public/~components/sections/testimonials"
)({
  component: Testimonials,
});

const reviews = [
  {
    name: "Moises Knupp",
    username: "@mk.ecom",
    body: "Pô, bizarro o gateway de vocês, viu! Faz um tempo que procurava uma parceria dessa para escalar tranquilo.",
    img: "https://framerusercontent.com/images/Z71eVgck8XZnS46bAdri4jFVXAY.png?scale-down-to=512&width=778&height=669",
  },
  {
    name: "Marcos Bechara",
    username: "@marcosbechara_",
    body: "O primeiro gateway que realmente eu não me preocupo se vai travar meu dinheiro ou não.",
    img: "https://framerusercontent.com/images/uXo9JESEtsgXkkgtKSxwQRiNqw.png?width=346&height=321",
  },
  {
    name: "Guilherme Pereira",
    username: "@oiguipereira",
    body: "Seriedade com os sellers e trabalho limpo, sem taxas escondidas ou qualquer tipo de travamento.",
    img: "https://framerusercontent.com/images/TibZqhCnO7NyL5GmF6RgNjIro0Q.png?width=234&height=270",
  },
  {
    name: "Matheus Lopes",
    username: "matheuslopes01",
    body: "Alguns meses de parceria com a Fyno, zero dor de cabeça. Nunca tive saque travado, suporte 24 horas.",
    img: "https://framerusercontent.com/images/4pFLlw1ynXQJ2rGgsCfAxDT64.png?width=373&height=413",
  },
  {
    name: "Erick de Moura",
    username: "@oalemaododrop",
    body: "Queria ter conhecido a Fyno antes. Evitaria ter perdido tanto dinheiro com outros gateways.",
    img: "https://framerusercontent.com/images/SFhu8HTGrwtV8PIKY2J2h64.png?width=601&height=553",
  },
];
const firstRow = reviews.slice(0, 5);
const secondRow = reviews.slice(0, 5);
const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]", // Light
        "dark:border-gray-50/[.1] dark:bg-primary-dark/[.10] dark:hover:bg-primary-dark/[.15]" // Dark
      )}
    >
      <div className="flex flex-row items-center gap-2">
        {/** biome-ignore lint/performance/noImgElement: required by @Vite */}
        <img alt="" className="rounded-full" height="32" src={img} width="32" />
        <div className="flex flex-col">
          <figcaption className="font-medium text-sm dark:text-white">
            {name}
          </figcaption>
          <p className="font-medium text-xs dark:text-white/40">{username}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};

export function Testimonials() {
  return (
    <div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
      <Marquee className="[--duration:30s]" pauseOnHover>
        {firstRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <Marquee className="[--duration:30s]" pauseOnHover reverse>
        {secondRow.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-secondary-white dark:from-secondary-dark" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-secondary-white dark:from-secondary-dark" />
    </div>
  );
}
