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
import { Project } from "@prisma/client";
import { Loader } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";

interface SideBarOptions {
	title: string;
	path: string;
	icon: React.ReactNode;
	id?: string;
}

export interface SidebarSectionProps {
	title: string;
	icon: React.ReactNode;
	options: SideBarOptions[] | Project[];
	pathname: string;
	isProject?: boolean;
	isLoading?: boolean;
	isError?: boolean;
}

// Use a type guard to determine the type of options
function isSideBarOptions(
	options: SideBarOptions[] | Project[]
): options is SideBarOptions[] {
	return (options as SideBarOptions[])[0]?.path !== undefined;
}

export const SidebarSection = ({
	title,
	icon,
	options,
	pathname,
	isProject = false,
	isLoading = false,
	isError = false,
}: SidebarSectionProps) => {
	const queryClient = useQueryClient();
	return (
		<SidebarGroup className="-mb-2">
			<SidebarGroupLabel className="flex flex-row items-center place-items-center gap-1 md:text-xl text-lg mb-1">
				<div className="w-7 h-7">{icon}</div>
				<h2 className="text-base md:text-xl font-bold mb-2 mr-2">{title}</h2>
			</SidebarGroupLabel>
			<SidebarGroupContent className="flex flex-col gap-2">
				<SidebarMenu>
					{!isProject &&
						isSideBarOptions(options) &&
						options.map((option) => (
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
				{isProject &&
					(isLoading ? (
						<div className="flex justify-center items-center">
							<Loader className="h-6 w-6 text-primary animate-spin text-green-700" />
						</div>
					) : isError ? (
						<div className="flex justify-center flex-col gap-3 items-center text-red-600">
							<span>Error loading projects</span>
							<Button
								variant={"outline"}
								disabled={isLoading}
								onClick={async () => {
									await queryClient.invalidateQueries({
										queryKey: ["projects"],
									});
								}}
							>
								Retry
							</Button>
						</div>
					) : (
						<MyProjectList pathname={pathname} options={options as Project[]} />
					))}
			</SidebarGroupContent>
		</SidebarGroup>
	);
};
