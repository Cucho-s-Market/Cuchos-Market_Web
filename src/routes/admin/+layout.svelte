<script>
	import AdminHeader from '$lib/components/admin/common/AdminHeader.svelte';
	import SideMenu from '$lib/components/admin/common/SideMenu/SideMenu.svelte';
</script>

<svelte:body />

<div class="flex">
	<SideMenu />
	<AdminHeader />
	<main class="mt-20 p-10 w-full">
		<slot />
	</main>
</div>

<style>
	:global(body) {
		background: #f4f4f4;
	}
</style>
