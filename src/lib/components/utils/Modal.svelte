<script>
	import { disableScrollHandling } from '$app/navigation';
	import Search from './../forms/search/Search.svelte';
	import Svg from './SVG.svelte';

	// @ts-ignore
	let modalOutside;
	export let showModal = false;
	export let showSearch = false;

    //Only when modal is open hide scrollbar in order to not scroll
    $:if(showModal || showSearch) document.body.style.overflow = 'hidden';

    function closeModal() {
        showModal = false;
		showSearch = false;
        document.body.style.overflow = 'auto'; // Reset body overflow
    }

	function createSlug(str) {
        return str.toLowerCase().replace(/\s/g, '_');
    }

	//Quick-search-bar-implementation
	import Loading from './Loading.svelte'
	let search = ''
	let products = [
        {
            nombre: "Heladera GGWP33",
            descripcion: "refrigerador frio-seco inverter A+",
            precio: 44000,
            peso: 44,
            color: "plateada", 
            marca: "Samsung",
            images: [ 
                {   src: "https://productos.misbeneficios.com.uy/media/catalog/product/cache/72d981025d8e9f090c932c53a35a6346/5/1/515641.jpg",
                    alt: "primer imagen"
                },
                {   src: "",
                    alt: "segunda imagen"
                },
            ]
        },
        {
            nombre: "Medias tejidas por la abuela",
            descripcion: "100% lana",
            precio: 300,
            peso: 0.2,
            color: "rosado", 
            marca: "N/N",
            images: [ 
                {   src: "https://m.media-amazon.com/images/I/91mVIMVXU7L._AC_UL1500_.jpg",
                    alt: "primer imagen"
                },
                {   src: "",
                    alt: "segunda imagen"
                },
            ]
        },
        {
            nombre: "CBR1000RR-R",
            descripcion: "Race motorbike",
            precio: 244000,
            peso: 135,
            color: "Blanco", 
            marca: "Honda",
            images: [ 
                {   src: "https://img.remediosdigitales.com/d76a47/cbr-3-2022/1024_2000.jpeg",
                    alt: "primer imagen"
                },
                {   src: "",
                    alt: "segunda imagen"
                },
            ]
        },
    ]
	let timeout;
	let searching = false;

	function handle_search() {
		searching = true
		if (timeout) clearTimeout(timeout)
		timeout = setTimeout(get_products, 300)
	}
	async function get_products() {
		if (!search) {
			reset()
			return
		}
		const data = await fetch(
			'https://dummyjson.com/products/search?q=' + search
		)
			.then((res) => {
				if (!res.ok) {
					handleError()
					return
				}
				return res.json()
			})
			.catch((e) => handleError())
		products = data?.products || []
		searching = false
	}

	function handleError() {
		alert('Something went wrong.')
		reset()
	}

	function reset() {
		products = []
		searching = false
	}
</script>

{#if showModal}
	<label bind:this={modalOutside} for="my-modal-4" class="modal opacity-100 flex visible pointer-events-auto">
		<label class="modal-box relative w-[530px] h-[584px] border border-primary" for="">
			<div class="absolute top-5 right-5 cursor-pointer" on:click={closeModal}>
				<Svg name={'x'} size={24} stroke={1.5} props={"opacity-70 hover:opacity-100"}/>
			</div>
			<!-- MAIN CONTENT -->
            <div class="w-full py-6">
				<slot></slot>
            </div>
		</label>
	</label>
{/if}

{#if showSearch}
<label bind:this={modalOutside} for="my-modal-5" class="modal opacity-100 border:none flex items-start visible pointer-events-auto">
	<label class="absolute" for="">
		<!-- MAIN CONTENT -->
		<div class="w-full">
			<form>   
				<div class="relative h-full mt-[20px]">
					<!-- <input type="search" id="default-search" class="w-[364px] block p-4 pl-5 text-sm text-primary-900 rounded-lg bg-grey-50" placeholder="Search" >
					<div class="absolute top-5 opacity-100 right-5 cursor-pointer" on:click={closeModal}>
						<Svg name={'x'} size={20} stroke={1.5} props={"opacity-70 hover:opacity-100 pb-[5px]"}/>
					</div> -->
					<!-- <button type="submit" class="text-white absolute right-2.5  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Buscar</button> -->
					<label for="search"></label>
					<input id="default-search" bind:value={search} on:input={handle_search} class="w-[364px] block p-4 pl-5 text-sm text-primary-900 rounded-lg bg-grey-50" placeholder="Search" />
					<div class="absolute top-5 opacity-100 right-5 cursor-pointer" on:click={closeModal}>
						<Svg name={'x'} size={20} stroke={1.5} props={"opacity-70 hover:opacity-100 pb-[5px]"}/>
					</div>
					{#if searching}
						<Loading />
					{/if}
					<div class="mt-1 bg-white rounded max-h-[260px] overflow-scroll overflow-x-hidden">
						{#if products?.length > 0}
							<div class="p-4">
								{#each products as product}
									<a href='/catalogo/{createSlug(product?.name || "")}'>
										<div class="h-[64px] flex flex-row">
											<div class="w-[60px] h-[60px] aspect-square border border-br-grey">
												<img class="h-[56px] w-[56px] object-scale-down" src="{product?.images[0]}" alt="">
											</div>
											<div class="px-2 flex flex-col text-sm">
												<div id="product-name">
													
													<p>{product.title}</p>
												</div>
												<div id="product-price" class="text-sm pt-2">
													({product.price}€)
												</div>
											</div>
											<!-- <a href='/catalogo/{product.nombre}'>asdasdasdas</a> -->
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



{/if}