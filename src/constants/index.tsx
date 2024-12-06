import {
	BadgeHelp,
	Bot,
	CreditCard,
	LayoutDashboard,
	Presentation,
	SettingsIcon,
} from "lucide-react";

export const DASHBOARD_APPLICATION_OPTIONS = [
	{
		title: "Dashboard",
		path: "/dashboard",
		icon: <LayoutDashboard />,
	},
	{
		title: "Q&A",
		path: "/dashboard/qa",
		icon: <Bot />,
	},
	{
		title: "Meetings",
		path: "/dashboard/meetings",
		icon: <Presentation />,
	},
];

export const DASHBOARD_SETTINGS_OPTIONS = [
	{
		title: "Billing",
		path: "/dashboard/settings/billing",
		icon: <CreditCard />,
	},
	{
		title: "Help/Support",
		path: "/dashboard/settings/help",
		icon: <BadgeHelp />,
	},
	{
		title: "Settings",
		path: "/dashboard/settings",
		icon: <SettingsIcon />,
	},
];
