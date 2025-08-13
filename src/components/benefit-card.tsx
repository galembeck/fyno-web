import { useNavigate } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface BenefitCardProps {
	imgUrl: string;
	order?: "normal" | "reverse";
	badge: string;
	title: string;
	description: string;
	callToAction: {
		text: string;
		path: string;
		icon: ReactNode;
		hoverIcon: ReactNode;
	};
}

export function BenefitCard({
	imgUrl,
	order = "normal",
	badge,
	title,
	description,
	callToAction,
}: BenefitCardProps) {
	const { text, path, icon, hoverIcon } = callToAction;

	const navigate = useNavigate();

	return (
		<section
			className="flex flex-col items-center justify-center py-10 text-center lg:text-left"
			id="benefits"
		>
			<article className="flex flex-col items-center gap-6 md:max-w-lg lg:max-w-full lg:flex-row lg:items-center lg:gap-32">
				{/** biome-ignore lint/performance/noImgElement: required by @Vite */}
				<img
					alt="Benefits"
					className={`order-2 mt-6 rounded-xl shadow-[#FFFFF6] shadow-md lg:mt-0 lg:max-w-md lg:flex-1 ${
						order === "normal" ? "lg:order-1" : "lg:order-2"
					}`}
					src={imgUrl}
				/>

				<div
					className={`order-1 flex flex-col items-center gap-6 lg:max-w-md lg:flex-1 lg:items-start ${
						order === "normal" ? "lg:order-2" : "lg:order-1"
					}`}
				>
					<Badge className="bg-primary-green text-black uppercase">
						{badge}
					</Badge>

					<h1 className="font-semibold text-5xl lg:text-6xl">{title}</h1>

					<p className="text-base text-muted-foreground dark:text-secondary-gray">
						{description}
					</p>

					<Button
						className="group relative flex items-center bg-primary-green px-4 py-4 font-semibold text-black transition-all hover:bg-secondary-green"
						onClick={() => navigate({ to: path })}
						variant="secondary"
					>
						<span>{text}</span>
						<span className="group-hover:-translate-x-4 ml-1 transition-all duration-300 group-hover:opacity-0">
							{icon}
						</span>
						<span className="absolute right-4 translate-x-4 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
							{hoverIcon}
						</span>
					</Button>
				</div>
			</article>
		</section>
	);
}
