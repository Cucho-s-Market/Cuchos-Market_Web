<script>
	import Button from '$lib/components/utils/Button.svelte';
</script>

<div class="flex">
	<h2>
		<slot name="section-header-title">Section name</slot>
	</h2>
    
    <div class="flex">
        <slot name="section-header-buttons">
            <Button text="Button" click={() => {alert('click action')}}/>
        </slot>
    </div>
</div>
