<script>
	
	// @ts-nocheck
	
	import { browser } from '$app/environment';
	import Button from '$lib/components/utils/Button.svelte';
	import Input from '$lib/components/utils/Input.svelte';
	import { v4 } from 'uuid';
	import firebaseController from '../../../../logic/third-party/firebaseController';
	import Svg from '$lib/components/utils/SVG.svelte';

	export let product;
	export let categories = [];
	export let arrayImages = [];

	let fileInput = null;
	let arrayImagesLength = 0;

	let path = '';
	let showAdd = true;

	if(browser) {
		path = window.location.href;
	}

	async function addImage(file) {
		if(arrayImages.length < 4) {
			const tempUrl = URL.createObjectURL(file);

			arrayImages.push({file: file, url: tempUrl, name: v4(), new: true});

			arrayImagesLength = arrayImages.length;

			showAdd = arrayImages.length < 4 ? true: false;

			fileInput.value = '';
		}
	}

	async function removeImage(item) {
		arrayImages = arrayImages.filter(elem => elem.name !== item.name);
		arrayImagesLength = arrayImages.length;
		showAdd = arrayImages.length < 4 ? true: false;
		fileInput.value = '';
	}
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
			<div class="flex gap-5">
				{#key arrayImagesLength}
					{#each arrayImages as item}
						<div class="bg-base-300 relative border border-primary rounded-md w-[70px] h-[70px] hover:bg-primary cursor-pointer">
							<div class="bg-error rounded absolute right-0 top-[-10px] cursor-pointer" on:click={() => {removeImage(item)}}><Svg name="trash"/></div>
							<img class="w-full h-full object-cover rounded-md" src="{item.url}" alt="{item.name}">
						</div>
					{/each}
				{/key}
				<input bind:this={fileInput} class="file-input file-input-bordered file-input-primary hidden" on:change={(event) => {addImage(event.target.files[0])}} type="file">
				<Button type="bg-base-300 border-none w-[70px] h-[70px] hover:bg-primary hover:text-base-100 {showAdd ? 'flex' : 'hidden'}" svg={{name: "camera-plus"}} click={() => { if(fileInput) { fileInput.click(); } }} />
			</div>
		</div>

</div>
