"use server";

import {
	TCreateProjectForm,
	ZCreateProjectForm,
} from "@/app/(dashboard)/schema";
import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { getPrismaErrorByCode } from "../utils/prisma-utils";
import { revalidateTag, unstable_cache } from "next/cache";
import { CACHE_TIME } from "..";
import { pullCommits } from "@/lib/github";

export const createProjectAction = async (data: TCreateProjectForm) => {
	let project;
	try {
		const userAuth = await auth();
		if (!userAuth.userId) {
			throw new Error("User not authenticated. Please sign in first.");
		}

		const parseCreateProject = await ZCreateProjectForm.parseAsync(data);

		//save it to database
		project = await prisma.project.create({
			data: {
				name: parseCreateProject.projectName,
				githubUrl: parseCreateProject.githubUrl,
				userId: userAuth.userId,
			},
		});
		await pullCommits(project.id);

		revalidateTag(`user-${userAuth.userId}`);

		return {
			message: "Project created successfully!",
			data: {
				projectId: project.id,
			},
		};
	} catch (error: unknown) {
		if (error instanceof ZodError) {
			const errorMessages = error.errors.map((err) => err.message);
			console.error("ZodError in createProjectAction:", errorMessages);
			throw new Error(errorMessages[0]);
		} else if (error instanceof Prisma.PrismaClientKnownRequestError) {
			console.error(
				"PrismaClientKnownRequestError in createProjectAction:",
				error.code
			);
			const errorMessages = getPrismaErrorByCode(error.code);
			throw new Error(errorMessages);
		}
		throw new Error(`Unexpected error: ${(error as Error).message}`);
	}
};

export const getAllUserProjectsAction = async () => {
	const userAuth = await auth();
	if (!userAuth.userId) {
		throw new Error("User not authenticated. Please sign in first.");
	}

	return unstable_cache(
		async () => {
			try {
				const projects = await prisma.project.findMany({
					where: {
						userId: userAuth.userId,
					},
					orderBy: {
						createdAt: "desc",
					},
				});

				return {
					message: "Projects fetched successfully!",
					data: projects,
				};
			} catch (error: unknown) {
				console.error("Error in getAllUserProjectsAction:", error);
				throw new Error("Failed to fetch projects. Please try again later.");
			}
		},
		[`all-projects-user-${userAuth.userId}`],
		{
			tags: [`user-${userAuth.userId}`],
			revalidate: CACHE_TIME,
		}
	)();
};

export const pullCommitsAction = async (projectId: string) => {
	const userAuth = await auth();
	if (!userAuth.userId) {
		throw new Error("User not authenticated. Please sign in first.");
	}
	return unstable_cache(
		async () => {
			try {
				const commits = await prisma.commit.findMany({
					where: {
						projectId,
					},
				});
				return {
					message: "Commits pulled successfully!",
					data: commits,
				};
			} catch (error: unknown) {
				console.error("Error in pullCommitsAction:", error);
				throw new Error("Failed to pull commits. Please try again later.");
			}
		},
		[`pull-commits-${projectId}`],
		{
			tags: [`project-${projectId}`],
			revalidate: CACHE_TIME,
		}
	)();
};
