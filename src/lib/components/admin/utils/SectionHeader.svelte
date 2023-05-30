<script>
	import Button from '$lib/components/utils/Button.svelte';
	import Link from '$lib/components/utils/Link.svelte';

	export let title = 'Title';
    export let btn = {name: 'Button', btnEvent: () => {}};
</script>

<div class="flex w-full justify-between">
	<div class="flex flex-col">
		<h2 class="flex flex-col justify-end font-semibold text-3xl">{title}</h2>
		<div class="flex">
			<Link text="Volver" type="text-neutral text-sm mt-3" />
		</div>
	</div>

	<div class="flex">
		<Button
			text="{btn.name}"
			click={btn.btnEvent}
		/>
	</div>
</div>
