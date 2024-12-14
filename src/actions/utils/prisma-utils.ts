import { prismaErrorMap } from "@/constants/prisma-msg";

export function getPrismaErrorByCode(code: string): string {
	for (const category in prismaErrorMap) {
		const errorCategory = prismaErrorMap[category] as {
			[code: string]: string;
		};
		if (errorCategory[code]) {
			return errorCategory[code];
		}
	}
	return "unexpected error";
}
