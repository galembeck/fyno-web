import { createFileRoute } from "@tanstack/react-router";
import { CreditCard } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/_landing/~components/sections/taxes")({
	component: Taxes,
});

export function Taxes() {
	return (
		<section className="flex flex-col items-center py-10 lg:py-20" id="taxes">
			<article className="flex flex-col items-center gap-6 pb-12">
				<Badge className="bg-third-green-dark font-semibold text-primary-green uppercase">
					Taxas e prazos
				</Badge>

				<h1 className="text-center font-bold text-4xl md:text-6xl">
					Mais lucro, menos taxas.
					<br />O jeito <span className="text-primary-green">Fyno</span> de
					vender!
				</h1>
			</article>

			<div className="flex w-full flex-col gap-5 md:flex-row md:gap-6">
				<div className="flex flex-1 flex-row items-center justify-between rounded-lg border border-secondary-gray/20 bg-primary-black p-7">
					<div className="flex items-center gap-3">
						<div className="rounded-lg bg-secondary-gray/20 p-2">
							<CreditCard />
						</div>
						<h3 className="font-bold text-lg">
							Cartão de crédito <br />
							D+2
						</h3>
					</div>
					<p className="font-bold text-lg">5,99%</p>
				</div>

				<div className="flex flex-1 flex-row items-center justify-between rounded-lg border border-secondary-gray/20 bg-primary-black p-7">
					<div className="flex items-center gap-3">
						<div className="rounded-lg bg-secondary-gray/20 p-2">
							<CreditCard />
						</div>
						<h3 className="font-bold text-lg">
							PIX <br />
							D+0
						</h3>
					</div>
					<p className="font-bold text-lg">3,99%</p>
				</div>
			</div>

			<p className="mt-8">
				Taxas flexíveis, adaptadas às necessidades de seu negócio.
			</p>
		</section>
	);
}
