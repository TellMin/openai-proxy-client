<script lang="ts">
	import { useChat } from 'ai/svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { input, handleSubmit, messages } = useChat({
		api: data.api,
		headers: {
			Authorization: `Bearer ${data.token}`
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
