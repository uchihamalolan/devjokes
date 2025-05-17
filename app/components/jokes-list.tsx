import type { Joke } from "../types";

interface JokesListProps {
	jokes: Joke[];
}

export function JokesList({ jokes }: JokesListProps) {
	if (!jokes || jokes.length === 0) {
		return <p>No jokes found. Add some!</p>;
	}

	return (
		<div>
			<h2 className="text-xl">Jokes Collection</h2>
			<ul className="my-4 flex flex-col gap-2 w-5xl">
				{jokes.map((joke) => (
					<li className="bg-base-300 p-4 rounded-box" key={joke.id}>
						<p className="uppercase font-semibold opacity-60">
							{joke.question}
						</p>
						<p className="list-col-wrap text-lg">{joke.answer}</p>
					</li>
				))}
			</ul>
		</div>
	);
}
