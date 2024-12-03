import {
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getShortTitle } from "@/utils";

interface SidebarSectionProps {
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
	const { open } = useSidebar();
	return (
		<SidebarGroup className="-mb-2">
			<SidebarGroupLabel className="flex flex-row items-center gap-1 md:text-xl text-lg mb-1">
				{icon}
				<h2 className="text-base md:text-xl font-bold">{title}</h2>
			</SidebarGroupLabel>
			<SidebarGroupContent className="flex flex-col gap-2">
				<SidebarMenu>
					{options.map((option) => (
						<SidebarMenuItem key={option.path}>
							<SidebarMenuButton asChild>
								{!isProject ? (
									<Link
										href={option.path}
										className={cn(
											"bg-primary-foreground text-primary hover:bg-primary/40 p-3",
											pathname === option.path &&
												"bg-primary text-primary-foreground hover:bg-primary/50"
										)}
									>
										{option.icon}
										{option.title}
									</Link>
								) : (
									<Link
										href={option.path}
										className={cn(
											"bg-primary-foreground text-primary hover:bg-primary/40",
											pathname === option.path &&
												"bg-primary text-primary-foreground hover:bg-primary/50",
											!open && "bg"
										)}
									>
										<div className={cn("rounded-full")}>
											{getShortTitle(option.title)}
										</div>
										<span className="md:text-lg text-base">{option.title}</span>
									</Link>
								)}
							</SidebarMenuButton>
						</SidebarMenuItem>
					))}
				</SidebarMenu>
			</SidebarGroupContent>
		</SidebarGroup>
	);
};
