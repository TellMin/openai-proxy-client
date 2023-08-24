<script lang="ts">
	import { useChat, type Message } from 'ai/svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { input, handleSubmit, messages } = useChat({
		api: data.api,
		headers: {
			Authorization: `Bearer ${data.token}`
		},
		onFinish: (responseMessage: Message) => {
			saveResponseMessage(responseMessage);
		}
	});

	const saveResponseMessage = async (responseMessage: Message) => {
		const response = await fetch('/save', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				message: responseMessage
			})
		});
		if (!response.ok) {
			console.error('Error saving response message');
		}
	};
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
