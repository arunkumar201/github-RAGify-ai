import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./components/DashboradSidebar";
import { UserButton } from "@clerk/nextjs";
import { DashboardSearchBar } from "./components/DashboardSearchBar";
import { cookies } from "next/headers";
import { ThemeModeToggle } from "@/components/toggleButton";

export default async function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const cookieStore = await cookies();
	const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

	return (
		<>
			<SidebarProvider defaultOpen={defaultOpen}>
				<DashboardSidebar />
				<main className="w-full m-2">
					<div className="flex items-center gap-2 border-sidebar-border bg-sidebar border shadow-md rounded-md p-2 px-4">
						<DashboardSearchBar />
						<div className="ml-auto"></div>
						<div className="flex flex-row items-center gap-2">
							<ThemeModeToggle />
							<UserButton />
						</div>
					</div>
					<div className="h-5"></div>
					{/* main content */}
					<div
						className="border-sidebar-border bg-sidebar border shadow-md rounded-md p-2 px-4
					h-[calc(100vh-5rem)] overflow-y-scroll"
					>
						{children}
					</div>
				</main>
			</SidebarProvider>
		</>
	);
}
