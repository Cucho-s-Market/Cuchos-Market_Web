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

<<<<<<< HEAD
{#if currentPage?.route?.id != "/checkout" && currentPage?.route?.id != "/registrarse" && !currentPage?.route?.id.includes('/admin')}
=======
{#if currentPage?.route?.id != "/checkout" && currentPage?.route?.id != "/registrarse" && !String(currentPage?.route?.id).includes("/admin")}
>>>>>>> a579048ec9fac24e15c12dccdb3f2bc1fa8d7fce
	<Header/>
{/if}
<slot />
<Notifications />
<!-- <Footer/> -->
