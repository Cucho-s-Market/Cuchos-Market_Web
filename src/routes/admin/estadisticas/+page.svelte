<script>
	// @ts-nocheck

	import Doughnut from '$lib/components/statistics/Doughnut.svelte';
	import LineChart from '$lib/components/statistics/LineChart.svelte';
	import { onMount } from 'svelte';
	import chartController from '../../../logic/chartController';
	import SectionHeader from '$lib/components/admin/utils/SectionHeader.svelte';
	import Utils from '../../../logic/helpers/Utils';
	import sessionAdminController from '../../../logic/sessionAdminController';
	import branchController from '../../../logic/branchController';

	let lineChartData = [];
	let user = null;

	async function getData() {
		Utils.showLoading();
		user = await sessionAdminController.getUser();
		
		if(user && user.role === 'ADMIN') {
			lineChartData = await chartController.getSalesLastWeekAdmin();
		} else {
			let branch = await branchController.getSelectedBranch();
			let branchId = branch.id;
			lineChartData = await chartController.getSalesLastWeek(branchId);
		}
		Utils.removeLoading();
	}
</script>

{#await getData() then}
	<SectionHeader title={'Estadisticas'} />
	<div class="flex mt-20">
		<Doughnut />

		{#if lineChartData}
			<LineChart
				chartTitle="Ventas aprobadas los ultimos 7 dias."
				chartData={lineChartData.completed}
			/>
			<LineChart
				chartTitle="Ventas canceladas los ultimos 7 dias."
				chartData={lineChartData.cancelled}
			/>
		{/if}
	</div>
{/await}
