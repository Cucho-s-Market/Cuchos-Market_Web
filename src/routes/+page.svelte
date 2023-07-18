<script>
	// @ts-nocheck
	import Header from "$lib/components/common/Header/Header.svelte";
	import HomeCategories from "$lib/components/home/HomeCategories.svelte";
	import ProductCard from "$lib/components/products/ProductCard.svelte";
	import Swiper from "$lib/components/third-party/Swiper.svelte";
	import Button from "$lib/components/utils/Button.svelte";
	import Link from "$lib/components/utils/Link.svelte";
	import Notifications from "$lib/components/utils/Notifications.svelte";
	import { onMount } from "svelte";
	import productController from "../logic/productController";

	let products;

	onMount(async () => {
		
		products = await productController.getProducts();
		products = products?.data?.content;
	});

</script>

<Header/>

{#if products?.length > 0}
	<main class="max-w-[1200px] pt-[160px] m-auto">
		<!-- Slider main page -->
		<div class="w-full h-[480px]">
			<Swiper width={"w-full h-full"} slidesPerView={1}>
				<swiper-slide>
					<a href="" class=""></a>
					<div class="w-full h-full">
						<img class="w-full h-full object-fill rounded-[6px]" src="src/assets/test_images/dannete.png" alt="">
					</div>
				</swiper-slide>
				<swiper-slide>
					<a href="" class=""></a>
					<div class="w-full h-full">
						<img class="w-full h-full object-fill rounded-[6px]" src="src/assets/test_images/colgate.png" alt="">
					</div>
				</swiper-slide>
				<swiper-slide>
					<a href="" class=""></a>
					<div class="w-full h-full">
						<img class="w-full h-full object-fill rounded-[6px]" src="src/assets/test_images/purina.png" alt="">
					</div>
				</swiper-slide>
			</Swiper>
		</div>

		<!-- Slider nuestras marcas -->
		<div class="w-full flex flex-col gap-8 mt-10">
			<h2 class="font-bold text-[30px] text-[#000]">Nuestras marcas</h2>

			<div class="w-full">
				<Swiper width={"w-full h-full"} slidesPerView={5}>
					<swiper-slide class="flex justify-center items-center">
						<div class="px-4">
							<img class="rounded-[8px]" src="src/assets/test_images/brands/avanti.png" alt="">
						</div>
					</swiper-slide>
					<swiper-slide class="flex justify-center items-center">
						<div class="px-4">
							<img class="rounded-[8px]" src="src/assets/test_images/brands/conaprole.png" alt="">
						</div>
					</swiper-slide>
					<swiper-slide class="flex justify-center items-center">
						<div class="px-4">
							<img class="rounded-[8px]" src="src/assets/test_images/brands/splenda.png" alt="">
						</div>
					</swiper-slide>
					<swiper-slide class="flex justify-center items-center">
						<div class="px-4">
							<img class="rounded-[8px]" src="src/assets/test_images/brands/nestle.png" alt="">
						</div>
					</swiper-slide>
					<swiper-slide class="flex justify-center items-center">
						<div class="px-4">
							<img class="rounded-[8px]" src="src/assets/test_images/brands/coca-cola.png" alt="">
						</div>
					</swiper-slide>
				</Swiper>
			</div>
		</div>

		<!-- Categories home -->
		<div class="w-full mt-32">
			<!-- Title and see all -->
			<div class="flex justify-between items-center">
				<h1 class="text-[38px] text-[#000] font-bold">Tenemos lo que necesitas</h1>
				<Link text={"Ver todo"} target={false} type={"text-primary no-underline cursor-pointer"} href={"/catalogo"}/>
			</div>
			<HomeCategories/>
		</div>

		<!-- Most sellers -->
		<div class="w-full flex items-center justify-between mt-24">
			<!-- Check products -->
			<div class="w-[200px] flex flex-col gap-2">
				<p class="font-bold text-[30px]">Mas vendido</p>
				<p class="text-neutral-grey">Mira los productos mas exitosos de Chucho’s</p>
				<Button text={"Ver mas"} type={"w-[156px] h-[46px] min-h-0 btn-primary rounded-[8px]"}/>
			</div>
			<!-- Slider most sellers -->
			<div class="w-[80%] flex gap-3">
				<Swiper width={"w-full"} slidesPerView={4} buttons={true}>
					{#each products as product}
						<swiper-slide><ProductCard item={product}/></swiper-slide>
					{/each}
				</Swiper>
			</div>
		</div>

		<!-- Check promos -->
		<div class="w-full h-[126px] rounded-[8px] my-28 flex justify-between items-center border border-br-orange-focus px-8">
			<div>
				<p class="font-semibold text-[24px]">Mira nuestras PROMOS</p>
				<p class="text-neutral-grey">Echa un vistazo a todas las promos de Cucho’s</p>
			</div>

			<Button text={"Ver ahora"} type={"w-[123px] h-[42px] text-[#fff]"}/>
		</div>

		<!-- New arrivals -->
		<div class="mb-40">
			<div class="flex items-center gap-2">
				<div class="w-[20px] h-[40px] bg-primary rounded-[4px]"></div>
				<p class="font-semibold text-primary">Novedades</p>
			</div>
			<!-- Arrivals slider -->
			<div>
				<p class="font-bold text-[36px] text-[#000] my-8">Nuevos arribos</p>
				<div>
					<Swiper slidesPerView={5} buttons={true}>
						{#each products as product}
							<swiper-slide><ProductCard item={product}/></swiper-slide>
						{/each}
					</Swiper>
				</div>
			</div>
		</div>
		<!-- Footer coming soon -->
		
		<Notifications/>
	</main>
{/if}