import { createFileRoute } from "@tanstack/react-router";
import { Marquee } from "@/components/ui/marquee";

export const Route = createFileRoute(
	"/_landing/~components/sections/companies-marquee"
)({
	component: CompaniesMarquee,
});

const reviews = [
	{
		company: "/assets/images/shopify.png",
	},
	{
		company: "https://avatar.vercel.sh/jill",
	},
	{
		company: "https://avatar.vercel.sh/john",
	},
	{
		company: "https://avatar.vercel.sh/jane",
	},
	{
		company: "https://avatar.vercel.sh/jenny",
	},
	{
		company: "https://avatar.vercel.sh/james",
	},
];

const ReviewCard = ({ company }: { company: string }) => {
	return (
		<figure className="relative overflow-hidden rounded-xl border-none bg-gray-950/[.01] p-4">
			<div className="flex flex-row items-center gap-2">
				{/** biome-ignore lint/performance/noImgElement: required by @Vite */}
				<img alt="Company" className="rounded-full" src={company} />
			</div>
		</figure>
	)
};

export function CompaniesMarquee() {
	return (
		<div className="relative flex w-full flex-col items-center justify-center overflow-hidden">
			<Marquee className="[--duration:20s]">
				{reviews.map((review) => (
					<ReviewCard key={review.company} {...review} />
				))}
			</Marquee>
			<div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-primary-dark" />
			<div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-primary-dark" />
		</div>
	)
}
