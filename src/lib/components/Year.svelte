<script>
// @ts-nocheck

	/** @type {import('./$types').PageData} */

	import YearChart from "$lib/components/YearChart.svelte";
	import { getChartYearData, getLatestDataDate, totalYear } from '$lib/chartData.js';
	import {_view, _active, _treshold} from '$lib/stores.js';
	import Button, { Label } from '@smui/button';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import { convertMonthDate, subtractRefusion } from "$lib/utils";

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
		if ( m  === undefined ) m = getLatestDataDate(data.years).latestMonth;
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
	}
	.center {
		margin: auto;
		width: 100%;
		padding: 1px;
		text-align: center;
	}
	:global(.nav) {
		min-width: 32px;
		padding: 2px;
		margin: 2px;
	}
</style>

<LayoutGrid>
	<Cell span={12}>
		<div class='graph' on:click={() => ($_active='month')} on:keydown={() => ($_active='month')}>
			<YearChart {chartdata} {labels} label={title_date} {title} bind:detail_link/>
		</div>
	</Cell>
</LayoutGrid>

<LayoutGrid align="center">
	<Cell span={2}></Cell>
		<Cell span={8}>
			<div class="center">
				{#each Object.keys(data.years) as y}
					<Button variant="{$_view.year === y ? 'raised' : 'outlined'}" color="secondary" class="nav" href={null} on:click={() => setYear(y)} on:keydown={() => setYear(y)}><Label>{y}</Label></Button>
				{/each}
			</div>
		</Cell>
	<Cell span={2}></Cell>
</LayoutGrid>



