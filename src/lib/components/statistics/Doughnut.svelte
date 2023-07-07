<script>
// @ts-nocheck

    import { onMount } from 'svelte';
    import Chart from 'chart.js/auto';


    export let chartData;
  
    let chart;
    let chartCanvas;
  
    onMount(() => {
      const ctx = chartCanvas.getContext('2d');
      chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: chartData.labels,
          datasets: [{
            data: chartData.data,
            backgroundColor: ['red', 'green', 'blue'],
            borderColor: 'white',
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      });
    });
  </script>
  
  <canvas bind:this={chartCanvas}></canvas>