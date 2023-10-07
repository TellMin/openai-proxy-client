<script lang="ts">
	import { useChat, type Message } from 'ai/svelte';
	import type { PageData } from './$types';
	import { functionCallHandler } from '$lib/functionCallHandler';
	import { saveResponseMessage } from '$lib/saveResponseMessage';
	import { functions } from '$lib/functions';

	export let data: PageData;

	const { input, handleSubmit, messages } = useChat({
		api: data.api,
		experimental_onFunctionCall: functionCallHandler,
		headers: {
			Authorization: `Bearer ${data.token}`
		},
		body: {
			functions
		},
		onFinish: (responseMessage: Message) => {
			saveResponseMessage(responseMessage);
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
				{#if message.role !== 'function' && message.content && !message.content.startsWith('{')}
					<li>{message.role}: {message.content}</li>
				{/if}
			{/each}
		</ul>
	</div>
</main>
