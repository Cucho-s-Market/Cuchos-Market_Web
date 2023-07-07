<script>
	// @ts-nocheck

	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';
	import chartController from '../../../logic/chartController';
	import branchController from '../../../logic/branchController';
	import Utils from '../../../logic/helpers/Utils';

	export let chartData = {
		labels: ['Red', 'Green', 'Blue'],
		data: [10, 20, 30]
	};

	let chart;
	let chartCanvas;
	let selectedDate = 1;
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
        month = day <= 0 ? end[1] - 1 : end[1];
        year = month <= 0 ? end[0] - 1 : end[0];
        end = Utils.getDateNow(new Date(year, month, day));
				break;
			case 3:
        day = end[2] - 30;
        month = day <= 0 ? end[1] - 1 : end[1];
        year = month <= 0 ? end[0] - 1 : end[0];
        end = Utils.getDateNow(new Date(year, month, day));
				break;
		}

		let chartData = await chartController.getProducts(branch.id, end, start);
    debugger;
	}

	onMount(async () => {
		branch = await branchController.getSelectedBranch();
    
		let chartData = await chartController.getProducts(branch.id, end, start);

		const ctx = chartCanvas.getContext('2d');
		chart = new Chart(ctx, {
			type: 'doughnut',
			data: {
				labels: chartData.labels,
				datasets: [
					{
						data: chartData.data,
						backgroundColor: ['red', 'green', 'blue'],
						borderColor: 'white',
						borderWidth: 2
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false
			}
		});
	});
</script>

<div class="flex w-full">
	<div class="flex flex-col w-[300px] h-[400px]">
		<div class="flex">
			<select
				bind:value={selectedDate}
        on:change={() => setChartData()}
				class="select select-primary w-full bg-light-grey focus:border-none"
			>
				<option disabled selected>Tipo</option>
				<option selected value="1">Hoy</option>
				<option selected value="2">Semana</option>
				<option selected value="3">Mes</option>
			</select>
		</div>
		<canvas bind:this={chartCanvas} />
	</div>
</div>
