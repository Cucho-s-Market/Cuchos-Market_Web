<script>
	import '../app.css';
	import Header from '$lib/components/common/Header/Header.svelte';
	import Footer from '$lib/components/common/Footer.svelte';
	import Notifications from '$lib/components/utils/Notifications.svelte';
	import { getContext } from 'svelte';
	import { page } from '$app/stores';

	let currentPage;
	const { subscribe } = page;
	const unsubscribe = subscribe((value) => {
		currentPage = value;
	});

</script>

{#if currentPage?.route?.id == '/home' || currentPage?.route?.id == '/catalogo'}
	<Header/>
{/if}
<slot />
<Notifications />
<!-- <Footer/> -->
