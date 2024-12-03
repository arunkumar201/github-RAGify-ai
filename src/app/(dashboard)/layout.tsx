import { SidebarProvider } from "@/components/ui/sidebar";
import { DashboardSidebar } from "./components/DashboradSidebar";
import { UserButton } from "@clerk/nextjs";
import { DashboardSearchBar } from "./components/DashboardSearchBar";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<SidebarProvider>
				<DashboardSidebar />
				<main className="w-full m-2">
					<div className="flex items-center gap-2 border-sidebar-border bg-sidebar border shadow-md rounded-md p-2 px-4">
						<DashboardSearchBar />
						<div className="ml-auto"></div>
						<UserButton />
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
