import { cloneElement, isValidElement, type ReactNode } from "react";

interface ResourceCardProps {
	icon: ReactNode;
	title: string;
	description: string;
}

export function ResourceCard({ icon, title, description }: ResourceCardProps) {
	const iconWithStroke = isValidElement(icon)
		? cloneElement(icon, {
				stroke: "#A4C265",
			} as React.HTMLAttributes<SVGElement>)
		: icon;

	return (
		<div className="flex w-full flex-col gap-5 rounded-2xl bg-secondary-green-dark p-10 shadow-secondary-gray/10 shadow-sm">
			<div className="w-fit rounded-lg bg-primary-green/10 p-2">
				{iconWithStroke}
			</div>

			<article className="flex flex-col gap-5">
				<h3 className="font-medium text-xl">{title}</h3>

				<p className="text-base text-secondary-gray tracking-wide">
					{description}
				</p>
			</article>
		</div>
	);
}
