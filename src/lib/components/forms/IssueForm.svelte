<script>
	// @ts-nocheck
	import addressController from '../../../logic/addressController';
	import { Issue } from '../../../logic/dtos/Issue';
	import Utils from '../../../logic/helpers/Utils';
	import formValidator from '../../../logic/helpers/formValidator';
	import orderController from '../../../logic/orderController';
	import sessionController from '../../../logic/sessionController';
	import Button from '../utils/Button.svelte';
	import Input from '../utils/Input.svelte';
	import { notify } from '../utils/Notifications.svelte';

	let issue = new Issue();

	export let showModal;
    export let orderId;

	async function addIssue() {
		Utils.showLoading();

		let validationArray = [issue.title, issue.description];

		let emptyValues = formValidator.emptyValues(validationArray);

		if (emptyValues) {
			notify({ type: 'alert-error', text: 'Verifique los campos.' });
			Utils.removeLoading();
			return;
		}

		const user = await sessionController.getUser();
        
        issue.userEmail = user.email;
        issue.orderId = orderId;

		const result = await orderController.addIssue(issue);

		if (result?.error) {
            notify({ text: result.message, type: 'alert-error' });
		    showModal = false;
			Utils.removeLoading();
            return;
        }
		showModal = false;
		Utils.removeLoading();
		// Show notification
		notify({ text: result.message, type: 'alert-success' });
	}
</script>

<div class="w-full flex flex-col gap-4">
	<div class="flex flex-col items-center gap-10 pb-5">
		<h3 class="font-semibold text-[24px]">Reclamo por compra #{orderId}</h3>
	</div>

	<Input bind:value={issue.title} placeholder={"Titulo"} props="h-10" label="Titulo" />

	<textarea
		bind:value={issue.description}
		class="textarea textarea-primary w-full min-h-[200px] max-h-[200px] bg-light-grey"
		name="descripcion"
		placeholder="Descripcion"
	/>

	<Button text={'Reclamar'} type={'btn-primary w-full mt-7'} click={addIssue} />
</div>
