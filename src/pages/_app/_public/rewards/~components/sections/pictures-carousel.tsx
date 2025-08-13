import { createFileRoute } from "@tanstack/react-router";
import { Card, Carousel } from "@/components/ui/apple-cards-carousel";

export const Route = createFileRoute(
	"/_app/_public/rewards/~components/sections/pictures-carousel"
)({
	component: PicturesCarousel,
});

export function PicturesCarousel() {
	const infiniteData = [...data, ...data, ...data, ...data, ...data];

	const cards = infiniteData.map((card, index) => (
		<Card card={card} clickable={false} index={index} key={card.src} />
	));

	return (
		<div className="pb-10 lg:pb-20">
			<Carousel items={cards} />
		</div>
	)
}

const data = [
	{
		src: "https://framerusercontent.com/images/5POpsdyQezEl5x6g1FraFCj4Qg.png?scale-down-to=1024",
	},
	{
		src: "https://framerusercontent.com/images/bLDVJecbihMlKNh01r11AxPcKk.jpeg",
	},
	{
		src: "https://framerusercontent.com/images/LQHZgKU7HkfRkCHTQnrM8W2LZXM.png?scale-down-to=1024",
	},
	{
		src: "https://framerusercontent.com/images/nU3jU2pIJqzcjwT1YfUKl3dK8M.png?scale-down-to=1024",
	},
	{
		src: "https://framerusercontent.com/images/ggEIgs97rIbcnE4M3lIkPakatY.png?scale-down-to=1024",
	},
	{
		src: "https://framerusercontent.com/images/5POpsdyQezEl5x6g1FraFCj4Qg.png?scale-down-to=1024",
	},
	{
		src: "https://framerusercontent.com/images/bLDVJecbihMlKNh01r11AxPcKk.jpeg",
	},
	{
		src: "https://framerusercontent.com/images/LQHZgKU7HkfRkCHTQnrM8W2LZXM.png?scale-down-to=1024",
	},
];
