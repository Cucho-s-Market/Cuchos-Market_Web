<script>
// @ts-nocheck

	import SectionHeader from "$lib/components/admin/utils/SectionHeader.svelte";
	import UserForm from "$lib/components/forms/admin/UserForm.svelte";
	import { onMount } from "svelte";
	import { User } from "../../../../logic/dtos/User.js";
	import Utils from "../../../../logic/helpers/Utils.js";

	let user = new User();
	let formType = Utils.isEditMode() ? 'Editar' : 'Crear';

	export let data;

	onMount(async () => {
		user = data.user;
	});
</script>

<SectionHeader
	title={formType + ' Usuario'}
    href="/admin/usuarios"
/>

{#if user}
	<UserForm user={user} />
{/if}