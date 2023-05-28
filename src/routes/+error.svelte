<!-- 
    Documentación en:
    https://kit.svelte.dev/docs/routing#error

-->

<script>
    import Header from "$lib/components/common/Header/Header.svelte";  
    import Errorpage from "$lib/components/error/Errorpage.svelte";
    import { page } from '$app/stores';
</script>

<Errorpage/>

