interface IDashboardProjectPage {
	params: Promise<{
		id: string;
	}>;
}
const DashboardProjectPage = async ({ params }: IDashboardProjectPage) => {
	const projectParams = await params;

	return (
		<>
			<h2>Project {projectParams.id}</h2>
		</>
	);
};

export default DashboardProjectPage;
