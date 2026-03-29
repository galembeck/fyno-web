import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_landing/')({
  component: LandingPage,
  head: () => ({
    meta: [
      {
        title: 'Início - Alesta Marketplace',
      },
    ],
  }),
});

function LandingPage() {
  return (
    <main>
      <h1>fyno.business</h1>
    </main>
  );
}
