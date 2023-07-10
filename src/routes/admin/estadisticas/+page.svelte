<script>
	// @ts-nocheck

	import Doughnut from '$lib/components/statistics/Doughnut.svelte';
	import LineChart from '$lib/components/statistics/LineChart.svelte';
	import { onMount } from 'svelte';
	import chartController from '../../../logic/chartController';

	let lineChartData = [];

	async function getData() {
		lineChartData = await chartController.getSalesLastWeek();

		
	};
</script>

<Doughnut />

{#await getData() then}
	{#if lineChartData}
		<LineChart chartData={lineChartData.completed} />
		<!-- <LineChart chartData={lineChartData.canceled} /> -->
	{/if}
{/await}

