<script>
	// @ts-nocheck

	import Button from '$lib/components/utils/Button.svelte';
	import Link from '$lib/components/utils/Link.svelte';
	import { onMount } from 'svelte';
	import sessionAdminController from '../../../../logic/sessionAdminController';

	export let title = 'Title';
	export let btn = {};
	export let back = false;
	export let href = '#';

	let user = null;

	onMount(async () => {
		user = await sessionAdminController.getUser();
	});
</script>

{#await user then}
	{#if user}
		<div class="flex w-full justify-between">
			<div class="flex flex-col">
				<h2 class="flex flex-col justify-end font-semibold text-3xl">{title}</h2>
				{#if back}
					<div class="flex">
						<Link text="Volver" href={href} type="text-neutral text-sm mt-3" />
					</div>
				{/if}
			</div>

			{#if Object.keys(btn).length !== 0 && user.role === 'ADMIN'}
				<div class="flex">
					<Button text={btn.name} click={btn.btnEvent} />
				</div>
			{/if}
		</div>
	{/if}
{/await}
