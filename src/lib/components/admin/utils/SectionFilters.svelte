<script>
// @ts-nocheck

	import Button from '$lib/components/utils/Button.svelte';

	import Input from '$lib/components/utils/Input.svelte';
	import FilterSelectContainer from './filters/FilterSelectContainer.svelte';

    export let labelSearch = "Buscar por codigo";
	export let search;
	export let elements;
	export let inputFilters;
	export let selectedFilters;

	let setFilters = () => {
		elements = elements.filter((element) => {
			let input = inputFilters.some(filter => String(element[filter]).toLowerCase().includes(search.toLowerCase()));
			let filters = true;

			Object.keys(selectedFilters).forEach((key) => {
				if(element[key] !== selectedFilters[key])
					filters = false;
			});

			return input && filters;
		});


		search = "";
	};
</script>

<div class="flex flex-col bg-base-100 mt-10 p-5 rounded-lg shadow">
	<Input label={labelSearch} bind:value={search} props="bg-transparent" mandatory={false} />

	<div class="flex w-full gap-10 mt-10">
		<FilterSelectContainer bind:search={search} bind:elements={elements} bind:inputFilters={inputFilters}>
			<slot />
		</FilterSelectContainer>
	
		<Button
			text="Buscar"
			type="btn-primary w-fit pl-10 pr-10"
			click={() => {
				setFilters();
			}}
		/>
	</div>
</div>
