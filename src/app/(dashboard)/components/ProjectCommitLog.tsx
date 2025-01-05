import { pullCommitsAction } from "@/actions/dashboard";
import React, { Suspense } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
	GitCommit,
	User,
	Calendar,
	Mail,
	MessageSquare,
	FileText,
} from "lucide-react";
import { Commit } from "@prisma/client";

interface ProjectCommitLogProps {
	projectId: string;
}

const CommitCard = ({ commit, index }: { commit: Commit; index: number }) => (
	<Card className="mb-4 group hover:shadow-md transition-all duration-200 border-border/50 dark:bg-card">
		<CardHeader className="p-4">
			<div className="flex items-center space-x-2">
				<GitCommit className="w-4 h-4 text-muted-foreground" />
				<CardTitle className="text-sm font-medium">
					Commit #{index + 1}
				</CardTitle>
			</div>
		</CardHeader>
		<CardContent className="p-4 pt-0">
			<div className="grid gap-4">
				<div className="grid grid-cols-[auto,1fr] gap-x-4 gap-y-2 text-sm">
					<div className="flex items-center text-muted-foreground">
						<User className="w-4 h-4 mr-2" />
						Author
					</div>
					<span className="font-medium">{commit.commitAuthorName}</span>

					<div className="flex items-center text-muted-foreground">
						<Mail className="w-4 h-4 mr-2" />
						Email
					</div>
					<span className="font-medium">{commit.commitAuthorEmail}</span>

					<div className="flex items-center text-muted-foreground">
						<Calendar className="w-4 h-4 mr-2" />
						Date
					</div>
					<span className="font-medium">
						{new Date(commit.commitDate).toLocaleString()}
					</span>
				</div>

				<div className="space-y-2">
					<div className="flex items-center text-muted-foreground">
						<MessageSquare className="w-4 h-4 mr-2" />
						Message
					</div>
					<div className="text-sm rounded-md bg-muted/50 p-3 dark:bg-muted/10">
						{commit.commitMessage}
					</div>
				</div>

				<div className="space-y-2">
					<div className="flex items-center text-muted-foreground">
						<FileText className="w-4 h-4 mr-2" />
						Summary
					</div>
					<div className="text-sm rounded-md bg-muted/50 p-3 dark:bg-muted/10">
						{commit.summary}
					</div>
				</div>
			</div>
		</CardContent>
	</Card>
);

const CommitSkeleton = () => (
	<Card className="mb-4">
		<CardHeader className="p-4">
			<div className="flex items-center space-x-2">
				<Skeleton className="w-4 h-4 rounded-full" />
				<Skeleton className="h-4 w-24" />
			</div>
		</CardHeader>
		<CardContent className="p-4 pt-0 space-y-4">
			<div className="space-y-2">
				{[...Array(3)].map((_, i) => (
					<div key={i} className="flex items-center space-x-2">
						<Skeleton className="w-4 h-4" />
						<Skeleton className="h-4 w-full" />
					</div>
				))}
			</div>
			<Skeleton className="h-20 w-full" />
			<Skeleton className="h-20 w-full" />
		</CardContent>
	</Card>
);

const CommitList = async ({ projectId }: { projectId: string }) => {
	const commits = await pullCommitsAction(projectId);

	return (
		<ScrollArea className="h-[calc(100vh-12rem)]">
			{commits.data.map((commit, index) => (
				<CommitCard key={index} commit={commit} index={index} />
			))}
		</ScrollArea>
	);
};

export const ProjectCommitLog = ({ projectId }: ProjectCommitLogProps) => {
	return (
		<Card className="w-full border-border/50 backdrop-blur-sm">
			<CardHeader className="border-b border-border/50">
				<div className="flex items-center justify-between">
					<CardTitle className="text-xl font-semibold">
						Commit History
					</CardTitle>
					<GitCommit className="w-5 h-5 text-muted-foreground" />
				</div>
			</CardHeader>
			<CardContent className="p-4">
				<Suspense
					fallback={
						<>
							{[...Array(3)].map((_, i) => (
								<CommitSkeleton key={i} />
							))}
						</>
					}
				>
					<CommitList projectId={projectId} />
				</Suspense>
			</CardContent>
		</Card>
	);
};
