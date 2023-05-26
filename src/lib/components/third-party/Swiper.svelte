<script>
// @ts-nocheck

    import { register } from 'swiper/element/bundle';
	import SVG from '../utils/SVG.svelte';
    register();

    export let width = "w-full"
    export let buttons = false;
    export let slidesPerView = 1;
    export let pag = false;

    let swiperContainer;
    let btnNext;
    let btnPrev;

</script>

<div class="relative flex {width}">
    <swiper-container
        bind:this={swiperContainer}
        slides-per-view={slidesPerView}
        autoplay={{
            delay: 4000
        }}
        pagination={pag ? {clickable: true} : false}
    >

        <slot/>
    </swiper-container>

    {#if buttons}
        <button class="absolute left-[-10px] top-1/2 z-10 bg-primary rounded" bind:this={btnPrev} on:click={() => {swiperContainer.swiper.slidePrev()}}>
            <SVG name="arrow-narrow-left" color="#FFF"/>
        </button>

        <button class="absolute right-[-10px] top-1/2 z-10 bg-primary rounded" bind:this={btnNext} on:click={() => {swiperContainer.swiper.slideNext()}}>
            <SVG name="arrow-narrow-right" color="#FFF"/>
        </button>
    {/if}
</div>