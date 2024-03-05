<script>
// @ts-nocheck

	import Chart from "$lib/components/Chart.svelte";
	import { getChartMonthData, getChartYearData, getLatestDataDate, totalMonth } from '$lib/chartData.js';
	import {_view, _active, _treshold} from '$lib/stores.js';
	import Icon from '@iconify/svelte';

	// import { Button } from 'flowbite-svelte';
	// import { ChevronLeftOutline, ChevronRightOutline } from 'flowbite-svelte-icons';

    export let data, detail_link;

	let view = $_view;
	let year = view.year;
	let month = view.month;
	let day = view.day;

	let labels, chartdata;

	let date = new Date(year, month, 0);
    let title = 'Strømforbrug dagligt';
    let current, title_date, total_month, charging_month;
	let p_disabled, n_disabled = undefined;

    let toLabel = (d) => {
        if ( d < 10 ) return '0' + d;
        if ( d >= 10 ) return '' + d;
    }

	current = month;

	let next = () => {
		if (current < 12) current = toLabel(Number(current)+1);
	}

	let previous = () => {
		if (current > 1) current = toLabel(Number(current)-1);
	}

	let getTitleDate = (m) => {
		date.setMonth(Number(m)-1);
		return date.toLocaleDateString('da-DK', {year: 'numeric', month: 'long'});
	}

	let monthChart = (m) => {
		let d = getChartMonthData(data.years, `${year}`, `${m}`);
		chartdata = d[0];
		labels = d[1];
		title_date = getTitleDate(`${m}`);
		// total_month = totalMonth(data.years, `${year}`, `${m}`)[0];
		// charging_month = totalMonth(data.years, `${year}`, `${m}`)[1];
        if ( m >= 12 ) {n_disabled = true;} else {n_disabled = undefined;}
		if ( m <= 1 ) {p_disabled = true;} else {p_disabled = undefined;}
	}

	let setDay = (d) => {
		if ( d  === undefined ) {
			d = getLatestDataDate(data.years).latestDay;
		}
		
		view.day = d;
		view.month = current;
	}

	$: monthChart(current);
	$: setDay(detail_link);

</script>

<style>
	.graph {
		width: 80%;
		margin: 0 auto;
		padding-top: 5%;
		padding-bottom: 2%;
	}
</style>


<div class='graph' on:click={() => ($_active='day')} on:keydown={() => ($_active='day')} role="link" tabindex="0">
	<Chart {chartdata} {labels} label={title_date} {title} bind:detail_link/>
</div>

<div class="flex justify-center">
	<!-- <button class="btn w-2 mx-1" href={null} on:click={() => previous()}><Icon icon="mdi:home-lightning-bolt" style="color: rgba(54, 162, 235, 1)" class="w-6 h-6 me-2" /></button> -->
	<div class="min-w-10 flex"></div>
	<div class="join">
	{#each Array(12) as _, index (index)}
			{#if index < 12}
				<button class="join-item btn btn-md {current === toLabel(index+1) ? 'btn-active' : ''}" on:click={() => (current = toLabel(index+1))}>{toLabel(index+1)}</button>
			{/if}
	{/each} 	 	 	
</div>
	<div class="min-w-10 flex"></div>
	<!-- <button class="btn btn-outline w-2 mx-1" href={null} on:click={() => next()}><Icon icon="mdi:settings-outline" class="w-4 h-4 me-2" /></button> -->
</div>








