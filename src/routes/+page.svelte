<script>
	import { useChat } from 'ai/svelte';

	const { input, handleSubmit, messages } = useChat({
		api: 'http://127.0.0.1:8787/',
		headers: {
			Authorization: 'Bearer ' + 'token'
		}
	});
</script>

<main>
	<div>
		<form on:submit={handleSubmit}>
			<input bind:value={$input} />
			<button type="submit">Send</button>
		</form>
		<ul>
			{#each $messages as message}
				<li>{message.role}: {message.content}</li>
			{/each}
		</ul>
	</div>
</main>
