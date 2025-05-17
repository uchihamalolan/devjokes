import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema,
} from "drizzle-zod";

export const jokes = pgTable("jokes", {
	id: uuid("id").primaryKey(),
	question: text("question").notNull(),
	answer: text("answer").notNull(),
	createdAt: timestamp("created_at").notNull().defaultNow(),
});
