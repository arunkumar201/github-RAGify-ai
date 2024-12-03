import { AppFooter } from "@/components/Footer";
import { AppHeader } from "@/components/Header";
const HomeLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			{/* Header */}
			<AppHeader />
			{/* Main Content */}
			<main className="flex-grow">{children}</main>
			{/* Footer */}
			<AppFooter />
		</>
	);
};

export default HomeLayout;
