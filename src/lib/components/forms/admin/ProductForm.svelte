<script>
	// @ts-nocheck

	import Button from '$lib/components/utils/Button.svelte';
	import Input from '$lib/components/utils/Input.svelte';

	export let product;
	export let categories = [];
</script>

<div class="flex flex-col w-[400px]">
	<div class="flex flex-col w-full gap-5 p-5 rounded-lg my-10 bg-base-100 shadow">
		<div class="w-full">
			<Input bind:value={product.code} props="h-10" label="Codigo" />
		</div>
		<div class="w-full">
			<Input bind:value={product.name} props="h-10" label="Nombre" />
		</div>

		<div class="w-full">
			<Input bind:value={product.price} props="h-10" label="Precio" />
		</div>

		<div class="flex flex-col w-full">
            <p class="label">
                <span class="label-text font-semibold">Categoria <span class="p-1 text-error">*</span></span>
            </p>
            <select bind:value={product.categoryId} class="select select-primary w-full bg-light-grey focus:border-none">
                <option disabled selected>Categoria</option>
                {#each categories as category}
					<option value="{category.id}">{category.name}</option>
				{/each}
            </select>
        </div>

		<div class="w-full">
			<Input bind:value={product.brand} props="h-10" label="Marca"/>
		</div>

		<div class="w-full">
			<label for="descripcion" class="label">
				<span class="label-text font-semibold">Descripcion<span class="p-1 text-error">*</span></span>
			</label>
			<textarea bind:value={product.description} class="textarea textarea-primary w-full min-h-[200px] max-h-[200px] bg-light-grey" name="descripcion" placeholder="Descripcion" />
		</div>
	</div>

	<div class="flex flex-col w-full gap-5 p-5 rounded-lg bg-base-100 shadow">
		<p class="font-semibold text-md mb-5">Imagenes</p>
		<div class="flex">
			<input on:change={(event) => {event.target.files[0]}} class="hidden" type="file">
			<Button type="bg-base-300 border-none w-[70px] h-[70px] hover:bg-primary hover:text-base-100" svg={{name: "camera-plus"}} click={() => { console.log(fileUpload); }} />
		</div>
	</div>
</div>
