<script>
// @ts-nocheck

    import {_view} from '$lib/stores.svelte.js';
    import Chart from 'chart.js/auto';
    import { onMount } from 'svelte';
    import { numberString } from '$lib/utils.js';
 
  let {
    chartdata,
    labels,
    label,
    title,
    detail_link = $bindable()
  } = $props();

    let myChart, y_value = '';

    onMount(async () => {
        window.addEventListener('resize', function () { myChart.resize() });
    });

    function setup(data){
        return  { 
            type: "bar",
            data: {
                labels,
                datasets: [
                    {
                        label,
                        data: data[0],
                        backgroundColor: [
                            "rgba(54, 162, 235, 0.2)",
                        ],
                        borderColor: [
                            "rgba(54, 162, 235, 1)",
                        ],
                        borderWidth: 1,
                    },
                    {
                        label: 'Lader',
                        data: data[1],
                        backgroundColor: [
                            "rgba(255, 99, 132, 0.2)",
                        ],
                        borderColor: [
                            "rgba(255, 99, 132, 1)",
                        ],
                        borderWidth: 1,
                    }
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        stacked: true
                    },
                    x: {
                        stacked: true
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: title
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                let date = new Date('2023', '05', '05', context.parsed.x);

                                if (label) {
                                    label = ' ';
                                }
                                if (context.parsed.y !== null) {
                                    label += new Intl.NumberFormat('da-DK', { style: 'currency', currency: 'DKK' }).format(context.parsed.y);
                                    context.parsed.x + 1 < 10 ? y_value = '0' + (context.parsed.x + 1) : y_value = '' + (context.parsed.x + 1);
                                    detail_link = y_value;
                                }
                                return label;
                            },
                            title: function(contextItems) {
                                return 'Forbrug: ';

                            },
                        }
                    }
                }
            },
        };
    }
    
  		
    function makeChart(ctx, d){		
        myChart = new Chart(ctx, setup(d)); //init the chart
        return {
            update(u){
                myChart.data.datasets[0].data = u[0];	
                myChart.data.datasets[1].data = u[1];
                myChart.data.datasets[0].label = label;
                myChart.data.datasets[1].label = 'Lader';
                myChart.update();
            },
            destroy(){ myChart.destroy();	}				
        }
    }
    
</script>

<style>
    .chart {
        padding-left: 0px;
        padding-right: 0px;
    }
</style>

<div class="chart">
    <canvas use:makeChart={$state.snapshot(chartdata)} width="3" height="1"></canvas>
</div>
