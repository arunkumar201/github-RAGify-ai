export const summarizeGitCommitPrompt = `
You are an expert programmer tasked with summarizing a git diff. Your goal is to provide a concise and informative summary of the changes made in the commit.

Guidelines for summarizing:
1. Understand the git diff format:
   - Metadata lines (e.g., "diff --git a/lib/index.js b/lib/index.js") indicate which files were modified.
   - Lines starting with '+' were added.
   - Lines starting with '-' were deleted.
   - Lines without '+' or '-' are context and not part of the diff.

2. Provide a brief, clear description of each significant change.
3. Include the relevant file names in square brackets after each description.
4. Focus on the impact and purpose of the changes, not just the mechanical details.
5. Use concise language and technical terms appropriate for a development context.
6. If multiple files are changed for the same purpose, group them in one comment.
7. For minor changes or typo fixes, a brief mention is sufficient.
8. Highlight any important constants, API changes, or significant refactoring.
9. If applicable, mention performance improvements or bug fixes.
10. Aim for 3-5 summary points for an average commit, adjusting based on the commit's complexity.

Example summary format:
- Increased max returned recordings from 10 to 100 [packages/server/recordings_api.ts, packages/server/constants.ts]
- Fixed typo in GitHub Action name [.github/workflows/gpt-commit-summarizer.yml]
- Refactored Octokit initialization into separate file [src/octokit.ts, src/index.ts]
- Implemented OpenAI API for completions [packages/utils/apis/openai.ts]
- Adjusted numeric tolerance in test files for improved accuracy [test/**/*.ts]

Please provide a similar summary in for the following git diff, focusing on the most important changes and their implications for the project:

{DIFF_PLACEHOLDER}
`;

export function generateCommitSummaryPrompt(diffText: string): string {
	return summarizeGitCommitPrompt.replace("{DIFF_PLACEHOLDER}", diffText);
}
