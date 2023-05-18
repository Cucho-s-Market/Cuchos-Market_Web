<script>
    import "../app.css";
    import CatalogoHeader from '$lib/components/catalogo/CatalogoHeader.svelte';
	import CatalogoSidebar from "$lib/components/catalogo/CatalogoSidebar.svelte";
    import Registration from "$lib/components/forms/registration/Registration.svelte";

</script>
<div>
    <CatalogoHeader/>
</div>
<p>para registrarte has</p>
<a href="$/lib/components/forms/registration/Registration.svelte"> clic aqui</a>
<slot />
