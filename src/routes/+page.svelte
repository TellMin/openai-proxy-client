<script lang="ts">
	import { useChat, type Message } from 'ai/svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const { input, handleSubmit, messages, append } = useChat({
		api: data.api,
		headers: {
			Authorization: `Bearer ${data.token}`
		},
		body: {
			functions: [
				{
					name: 'tomorrows_weather',
					description: "Get tomorrow's weather",
					parameters: {
						type: 'object',
						properties: {
							date: { type: 'string' }
						}
					}
				}
			]
		},
		onFinish: (responseMessage: Message) => {
			saveResponseMessage(responseMessage);
			const lastMessage = $messages[$messages.length - 1];
			if (lastMessage.content.startsWith('{')) {
				append({
					content: 'Very Sunny',
					role: 'function',
					name: 'tomorrows_weather',
					createdAt: new Date()
				});
			}
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
				{#if !message.content.startsWith('{') && message.role !== 'function'}
					<li>
						{message.role}: {message.content}
					</li>
				{/if}
			{/each}
		</ul>
	</div>
</main>
