<script>
// @ts-nocheck

	import { run } from 'svelte/legacy';

// @ts-nocheck

	/** @type {import('./$types').PageData} */

	import YearChart from "$lib/components/YearChart.svelte";
	import { getChartYearData, getLatestDataDate, totalYear } from '$lib/chartData.js';
	import {_view, _active, _treshold} from '$lib/stores.svelte.js';
	import { convertMonthDate } from "$lib/utils";

	let { data, detail_link = $bindable() } = $props();
	
	let labels = $state(null), chartdata = $state(null);
	let mode = 'year';
	let title = 'Strømforbrug månedligt'
    let title_date = $state($_view.year);
	let today = new Date();
	let latest_year = 0;

	detail_link = undefined;

    let yearChart = (y) => {
		let d = getChartYearData(data.years, `${y}`);
		let r;
		// If year is not existing in refusion datastore, then set refusion_data to 0
		if ( Object.hasOwn(data.refusion_data, y) ) {
			r = convertMonthDate(data.refusion_data[`${y}`]) 
		} else {
			r = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0'];
		}
		// The map() method of Array instances creates a new array populated with the results of calling a provided function on every element in the calling array.
		// Below is an operator on strings, and since the subtraction operator is used, the string numbers are converted into numbers
		chartdata = [d[0][0], r, d[0][1].map((v, i) => v - r[i])];
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

	// Make sure we view the latest year with charging data
	for ( let i = 0; i < Object.keys(data.years).length; i++ ) {
		if (Object.keys(data.years)[i] > latest_year) latest_year =  Object.keys(data.years)[i];
	}
	
	run(() => { setYear(latest_year); });
	run(() => { yearChart($_view.year); });
	run(() => { setMonth(detail_link); });

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

<div class='graph' onclick={() => ($_active='month')} onkeydown={() => ($_active='month')} role="link" tabindex="0">
	<YearChart {chartdata} {labels} label={title_date} {title} bind:detail_link/>
</div>

<div class="center">
	<div class="join">
		{#each Object.keys(data.years) as y}
			<button class="join-item btn btn-md {$_view.year === y ? 'btn-active' : ''}" href={null} onclick={() => setYear(y)} onkeydown={() => setYear(y)}>{y}</button>
		{/each}
	</div>
</div>



