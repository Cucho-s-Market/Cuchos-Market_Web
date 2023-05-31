<script>
	import Input from '$lib/components/utils/Input.svelte';
	import FilterSelect from './filters/FilterSelect.svelte';
	import FilterSelectContainer from './filters/FilterSelectContainer.svelte';

    export let labelSearch = "Buscar por codigo";
</script>

<div class="flex flex-col bg-base-100 mt-10 p-5 rounded-lg shadow">
	<Input label={labelSearch} props="bg-transparent" mandatory={false} />

	<FilterSelectContainer>
		<slot />
	</FilterSelectContainer>
</div>
