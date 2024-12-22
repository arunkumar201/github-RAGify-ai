import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ProjectOverview } from "../components/ProjectOverview";

const DashboardPage = async () => {
	const user = await currentUser();

	if (!user) {
		return redirect("/signin");
	}

	return (
		<div>
			<h1>Welcome to your dashboard</h1>
			<ProjectOverview
				githubRepoUrl="https://github.com/arunkumar201/github-RAGify-ai"
			/>
		</div>
	);
};

export default DashboardPage;
