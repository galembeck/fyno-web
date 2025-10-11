import { createFileRoute } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute(
	"/_app/_admin/dashboard/~components/analytic-overview-card"
)({
	component: () => (
		<AnalyticOverviewCard
			comment={""}
			icon={undefined}
			message={""}
			rate={{
				percentage: "",
				type: "increase",
			}}
			title={""}
			value={""}
		/>
	),
});

interface AnalyticOverviewCardProps {
	title: string;
	icon?: LucideIcon;
	rate: {
		percentage: string;
		type: "increase" | "decrease";
	};
	value: string;
	message: string;
	comment: string;
}

export function AnalyticOverviewCard({
	title,
	icon: Icon,
	rate,
	value,
	message,
	comment,
}: AnalyticOverviewCardProps) {
	return (
		<Card className="flex flex-col gap-2 px-2">
			<CardHeader className="flex items-center justify-between">
				<CardTitle className="font-medium text-muted-foreground text-sm">
					{title}
				</CardTitle>

				<Badge
					className={`${
						rate.type === "increase"
							? "bg-green-100 text-green-800 hover:bg-green-100"
							: "bg-red-100 text-red-800 hover:bg-red-100"
					} flex flex-row items-center`}
					variant={rate.type === "increase" ? "default" : "secondary"}
				>
					{Icon && <Icon className="h-4 w-4" />}
					{rate.type === "increase" ? "+" : "-"}
					{rate.percentage}
				</Badge>
			</CardHeader>

			<CardContent>
				<div className="font-extrabold text-2xl">{value}</div>

				<div className="flex flex-col pt-4 text-xs">
					<span className="flex items-center gap-1 font-medium">
						{message}
						{Icon && <Icon className="h-4 w-4" />}
					</span>
					<p className="pt-1 text-muted-foreground text-xs">{comment}</p>
				</div>
			</CardContent>
		</Card>
	);
}
