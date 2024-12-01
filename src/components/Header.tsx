import Link from "next/link";

export const AppHeader = () => {
	return (
		<>
			<header className="shadow-md border-primary border-b-[1px] rounded-b-lg bg-secondary dark:bg-secondary-foreground  py-4 px-6 md:px-12 lg:px-24">
				<nav className="flex items-center justify-between dark:text-primary-foreground text-primary">
					<Link href="/" className="font-bold">
						Gtihub RAGify AI
					</Link>
					<div className="flex items-center ml-auto">
						<a href="/about" className="font-bold">
							About
						</a>
						<a href="/contact" className="ml-4 font-bold">
							Contact
						</a>
					</div>
				</nav>
			</header>
		</>
	);
};
