export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<div className="flex-grow overflow-y-auto px-4 py-4">
				<h1>Dashboard</h1>
				{children}
			</div>
		</>
	);
}
