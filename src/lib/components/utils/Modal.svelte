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
					<input type="search" id="default-search" class="w-[364px] block p-4 pl-5 text-sm text-primary-900 rounded-lg bg-grey-50" placeholder="Search" >
					<div class="absolute top-5 opacity-100 right-5 cursor-pointer" on:click={closeModal}>
						<Svg name={'x'} size={20} stroke={1.5} props={"opacity-70 hover:opacity-100 pb-[5px]"}/>
					</div>
					<!-- <button type="submit" class="text-white absolute right-2.5  bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Buscar</button> -->
				</div>
			</form>
		</div>
	</label>
</label>



{/if}