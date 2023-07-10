<script>
	// @ts-nocheck

	import { onMount } from 'svelte';
	import chartController from '../../../logic/chartController';
	import { browser } from '$app/environment';

	export let chartData = {
		labels: [],
		data: []
	};

	let chartTitle = 'Productos más vendidos';

	let chartCanvas;
	let showNodata = false;

	onMount(async () => {
		if (chartData.labels.length === 0) {
			showNodata = true;
		} else if (browser) {
			chartCanvas = document.getElementById('chartCanvas');
			chartController.lineChart(chartCanvas, chartData);
			showNodata = false;
		}
	});
</script>

<div class="flex w-full text-center">
	<div class="flex flex-col w-[300px] h-[300px]">
		<p class="font-semibold text-md mb-5">{chartTitle}</p>
		{#if showNodata}
			<p class="font-bold m-10">No hay datos disponibles</p>
		{/if}
		<canvas class={showNodata ? '!hidden' : 'block'} id="chartCanvas" />
	</div>
</div>
