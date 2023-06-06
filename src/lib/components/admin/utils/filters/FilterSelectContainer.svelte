<script>
	// @ts-nocheck

	import Button from '$lib/components/utils/Button.svelte';
	import { filters } from '../../../../../routes/checkout/stores';

	let container = {};
	let currentFilters = [];

	let setFilters = () => {
		let selects = container.querySelectorAll('select');
		let input = container.parentNode.querySelector('input');

        currentFilters = [];

		selects.forEach((element) => {
			let name = element.name;
			let value = element.options[element.selectedIndex].text;

			currentFilters.push({name: name, value: value});
		});

        currentFilters.push({name: 'search', value: input.value});

        console.log(currentFilters);

		filters.update((value) => {
			value = currentFilters;
		});
	};
</script>

<div bind:this={container} class="flex w-full mt-10 justify-left flex-wrap gap-10">
	<slot />
	<Button text="Buscar" type="btn-primary w-fit pl-10 pr-10" click={() => {setFilters()}}/>
</div>
