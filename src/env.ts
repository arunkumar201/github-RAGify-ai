import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
	client: {
		NEXT_PUBLIC_WEB_URL: z.string(),
		NEXT_PUBLIC_CLERK_SIGN_IN_URL: z.string(),
		NEXT_PUBLIC_CLERK_SIGN_UP_URL: z.string(),
		NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL: z.string(),
		NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string(),
	},
	server: {
		GITHUB_TOKEN: z.string(),
		DATABASE_URL: z.string(),
		CLERK_SECRET_KEY: z.string(),
		GOOGLE_GEMENI_API_KEY: z.string(),
		NODE_ENV: z.enum(["development", "test", "production"]),
	},
	runtimeEnv: {
		NEXT_PUBLIC_WEB_URL: process.env.NEXT_PUBLIC_WEB_URL,
		NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
		NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
		NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL:
			process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL,
		GITHUB_TOKEN: process.env.GITHUB_TOKEN,
		DATABASE_URL: process.env.DATABASE_URL,
		CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
		NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
			process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
		GOOGLE_GEMENI_API_KEY: process.env.GOOGLE_GEMENI_API_KEY,
		NODE_ENV: process.env.NODE_ENV,
	},
});
