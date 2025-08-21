import { createFileRoute, Link } from "@tanstack/react-router";
import { SiginInForm } from "./~components/sign-in-form";

export const Route = createFileRoute("/_auth/sign-in/")({
	component: SignIn,
});

function SignIn() {
	return (
		<div className="grid h-screen lg:grid-cols-2">
			<div className="flex flex-col gap-4 p-6 md:p-10">
				<div className="flex justify-center gap-2">
					<Link className="flex gap-2" to="/">
						{/** biome-ignore lint/performance/noImgElement: required b @Vite */}
						<img alt="Fyno" className="size-7" src="/assets/icons/logo.svg" />
						<h1 className="font-semibold text-xl lg:text-2xl">Fyno</h1>
					</Link>
				</div>

				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-xs">
						<SiginInForm />
					</div>
				</div>
			</div>
			<div className="relative hidden bg-muted lg:block">
				<video
					autoPlay
					className="h-screen w-full object-cover"
					loop
					muted
					playsInline
					poster="https://framerusercontent.com/images/HIGtR8zVukeH34vlwaIVoBrXk.png"
					src="https://framerusercontent.com/assets/AboBU6e4vljWCnAMBax6k0DvYuk.mp4"
				/>
			</div>
		</div>
	);
}
