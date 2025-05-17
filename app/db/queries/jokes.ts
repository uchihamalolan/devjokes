import { eq } from "drizzle-orm";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";

import { db } from "../db";
import { jokes } from "../schema";

const insertJokeSchema = createInsertSchema(jokes);
const updateJokeSchema = createUpdateSchema(jokes);

export const createJoke = async (data: unknown) => {
	const parsed = insertJokeSchema.parse(data);
	return await db.insert(jokes).values(parsed).returning();
};

export const getJokes = async () => {
	return await db.query.jokes.findMany({
		limit: 100,
	});
};

export const getJoke = async (id: string) => {
	return await db.query.jokes.findFirst({
		where: eq(jokes.id, id),
	});
};

export const updateJoke = async (id: string, data: unknown) => {
	const parsed = updateJokeSchema.parse(data);
	return await db.update(jokes).set(parsed).where(eq(jokes.id, id)).returning();
};

export const deleteJoke = async (id: string) => {
	return await db.delete(jokes).where(eq(jokes.id, id));
};

export type Joke = typeof jokes.$inferSelect;
