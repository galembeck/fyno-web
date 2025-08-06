"use client";

import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, {
	createContext,
	type JSX,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { cn } from "@/lib/utils";
import { Button } from "./button";

interface CarouselProps {
	items: JSX.Element[];
	initialScroll?: number;
}

type Card = {
	src: string;
	title?: string;
	category?: string;
	content?: React.ReactNode;
};

export const CarouselContext = createContext<{
	onCardClose: (index: number) => void;
	currentIndex: number;
}>({
	// biome-ignore lint/suspicious/noEmptyBlockStatements: required by @Acertenity UI
	onCardClose: () => {},
	currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
	const carouselRef = React.useRef<HTMLDivElement>(null);
	const [canScrollLeft, setCanScrollLeft] = React.useState(false);
	const [canScrollRight, setCanScrollRight] = React.useState(true);
	const [currentIndex, setCurrentIndex] = useState(0);

	// biome-ignore lint/correctness/useExhaustiveDependencies: required by @Acertenity UI
	useEffect(() => {
		if (carouselRef.current) {
			carouselRef.current.scrollLeft = initialScroll;
			checkScrollability();
		}
	}, [initialScroll]);

	const checkScrollability = () => {
		if (carouselRef.current) {
			// biome-ignore lint/nursery/noShadow: required by @Acertenity UI
			const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
			setCanScrollLeft(scrollLeft > 0);
			setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
		}
	};

	const scrollLeft = () => {
		if (carouselRef.current) {
			carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
		}
	};

	const scrollRight = () => {
		if (carouselRef.current) {
			carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
		}
	};

	const handleCardClose = (index: number) => {
		if (carouselRef.current) {
			const cardWidth = isMobile() ? 230 : 384; // (md:w-96)
			const gap = isMobile() ? 4 : 8;
			const scrollPosition = (cardWidth + gap) * (index + 1);
			carouselRef.current.scrollTo({
				left: scrollPosition,
				behavior: "smooth",
			});
			setCurrentIndex(index);
		}
	};

	const isMobile = () => {
		return window && window.innerWidth < 768;
	};

	return (
		<CarouselContext.Provider
			value={{ onCardClose: handleCardClose, currentIndex }}
		>
			<div className="relative w-full">
				<div
					className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-10 [scrollbar-width:none] md:py-20"
					onScroll={checkScrollability}
					ref={carouselRef}
				>
					<div
						className={cn(
							"absolute right-0 z-[1000] h-auto w-[5%] overflow-hidden bg-gradient-to-l"
						)}
					/>

					<div
						className={cn(
							"flex flex-row justify-start gap-4 pl-4",
							"mx-auto max-w-7xl" // remove max-w-4xl if you want the carousel to span the full width of its container
						)}
					>
						{items.map((item, index) => (
							<motion.div
								animate={{
									opacity: 1,
									y: 0,
									transition: {
										duration: 0.5,
										delay: 0.2 * index,
										ease: "easeOut",
									},
								}}
								className="rounded-3xl last:pr-[5%] md:last:pr-[33%]"
								initial={{
									opacity: 0,
									y: 20,
								}}
								// biome-ignore lint/style/useTemplate: required by @Acertenity UI
								// biome-ignore lint/suspicious/noArrayIndexKey: required by @Acertenity UI
								key={"card" + index}
							>
								{item}
							</motion.div>
						))}
					</div>
				</div>
				<div className="mr-10 flex justify-end gap-2">
					<Button
						className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
						disabled={!canScrollLeft}
						onClick={scrollLeft}
						variant="secondary"
					>
						<ArrowLeft className="h-6 w-6 text-gray-500" />
					</Button>
					<Button
						className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
						disabled={!canScrollRight}
						onClick={scrollRight}
						variant="secondary"
					>
						<ArrowRight className="h-6 w-6 text-gray-500" />
					</Button>
				</div>
			</div>
		</CarouselContext.Provider>
	);
};

export const Card = ({
	card,
	index,
	layout = false,
	clickable = true,
}: {
	card: Card;
	index: number;
	layout?: boolean;
	clickable?: boolean;
}) => {
	const [open, setOpen] = useState(false);
	// biome-ignore lint/style/noNonNullAssertion: required by @Acertenity UI
	const containerRef = useRef<HTMLDivElement>(null!);
	const { onCardClose } = useContext(CarouselContext);

	// biome-ignore lint/correctness/useExhaustiveDependencies: required by @Acertenity UI
	useEffect(() => {
		function onKeyDown(event: KeyboardEvent) {
			if (event.key === "Escape") {
				handleClose();
			}
		}

		if (open) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}

		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, [open]);

	useOutsideClick(containerRef, () => handleClose());

	const handleOpen = () => {
		if (clickable) {
			setOpen(true);
		}
	};

	const handleClose = () => {
		setOpen(false);
		onCardClose(index);
	};

	return (
		<>
			<AnimatePresence>
				{open && clickable && (
					<div className="fixed inset-0 z-50 h-screen overflow-auto">
						<motion.div
							animate={{ opacity: 1 }}
							className="fixed inset-0 h-full w-full bg-black/80 backdrop-blur-lg"
							exit={{ opacity: 0 }}
							initial={{ opacity: 0 }}
						/>
						<motion.div
							animate={{ opacity: 1 }}
							className="relative z-[60] mx-auto my-10 h-fit max-w-5xl rounded-3xl bg-white p-4 font-sans md:p-10 dark:bg-neutral-900"
							exit={{ opacity: 0 }}
							initial={{ opacity: 0 }}
							layoutId={layout ? `card-${card.title}` : undefined}
							ref={containerRef}
						>
							<button
								className="sticky top-4 right-0 ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-black dark:bg-white"
								onClick={handleClose}
								type="button"
							>
								<X className="h-6 w-6 text-neutral-100 dark:text-neutral-900" />
							</button>
							<motion.p
								className="font-medium text-base text-black dark:text-white"
								layoutId={layout ? `category-${card.title}` : undefined}
							>
								{card.category}
							</motion.p>
							<motion.p
								className="mt-4 font-semibold text-2xl text-neutral-700 md:text-5xl dark:text-white"
								layoutId={layout ? `title-${card.title}` : undefined}
							>
								{card.title}
							</motion.p>
							<div className="py-10">{card.content}</div>
						</motion.div>
					</div>
				)}
			</AnimatePresence>
			<motion.div
				className={cn(
					"relative z-10 flex h-80 w-56 flex-col items-start justify-start overflow-hidden rounded-3xl bg-gray-100 md:h-[40rem] md:w-96 dark:bg-neutral-900",
					clickable ? "cursor-pointer" : "cursor-default"
				)}
				layoutId={layout ? `card-${card.title}` : undefined}
				onClick={handleOpen}
			>
				<div className="pointer-events-none absolute inset-x-0 top-0 z-30 h-full bg-gradient-to-b from-black/50 via-transparent to-transparent" />
				<div className="relative z-40 p-8">
					<motion.p
						className="text-left font-medium font-sans text-sm text-white md:text-base"
						layoutId={layout ? `category-${card.category}` : undefined}
					>
						{card.category}
					</motion.p>
					<motion.p
						className="mt-2 max-w-xs text-left font-sans font-semibold text-white text-xl [text-wrap:balance] md:text-3xl"
						layoutId={layout ? `title-${card.title}` : undefined}
					>
						{card.title}
					</motion.p>
				</div>
				<BlurImage
					alt={card.title}
					className="absolute inset-0 z-10 object-cover"
					fill
					src={card.src}
				/>
			</motion.div>
		</>
	);
};

type ImageProps = {
	height?: number;
	width?: number;
	src: string;
	className?: string;
	alt?: string;
	[key: string]: unknown;
};

export const BlurImage = ({
	height,
	width,
	src,
	className,
	alt,
	...rest
}: ImageProps) => {
	const [isLoading, setLoading] = useState(true);
	return (
		// biome-ignore lint/nursery/noNoninteractiveElementInteractions: required by @Acertenity UI
		// biome-ignore lint/performance/noImgElement: required by @Acertenity UI
		<img
			alt={alt ? alt : "Background of a beautiful view"}
			className={cn(
				"h-full w-full transition duration-300",
				isLoading ? "blur-sm" : "blur-0",
				className
			)}
			decoding="async"
			height={height}
			loading="lazy"
			onLoad={() => setLoading(false)}
			src={src as string}
			width={width}
			{...rest}
		/>
	);
};
