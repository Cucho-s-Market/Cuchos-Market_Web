<script>
	import Svg from './SVG.svelte';

	// @ts-ignore
	let modalOutside;
	export let showModal = false;

    //Only when modal is open hide scrollbar in order to not scroll
    $:if(showModal) document.body.style.overflow = 'hidden';

    function closeModal() {
        showModal = false;
        document.body.style.overflow = 'auto'; // Reset body overflow
    }
</script>

{#if showModal}
	<label bind:this={modalOutside} for="my-modal-4" class="modal opacity-100 flex visible pointer-events-auto">
		<label class="modal-box relative w-[530px] h-[584px] border border-primary" for="">
			<div class="absolute top-5 right-5 cursor-pointer" on:click={closeModal}>
				<Svg name={'x'} size={24} stroke={1.5} props={"opacity-70 hover:opacity-100"}/>
			</div>

			<!-- MAIN CONTENT -->
            <div class="w-full p-10">
				<slot></slot>
            </div>
			
		</label>
	</label>
{/if}