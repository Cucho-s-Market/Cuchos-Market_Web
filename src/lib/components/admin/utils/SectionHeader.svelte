<script>
	// @ts-nocheck

	import Button from '$lib/components/utils/Button.svelte';
	import Link from '$lib/components/utils/Link.svelte';
	import { onMount } from 'svelte';
	import sessionAdminController from '../../../../logic/sessionAdminController';

	export let title = 'Title';
	export let btn = {};
	export let back = false;

	let user = null;

	let getUser = (async () => {user = await sessionAdminController.getUser();});
</script>

<div class="flex w-full justify-between">
	<div class="flex flex-col">
		<h2 class="flex flex-col justify-end font-semibold text-3xl">{title}</h2>
		{#if back}
			<div class="flex">
				<Link text="Volver" type="text-neutral text-sm mt-3" />
			</div>
		{/if}
	</div>

	{#await getUser()}
		<!-- promise is pending -->
	{:then}
		{#if user.role === 'ADMIN'}
			{#if Object.keys(btn).length !== 0}
				<div class="flex">
					<Button text={btn.name} click={btn.btnEvent} />
				</div>
			{/if}
		{/if}
	{/await}
</div>
