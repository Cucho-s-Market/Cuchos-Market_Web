<script>
	import SectionHeader from "$lib/components/admin/utils/SectionHeader.svelte";
	import Button from "$lib/components/utils/Button.svelte";


</script>

<SectionHeader>
    <div class="flex">
        <slot name="section-header-title">Ventas</slot>
    
        <slot name="section-header-buttons">
            <Button text="Button" click={() => {alert('click action')}}/>
        </slot>
    </div>
</SectionHeader>