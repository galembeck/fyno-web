import { createFileRoute, redirect } from "@tanstack/react-router";
import { LeaveConfirmation } from "./~components/leave-confirmation";
import { RegisterForm } from "./~components/register-form";

export const Route = createFileRoute("/_auth/sign-up/register/")({
	component: Register,
	beforeLoad: () => {
		const token = localStorage.getItem("strapi_jwt");

		if (token) {
			throw redirect({
				to: "/dashboard",
			});
		}
	},
});

function Register() {
	return (
		<div className="min-h-screen bg-secondary-green-dark text-white lg:grid lg:grid-cols-2 lg:gap-8 lg:p-8">
			<div className="hidden lg:flex lg:flex-col lg:items-center lg:justify-center">
				<div className="w-full max-w-md">
					<video
						autoPlay
						className="h-auto w-full rounded-3xl object-cover shadow-2xl"
						loop
						muted
						playsInline
						poster="https://framerusercontent.com/images/HIGtR8zVukeH34vlwaIVoBrXk.png"
						src="https://framerusercontent.com/assets/AboBU6e4vljWCnAMBax6k0DvYuk.mp4"
					/>
				</div>
			</div>

			<div className="flex min-h-screen flex-col lg:min-h-0">
				<div className="flex justify-center p-6 md:p-10 lg:pt-0 lg:pb-6">
					<LeaveConfirmation />
				</div>

				<div className="flex flex-1 items-start justify-center px-6 pb-6 md:px-10 md:pb-10 lg:items-center lg:py-0">
					<div className="w-full max-w-2xl">
						<RegisterForm />
					</div>
				</div>
			</div>
		</div>
	);
}
