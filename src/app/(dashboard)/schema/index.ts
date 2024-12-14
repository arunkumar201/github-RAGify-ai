import { z } from "zod";

const supportedUrlPatterns = [
	/^https:\/\/(www\.)?github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/,
];

export const ZCreateProjectForm = z.object({
	githubUrl: z
		.string()
		.url()
		.refine(
			(value) => {
				return supportedUrlPatterns.some((pattern) => pattern.test(value));
			},
			{
				message:
					"Invalid URL format. Supported formats include GitHub repository URLs.",
			}
		),
	projectName: z.string(),
	githubToken: z.string().optional(),
});

export type TCreateProjectForm = z.infer<typeof ZCreateProjectForm>;
