import { eq } from "drizzle-orm";
import { createInsertSchema, createUpdateSchema } from "drizzle-zod";

import { db } from "../neon";
import { jokes } from "../schema";

const insertUserSchema = createInsertSchema(jokes);
const updateUserSchema = createUpdateSchema(jokes);

export const createJoke = async (data: unknown) => {
	const parsed = insertUserSchema.parse(data);
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
	const parsed = updateUserSchema.parse(data);
	return await db.update(jokes).set(parsed).where(eq(jokes.id, id)).returning();
};

export const deleteJoke = async (id: string) => {
	return await db.delete(jokes).where(eq(jokes.id, id));
};
