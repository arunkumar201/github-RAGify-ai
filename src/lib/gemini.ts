// import "server-only";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { env } from "@/env";
import { generateCommitSummaryPrompt } from "@/prompts/summarizeCommit";

const genAIClient = new GoogleGenerativeAI(env.GOOGLE_GEMENI_API_KEY);

const genAIModel = genAIClient.getGenerativeModel({
	model: "gemini-1.5-pro",
});

export const aiAummarizeGitCommit = async (diff: string): Promise<string> => {
	console.debug("🚀 ~ aiAummarizeGitCommit ~ diff:", diff);

	const prompt = generateCommitSummaryPrompt(diff);

	try {
		const result = await genAIModel.generateContent({
			contents: [{ role: "user", parts: [{ text: prompt }] }],
			generationConfig: {},
		});

		const response = result.response;
		if (!response.candidates || response.candidates.length === 0) {
			throw new Error("No response generated");
		}

		return response.text();
	} catch (error) {
		console.error("Error summarizing git commit:", error);
		throw new Error("Failed to summarize git commit");
	}
};
