import { SignUp } from "@clerk/nextjs";

export default function SignPage() {
	return (
		<div className="flex flex-col items-center justify-center mt-4">
			<SignUp />;
		</div>
	);
}
