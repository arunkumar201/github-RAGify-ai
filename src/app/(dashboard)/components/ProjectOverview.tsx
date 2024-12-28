import React from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, GithubIcon, User2Icon, ArchiveIcon } from "lucide-react";
interface ProjectTeamMember {
	id: string;
	name: string;
	role: string;
	avatarUrl?: string;
}

interface ProjectOverviewProps {
	githubRepoUrl: string;
	teamMembers?: ProjectTeamMember[];
	onInviteTeam?: () => void;
	onArchiveProject?: () => void;
	isArchived?: boolean;
}

export const ProjectOverview: React.FC<ProjectOverviewProps> = ({
	githubRepoUrl,
	teamMembers = [],
	onInviteTeam,
	isArchived = false,
}) => {
	const repoName = githubRepoUrl.split("/").pop() || githubRepoUrl;

	return (
		<div className="flex flex-col lg:flex-row gap-4 w-full">
			{/* GitHub Repository Section */}
			<div className="flex-1 min-w-0 flex flex-col gap-2 border border-border rounded-lg bg-card dark:bg-gray-900 dark:border-gray-700">
				<div className="rounded-md w-full flex items-center flex-row  gap-3 p-4 hover:bg-primary/10 hover:text-primary transition-colors duration-200 dark:hover:bg-gray-800 dark:hover:text-primary">
					<GithubIcon className="h-7 w-7 flex-shrink-0 text-muted-foreground" />
					<div className="min-w-0 flex-1">
						<p className="text-sm font-medium text-foreground mb-1">
							Repository Link
						</p>
						<a
							href={githubRepoUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="group flex items-center gap-2 text-primary hover:underline"
							aria-label={`Open ${repoName} repository in new tab`}
						>
							<p className="text-sm font-medium text-foreground flex gap-2 truncate">
								<span>{githubRepoUrl}</span>
								<ExternalLink
									className="h-4 w-4 flex-shrink-0 transition-colors
									text-muted-foreground group-hover:text-primary"
								/>
							</p>
						</a>
					</div>
				</div>
			</div>

			{/* Team Management Section */}
			<div className="flex-1 min-w-0 flex">
				<div
					className="w-full flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 
            rounded-lg border border-border bg-card
            dark:bg-gray-900 dark:border-gray-700 hover:bg-primary/10 hover:text-primary transition-colors duration-200"
				>
					{/* Team Members Display */}
					<div className="flex items-center gap-3 flex-1 min-w-0">
						<User2Icon className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
						<p className="text-sm font-medium text-foreground truncate">
							{teamMembers.length} Team Member
							{teamMembers.length !== 1 ? "s" : ""}
						</p>
					</div>

					{/* Action Buttons */}
					<div className="flex items-center gap-3 w-full sm:w-auto">
						<Button
							onClick={onInviteTeam}
							className="flex-1 sm:flex-none"
							disabled={isArchived}
						>
							Invite Team
						</Button>
						<Button
							variant="secondary"
							className="flex-1 sm:flex-none gap-2"
							disabled={isArchived}
						>
							<ArchiveIcon className="h-4 w-4" />
							Archive
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProjectOverview;
