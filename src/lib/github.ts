// import "server-only";

import { env } from "@/env";
import { Octokit } from "octokit";
import { prisma } from "./prisma";
import { aiAummarizeGitCommit } from "./gemini";

interface CommitData {
	commitHash: string;
	commitMessage: string;
	commitAuthorName: string;
	commitAuthorEmail: string;
	commitAuthorAvatar: string;
	commitDate: Date;
}
export const octokit = new Octokit({
	auth: env.GITHUB_TOKEN,
});

console.debug("🚀 ~ env.GITHUB_TOKEN:", env.GITHUB_TOKEN);

export const isPrivateRepo = async (repoUrl: string): Promise<boolean> => {
	const response = await octokit.request("GET /repos/{owner}/{repo}", {
		owner: repoUrl.split("/")[3],
		repo: repoUrl.split("/")[4],
	});

	return response.data.private;
};

export const fetchProjectGithubUrl = async (projectId: string) => {
	const project = await prisma.project.findUnique({
		where: { id: projectId },
		select: { githubUrl: true, userId: true },
	});
	if (!project) {
		throw new Error("Project not found");
	}
	return {
		project,
		githubUrl: project.githubUrl,
	};
};

export const getCommitHashes = async (
	repoUrl: string,
	perPage: number = 1,
	page: number = 1
): Promise<CommitData[]> => {
	const { data } = await octokit.rest.repos.listCommits({
		owner: repoUrl.split("/")[3],
		repo: repoUrl.split("/")[4],
		per_page: perPage,
		page: page,
	});

	const commitHashes: CommitData[] = data.map((commit) => {
		return {
			commitHash: commit.sha,
			commitAuthorName: commit.committer?.name ?? "",
			commitAuthorEmail: commit.author?.email ?? "",
			commitMessage: commit.commit?.message ?? "",
			commitDate: new Date(commit.commit?.committer?.date ?? ""),
			commitAuthorAvatar: commit.author?.avatar_url ?? "",
		};
	});

	return commitHashes;
};

export const pullCommits = async (projectId: string) => {
	const { githubUrl } = await fetchProjectGithubUrl(projectId);
	const commitHashes = await getCommitHashes(githubUrl);

	const unProcessedCommits = await getFilterCommits(projectId, commitHashes);

	const summaryResponses = await Promise.allSettled(
		unProcessedCommits.map(async (commit) => {
			return await summarizeGitCommit(githubUrl, commit.commitHash);
		})
	);
	const summaries = summaryResponses.map((summary) =>
		summary.status === "fulfilled" ? (summary.value as string) : ""
	);

	//add into database
	const commits = await prisma.commit.createManyAndReturn({
		data: summaries.map((summary, index) => ({
			projectId,
			commitHash: unProcessedCommits[index].commitHash,
			commitMessage: unProcessedCommits[index].commitMessage,
			commitAuthorName: unProcessedCommits[index].commitAuthorName,
			commitAuthorEmail: unProcessedCommits[index].commitAuthorEmail,
			commitAuthorAvatar: unProcessedCommits[index].commitAuthorAvatar,
			commitDate: unProcessedCommits[index].commitDate,
			summary,
		})),
	});

	return commits;
};

export const getFilterCommits = async (
	projectId: string,
	commitHashes: CommitData[]
) => {
	const processedCommits = await prisma.commit.findMany({
		where: {
			projectId,
		},
		select: {
			commitHash: true,
		},
	});

	const processedCommitHashes = new Set(
		processedCommits.map((commit) => commit.commitHash)
	);

	const newCommits = commitHashes.filter(
		(commit) => !processedCommitHashes.has(commit.commitHash)
	);

	return newCommits;
};

export const summarizeGitCommit = async (
	githubUrl: string,
	commitHash: string
) => {
	const response = await fetch(`${githubUrl}/commit/${commitHash}.diff`, {
		headers: {
			Authorization: `token ${env.GITHUB_TOKEN}`,
			Accept: "application/vnd.github.v3.diff",
		},
		method: "GET",
	});

	if (!response.ok) {
		return "Failed to fetch commit diff";
	}
	const text = await response.text(); // Use response.text() instead of response.json()

	const aiSummary = await aiAummarizeGitCommit(text.slice(0, 50));
	return aiSummary;
};

//test
// getCommitHashes("https://github.com/arunkumar201/github-ragify-ai")
// 	.then((data) => {
// 		console.log(data);
// 	})
// 	.catch((error) => {
// 		console.error(error);
// 	});

// summarizeGitCommit(
// 	"https://github.com/arunkumar201/github-ragify-ai",
// 	"e2e3a272c40ed0bf2ff232c397e6a3611b38c1ea"
// ).then((res) => {
// 	console.log(res);
// });
