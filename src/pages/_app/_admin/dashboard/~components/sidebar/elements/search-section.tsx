import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Command as CommandIcon, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	getAllNavigationItems,
	groupNavigationItems,
	type NavigationItem,
} from "@/constants/_app/_admin/dashboard/navigation";

export const Route = createFileRoute(
	"/_app/_admin/dashboard/~components/sidebar/elements/search-section"
)({
	component: SearchSection,
});

export function SearchSection() {
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				// biome-ignore lint/nursery/noShadow: not relevant...
				setOpen((open) => !open);
			}
		};

		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	const navigationItems = getAllNavigationItems();

	const handleSelect = (item: NavigationItem) => {
		setOpen(false);
		navigate({ to: item.url });
	};

	const groupedItems = groupNavigationItems(navigationItems);

	return (
		<>
			<Button
				className="w-full justify-start text-muted-foreground group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:pl-2"
				onClick={() => setOpen(true)}
				variant="outline"
			>
				<Search className="h-4 w-4 group-data-[collapsible=icon]:h-4 group-data-[collapsible=icon]:w-4" />
				<span className="ml-2 group-data-[collapsible=icon]:sr-only">
					Pesquisar...
				</span>
				<kbd className="pointer-events-none ml-auto hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-medium font-mono text-[10px] opacity-100 group-data-[collapsible=icon]:hidden sm:flex">
					<span className="text-xs">⌘</span>K
				</kbd>
			</Button>

			<CommandDialog onOpenChange={setOpen} open={open}>
				<CommandInput placeholder="Digite para pesquisar páginas..." />
				<CommandList>
					<CommandEmpty>Nenhuma página encontrada.</CommandEmpty>

					{Object.entries(groupedItems).map(([group, items]) => (
						<CommandGroup heading={group} key={group}>
							{items.map((item) => {
								const IconComponent = item.icon;
								return (
									<CommandItem
										className="flex items-center gap-3"
										key={item.id}
										onSelect={() => handleSelect(item)}
										value={`${item.title} ${item.description} ${item.keywords.join(" ")}`}
									>
										{IconComponent ? (
											<IconComponent className="h-4 w-4" />
										) : (
											<CommandIcon className="h-4 w-4" />
										)}
										<div className="flex flex-1 flex-col gap-1">
											<span className="font-medium">{item.title}</span>
											<span className="text-muted-foreground text-xs">
												{item.description}
											</span>
										</div>
									</CommandItem>
								);
							})}
						</CommandGroup>
					))}
				</CommandList>
			</CommandDialog>
		</>
	);
}
