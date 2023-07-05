<script>
	import LoginAdmin from "$lib/components/forms/login/LoginAdmin.svelte";
	import { onMount } from "svelte";
	import sessionAdminController from "../../../../logic/sessionAdminController";

    onMount(async () => {
        const user = await sessionAdminController.getUser();
        if(user) {
            window.location.href = '/admin';
        }
    });
</script>

<div class="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
    <LoginAdmin/>
</div>