<script>
	// @ts-nocheck
	export let type = 'text';
	export let value = '';
	export let label = 'label';
    export let mandatory = true;
	export let props = ''
	export let errorMessage = '';
	export let disabled = false;
	export let isSearch = false;
	export let placeholder = '';

	const handleInput = event => {
		value = event.target.value;
	};

</script>

<div class="form-control w-full">
	<!-- svelte-ignore a11y-label-has-associated-control -->
	{#if !isSearch}
		<label class="label">
			<span class="label-text font-semibold">{label}
				{#if mandatory}
					<span class="p-1 text-error">*</span>
				{/if}
			</span>
		</label>
	{/if}
	<input {type} placeholder={placeholder} class="input input-primary w-full focus:outline-none focus:border-2 bg-light-grey {props}" on:input={handleInput} value={value} disabled={disabled}/>
	<p class="error">{errorMessage}</p>
</div>