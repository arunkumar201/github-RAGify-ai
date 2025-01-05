import { ProjectCommitLog } from "@/app/(dashboard)/components/ProjectCommitLog";

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
			<div className="mt-5">
				<ProjectCommitLog projectId={projectParams.id} />
			</div>
		</>
	);
};
export default DashboardProjectPage;
