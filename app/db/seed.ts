import { seed } from "drizzle-seed";
import { db } from "./db";
import * as schema from "./schema";

async function main() {
	await seed(db, schema, { count: 10 });
}

main();
