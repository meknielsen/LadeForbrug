<script>
// @ts-nocheck

    import {_view} from '$lib/stores.js';
    import Chart from 'chart.js/auto';
    import { onMount } from 'svelte';
 
    export let chartdata, labels, label, title, detail_link;

    let myChart, y_value = '';
    $_view.day = '01';

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
                        data,
                        backgroundColor: [
                            // "rgba(255, 99, 132, 0.2)",
                            "rgba(54, 162, 235, 0.2)",
                        ],
                        borderColor: [
                            // "rgba(255, 99, 132, 1)",
                            "rgba(54, 162, 235, 1)",
                        ],
                        borderWidth: 1,
                    },
                ],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
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
                                    // label += new Intl.NumberFormat('da-DK', { style: 'currency', currency: 'DKK' }).format(context.parsed.y);
                                    // label = date.toLocaleDateString('da-DK', {month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'});
                                    // label = 'test';
                                    label += new Intl.NumberFormat('da-DK', { style: 'currency', currency: 'DKK' }).format(context.parsed.y);
                                    context.parsed.x + 1 < 10 ? y_value = '0' + (context.parsed.x + 1) : y_value = '' + (context.parsed.x + 1);
                                    console.log(y_value);
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
                myChart.data.datasets[0].data = u;	
                myChart.data.datasets[0].label = label;
                myChart.update();
            },
            destroy(){ myChart.destroy();	}				
        }
    }
    
    $: detail_link = 'day' ? $_view.day = y_value.toString() : $_view.day = '01' ;
    $: detail_link = 'month' ? $_view.day = y_value.toString() : $_view.month = '06' ;
    // $: detail_link = 'year' ? $_view.month = y_value.toString() : $_view.month = '06' ;
    
</script>

<style>
    .chart {
        padding-left: 0px;
        padding-right: 0px;
    }
</style>

<div class="chart">
    <canvas use:makeChart={chartdata} width="3" height="1" />
</div>
