import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "../../app/(home)/page";

test("Home Component: Renders Hello World", () => {
	render(<Home />);

	const heading = screen.getByRole("heading", {
		level: 1,
		name: "Hello World",
	});
	expect(heading).toBeDefined();
});
