import { createFileRoute } from "@tanstack/react-router";
import { Box, type LucideIcon } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useRoadmap } from "@/hooks/endpoints/roadmap/use-roadmap";
import { RoadmapContentCard } from "./roadmap-content-card";

export const Route = createFileRoute(
  "/_app/app/_pages/_primary/roadmap/~components/roadmap-section-card"
)({
  component: () => (
    <RoadmapSectionCard icon={Box} section={"suggestions"} title="" />
  ),
});

interface RoadmapSectionCardProps {
  section: "suggestions" | "next-step" | "cooking" | "done";
  icon: LucideIcon;
  title: string;
}

export function RoadmapSectionCard({
  section,
  icon: Icon,
  title,
}: RoadmapSectionCardProps) {
  const { suggestions, isLoading } = useRoadmap();

  const SECTION_STYLES: Record<
    RoadmapSectionCardProps["section"],
    { color: string; content: typeof suggestions }
  > = {
    suggestions: {
      color: "bg-zinc-500/40 dark:bg-zinc-300/90",
      content: suggestions || [],
    },
    "next-step": {
      color: "bg-secondary-green-light",
      content: [],
    },
    cooking: {
      color: "bg-sky-200",
      content: [],
    },
    done: {
      color: "bg-yellow-100",
      content: [],
    },
  };

  const sectionProps = SECTION_STYLES[section];

  if (isLoading) {
    return (
      <Card className="h-auto rounded-md p-2 lg:h-full">
        <div className="m-3 mt-0">
          <CardHeader
            className={`flex items-center gap-2 ${sectionProps.color} my-3 rounded-lg p-3 text-input-gray/80`}
          >
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-6 rounded-md" />
            </div>
            <div className="flex-1">
              <Skeleton className="h-4 w-36 rounded-md" />
            </div>
          </CardHeader>

          <div className="roadmap-scrollbar flex max-h-[calc(78vh-120px)] flex-col gap-4 overflow-y-auto">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                className="flex items-start gap-3 rounded-md bg-transparent p-3"
                // biome-ignore lint/suspicious/noArrayIndexKey: required by @Biome
                key={index}
              >
                <Skeleton className="h-12 w-12 rounded-md" />

                <div className="flex-1 space-y-2">
                  <Skeleton className="h-4 w-3/4 rounded-md" />
                  <Skeleton className="h-3 w-5/6 rounded-md" />
                  <div className="flex items-center justify-between">
                    <Skeleton className="h-6 w-16 rounded-full" />
                    <Skeleton className="h-6 w-10 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="h-auto rounded-md p-2 lg:h-full">
      <div className="m-3 mt-0">
        <CardHeader
          className={`flex items-center gap-2 ${sectionProps.color} my-3 rounded-lg p-3 text-input-gray/80`}
        >
          <Icon className="h-5 w-5" />
          <h1 className="font-bold">{title}</h1>
        </CardHeader>

        <div className="roadmap-scrollbar flex max-h-[calc(78vh-120px)] flex-col gap-4 overflow-y-auto">
          {(sectionProps?.content ?? []).length > 0 ? (
            (sectionProps.content ?? []).map((content) => (
              <RoadmapContentCard
                description={content.description}
                id={content.id}
                key={content.title}
                title={content.title}
                votes={content.votes}
              />
            ))
          ) : (
            <p className="flex items-center justify-center text-muted-foreground text-sm">
              Nenhum conteúdo encontrado :/
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
