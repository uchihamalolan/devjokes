import * as fs from "node:fs";
import { createServerFn } from "@tanstack/react-start";
import type { Joke, JokesData } from "~/types";

import { z } from "zod/v4";

const JOKES_FILE = "app/data/jokes.json";

const NewJoke = z.object({
	question: z.string(),
	answer: z.string(),
});

export const getJokes = createServerFn({ method: "GET" }).handler(async () => {
	const jokes = await fs.promises.readFile(JOKES_FILE, "utf-8");
	return JSON.parse(jokes) as JokesData;
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
			await fs.promises.writeFile(
				JOKES_FILE,
				JSON.stringify(updatedJokes, null, 2),
				"utf-8",
			);

			return newJoke;
		} catch (error) {
			console.error("Failed to add joke:", error);
			throw new Error("Failed to add joke");
		}
	});
