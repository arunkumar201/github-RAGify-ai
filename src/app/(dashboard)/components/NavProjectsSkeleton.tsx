import { SidebarMenuSkeleton } from "@/components/ui/sidebar";

import { SidebarMenuItem } from "@/components/ui/sidebar";

import { SidebarMenu } from "@/components/ui/sidebar";

export function NavProjectsSkeleton() {
	return (
		<SidebarMenu>
			{Array.from({ length: 5 }).map((_, index) => (
				<SidebarMenuItem key={index}>
					<SidebarMenuSkeleton showIcon />
				</SidebarMenuItem>
			))}
		</SidebarMenu>
	);
}
