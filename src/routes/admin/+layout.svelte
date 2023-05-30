<script>
	import AdminHeader from '$lib/components/admin/common/AdminHeader.svelte';
	import SideMenu from '$lib/components/admin/common/SideMenu/SideMenu.svelte';
	import { fade } from 'svelte/transition';

	export let data;
</script>

<svelte:body />

<div class="flex">
	<SideMenu />
	<AdminHeader />

	{#key data.pathname}
		<main
			in:fade={{ duration: 300, delay: 400 }}
			out:fade={{ duration: 300 }}
			class="mt-20 p-10 w-full"
		>
			<slot />
		</main>
	{/key}
</div>

<style>
	:global(body) {
		background: #f4f4f4;
	}
</style>
