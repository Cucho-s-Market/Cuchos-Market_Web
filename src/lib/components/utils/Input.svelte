<script>
	export let type = 'text';
	export let value = '';
	export let label = 'label';
    export let mandatory = true;
</script>

<div class="form-control w-full">
	<label class="label">
		<span class="label-text font-semibold">{label}
            {#if mandatory}
                <span class="p-1 text-error">*</span>
            {/if}
        </span>
	</label>
	<input {type} class="input input-primary w-full focus:outline-none focus:border-2 bg-light-grey" value={value}/>
</div>