<script>
	import Input from "$lib/components/utils/Input.svelte";


</script>

<div class="flex flex-col w-full p-5 border border-primary rounded-lg">
    <p class="text">Sucursal 1</p>
    <div class="flex w-full justify-between">
        <div class="flex gap-2 w-[100px]">
            <Input props="h-7 bg-base-100 text-center" label="Stock" mandatory={false} />
        </div>
        <div class="flex flex-col justify-end">
            <input type="checkbox" class="toggle toggle-primary" checked />
        </div>
    </div>
</div>