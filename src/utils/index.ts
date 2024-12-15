export const getShortTitle = (title: string) => {
	const words = title.trim().toUpperCase().split(" ");
	if (words.length > 1) {
		// Take first 2 characters from the first and second words
		return words[0].slice(0, 1) + words[1].slice(0, 1);
	}
	return words[0].slice(0, 2);
};

export const wait = (sec: number) =>
	new Promise((resolve) => setTimeout(resolve, sec * 1000));

export const fetcher = async (url: string) => {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error("Network response was not ok");
	}
	return await response.json();
};
