import { createFileRoute } from "@tanstack/react-router";
import { BenefitCard } from "@/components/benefit-card";
import { benefits } from "@/constants/benefits";

export const Route = createFileRoute("/_app/_public/~components/sections/benefits")(
	{
		component: Benefits,
	}
);

export function Benefits() {
	return (
		<section className="flex flex-col lg:gap-32 lg:py-16">
			{benefits.map(
				({ badge, title, description, callToAction, imgUrl, order, id }) => (
					<BenefitCard
						badge={badge}
						callToAction={{
							...callToAction,
							icon: callToAction.icon ? <callToAction.icon /> : null,
							hoverIcon: callToAction.hoverIcon ? (
								<callToAction.hoverIcon />
							) : null,
						}}
						description={description}
						imgUrl={imgUrl}
						key={id}
						order={
							order === "normal" || order === "reverse" ? order : undefined
						}
						title={title}
					/>
				)
			)}
		</section>
	)
}
