<script>
// @ts-nocheck

	/** @type {import('./$types').PageData} */

	import YearChart from "$lib/components/YearChart.svelte";
	import { getChartYearData, getLatestDataDate, totalYear } from '$lib/chartData.js';
	import {_view, _active, _treshold} from '$lib/stores.js';
	import { convertMonthDate } from "$lib/utils";

    export let data, detail_link;
	
	let labels, chartdata;
	let mode = 'year';
	let title = 'Strømforbrug månedligt'
    let title_date = $_view.year;

	detail_link = undefined;

    let yearChart = (y) => {
		let d = getChartYearData(data.years, `${y}`);
		let r = convertMonthDate(data.refusion_data[`${y}`]) 
		// The map() method of Array instances creates a new array populated with the results of calling a provided function on every element in the calling array.
		// Below is an operator on strings, and since the subtraction operator is used, the string numbers are converted into numbers
		chartdata = [d[0][0], d[0][1].map((v, i) => v - r[i]), r];
		labels = d[1];
		title_date = y;
	}

	let setMonth = (m) => {
		// if ( m  === undefined ) m = getLatestDataDate(data.years).latestMonth;
		$_view.month = m;
	}

	let setYear = (y) => {
		$_view.year = y;
	}
	
	$: yearChart($_view.year);
	$: setMonth(detail_link);

</script>

<style>
	.graph {
		width: 80%;
		margin: 0 auto;
		padding-top: 5%;
		padding-bottom: 2%;
	}
	.center {
		margin: auto;
		width: 100%;
		padding: 1px;
		text-align: center;
	}
</style>

<div class='graph' on:click={() => ($_active='month')} on:keydown={() => ($_active='month')} role="link" tabindex="0">
	<YearChart {chartdata} {labels} label={title_date} {title} bind:detail_link/>
</div>

<div class="center">
	<div class="join">
		{#each Object.keys(data.years) as y}
			<button class="join-item btn btn-md {$_view.year === y ? 'btn-active' : ''}" href={null} on:click={() => setYear(y)} on:keydown={() => setYear(y)}>{y}</button>
		{/each}
	</div>
</div>



