import { createServerFn } from "@tanstack/react-start";
import type { Joke } from "~/types";

import { notFound } from "@tanstack/react-router";
import { z } from "zod/v4";
import { redis } from "~/db/redis";

const NewJoke = z.object({
	question: z.string(),
	answer: z.string(),
});

export const getJokes = createServerFn({ method: "GET" }).handler(async () => {
	const jokes = await redis.get<Joke[]>("jokes");

	if (!jokes) return [];

	return jokes;
});

export const addJoke = createServerFn({ method: "POST" })
	.validator((data: unknown) => {
		return NewJoke.parse(data);
	})
	.handler(async ({ data }) => {
		try {
			// Read the existing jokes from the file
			const jokesData = await getJokes();

			// Create a new joke with a unique ID
			const newJoke: Joke = {
				id: crypto.randomUUID(),
				question: data.question,
				answer: data.answer,
			};

			// Add the new joke to the list
			const updatedJokes = [...jokesData, newJoke];

			// Write the updated jokes back to the file
			await redis.set("jokes", updatedJokes);

			return newJoke;
		} catch (error) {
			console.error("Failed to add joke:", error);
			throw new Error("Failed to add joke");
		}
	});
