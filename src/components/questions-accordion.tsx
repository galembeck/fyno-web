import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { frequentlyAskedQuestions } from "@/constants/questions";

export function QuestionsAccordion() {
	return (
		<Accordion className="w-full" collapsible type="single">
			{frequentlyAskedQuestions.map((question) => (
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
