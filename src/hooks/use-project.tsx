"use client";

import { getAllUserProjectsAction } from "@/actions";
import { useQuery } from "@tanstack/react-query";

export const useProject = () => {
	const { data, isLoading, isError, error } = useQuery({
		queryKey: ["projects"],
		queryFn: async () => {
			const projects = await getAllUserProjectsAction();
			return projects;
		},
	});

	return {
		data: data?.data,
		isLoading,
		isError,
		error,
	};
};
