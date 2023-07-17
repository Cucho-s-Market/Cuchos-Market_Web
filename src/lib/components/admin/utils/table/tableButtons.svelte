<script>
	// @ts-nocheck
	import { page } from '$app/stores';
	import Svg from '$lib/components/utils/SVG.svelte';
	import { onMount } from 'svelte';
	import sessionAdminController from '../../../../../logic/sessionAdminController';
	import sessionController from '../../../../../logic/sessionController';
	import Utils from '../../../../../logic/helpers/Utils';
	import { notify } from '$lib/components/utils/Notifications.svelte';

	export let buttons = {};
    
    let currentPage;
	const { subscribe } = page;
	const unsubscribe = subscribe((value) => {
        currentPage = value;
	});
    
	export let role;
    export let itemId = itemId;
	export let userIsEnabled;
	export let email;

    const itemRoute = `${currentPage?.route?.id}/${itemId}`;

	async function toggleUser(e) {

		Utils.showLoading();
		const enable = e.target.checked;

		const token = await sessionAdminController.getUserToken();

		const response = await sessionController.disableCustomer(email, token, !enable);
		if(!response || response.error){
			notify({ type: 'alert-error', text: `Error al ${!enable ? 'desactivar' : 'activar'} usuario` });
			Utils.removeLoading();
			return;
		}
		
		Utils.removeLoading();
		notify({ type: 'alert-success', text: `Usuario ${!enable ? 'desactivado' : 'activado'} correctamente` });
	}

</script>

<div class="w-full flex gap-5 justify-end">
	{#if buttons.info}
		<a href="{itemRoute}"><Svg name="info-circle-filled" /></a>
	{/if}
	{#if role === 'CUSTOMER' && buttons.toggle}
		<input on:change={toggleUser} type="checkbox" class="toggle toggle-primary" checked={(userIsEnabled) ? false : true}/>
	{/if}
	{#if buttons.edit}
		<a href={itemRoute}><Svg name="edit-circle" color={'#F5793B'} /></a>
	{/if}
</div>
