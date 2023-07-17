<script>
	// @ts-nocheck

	export let name = '';
	export let options = [];
	export let selectedOption = '';

	$: {
		(selectedOption);
	}
</script>

<select bind:value={selectedOption} name={name.toLocaleLowerCase()} class="select select-primary max-w-xs focus:border-none">
	<option disabled selected>{name}</option>
	<option selected>Sin asignar</option>
	{#each options as option}
		<option>{option}</option>
	{/each}
</select>
