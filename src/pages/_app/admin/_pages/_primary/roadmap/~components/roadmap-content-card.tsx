import { createFileRoute } from "@tanstack/react-router";
import { Flag, ThumbsUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useRoadmap } from "@/hooks/endpoints/roadmap/use-roadmap";

export const Route = createFileRoute(
  "/_app/admin/_pages/_primary/roadmap/~components/roadmap-content-card"
)({
  component: () => (
    <RoadmapContentCard description="" id="" title="" votes={0} />
  ),
});

interface RoadmapContentCardProps {
  id: string;
  title: string;
  description: string;
  votes: number;
}

export function RoadmapContentCard({
  id,
  title,
  description,
  votes,
}: RoadmapContentCardProps) {
  const { vote, isVoting } = useRoadmap();
  const [currentVotes, setCurrentVotes] = useState(votes);
  const [hasVoted, setHasVoted] = useState(false);

  async function handleVote() {
    try {
      const updatedVotes = await vote(id);
      setHasVoted(!hasVoted);
      setCurrentVotes(updatedVotes ?? currentVotes);
      // biome-ignore lint/correctness/noUnusedVariables: required by error handling
    } catch (error) {
      toast.error("Erro ao registrar voto :(", {
        description: "Tente novamente mais tarde...",
      });
    }
  }

  return (
    <div className="flex items-center justify-between rounded-lg border-2 border-primary-green bg-card p-4">
      <article>
        <h2 className="mb-1 flex items-center gap-2 font-bold text-dark text-sm dark:text-white">
          {title}
          <Flag className="h-3 w-3" />
        </h2>
        <p className="flex items-center text-muted-foreground text-xs">
          {description}
        </p>
      </article>

      <Button
        className={`mr-4 ml-2 flex h-fit flex-col items-center rounded-lg border-[1.5px] p-2 transition-all ${
          hasVoted
            ? "border-primary-green hover:border-primary-green!"
            : "border-muted bg-primary-green/10"
        }`}
        disabled={isVoting}
        onClick={handleVote}
        variant="outline"
      >
        <ThumbsUp
          className="h-6 w-6"
          stroke={hasVoted ? "#A3DC2F" : "#6b7280"}
        />
        <p
          className={`font-bold text-xs ${
            hasVoted ? "text-primary-green" : "text-muted-foreground"
          }`}
        >
          {currentVotes}
        </p>
      </Button>
    </div>
  );
}
