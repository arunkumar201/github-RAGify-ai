import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { ProjectOverview } from "../components/ProjectOverview";
import { ProjectInteractionSection } from "../components/ProjectInteractionSection";
import { Suspense } from "react";
import { UserCheck2Icon } from "lucide-react";

const DashboardPage = async () => {
	const user = await currentUser();

	if (!user) {
		return redirect("/signin");
	}

	return (
		<div>
			<div className="flex items-center justify-start p-2 gap-x-3 mb-3">
				<UserCheck2Icon className="h-8 w-8 text-primary" />
				<h1 className="text-2xl font-bold text-secondary-foreground dark:text-muted-foreground">
					Welcome to your dashboard
				</h1>
			</div>
			<div className="flex flex-col gap-y-2">
				<Suspense fallback={<div>Loading...</div>}>
					<ProjectOverview githubRepoUrl="https://github.com/arunkumar201/github-RAGify-ai" />
				</Suspense>
				<Suspense fallback={<div>Loading...</div>}>
					<ProjectInteractionSection />
				</Suspense>
			</div>
		</div>
	);
};

export default DashboardPage;
