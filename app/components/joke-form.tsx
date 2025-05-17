import { useForm } from "@tanstack/react-form";
import { useRouter } from "@tanstack/react-router";
import { z } from "zod/v4";

import { addJoke } from "~/server-fns/jokes";

export function JokeForm() {
	const router = useRouter();
	const form = useForm({
		defaultValues: {
			question: "",
			answer: "",
		},
		validators: {
			onChange: z.object({
				question: z.string().min(3),
				answer: z.string().min(3),
			}),
		},
		onSubmit: async ({ value }) => {
			try {
				await addJoke({
					data: value,
				});

				form.reset();
				router.invalidate();
			} catch (e) {
				console.error("Failed to add joke:", e);
			}
		},
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		form.handleSubmit();
	};
	const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		form.reset();
	};

	return (
		<form
			onSubmit={handleSubmit}
			onReset={handleReset}
			className="flex flex-row items-center gap-2 py-4"
		>
			<form.Field name="question">
				{(field) => (
					<input
						placeholder="Enter joke question"
						name={field.name}
						value={field.state.value}
						onBlur={field.handleBlur}
						onChange={(e) => field.handleChange(e.target.value)}
						type="text"
						className="input"
					/>
				)}
			</form.Field>

			<form.Field name="answer">
				{(field) => (
					<input
						placeholder="Enter joke answer"
						name={field.name}
						value={field.state.value}
						onBlur={field.handleBlur}
						onChange={(e) => field.handleChange(e.target.value)}
						type="text"
						className="input"
					/>
				)}
			</form.Field>

			<form.Subscribe
				selector={({ canSubmit, isSubmitting }) => ({
					canSubmit,
					isSubmitting,
				})}
			>
				{({ canSubmit, isSubmitting }) => (
					<div className="flex gap-2">
						<button
							className="btn btn-soft btn-success"
							type="submit"
							disabled={!canSubmit}
						>
							{isSubmitting ? "Adding..." : "Add Joke"}
						</button>
						<button className="btn btn-soft btn-error" type="reset">
							Reset
						</button>
					</div>
				)}
			</form.Subscribe>
		</form>
	);
}
