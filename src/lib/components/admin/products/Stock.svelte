<script>
// @ts-nocheck

	import Input from "$lib/components/utils/Input.svelte";

    export let branch;
</script>

<div branch-id={branch.id} class="flex flex-col w-full p-5 border border-primary rounded-lg">
    <p class="text">{branch.name}</p>
    <div class="flex w-full justify-between">
        <div class="flex gap-2 w-[100px]">
            <Input props="h-7 bg-base-100 text-center" label="Stock" mandatory={false} value={branch.stock ?? 0} />
        </div>
        <div class="flex flex-col justify-end">
            <input type="checkbox" class="toggle toggle-primary" checked />
        </div>
    </div>
</div>