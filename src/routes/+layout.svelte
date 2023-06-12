<script>
// @ts-nocheck

	import '../app.css';
	import Header from '$lib/components/common/Header/Header.svelte';
	import Notifications from '$lib/components/utils/Notifications.svelte';
	import { page } from '$app/stores';

	let currentPage;
	const { subscribe } = page;
	const unsubscribe = subscribe((value) => {
		currentPage = value;
	});

</script>

{#if currentPage?.route?.id != "/checkout" && currentPage?.route?.id != "/registrarse" && !(currentPage?.route?.id).includes('/admin')}
	<Header/>
{/if}
<slot />
<Notifications />
<!-- <Footer/> -->
