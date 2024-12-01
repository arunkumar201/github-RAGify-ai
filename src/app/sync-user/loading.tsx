import React from "react";
import { Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function SyncUserLoading() {
	return (
		<div className="flex h-screen w-full items-center justify-center shadow-lg bg-gradient-to-br from-background to-primary/10 p-4">
			<Card className="w-full max-w-md shadow-xl border-primary/20 hover:shadow-2xl transition-shadow duration-300">
				<CardContent className="flex flex-col items-center justify-center space-y-6 p-8">
					<div className="animate-pulse">
						<Loader2 className="h-16 w-16 text-primary animate-spin" />
					</div>
					<div className="text-center space-y-3">
						<h1 className="text-3xl font-semibold text-foreground">
							Syncing User
						</h1>
						<p className="text-muted-foreground text-sm">
							Please wait while we synchronize your data
						</p>
					</div>
					<Progress value={50} className="w-full" />
				</CardContent>
			</Card>
		</div>
	);
}
