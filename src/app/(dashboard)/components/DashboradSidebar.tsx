"use client";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import {
	DASHBOARD_APPLICATION_OPTIONS as appOptions,
	DASHBOARD_SETTINGS_OPTIONS as settingsOptions,
} from "@/constants";
import { House, PlusIcon, SettingsIcon, User2Icon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SidebarSection } from "./SidebarSection";
import { Button } from "@/components/ui/button";
import logo from "@/../public/logo.png";
import Image from "next/image";
import { Project } from "@prisma/client";
import { useProject } from "@/hooks/use-project";

export interface SidebarSectionProps {
	projects: Promise<{
		data: Project[];
		message: string;
	}>;
}

export const DashboardSidebar = () => {
	const pathname = usePathname();
	const { open } = useSidebar();
	const { data: userProjects, isError, isLoading } = useProject();

	return (
		<Sidebar variant="floating" collapsible={"icon"}>
			<SidebarHeader className="flex flex-row items-center gap-x-2 p-3">
				<Image src={logo} alt="Logo" width={30} height={30} className="" />
				{open && (
					<h1 className="text-base md:text-lg font-bold text-sidebar-accent-foreground datk:text-accent capitalize">
						github-RAGify-ai
					</h1>
				)}
			</SidebarHeader>
			<SidebarContent className="flex flex-col">
				<SidebarSection
					title="Application"
					icon={<House className="" size={20} />}
					options={appOptions}
					pathname={pathname}
				/>
				<SidebarSection
					title="Your Projects"
					icon={<User2Icon size={20} />}
					options={userProjects ?? []}
					pathname={pathname}
					isProject={true}
					isLoading={isLoading}
					isError={isError}
				/>
			</SidebarContent>
			<SidebarFooter className="flex flex-col gap-2 p-0">
				<SidebarSection
					title="My Settings"
					icon={<SettingsIcon className="" size={20} />}
					options={settingsOptions}
					pathname={pathname}
				/>
				{open && (
					<SidebarMenu className="flex flex-col gap-2 p-2">
						<SidebarMenuItem className="w-full">
							{/* Create Project Button  - dashboard/projects/new/id */}
							<Link href="/dashboard/create-project">
								<Button
									variant={"outline"}
									className="w-full rounded-sm flex flex-row gap-2"
								>
									<PlusIcon className="h-5 w-5" />
									<span>Create Project</span>
								</Button>
							</Link>
						</SidebarMenuItem>
					</SidebarMenu>
				)}
			</SidebarFooter>
		</Sidebar>
	);
};
