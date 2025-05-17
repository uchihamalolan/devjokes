import { createFileRoute, useRouter } from "@tanstack/react-router";

import { JokesList } from "~/components/jokes-list";
import { getJokes } from "~/server-fns/jokes";

function Home() {
	const router = useRouter();
	const jokes = Route.useLoaderData();

	return (
		<div className="p-4 flex flex-col">
			<h1 className="text-2xl">DevJokes</h1>
			<JokesList jokes={jokes} />
		</div>
	);
}

export const Route = createFileRoute("/")({
	component: Home,
	loader: async () => {
		// Load jokes data when the route is accessed
		return getJokes();
	},
});
