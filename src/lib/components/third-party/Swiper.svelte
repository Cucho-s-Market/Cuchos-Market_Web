<script>
    import { register } from 'swiper/element/bundle';
	import ProductCard from '../products/ProductCard.svelte';
    register();
</script>

<div class="flex w-[600px]">
    <swiper-container
    slides-per-view="3"
    speed="400"
    >
    <swiper-slide>
        <ProductCard/>
    </swiper-slide>

    <swiper-slide>
        <ProductCard/>
    </swiper-slide>

    <swiper-slide>
        <ProductCard/>
    </swiper-slide>

    <swiper-slide>
        <ProductCard/>
    </swiper-slide>

    <swiper-slide>
        <ProductCard/>
    </swiper-slide>

    </swiper-container>
</div>