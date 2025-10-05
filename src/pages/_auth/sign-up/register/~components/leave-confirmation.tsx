import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CircleX } from "lucide-react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute(
	"/_auth/sign-up/register/~components/leave-confirmation"
)({
	component: LeaveConfirmation,
});

export function LeaveConfirmation() {
	const navigate = useNavigate();

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button
					className="flex items-center gap-4 bg-transparent hover:bg-transparent hover:text-white"
					variant="ghost"
				>
					{/** biome-ignore lint/performance/noImgElement: required by @Vite */}
					<img alt="Fyno" className="size-16" src="/assets/icons/logo.svg" />
					<h1 className="font-semibold text-xl lg:text-3xl">Fyno</h1>
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent className="flex flex-col items-center justify-center border-0 bg-secondary-green-dark text-center">
				<AlertDialogHeader className="flex flex-col py-4 text-center">
					<AlertDialogTitle className="flex flex-col items-center justify-center gap-4 font-bold text-white">
						<CircleX stroke="red" />
						Tem certeza que deseja sair?
					</AlertDialogTitle>
					<AlertDialogDescription className="text-muted-foreground">
						Ao sair desta tela, todas as informações preenchidas até o momento
						serão perdidas e não poderão ser recuperadas. Deseja realmente sair?
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter className="flex flex-row items-center justify-center py-4">
					<AlertDialogCancel className="border-0 bg-inherit text-white hover:bg-inherithover:text-white/90">
						Cancelar
					</AlertDialogCancel>
					<AlertDialogAction
						className="gap-2 bg-red-500 text-white hover:bg-red-500/90"
						onClick={() => navigate({ to: "/" })}
					>
						<CircleX />
						Confirmar
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
