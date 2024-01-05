<script>
// @ts-nocheck

	/** @type {import('./$types').PageData} */

	import {_view} from '$lib/stores.js';
	import Chart from "$lib/components/Chart.svelte";
	import {getChartDayData} from '$lib/chartData.js';
	import Icon from '@iconify/svelte';

	import LayoutGrid , { Cell } from '@smui/layout-grid';
	import Button, { Label } from '@smui/button';
	
    export let data, detail_link;

	let view = $_view;
	let year = view.year;
	let month = view.month;
	let day = view.day;

	// console.log(view)

	let labels, chartdata, first, title_date;

	let current = day;
	// let label = year;
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
		// console.log(`${year}/${month}/${c}`)
		// console.log(data.years['2023'].hasOwnProperty(`${month}`))
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
	:global(.nav) {
		min-width: 32px;
		padding: 2px;
		margin: 2px;
	}
	:global(.cell-align-right) {
		text-align: right;
	}
	.center {
	margin: auto;
	width: 80%;
	padding: 1px;
	text-align: center;
	}
	.pagination {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
  	}
	.arrows {
		padding: 2px;
	}
	.graph {
		width: 80%;
		margin: 0 auto;
		padding-top: 5%;
	}
</style>


<LayoutGrid>
	<Cell span={12}>
		<div class='graph'>
			<Chart {chartdata} {labels} label={title_date} {title} bind:detail_link/>
		</div>
	</Cell>
</LayoutGrid>

<LayoutGrid>
	<Cell span={1}></Cell>
	<Cell align="left" span={1}>
		<div class="pagination">
			<div class='arrows'>
			<Button variant="outlined" color="secondary" href={null} on:click={() => previous_page()} on:keydown={() => previous_page()} disabled = {pp_disabled}><Label><Icon icon="mdi:chevron-double-left" style="font-size: 16px"/></Label></Button>
			</div>
			<div class='arrows'>
			<Button variant="outlined" color="secondary" href={null} on:click={() => previous()} on:keydown={() => previous()} disabled = {p_disabled}><Label><Icon icon="mdi:chevron-left" style="font-size: 16px"/></Label></Button>
			</div>
		</div>
	</Cell>
	<Cell span={8}>
			<div class="center">
					{#each Array(9) as _, index (index)}
					{#if index + first <= last}
						<Button variant="{current === toLabel(index+first) ? 'raised' : 'outlined'}" color="secondary" class="myClass" href={null} on:click={() => (current = toLabel(index+first))}><Label>{toLabel(index+first) }</Label></Button>
						<!-- <li><a class="pagination-link {current === toLabel(index+first) ? 'is-current' : ''}" on:click={() => (current = toLabel(index+first))} on:keydown={() => (current = toLabel(index+first))} href={null}>{toLabel(index+first) }</a></li> -->
					{/if}
				{/each}
			</div>
	</Cell>
	<Cell span={1}>
		<div class="pagination">
			<div class='arrows'>
			<Button variant="outlined" color="secondary" href={null} on:click={() => next()} on:keydown={() => next()} disabled = {n_disabled}><Label><Icon icon="mdi:chevron-right" style="font-size: 16px"/></Label></Button>
			</div>
			<div class='arrows'>
			<Button variant="outlined" color="secondary" href={null} on:click={() => next_page()} on:keydown={() => next_page()} disabled = {np_disabled}><Label><Icon icon="mdi:chevron-double-right" style="font-size: 16px"/></Label></Button>
			</div>
		</div>
	</Cell>
	<Cell span={1}></Cell>
</LayoutGrid>

<!-- <section class="section slim-section">
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
</section> -->






