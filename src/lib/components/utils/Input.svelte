<script>
	// @ts-nocheck
	export let type = 'text';
	export let val = '';
	export let label = 'label';
    export let mandatory = true;
	export let props = ''
	export let errorMessage = '';

	const handleInput = event => {
		value = event.target.value;
	};

</script>

<div class="form-control w-full">
	<!-- svelte-ignore a11y-label-has-associated-control -->
	<label class="label">
		<span class="label-text font-semibold">{label}
            {#if mandatory}
                <span class="p-1 text-error">*</span>
            {/if}
        </span>
	</label>
	<input {type} class="input input-primary w-full focus:outline-none focus:border-2 bg-light-grey {props}" on:input={handleInput}/>
	<p class="error">{errorMessage}</p>
</div>