<script>
	// @ts-nocheck
	import { onMount } from "svelte";

	let dummyImage = 'https://dummyimage.com/100/09f.png/fff';
    
    
	export let images = [];
    
	let imgContent;
    let imagesArray;
    let mainImage = {url: images[0], alt: images[0].split('/o/')[1].split('?')[0]};


    onMount(() => {
        imagesArray = [...imgContent.childNodes];
        imagesArray[0].classList.add('border-primary', 'border-2');
    });

	//@ts-ignore
	var selectImg = (event) => {
		let img = event.target;
		const imgParent = img.parentNode;
		
		img = {url: img.src, alt: img.src.split('/o/')[1].split('?')[0]};
		mainImage = img != null ? img : dummyImage;
		imgParent.classList.add('border-primary', 'border-2');

		const nonSelected = imagesArray.filter((element) => element != imgParent);

		nonSelected.forEach((element) => {
			element.classList.remove('border-primary', 'border-2');
		});
	};
</script>

{#await imagesArray then}
	<div class="w-[40%] gap-4">
		<div class="block sm:flex gap-4">
			<!-- side images -->
			<div bind:this={imgContent} class="flex flex-row sm:flex-col gap-4">
				{#each images as image}
					<div class="w-[50px] h-[50px] border rounded-md border-br-grey hover:border-primary hover:border-2 cursor-pointer">
						<!-- svelte-ignore a11y-click-events-have-key-events -->
						<img
							on:click={selectImg}
							src={image}
							alt={image}
							class="w-full h-full object-scale-down rounded-md"
						/>
					</div>
				{/each}
			</div>
			<!-- Main image -->
			<div class="gap-2">
				<div class="w-full rounded-md selected:border-2">
					<img
						id="mainImage"
						src={mainImage.url}
						alt={mainImage.alt}
						class="border border-br-grey rounded-md h-inherit object-scale-down w-[450px] h-[385px]"
					/>
				</div>
			</div>
		</div>
	</div>
{/await}