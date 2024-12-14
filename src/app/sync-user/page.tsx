import { prisma } from "@/lib/prisma";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function SyncUserPage() {
	const userId = (await auth()).userId;

	if (!userId) {
		return redirect("/sign-up");
	}

	const user = await (await clerkClient()).users.getUser(userId);

	//upsert the user to our database
	await prisma.user.upsert({
		where: {
			email: user.emailAddresses[0].emailAddress,
		},
		create: {
			email: user.emailAddresses[0].emailAddress,
			firstName: user.firstName,
			lastName: user.lastName,
			imageUrl: user.imageUrl,
			id: userId,
		},
		update: {
			firstName: user.firstName,
			lastName: user.lastName,
			imageUrl: user.imageUrl,
		},
	});

	return redirect("/dashboard");
}
