//@ts-nocheck

import branchController from './branchController';
import fetchController from './fetchController';
import Utils from './helpers/Utils';
import sessionAdminController from './sessionAdminController';
import Chart from 'chart.js/auto';

const chartController = (() => {
	function _setColors(length) {
		const colors = [
			'#F5793B',
			'#995D81',
			'#81ADC8',
			'#B4DC7F',
			'#FFD2FC',
			'#B084CC',
			'#5DD9C1',
			'#89023E',
			'#F72585',
			'#AAADC4'
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
			`https://cuchos-market-2023-34241c211eef.herokuapp.com/statistics/products?branch_id=${branchId}&startDate=${startDate}&endDate=${endDate}`,
			'GET',
			null,
			token,
			1
		);

		if (!response) return [];

		if (response.error) {
			return [];
		}

		let i = 0;
		response.data.forEach((element) => {
			if (i > 9) return;
			data.labels.push(element.productName);
			data.data.push(element.salesCount);
			i++;
		});

		return data;
	}

	async function getBestProductsAdmin(startDate, endDate) {
		let data = {
			labels: [],
			data: []
		};

		let products = [];

		let branches = await branchController.getBranches();

		await Promise.all(
			branches.branches.map(async (branch) => {
				let info = await getBestProducts(branch.id, startDate, endDate);
				for (let index = 0; index < info.data.length; index++) {
					products.push({
						productName: info.labels[index],
						salesCount: info.data[index]
					});
				}
			})
		);

		products.forEach((element) => {
			if (data.labels.includes(element.productName)) {
				data.data[data.labels.indexOf(element.productName)] += element.salesCount;
			} else {
				data.labels.push(element.productName);
				data.data.push(element.salesCount);
			}
		});

		return data;
	}

	async function getSalesLastWeek(branchId) {
		if (!branchId) return [];

		let start = Utils.getDateNow();
		let data = {
			completed: {
				labels: [],
				data: []
			},
			cancelled: {
				labels: [],
				data: []
			}
		};

		const token = await sessionAdminController.getUserToken();

		for (let index = 0; index < 7; index++) {
			let end = start.split('-');
			let day = index === 0 ? end[2] : end[2] - 1;
			let month = day <= 0 ? end[1] - 2 : end[1] - 1;
			let year = month <= 0 ? end[0] - 1 : end[0];
			end = Utils.getDateNow(new Date(year, month, day));
			start = end;

			let response = await fetchController.execute(
				`https://cuchos-market-2023-34241c211eef.herokuapp.com/statistics/sales?branch_id=${branchId}&startDate=${start}&endDate=${end}`,
				'GET',
				null,
				token,
				1
			);

			response = response?.data[0];

			data.completed.labels.unshift(end);
			data.completed.data.unshift(response.completedOrders ?? 0);

			data.cancelled.labels.unshift(end);
			data.cancelled.data.unshift(response.cancelledOrders ?? 0);

			if (!response) return [];

			if (response.error) {
				return [];
			}
		}

		return data;
	}

	async function getSalesLastWeekAdmin() {
		let branches = await branchController.getBranches();

		let data = {
			completed: {
				labels: [],
				data: [0, 0, 0, 0, 0, 0, 0]
			},
			cancelled: {
				labels: [],
				data: [0, 0, 0, 0, 0, 0, 0]
			}
		};

		await Promise.all(
			branches.branches.map(async (branch) => {
				let info = await getSalesLastWeek(branch.id);
				for (let index = 0; index < info.completed.data.length; index++) {
					data.completed.labels[index] = info.completed.labels[index];
					data.completed.data[index] += info.completed.data[index];

					data.cancelled.labels[index] = info.cancelled.labels[index];
					data.cancelled.data[index] += info.cancelled.data[index];
				}
			})
		);

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
			options: {
				responsive: true,
				maintainAspectRatio: false
			},
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
		const ctx = context.getContext('2d');
		let chart = new Chart(ctx, {
			type: 'line',
			data: {
				labels: chartData.labels,
				datasets: [
					{
						label: 'Ventas',
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
		getBestProductsAdmin,
		getSalesLastWeek,
		getSalesLastWeekAdmin,
		doughnut,
		lineChart
	};
})();

export default chartController;
