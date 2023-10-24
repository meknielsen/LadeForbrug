<script>
// @ts-nocheck

	/** @type {import('./$types').PageData} */

	import {_view} from '$lib/stores.js';
	import Chart from "$lib/components/Chart.svelte";
	import { getChartYearData } from '$lib/chartData.js';
	import Icon from '@iconify/svelte';

    export let data;

	let view = $_view;

	let year = view.year;
	let month = view.month;
	let day = view.day;

	let labels, chartdata, myChart;

    let detail_link = 'year';
	// let label = year;
	// let current = year;
	// let date = new Date(year, month, 0);
	let title = 'Strømforbrug månedligt'
    let title_date = year;

    let yearChart = (y) => {
		let d = getChartYearData(data.years[`${y}`]);
		chartdata = d[0];
		labels = d[1];
		title_date = y;
	}

	let setMonth = (m) => {
		$_view.month = m;
	}

	$: setMonth(detail_link);
	$: console.log($_view)

    yearChart(year);

</script>

<style>
</style>

<section class="section">
	<a href = '/months'>
		<Chart {chartdata} {labels} label={title_date} {title} bind:detail_link/>
	</a>
</section>



