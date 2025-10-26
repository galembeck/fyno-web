import { createFileRoute } from "@tanstack/react-router";
import { Box, CookingPot, Footprints, PartyPopper } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { CreateRoadmapSuggestion } from "./~components/create-roadmap-suggestion";
import { RoadmapSectionCard } from "./~components/roadmap-section-card";

export const Route = createFileRoute("/_app/app/_pages/_primary/roadmap/")({
  component: RoadmapPage,
  head: () => ({
    meta: [
      {
        title: "Roadmap | fyno.business",
      },
    ],
  }),
});

function RoadmapPage() {
  const today = new Date().toLocaleDateString("pt-BR");

  return (
    <main className="container space-y-8 p-4">
      <article className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="font-semibold text-3xl">Fyno &copy; Roadmap</h1>
          <Badge className="mt-1 bg-primary-green font-semibold">{today}</Badge>
        </div>

        <CreateRoadmapSuggestion />
      </article>

      <div className="grid h-auto grid-cols-1 gap-4 md:grid-cols-2 lg:h-[78vh] lg:grid-cols-4 lg:overflow-y-clip">
        <RoadmapSectionCard
          icon={Box}
          section="suggestions"
          title="Sugestões :)"
        />

        <RoadmapSectionCard
          icon={Footprints}
          section="next-step"
          title="Próximos passos :D"
        />

        <RoadmapSectionCard
          icon={CookingPot}
          section="cooking"
          title="Cozinhando..."
        />

        <RoadmapSectionCard icon={PartyPopper} section="done" title="Pronto!" />
      </div>
    </main>
  );
}
