import { createFileRoute, Outlet, useLocation } from '@tanstack/react-router';

export const Route = createFileRoute('/_landing')({
  component: LandingLayout,
});

function LandingLayout() {
  const location = useLocation();

  return (
    <div>
      <Outlet key={location.pathname} />
    </div>
  );
}
