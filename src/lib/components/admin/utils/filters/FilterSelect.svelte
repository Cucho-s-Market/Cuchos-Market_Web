<script>
	// @ts-nocheck

	export let name = '';
	export let options = [];
</script>

<select name={name.toLocaleLowerCase()} class="select select-primary w-full max-w-xs focus:border-none">
	<option disabled selected>{name}</option>
	<option>Sin asignar</option>
	{#each options as option}
		<option>{option}</option>
	{/each}
</select>
