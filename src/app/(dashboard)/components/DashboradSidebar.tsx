"use client";

import {
	Sidebar,
	SidebarContent,
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

export const DashboardSidebar = () => {
	const pathname = usePathname();
	const { open } = useSidebar();

	const porjects = [
		{
			title: "Project 1",
			path: "/dashboard/projects/1",
			icon: <SettingsIcon size={24} />,
			id: "2",
		},
		{
			title: "Project 2",
			path: "/dashboard/projects/2",
			icon: <SettingsIcon size={24} />,
			id: "3",
		},
		{
			title: "Project 3",
			path: "/dashboard/projects/3",
			icon: <SettingsIcon size={24} />,
			id: "4",
		},
	];

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
					icon={<House className="" size={29} />}
					options={appOptions}
					pathname={pathname}
				/>
				<SidebarSection
					title="Your Projects"
					icon={<User2Icon size={29} className="" />}
					options={porjects}
					pathname={pathname}
					isProject={true}
				/>
				<SidebarSection
					title="Settings"
					icon={<SettingsIcon className="" size={29} />}
					options={settingsOptions}
					pathname={pathname}
				/>
				{open && (
					<SidebarMenu className="flex flex-col gap-2 p-2">
						<SidebarMenuItem className="w-full">
							{/* Create Project Button  - dashboard/projects/new/id */}
							<Link href="/dashboard/projects">
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
			</SidebarContent>
		</Sidebar>
	);
};
