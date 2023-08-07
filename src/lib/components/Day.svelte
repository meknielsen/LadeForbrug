<script>
	/** @type {import('./$types').PageData} */

	import {_view, _day} from '$lib/stores.js';
	import Chart from "$lib/components/Chart.svelte";
	import {getChartDayData, totalDay} from '$lib/chartData.js';
	import Icon from '@iconify/svelte';

    export let data;

	let view = $_view;
    // let current = $_day;
	let year = view.year;
	let month = view.month;
	let day = view.day;
	// let day = $_day;

	let labels, chartdata, first, title_date;

	let detail_link = '00';
	let current = day;
	let label = year;
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

	let previous = () => {
		console.log(Number(current))
		if ( toLabel(Number(current)) > 1 ) current = toLabel(Number(current) - 1);
		if ( Number(current) < first && toLabel(Number(current)) > 1 ) first = first - 9;	
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
    .chart-spacer {
        padding-top: 0px;
    }
	.section {
		padding-top: 10px;
		padding-bottom: 10px;
	}
</style>

<section class="section">
	<Chart {chartdata} {labels} label={title_date} {title} bind:detail_link/>
</section>

<section class="section slim-section">
	<div class="chart-spacer">
		<nav class="pagination is-small is-centered" aria-label="pagination">
			<ul class="pagination-list">
				<li><a class="pagination-link" on:click={() => previous_page()} on:keydown={() => previous_page()} disabled = {pp_disabled} href={null}><Icon icon="mdi:chevron-double-left" style="font-size: 16px"/></a></li>
				<li><a class="pagination-link" on:click={() => previous()} on:keydown={() => previous()} disabled = {p_disabled} href={null}><Icon icon="mdi:chevron-left" style="font-size: 16px"/></a></li>
				{#each Array(9) as _, index (index)}
					{#if index + first <= last}
						<li><a class="pagination-link {current === toLabel(index+first) ? 'is-current' : ''}" on:click={() => (current = toLabel(index+first))} on:keydown={() => (current = toLabel(index+first))} href={null}>{toLabel(index+first) }</a></li>
					{/if}
				{/each}
				<li><a class="pagination-link" on:click={() => next()} on:keydown={() => next()} disabled = {n_disabled} href={null}><Icon icon="mdi:chevron-right" style="font-size: 16px"/></a></li>
				<li><a class="pagination-link" on:click={() => next_page()} on:keydown={() => next_page()} disabled = {np_disabled} href={null}><Icon icon="mdi:chevron-double-right" style="font-size: 16px"/></a></li>
			</ul>
		</nav>
	</div>
</section>






