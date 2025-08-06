import { createFileRoute } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute(
	"/_landing/rewards/~components/sections/intro"
)({
	component: Intro,
});

export function Intro() {
	return (
		<div className="flex flex-col items-center gap-8 py-10 lg:flex-row lg:gap-16 lg:px-10 lg:py-20">
			<article className="flex flex-1 flex-col gap-8 text-center lg:text-left">
				<h1 className="font-semibold text-5xl leading-tight lg:text-6xl">
					Fyno Rewards: Recompensas que acompanham seu sucesso!
				</h1>

				<p className="text-base text-secondary-gray lg:text-lg">
					A cada desafio superado, novas conquistas esperam por você. Ganhe,
					evolua e troque seus pontos por experiências incríveis.
				</p>

				<div className="flex justify-center lg:justify-start">
					<Button className="flex items-center gap-2 rounded-full bg-primary-green py-4 font-semibold text-black hover:bg-primary-green/90">
						Comece agora
						<ChevronRight size={20} />
					</Button>
				</div>
			</article>

			<div className="flex-1 lg:max-w-lg">
				<video
					autoPlay
					className="w-full rounded-3xl object-cover shadow-lg lg:h-96"
					loop
					muted
					playsInline
					poster="https://framerusercontent.com/images/HIGtR8zVukeH34vlwaIVoBrXk.png"
					src="https://framerusercontent.com/assets/AboBU6e4vljWCnAMBax6k0DvYuk.mp4"
				/>
			</div>
		</div>
	);
}
