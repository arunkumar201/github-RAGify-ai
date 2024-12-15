import { SidebarMenuItem } from "@/components/ui/sidebar";

import { SidebarMenuButton } from "@/components/ui/sidebar";

import { SidebarMenu } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { getShortTitle } from "@/utils";
import Link from "next/link";
import { Project } from "@prisma/client";
import { ScrollArea } from "@/components/ui/scroll-area";

export const isPathnameContained = (pathname: string, id: string) => {
	return pathname.toLowerCase().includes(`/${id}`);
};

export function MyProjectList({
	options,
	pathname,
}: {
	options: Project[];
	pathname: string;
}) {
	return (
		<SidebarMenu>
			<ScrollArea className="h-[480px] border-none max-w-full">
				{options.map((option) => (
					<SidebarMenuItem key={option.id}>
						<SidebarMenuButton
							asChild
							tooltip={option.name}
							className="hover:bg-inherit"
						>
							<Link
								href={`/dashboard/projects/${option.id}`}
								className={cn(
									"hover:dark:bg-slate-500 hover:bg-slate-200 text-zinc-500 dark:text-zinc-200",
									isPathnameContained(pathname, option.id) &&
										"sm:hover:bg-blue-600 hover:bg-blue-600 hover:dark:text-slate-200 hover:text-slate-200 bg-primary dark:text-slate-50 text-primary-foreground hover:dark:bg-primary/90"
								)}
							>
								<div className={cn("rounded-full")}>
									{getShortTitle(option.name)}
								</div>
								<span className="text-ellipsis break-all w-[10rem]">
									{option.name}
								</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
				))}
			</ScrollArea>
		</SidebarMenu>
	);
}
