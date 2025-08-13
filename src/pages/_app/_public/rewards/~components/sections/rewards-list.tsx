import { createFileRoute } from "@tanstack/react-router";
import { RewardCard } from "@/components/reward-card";
import { rewards } from "@/constants/rewards";

export const Route = createFileRoute(
	"/_app/_public/rewards/~components/sections/rewards-list"
)({
	component: RewardsList,
});

export function RewardsList() {
	return (
		<section className="flex flex-col lg:gap-32 lg:py-16">
			{rewards.map(
				({ badge, title, description, reward, imgUrl, order, id }) => (
					<RewardCard
						badge={badge}
						description={description}
						imgUrl={imgUrl}
						key={id}
						order={
							order === "normal" || order === "reverse" ? order : undefined
						}
						reward={reward}
						title={title}
					/>
				)
			)}
		</section>
	)
}
