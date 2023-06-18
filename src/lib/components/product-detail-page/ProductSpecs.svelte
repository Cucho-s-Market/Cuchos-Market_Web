<script>
    //@ts-nocheck
    export let item;
</script>

<div class="flex flex-col m-auto w-[80%]">
    <div class="flex justify-between py-4 border-b-2 border-primary text-sm">
        <p class="text-primary font-medium">Marca</p>
        <p class="text-normal-grey font-medium">{item?.brand ? item?.brand : 'N/A'}</p>
    </div>
    <div class="flex justify-between py-4 border-b-2 border-primary text-sm">
        <p class="text-primary font-medium">Modelo</p>
        <p class="text-normal-grey font-medium">{item?.code ? item?.code : 'N/A'}</p>
    </div>
    <div class="flex justify-between py-4 border-b-2 border-primary text-sm">
        <p class="text-primary font-medium">Color</p>
        <p class="text-normal-grey font-medium">{item?.color ? item?.color : 'N/A'}</p>
    </div>
    <div class="flex justify-between py-4 border-b-2 border-primary text-sm">
        <p class="text-primary font-medium">Peso</p>
        <p class="text-normal-grey font-medium">{item?.weight ? item?.weight : 'N/A'}</p>
    </div>

</div>