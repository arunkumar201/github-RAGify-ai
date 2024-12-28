"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { MessageSquareIcon, CalendarIcon, SendIcon } from "lucide-react";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
	DialogFooter,
} from "@/components/ui/dialog";

interface ProjectInteractionSectionProps {
	id?: string;
}

export const ProjectInteractionSection: React.FC<
	ProjectInteractionSectionProps
> = () => {
	const [question, setQuestion] = useState("");
	const [isAskingQuestion, setIsAskingQuestion] = useState(false);
	const [meetingTitle, setMeetingTitle] = useState("");
	const [meetingDescription, setMeetingDescription] = useState("");
	const [isCreatingMeeting, setIsCreatingMeeting] = useState(false);

	const handleAskQuestion = async () => {
		if (!question.trim()) return;

		try {
			setIsAskingQuestion(true);
			setQuestion("");
		} catch (error) {
			console.error("Failed to ask question:", error);
		} finally {
			setIsAskingQuestion(false);
		}
	};

	const handleCreateMeeting = async () => {
		if (!meetingTitle.trim() || !meetingDescription.trim()) return;

		try {
			setIsCreatingMeeting(true);
			setMeetingTitle("");
			setMeetingDescription("");
		} catch (error) {
			console.error("Failed to create meeting:", error);
		} finally {
			setIsCreatingMeeting(false);
		}
	};

	return (
		<div className="flex flex-row w-full gap-2">
			{/* Ask Question Card */}
			<div className="relative w-full md:w-[60%] ">
				<Card className="hover:border-primary transition-colors duration-200 dark:hover:border-primary  dark:bg-gray-900">
					<CardHeader>
						<div className="flex items-center gap-2">
							<MessageSquareIcon className="h-5 w-5 text-primary" />
							<CardTitle>Ask a question</CardTitle>
						</div>
						<CardDescription>
							Ask questions related to your project and get answers from the
							community.
						</CardDescription>
					</CardHeader>
					<CardContent className="max-h-[8rem]">
						<div className="space-y-2">
							<Textarea
								placeholder="Ask a question..."
								value={question}
								onChange={(e) => setQuestion(e.target.value)}
								className="min-h-[100px] resize-none"
							/>
						</div>
					</CardContent>
					<CardFooter className="justify-end">
						<Button
							onClick={handleAskQuestion}
							disabled={!question.trim() || isAskingQuestion}
							className="gap-2"
						>
							Ask
							<SendIcon className="h-4 w-4" />
						</Button>
					</CardFooter>
				</Card>
			</div>
			{/* Create Meeting Card */}
			<div className="relative w-full md:w-[40%] ">
				<Card className="hover:border-primary transition-colors duration-200 dark:hover:border-primary  dark:bg-gray-900">
					<CardHeader>
						<CardTitle className="w-full flex flex-col items-center justify-center gap-2">
							<CalendarIcon className="h-16 w-16 text-primary motion-preset-oscillate motion-duration-1000" />
							<span className="text-base font-medium">Schedule Meeting</span>
						</CardTitle>
						<CardDescription className="w-full text-center">
							Create a new meeting to discuss project details with your team.
						</CardDescription>
					</CardHeader>
					<CardContent className="max-h-[7rem] h-[7rem] ">
						<Dialog>
							<DialogTrigger asChild className="">
								<div className="w-full flex justify-center items-center">
									<Button className="w-fit gap-2">
										<CalendarIcon className="h-4 w-4" />
										Create a new meeting
									</Button>
								</div>
							</DialogTrigger>
							<DialogContent className="sm:max-w-[425px]">
								<DialogHeader>
									<DialogTitle>Schedule New Meeting</DialogTitle>
									<DialogDescription>
										Set up a new meeting with your team members.
									</DialogDescription>
								</DialogHeader>
								<div className="grid gap-4 py-4">
									<div className="space-y-2">
										<label
											htmlFor="meeting-title"
											className="text-sm font-medium"
										>
											Meeting Title
										</label>
										<Input
											id="meeting-title"
											placeholder="Enter meeting title..."
											value={meetingTitle}
											onChange={(e) => setMeetingTitle(e.target.value)}
										/>
									</div>
									<div className="space-y-2">
										<label
											htmlFor="meeting-description"
											className="text-sm font-medium"
										>
											Description
										</label>
										<Textarea
											id="meeting-description"
											placeholder="Enter meeting description..."
											value={meetingDescription}
											onChange={(e) => setMeetingDescription(e.target.value)}
											className="min-h-[100px]"
										/>
									</div>
								</div>
								<DialogFooter>
									<Button
										onClick={handleCreateMeeting}
										disabled={
											!meetingTitle.trim() ||
											!meetingDescription.trim() ||
											isCreatingMeeting
										}
										className="gap-2"
									>
										Schedule Meeting
										<CalendarIcon className="h-4 w-4" />
									</Button>
								</DialogFooter>
							</DialogContent>
						</Dialog>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};
