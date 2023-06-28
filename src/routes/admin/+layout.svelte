<script>
	// @ts-nocheck

	import { page } from '$app/stores';
	import AdminHeader from '$lib/components/admin/common/AdminHeader.svelte';
	import SideMenu from '$lib/components/admin/common/SideMenu/SideMenu.svelte';

	export let data;

	let currentPage;
	const { subscribe } = page;
	const unsubscribe = subscribe((value) => {
		currentPage = value;
	});
</script>

<svelte:body />

<div class="flex">
	{#if currentPage?.route?.id !== '/admin/auth/login'}
		<SideMenu />
		<AdminHeader />
		{#key data.pathname}
			<main class="mt-20 p-10 w-full">
				<slot />
			</main>
		{/key}
	{:else}
		<slot />
	{/if}
</div>

<style>
	:global(body) {
		background: #f4f4f4;
	}
</style>
