<script>
// @ts-nocheck

	/** @type {import('./$types').PageData} */

	import {_view} from '$lib/stores.js';
	import Chart from "$lib/components/Chart.svelte";
	import { getChartYearData, getLatestDataDate, totalYear } from '$lib/chartData.js';
	import {active} from '$lib/stores.js';
	import Button, { Label } from '@smui/button';
	import LayoutGrid, { Cell } from '@smui/layout-grid';

    export let data, detail_link;

	let view = $_view;
	let year = view.year;
	let month = view.month;
	let day = view.day;
	
	let labels, chartdata;
	let mode = 'year';
	let title = 'Strømforbrug månedligt'
    let title_date = year;

	// Set to latest month in latest year
	// detail_link = getLatestDataDate(data.years[`${year}`]).latestMonth;
	detail_link = undefined;


    let yearChart = (y) => {
		let d = getChartYearData(data.years, `${y}`);
		chartdata = d[0];
		labels = d[1];
		title_date = y;
	}
	

	let setMonth = (m) => {
		if ( m  === undefined ) m = getLatestDataDate(data.years).latestMonth;
		$_view.month = m;
		$_view.day = getLatestDataDate(data.years).latestDay;
	}

	let setYear = (y) => {
		year = y;
		console.log(year)
		console.log(month)
	}
	
	$: yearChart(year);
	$: setMonth(detail_link);

	console.log(totalYear(data.years, 2023))

	// console.log(Object.keys(data.years).length)

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
</style>

<LayoutGrid>
	<Cell span={12}>
		<div class='graph' on:click={() => ($active='month')} on:keydown={() => ($active='month')}>
			<Chart {chartdata} {labels} label={title_date} {title} bind:detail_link/>
		</div>
	</Cell>
</LayoutGrid>

<LayoutGrid align="center">
	<Cell span={2}></Cell>
		<Cell span={8}>
			<div class="center">
				{#each Object.keys(data.years) as y}
					<Button variant="outlined" color="secondary" class="nav" href={null} on:click={() => setYear(y)} on:keydown={() => setYear(y)}><Label>{y}</Label></Button>
				{/each}
			</div>
		</Cell>
	<Cell span={2}></Cell>
</LayoutGrid>



