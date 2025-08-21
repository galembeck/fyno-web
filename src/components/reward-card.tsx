import { Badge } from "@/components/ui/badge";
import { Separator } from "./ui/separator";

interface RewardCardProps {
	imgUrl: string;
	order?: "normal" | "reverse";
	badge: string;
	title: string;
	description: string;
	reward: string;
}

export function RewardCard({
	imgUrl,
	order = "normal",
	badge,
	title,
	description,
	reward,
}: RewardCardProps) {
	return (
		<section className="flex flex-col items-center justify-center py-10 text-center lg:text-left">
			<article className="flex flex-col items-center gap-6 md:max-w-lg lg:max-w-full lg:flex-row lg:items-center lg:gap-32">
				{/** biome-ignore lint/performance/noImgElement: required by @Vite */}
				<img
					alt="Rewards"
					className={`order-2 mt-6 rounded-xl lg:mt-0 lg:max-w-md lg:flex-1 ${
						order === "normal" ? "lg:order-1" : "lg:order-2"
					}`}
					src={imgUrl}
				/>

				<div
					className={`order-1 flex flex-col items-center gap-6 lg:max-w-md lg:flex-1 lg:items-start ${
						order === "normal" ? "lg:order-2" : "lg:order-1"
					}`}
				>
					<Badge className="bg-primary-green-dark font-bold text-primary-green text-sm uppercase">
						{badge}
					</Badge>

					<h1 className="font-semibold text-5xl lg:text-6xl">{title}</h1>

					<p className="text-base text-muted-foreground dark:text-secondary-gray">
						{description}
					</p>

					<Separator orientation="horizontal" />

					<article>
						<p className="text-secondary-gray">Prêmios que receberá:</p>

						<span>{reward}</span>
					</article>
				</div>
			</article>
		</section>
	);
}
