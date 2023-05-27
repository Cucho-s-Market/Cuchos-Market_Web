<script>
    import "../app.css";
	import Header from "$lib/components/common/Header/Header.svelte";
	import Footer from "$lib/components/common/Footer.svelte";
	import Notifications from "$lib/components/utils/Notifications.svelte";
</script>

<Header/>
<slot />
<Notifications/>
<!-- <Footer/> -->