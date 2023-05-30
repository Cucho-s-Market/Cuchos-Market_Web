<script>
	import Button from "$lib/components/utils/Button.svelte";


</script>

<div class="flex w-full mt-10 justify-between flex-wrap gap-y-5">
    <slot/>
</div>

<div class="flex w-full justify-end mt-5">
    <Button text="Buscar" type="btn-primary w-fit mt-5 pl-10 pr-10"/>
</div>