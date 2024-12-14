import { SidebarMenuItem } from "@/components/ui/sidebar";

import { SidebarMenuButton } from "@/components/ui/sidebar";

import { SidebarMenu } from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { SidebarSectionProps } from "./SidebarSection";
import { getShortTitle } from "@/utils";
import Link from "next/link";

export function MyProjectList({
	options,
	pathname,
}: {
	options: SidebarSectionProps["options"];
	pathname: string;
}) {
	return (
		<SidebarMenu>
			{options.map((option) => (
				<SidebarMenuItem key={option.path}>
					<SidebarMenuButton
						asChild
						tooltip={option.title}
						className="hover:bg-inherit"
					>
						<Link
							href={option.path}
							className={cn(
								"hover:dark:bg-slate-500 hover:bg-slate-200 text-zinc-500 dark:text-zinc-200",
								pathname === option.path &&
									"sm:hover:bg-blue-600 hover:bg-blue-600 hover:dark:text-slate-200 hover:text-slate-200 bg-primary dark:text-slate-50 text-primary-foreground hover:dark:bg-primary/90"
							)}
						>
							<div className={cn("rounded-full")}>
								{getShortTitle(option.title)}
							</div>
							<span>{option.title}</span>
						</Link>
					</SidebarMenuButton>
				</SidebarMenuItem>
			))}
		</SidebarMenu>
	);
}
