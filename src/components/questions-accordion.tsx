import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import {
	landingQuestionsAccordion,
	rewardsQuestionsAccordion,
} from "@/constants/questions";

interface QuestionsAccordionProps {
	layout: "landing" | "rewards";
}

export function QuestionsAccordion({
	layout = "landing",
}: QuestionsAccordionProps) {
	const questions =
		layout === "landing"
			? landingQuestionsAccordion
			: rewardsQuestionsAccordion;

	return (
		<Accordion className="w-full" collapsible type="single">
			{questions.map((question) => (
				<AccordionItem
					className="py-2"
					key={question.id}
					value={`item-${question.id}`}
				>
					<AccordionTrigger className="cursor-pointer items-center bg-white px-6 font-semibold text-black text-xl">
						{question.question}
					</AccordionTrigger>
					<AccordionContent className="bg-white px-6 text-base text-black/80">
						<p>{question.answer}</p>
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
}
