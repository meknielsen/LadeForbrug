<script>
	/** @type {import('./$types').PageData} */

	import {_view, _day} from '$lib/stores.js';
	import Chart from "$lib/components/Chart.svelte";
	import { getChartMonthData, totalDay } from '$lib/chartData.js';
	import Icon from '@iconify/svelte';

    export let data;

	let view = $_view;

	let year = view.year;
	let month = view.month;
	let day = view.day;

	let labels, chartdata, myChart;
	
	let detail_link = 'month';
	let label = year;
	let date = new Date(year, month, 0);
    let title = 'Strømforbrug dagligt';
	let first = 1;
    let last = date.getDate();
	let page = 4;
    let current, title_date;
	let p_disabled, n_disabled = undefined;

    let toLabel = (d) => {
        if ( d < 10 ) return '0' + d;
        if ( d >= 10 ) return '' + d;
    }

	current = toLabel(Number(month));

	let next = () => {
		current = toLabel(Number(current)+1);
	}

	let previous = () => {
		current = toLabel(Number(current)-1);
	}

	let getTitleDate = (day) => {
		date.setDate(day);
		return date.toLocaleDateString('da-DK', {year: 'numeric', month: 'long'});
	}

	let monthChart = (m) => {
		let d = getChartMonthData(data.years[`${year}`][`${m}`]);
		chartdata = d[0];
		labels = d[1];
		title_date = getTitleDate(`${m}`);

        if ( m >= 12 ) {n_disabled = true;} else {n_disabled = undefined;}
		if ( m <= 1 ) {p_disabled = true;} else {p_disabled = undefined;}
	}

	let setDay = () => {
		console.log('Selected day is = ' + detail_link)
		day = detail_link;
	}

	$: monthChart(current);

</script>

<style>
    .chart-spacer {
        padding-top: 0px;
    }
	.card {
		width: 350px;
		height: 150px;
	}
	.price {
		padding-top: 20px;
	}
</style>

<section class="section">

	

	<div class="columns">

		<div class="column"></div>

		<div class="column">
			<div class="card">
				<div class="card-content">
					<div class="media">
						<div class="media-left">
						<figure class="image is-96x96">
							<Icon icon="mdi:battery-charging-high" style="font-size: 96px" />
						</figure>
						</div>
						<div class="media-content price">
						<p class="title is-2">51,34 kr.</p>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<div class="column"></div>

		<div class="column">
			<div class="card">
				<div class="card-content">
					<div class="media">
						<div class="media-left">
						<figure class="image is-96x96">
							<Icon icon="mdi:home-lightning-bolt-outline" style="font-size: 96px" />
						</figure>
						</div>
						<div class="media-content price">
						<p class="title is-2">51,34 kr.</p>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="column"></div>

	</div>

</section>

<section class="section">
	<a href = '/days' on:click={() => setDay()}>
		<Chart {chartdata} {labels} label={title_date} {title} bind:detail_link/>
	</a>
</section>

<section class="section">
	<div class="chart-spacer">
		<nav class="pagination is-small is-centered" role="navigation" aria-label="pagination">
			<a class="pagination-previous" title="This is the first page" on:click={() => previous()} disabled = {p_disabled}>Previous</a>
			<a class="pagination-next" on:click={() => next()} disabled = {n_disabled}>Next page</a>
			<ul class="pagination-list">
				{#each Array(12) as _, index (index)}
					{#if index < 12}
						<li><a class="pagination-link  {current === toLabel(index+1) ? 'is-current' : ''}" on:click={() => (current = toLabel(index+1))}>{toLabel(index+1)}</a></li>
					{/if}
				{/each}
			</ul>
		</nav>
	</div>
</section>







