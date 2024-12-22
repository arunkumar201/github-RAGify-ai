import { Button } from "@/components/ui/button";
import { ExternalLink, GithubIcon } from "lucide-react";
import { FC } from "react";

interface IProjectOverview {
	githubRepoUrl: string;
}

export const ProjectOverview: FC<IProjectOverview> = ({ githubRepoUrl }) => {
	return (
		<div className="flex flex-row gap-2 justify-between items-center">
			{/* left section */}
			<div>
				{/* Github repo url  */}
				<div
					className="flex items-center gap-2 border hover:border-primary rounded-md p-3 transition duration-200 ease-in-out
				  bg-muted dark:bg-gray-900 dark:border-gray-700 dark:hover:border-primary dark:hover:bg-gray-800 group"
				>
					<GithubIcon className="h-6 w-6 text-gray-500 dark:text-white" />
					<a
						href={githubRepoUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="text-primary flex  truncate flex-row items-center"
					>
						<span className="font-bold truncate text-secondary-foreground dark:text-primary/80">
							This project is linked to
						</span>
						<p className="text-gray-500 ml-1 flex items-center gap-1 truncate">
							<span>{githubRepoUrl}</span>
							<ExternalLink className="h-4 w-4 text-gray-500 dark:text-gray-400 group-hover:text-green-500" />
						</p>
					</a>
				</div>
			</div>
			{/* right section - team members , invite button action , archive project button */}

			<div className="flex flex-auto items-center justify-between gap-2 border hover:border-primary rounded-md p-3 transition duration-200 ease-in-out bg-muted dark:bg-gray-900 dark:border-gray-700 dark:hover:border-primary dark:hover:bg-gray-800 group">
				<div className="">
					<div className="flex gap-1">
						<span className="text-gray-500 truncate">User3</span>
					</div>
				</div>
				<div className="flex items-center gap-2 ">
					<Button className="" size={"default"}>
						Invite Team
					</Button>
					<Button
						className="
					"
						variant={"outline"}
						size={"default"}
					>
						Archive Project
					</Button>
				</div>
			</div>
		</div>
	);
};
