<script>
// @ts-nocheck

	/** @type {import('./$types').PageData} */

	import {_view, _active, _treshold} from '$lib/stores.js';
	import Chart from "$lib/components/Chart.svelte";
	import {getChartDayData} from '$lib/chartData.js';
	import Icon from '@iconify/svelte';
	
    export let data, detail_link;

	let view = $_view;
	let year = view.year;
	let month = view.month;
	let day = view.day;

	let labels, chartdata, first, title_date;

	let current = day;
	let date = new Date(year, month, 0);
	let title = 'Strømforbrug hver time';
    let last = date.getDate();
	let page = 4;
	let p_disabled, pp_disabled, n_disabled, np_disabled = undefined;

    let toLabel = (d) => {
        if ( d < 10 ) return '0' + d;
        if ( d >= 10 ) return '' + d;
    }

	first = 1;
	if ( Number(current) > 9  ) first = 6; 
	if ( Number(current) > 14 ) first = 11; 
	if ( Number(current) > 19 ) first = 16;
	if ( Number(current) > 24 ) first = 21;
	if ( Number(current) > 29 ) first = 26;
	
	let next = () => {
		if ( toLabel(Number(current) + 1) <= last ) current = toLabel(Number(current) + 1);
		if ( current > (first + 2*page) ) first = first + 9;
	}

	let next_page = () => {
		if ( (last - (first + page))>=page) {
			first = first + 5;
			current = toLabel(first + page);
		}
	}

	// working on this ... 6/3/2024
	let previous = () => {
		console.log('Now: ' + Number(current))
		if ( toLabel(Number(current)) > 1 ) current = toLabel(Number(current) - 1);
		if ( Number(current) < first && toLabel(Number(current)) > 1 ) first = first - 9;	
		console.log('Next: ' + Number(current))
		console.log('Last: ' + last)
		console.log('First: ' + first)
	}

	let previous_page = () => {
		if ( first > 5 ) {
			first = first - 5;
		} else {
			first = 1;
		}
		current = toLabel(first + page);
	}

	let getTitleDate = (day) => {
		date.setDate(day);
		return date.toLocaleDateString('da-DK', {year: 'numeric', month: 'short', weekday: 'short', day: '2-digit'});
	}

	let dayChart = (c) => {
		if ( c.length === 0) {c = '01'}
		let d = getChartDayData(data.years[`${year}`][`${month}`][`${c}`], 0);
		chartdata = d[0];
		labels = d[1];
		title_date = getTitleDate(`${c}`);
		current = c;

		if ( Number(current) === 1 ) {p_disabled = true;} else {p_disabled = undefined;}
		if ( (last - Number(current)) < page ) {np_disabled = true;} else {np_disabled = undefined;}
		if ( Number(current) === last ) {n_disabled = true;} else {n_disabled = undefined;}
		if ( first === 1 ) {pp_disabled = true;} else {pp_disabled = undefined;}

	}

	$: dayChart(current)

</script>

<style>
	.center {
		margin: auto;
		width: 80%;
		padding: 1px;
		text-align: center;
		display: flex;
		justify-content: center;
	}
	.graph {
		width: 80%;
		margin: 0 auto;
		padding-top: 5%;
		padding-bottom: 2%;
	}
</style>

<div class='graph' on:click={() => ($_active='month')} on:keydown={() => ($_active='month')} role="link" tabindex="0">
	<Chart {chartdata} {labels} label={title_date} {title} bind:detail_link/>
</div>

<div class="center">
	<div class='arrows'>
	</div>
	<div>
		<div class="join">
			<button class="join-item btn btn-md" on:click={() => previous_page()} on:keydown={() => previous_page()}><Icon icon="ic:outline-keyboard-double-arrow-left" class="size-5"/></button>
			<button class="join-item btn btn-md" on:click={() => previous()} on:keydown={() => previous()}><Icon icon="ic:outline-keyboard-arrow-left" class="size-5"/></button>
			{#each Array(9) as _, index (index)}
				{#if index + first <= last}
					<button class="join-item btn btn-md {current === toLabel(index+first) ? 'btn-active' : ''}" href={null} on:click={() => (current = toLabel(index+first))}>{toLabel(index+first) }</button>
				{/if}
			{/each}
			<button class="join-item btn btn-md" on:click={() => next()} on:keydown={() => next()}><Icon icon="ic:outline-keyboard-arrow-right" class="size-5"/></button>
			<button class="join-item btn btn-md" on:click={() => next_page()} on:keydown={() => next_page()}><Icon icon="ic:outline-keyboard-double-arrow-right" class="size-5"/></button>
		</div>
	</div>
	<div class='arrows'>
	</div>
</div>







