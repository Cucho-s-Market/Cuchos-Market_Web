<script>
    //@ts-ignore
    export let specData;
</script>

<div class="flex flex-col m-auto w-[80%]">
    <div class="flex justify-between py-4 border-b-2 border-primary text-sm">
        <p class="text-primary font-medium">Marca</p>
        <p class="text-normal-grey font-medium">{specData.marca}</p>
    </div>
    <div class="flex justify-between py-4 border-b-2 border-primary text-sm">
        <p class="text-primary font-medium">Modelo</p>
        <p class="text-normal-grey font-medium">{specData.codigo}</p>
    </div>
    <div class="flex justify-between py-4 border-b-2 border-primary text-sm">
        <p class="text-primary font-medium">Color</p>
        <p class="text-normal-grey font-medium">{specData.color}</p>
    </div>
    <div class="flex justify-between py-4 border-b-2 border-primary text-sm">
        <p class="text-primary font-medium">Peso</p>
        <p class="text-normal-grey font-medium">{specData.peso}</p>
    </div>
</div>