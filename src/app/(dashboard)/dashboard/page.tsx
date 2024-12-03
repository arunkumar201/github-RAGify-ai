import { currentUser } from "@clerk/nextjs/server";

const DashboardPage = async () => {
	const user = await currentUser();
	console.log("User:", user);
	return (
		<div>
			<h1>Welcome to your dashboard</h1>
			<p>Logged in as: {user?.emailAddresses[0].emailAddress}</p>
		</div>
	);
};

export default DashboardPage;
