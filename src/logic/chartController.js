//@ts-nocheck

import branchController from './branchController';
import fetchController from './fetchController';
import Utils from './helpers/Utils';
import sessionAdminController from './sessionAdminController';
import Chart from 'chart.js/auto';

const chartController = (() => {
	function _setColors(length) {
		const colors = [
			'#F5793B', // Base color
			'#995D81',
			'#81ADC8',
			'#B4DC7F',
			'#FFD2FC'
		];

		let response = [];

		for (let i = 0; i < length; i++) {
			response.push(colors[i]);
		}

		return response;
	}

	async function getBestProducts(branchId, startDate, endDate) {
		let data = {
			labels: [],
			data: []
		};

		const token = await sessionAdminController.getUserToken();

		const response = await fetchController.execute(
			`http://localhost:8080/statistics/products?branch_id=${branchId}&startDate=${startDate}&endDate=${endDate}`,
			'GET',
			null,
			token,
			1
		);

		if (!response) return [];

		if (response.error) {
			return [];
		}

		response.data.forEach((element) => {
			data.labels.push(element.productName);
			data.data.push(element.salesCount);
		});

		return data;
	}

	async function getSalesLastWeek() {
        let branch = await branchController.getSelectedBranch();
        let branchId = branch.id;

		let start = Utils.getDateNow();

		let data = {
			completed: {
                labels: [],
                data: []
            },
            canceled: {
                labels: [],
                data: []
            }
		};

		const token = await sessionAdminController.getUserToken();

		for (let index = 0; index < 7; index++) {
            let end = start.split('-');
			let day = end[2] - 1;
			let month = day <= 0 ? end[1] - 2 : end[1] - 1;
			let year = month <= 0 ? end[0] - 1 : end[0];
			end = Utils.getDateNow(new Date(year, month, day));
            start = end;
            

			let response = await fetchController.execute(
				`http://localhost:8080/statistics/sales?branch_id=${branchId}&startDate=${start}&endDate=${end}`,
				'GET',
				null,
				token,
				1
			);

            
            response = response?.data[0];

            data.completed.labels.unshift(end);
            data.completed.data.unshift(response.completedOrders ?? 0);

            data.canceled.labels.unshift(end);
            data.canceled.data.unshift(response.canceledOrders ?? 0);
            

			if (!response) return [];

			if (response.error) {
				return [];
			}
		}

		return data;
	}

	//CHARTS
	async function doughnut(context, chartData) {
		let chart = Chart.getChart(context);

		if (chart) {
			chart.destroy();
		}

		const ctx = context.getContext('2d');
		chart = new Chart(ctx, {
			type: 'doughnut',
			data: {
				labels: chartData.labels,
				datasets: [
					{
						data: chartData.data,
						backgroundColor: _setColors(chartData.labels.length),
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
	}

	async function lineChart(context, chartData) {
		let chart = Chart.getChart(context);

		if (chart) {
			chart.destroy();
		}

        debugger;
		const ctx = context.getContext('2d');
		chart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: chartData.labels,
				datasets: [
					{
						label: 'My First Dataset',
						data: chartData.data,
						fill: false,
						borderColor: 'rgb(75, 192, 192)',
						tension: 0.1
					}
				]
			},
			options: {
				responsive: true,
				maintainAspectRatio: false
			}
		});
	}

	return {
		getBestProducts,
		getSalesLastWeek,
		doughnut,
		lineChart
	};
})();

export default chartController;
