<script>
	// @ts-nocheck

	import { onMount } from 'svelte';
	import chartController from '../../../logic/chartController';
	import branchController from '../../../logic/branchController';
	import Utils from '../../../logic/helpers/Utils';
	import sessionAdminController from '../../../logic/sessionAdminController';

	export let chartData = {
		labels: ['Red', 'Green', 'Blue'],
		data: [10, 20, 30]
	};
	
	let chartTitle = 'Productos más vendidos';

	let chartCanvas;
	let selectedDate = "1";
	let showNodata = false;
	let start = Utils.getDateNow();
	let end = start;
	let branch = null;

	async function setChartData() {
		let day;
		let month;
		let year;

		end = start.split('-');

		

		switch (Number(selectedDate)) {
			case 1:
				end = start;
				break;
			case 2:
				day = end[2] - 7;
				month = day <= 0 ? end[1] - 2 : end[1] - 1;
				year = month <= 0 ? end[0] - 1 : end[0];
				end = Utils.getDateNow(new Date(year, month, day));
				break;
			case 3:
				day = end[2] - 30;
				month = day <= 0 ? end[1] - 2 : end[1] - 1;
				year = month <= 0 ? end[0] - 1 : end[0];
				end = Utils.getDateNow(new Date(year, month, day));
				break;
		}

		let user = await sessionAdminController.getUser();

		if(user && user.role === 'ADMIN') {
			chartData = await chartController.getBestProductsAdmin(end, start);
		} else {
			branch = await branchController.getSelectedBranch();
			chartData = await chartController.getBestProducts(branch.id, end, start);
		}

		

		if (chartData.labels.length === 0) {
			showNodata = true;
		} else {
			showNodata = false;
			chartController.doughnut(chartCanvas, chartData);	
		}
	}

	onMount(async () => {
		branch = await branchController.getSelectedBranch();
		chartData = await chartController.getBestProducts(1, end, start);

		
		let chartSales = await chartController.getSalesLastWeek(1, end, start);
		
		if (chartData.labels.length === 0) {
			showNodata = true;
		} else {
			chartController.doughnut(chartCanvas, chartData);	
			showNodata = false;
		}
	});
</script>

<div class="flex w-full text-center">
	<div class="flex flex-col w-[300px] h-[400px]">
		<p class="font-semibold text-md mb-5">{chartTitle}</p>
		<div class="flex">
			<select
				bind:value={selectedDate}
				on:change={() => setChartData()}
				class="select select-primary w-full bg-light-grey focus:border-none h-[20px]"
			>
				<option value="1" selected>Hoy</option>
				<option value="2">Semana</option>
				<option value="3">Mes</option>
			</select>
		</div>
		{#if showNodata}
			<p class="font-bold m-10">No hay datos disponibles</p>
		{/if}
		<canvas class="{showNodata ? '!hidden' : 'block'}" bind:this={chartCanvas} />
	</div>
</div>
