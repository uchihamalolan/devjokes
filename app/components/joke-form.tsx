import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";

const { fieldContext, formContext } = createFormHookContexts();

const { useAppForm } = createFormHook({
	fieldComponents: {},
	formComponents: {},
	fieldContext,
	formContext,
});

export function JokeForm() {
	const router = useRouter();
	const [question, setQuestion] = useState("");
	const [answer, setAnswer] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	return (
		<form onSubmit={handleSubmit} className="flex flex-row gap-2 mb-6">
			{error && (
				<div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>
			)}

			<div className="flex flex-col sm:flex-row gap-4 mb-8">
				<input
					id="question"
					type="text"
					placeholder="Enter joke question"
					className="w-full p-2 border rounded focus:ring focus:ring-blue-300 flex-1"
					value={question}
					onChange={(e) => setQuestion(e.target.value)}
					required
				/>

				<input
					id="answer"
					type="text"
					placeholder="Enter joke answer"
					className="w-full p-2 border rounded focus:ring focus:ring-blue-300 flex-1 py-4"
					value={answer}
					onChange={(e) => setAnswer(e.target.value)}
					required
				/>

				<button
					type="submit"
					disabled={isSubmitting}
					className="bg-blue-500 hover:bg-blue-600 text-white font-medium rounded disabled:opacity-50 px-4"
				>
					{isSubmitting ? "Adding..." : "Add Joke"}
				</button>
			</div>
		</form>
	);
}
