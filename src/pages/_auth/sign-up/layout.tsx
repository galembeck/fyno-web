import {
	createFileRoute,
	Link,
	Outlet,
	useLocation,
} from "@tanstack/react-router";

export const Route = createFileRoute("/_auth/sign-up")({
	component: Layout,
});

function Layout() {
	const location = useLocation();

	const isRegisterPage = location.pathname.includes("/register");

	if (isRegisterPage) {
		return <Outlet />;
	}

	return (
		<main className="min-h-screen w-full bg-secondary-green-dark text-white">
			<div className="mx-auto flex max-w-md flex-col items-center gap-10 py-10 text-center md:max-w-2xl">
				<Link to="/">
					{/** biome-ignore lint/performance/noImgElement: required by @Vite */}
					<img alt="Fyno" className="size-10" src="/assets/icons/logo.svg" />
				</Link>

				<Outlet />
			</div>
		</main>
	);
}
