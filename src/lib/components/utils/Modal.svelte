<script>
	// @ts-nocheck
	import { disableScrollHandling } from '$app/navigation';
	import Search from './../forms/search/Search.svelte';
	import Svg from './SVG.svelte';
	import ModalSearch from './ModalSearch.svelte';

	let modalOutside;
	export let showModal = false;
	export let showSearch = false;

    //Only when modal is open hide scrollbar in order to not scroll
    $:if(showModal || showSearch) document.body.style.overflow = 'hidden';
	// $:if(showSearch) document.body.style.background = 'linear-gradient(' + 'rgb(245,121,59, 0.4)' + ', ' + 'rgb(255,255,255)' + ')';
	// $:showSearch == true? document.body.style.background = 'linear-gradient(' + 'rgb(245,121,59, 0.4)' + ', ' + 'rgb(255,255,255)' + ')' : 	document.body.style.background = '';


    function closeModal() {
        showModal = false;
		showSearch = false;
        document.body.style.overflow = 'auto'; // Reset body overflow
    }

</script>

{#if showModal}
	<label bind:this={modalOutside} for="my-modal-4" class="modal opacity-100 flex visible pointer-events-auto">
		<label class="modal-box relative w-[530px] h-[584px] border border-primary" for="">
			<!-- svelte-ignore a11y-click-events-have-key-events -->
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
	<ModalSearch bind:showSearch={showSearch}/>
{/if}