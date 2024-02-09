<script>
// @ts-nocheck

	import Chart from "$lib/components/Chart.svelte";
	import { getChartMonthData, getChartYearData, getLatestDataDate, totalMonth } from '$lib/chartData.js';
	import Icon from '@iconify/svelte';
	import {_view, _active, _treshold} from '$lib/stores.js';
	import Button, { Label } from '@smui/button';
	import LayoutGrid, { Cell } from '@smui/layout-grid';
	import Paper, { Title, Content } from '@smui/paper';

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
		current = toLabel(Number(current)+1);
	}

	let previous = () => {
		current = toLabel(Number(current)-1);
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
		total_month = totalMonth(data.years, `${year}`, `${m}`)[0];
		charging_month = totalMonth(data.years, `${year}`, `${m}`)[1];
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

<style lang="scss">
    @import '$lib/scss/_Typography.scss';

	.center {
		margin: auto;
		padding: 1px;
		text-align: center;
	}
	* :global(.nav) {
		width: 20px;
		padding: 0px;
		margin: 2px;
		
	}
	* :global(.nav-button) {
		min-width: 100px;
		padding: 2px;
		margin: 2px;
		width: 100%;
		font-style: italic;
	}
	:global(.cell-align-right) {
		text-align: right;
	}
	.pagination {
		display: flex;
		align-items: center;
		padding: 1px;
		margin: 0px;
  	}
	.graph {
		width: 80%;
		margin: 0 auto;
		padding-top: 5%;
	}
</style>

<LayoutGrid>
	<Cell span={12}>
		<div class='graph' on:click={() => ($_active='day')} on:keydown={() => ($_active='day')}>
			<Chart {chartdata} {labels} label={title_date} {title} bind:detail_link/>
		</div>
	</Cell>
</LayoutGrid>

<LayoutGrid>
	<Cell span={1}></Cell>
	<Cell align="left" span={1}>
		<div class="pagination">
			<Button variant="outlined" color="secondary" class="nav-button" href={null} on:click={() => previous()} on:keydown={() => previous()} disabled = {p_disabled}><Label>Previous</Label></Button>
		</div>
	</Cell>
	<Cell span={8}>
			<div class="center">
					{#each Array(12) as _, index (index)}
						{#if index < 12}
								<Button variant="{current === toLabel(index+1) ? 'raised' : 'outlined'}" color="secondary" class="nav" href={null} on:click={() => (current = toLabel(index+1))}><Label>{toLabel(index+1)}</Label></Button>
						{/if}
					{/each}
			</div>
	</Cell>
	<Cell align="right" span={1}>
		<div class="pagination">
			<Button variant="outlined" color="secondary" class="nav-button" href={null} on:click={() => next()} on:keydown={() => next()} disabled = {n_disabled}><Label>Next</Label></Button>
		</div>
	</Cell>
	<Cell span={1}></Cell>
</LayoutGrid>





