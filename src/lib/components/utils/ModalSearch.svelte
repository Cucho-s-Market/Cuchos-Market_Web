<script>
    // @ts-nocheck
    import { onMount, onDestroy } from 'svelte';
	import productController from '../../../logic/productController';
	import Loading from './Loading.svelte';
	import Svg from './SVG.svelte';
	import {fly} from 'svelte/transition';

	let search = ''
	let products = [];
    let showProducts = [];
	let timeout;
	let searching = false;
    let modalOutside;
    export let showSearch = false;

    onMount(async () => {
        products = await productController.getProducts();
		products = products?.data?.content;
		const gradient = document.getElementById('modal-5');
		gradient.style.background = 'linear-gradient(' + 'rgb(245,121,59, 1)' + ', ' + 'rgb(255,255,255, 0)' + ')' ; 
    });
	onDestroy(() => {
    	document.body.style.background = 'white'; 
  	});

	function handle_search() {
		searching = true
		if (timeout) clearTimeout(timeout)
		timeout = setTimeout(get_products, 300)
	}
	async function get_products() {
		debugger;
		if (!search) {
			reset();
			return;
		}

        // Filter products array by serach query
        showProducts = products.filter(product => product.name.toLowerCase().includes(search.toLowerCase()));

		searching = false
	}

	function handleError() {
		alert('Something went wrong.')
		reset()
	}

    function createSlug(str) {
        return str.toLowerCase().replace(/\s/g, '_');
    }

	function reset() {
		showProducts = []
		searching = false
	}

    function closeModal() {
        debugger;
		showSearch = false;
        document.body.style.overflow = 'auto'; // Reset body overflow
    }
</script>


<label bind:this={modalOutside} id="modal-5" for="my-modal-5" class=" h-[100vh] modal opacity-100 border:none flex items-start visible pointer-events-auto" transition:fly="{{ duration: 700 }}">
	<label class="absolute w-[600px] mt-[120px]" for="">
		<!-- MAIN CONTENT -->
		<div class="w-full">
			<form>   
				<div class="relative h-full mt-[50px] ">
					<label for="search"></label>
					<input id="default-search" bind:value={search} on:input={handle_search} class="w-full border-b-4 border-primary block p-4 pl-5 text-sm text-black bg-white-300 focus:outline-none" placeholder="Buscar artículo" />
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<div class="absolute top-5 opacity-100 right-5 cursor-pointer" on:click={closeModal}>
						<Svg name={'x'} size={20} stroke={1.5} props={"opacity-100 hover:opacity-100 pb-[5px]"}/>
					</div>
					{#if searching}
						<Loading />
					{/if}
					<div class="mt-1 bg-white rounded max-h-[260px] overflow-scroll overflow-x-hidden">
						{#if showProducts?.length > 0}
							<div class="p-4 ">
								{#each showProducts as product}
									<a href='/catalogo/{createSlug(product?.name || "")}' on:click={closeModal}>
										<div class="mb-1 h-[64px]  flex flex-row hover:border-primary hover:border-2 rounded-lg">
											<div class="w-[60px] h-[60px] aspect-square border border-br-grey ">
												<img class="h-[56px] w-[56px] object-scale-down rounded-lg" src="{product?.images[0]}" alt="">
											</div>
											<div class="px-2 flex flex-col text-sm">
												<div id="product-name">
													<p>{product.name}</p>
												</div>
												<div id="product-price" class="text-sm pt-2">
													UYU ${product.price}
												</div>
											</div>
										</div>
									</a>
								{/each}
							</div>
						{/if}
					</div>
				</div>
			</form>
		</div>
	</label>
</label>