"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { TCreateProjectForm, ZCreateProjectForm } from "../schema";
import { Label } from "@/components/ui/label";
import { FolderDot, GithubIcon, KeyRound } from "lucide-react";
import { ZodError } from "zod";
import { createProjectAction } from "@/actions";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const CreateProject = () => {
	const { register, handleSubmit, reset } = useForm<TCreateProjectForm>();
	const [isCreating, setIsCreating] = useState(false);
	const queryClient = useQueryClient();
	const router = useRouter();

	const onSubmit = async (data: TCreateProjectForm) => {
		setIsCreating(true);
		try {
			const parseCreateProject = await ZCreateProjectForm.parseAsync(data);
			console.log("Parsed data:", parseCreateProject.githubUrl);
			const response = await createProjectAction(parseCreateProject);
			toast.success(response.message);
			console.log("Response:", response);
			await queryClient.invalidateQueries({
				queryKey: ["projects"],
			});
			router.push(`/dashboard/projects/${response.data.projectId}`);
		} catch (error) {
			if (error instanceof ZodError) {
				const errors = error.errors.map((err) => err);
				console.log(errors, "erros while creating project");
				toast.error(errors[0].message);
			} else if (error instanceof Error) {
				console.error(`Unexpected error: ${error.message}`);
				toast.error(error.message);
			} else {
				console.error(`Unknown error: ${error}`);
			}
		} finally {
			reset();
			setIsCreating(false);
		}
	};

	return (
		<main className="h-full flex flex-col items-center justify-center p-5">
			<section className="flex flex-row  gap-4 items-center justify-center">
				<div className="hidden md:flex flex-col gap-2 items-center justify-center">
					<Image
						src={"/create-project.avif"}
						className="w-[450px] h-[420px] rounded-2xl bg-transparent"
						alt="Create Project Logo"
						width={300}
						height={300}
					/>
				</div>
				<div className="relative flex flex-col gap-2 items-center justify-center border border-gray-300 rounded-md p-5">
					<header>
						<h1 className="text-2xl font-bold text-secondary-foreground">
							Link your project to your GitHub repository
						</h1>
						<p className="text-sm text-muted-foreground text-center mb-3">
							Enter the GitHub URL of your project and the name of your project.
						</p>
						<div className="h-px w-full bg-secondary-foreground absolute right-[1.5] ml-6"></div>
					</header>
					{/* break line */}
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="flex flex-col gap-4 w-full mt-3"
						aria-label="Create Project Form"
					>
						<div className="flex flex-col gap-2">
							<Label htmlFor="projectName" className="flex items-center gap-2">
								<FolderDot className="h-5 w-5 text-secondary-foreground" />
								<span>Project Name</span>
							</Label>
							<input
								{...register("projectName", { required: true })}
								placeholder="Project Name"
								id="projectName"
								className="w-full rounded-sm p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
								aria-required="true"
							/>
						</div>
						<div className="flex flex-col gap-2">
							<Label htmlFor="githubUrl" className="flex items-center">
								<GithubIcon className="h-5 w-5 text-secondary-foreground" />
								<span className="ml-1">GitHub URL</span>
							</Label>
							<input
								{...register("githubUrl", { required: true })}
								placeholder="GitHub URL"
								type="url"
								id="githubUrl"
								className="w-full rounded-sm p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
								aria-required="true"
							/>
						</div>

						<div className="flex flex-col gap-2">
							<Label htmlFor="githubToken" className="flex items-center">
								<KeyRound className="h-5 w-5 text-secondary-foreground" />
								<span className="ml-1">GitHub Token</span>
							</Label>
							<input
								{...register("githubToken", { required: false })}
								placeholder="GitHub Token (Optional)"
								id="githubToken"
								className="w-full rounded-sm p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
								aria-required="true"
							/>
						</div>
						<div className="flex justify-start mt-2">
							<Button
								type="submit"
								variant={"default"}
								className=""
								disabled={isCreating}
							>
								Create Project
							</Button>
						</div>
					</form>
				</div>
			</section>
		</main>
	);
};
