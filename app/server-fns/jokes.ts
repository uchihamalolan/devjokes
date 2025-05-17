import { createServerFn } from "@tanstack/react-start";
import { z } from "zod/v4";

import { createJoke, getJokes as getJokesFromDb } from "~/db/queries/jokes";

const NewJoke = z.object({
	question: z.string(),
	answer: z.string(),
});

export const getJokes = createServerFn({ method: "GET" }).handler(async () => {
	const jokes = await getJokesFromDb();

	if (!jokes) return [];

	return jokes;
});

export const addJoke = createServerFn({ method: "POST" })
	.validator((data: unknown) => {
		return NewJoke.parse(data);
	})
	.handler(async ({ data }) => {
		try {
			const savedNewJoke = await createJoke(data);
			return savedNewJoke[0];
		} catch (error) {
			console.error("Failed to add joke:", error);
			throw new Error("Failed to add joke");
		}
	});
