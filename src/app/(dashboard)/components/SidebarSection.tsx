import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { MyProjectList } from "./MyProjectList";

export interface SidebarSectionProps {
	title: string;
	icon: React.ReactNode;
	options: {
		title: string;
		path: string;
		icon: React.ReactNode;
		id?: string;
	}[];
	pathname: string;
	isProject?: boolean;
}

export const SidebarSection = ({
	title,
	icon,
	options,
	pathname,
	isProject = false,
}: SidebarSectionProps) => {
	return (
		<SidebarGroup className="-mb-2">
			<SidebarGroupLabel className="flex flex-row items-center place-items-center gap-1 md:text-xl text-lg mb-1">
				<div className="w-7 h-7">{icon}</div>
				<h2 className="text-base md:text-xl font-bold mb-2 mr-2">{title}</h2>
			</SidebarGroupLabel>
			<SidebarGroupContent className="flex flex-col gap-2">
				<SidebarMenu>
					{options.map((option) => (
						<SidebarMenuItem key={option.path}>
							<SidebarMenuButton asChild tooltip={option.title}>
								{!isProject && (
									<Link
										href={option.path}
										className={cn(
											"hover:dark:bg-slate-500 hover:bg-slate-200 text-zinc-500 dark:text-zinc-200",
											pathname === option.path &&
												"hover:dark:text-slate-200 hover:hover:bg-blue-600 hover:text-slate-200 bg-primary dark:text-slate-50 text-primary-foreground hover:dark:bg-primary/90"
										)}
									>
										{option.icon}
										{option.title}
									</Link>
								)}
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
				{isProject && <MyProjectList pathname={pathname} options={options} />}
			</SidebarGroupContent>
		</SidebarGroup>
	);
};
