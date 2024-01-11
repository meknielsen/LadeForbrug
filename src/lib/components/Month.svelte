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
	// console.log($_view)
	let year = view.year;
	let month = view.month;
	let day = view.day;

	let labels, chartdata;

	let date = new Date(year, month, 0);
    let title = 'Strømforbrug dagligt';
	// let first = 1;
    // let last = date.getDate();
	// let page = 4;
    let current, title_date, total_month;
	let p_disabled, n_disabled = undefined;

	// total_month = '0,00'

    let toLabel = (d) => {
        if ( d < 10 ) return '0' + d;
        if ( d >= 10 ) return '' + d;
    }

	// current = toLabel(Number(month));
	current = month;
	// console.log('current is: ' + current)

	let next = () => {
		current = toLabel(Number(current)+1);
	}

	let previous = () => {
		current = toLabel(Number(current)-1);
	}

	let getTitleDate = (m) => {
		date.setMonth(Number(m)-1);
		// console.log('getTitleDate: (' + m + ')' + date.toLocaleDateString('da-DK', {year: 'numeric', month: 'long'}))
		return date.toLocaleDateString('da-DK', {year: 'numeric', month: 'long'});
	}

	let monthChart = (m) => {
		let d = getChartMonthData(data.years, `${year}`, `${m}`);
		// console.log(d[0])
		chartdata = d[0];
		labels = d[1];
		// $_view.month = '' + m;
		title_date = getTitleDate(`${m}`);
		// console.log('total_month (in Month): ' + `${year}/${m}`)
		total_month = totalMonth(data.years, `${year}`, `${m}`)
        if ( m >= 12 ) {n_disabled = true;} else {n_disabled = undefined;}
		if ( m <= 1 ) {p_disabled = true;} else {p_disabled = undefined;}
	}

	let setDay = (d) => {
		if ( d  === undefined ) {
			d = getLatestDataDate(data.years).latestDay;
		}
		
		view.day = d;
	}

	$: monthChart(current);
	$: setDay(detail_link);
	// $: console.log(view);

</script>

<style lang="scss">
    @import '$lib/scss/_Typography.scss';

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
	:global(.cell-align-right) {
		text-align: right;
	}
	.pagination {
		display: flex;
		align-items: center;
		width: 100%;
		min-width: 100px;
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
	<Cell span={2}></Cell>
	<Cell span={4}>
		<Paper color="secondary" variant="outlined">
			<Title>Ladestander forbrug</Title>
			<Content>
				<div class="flex-div">
					<Icon icon="mdi:battery-charging-high" style="font-size: 64px; margin-inline: 20px" />
					<div class="mdc-typography--headline4">{total_month}</div>
				</div>
			</Content>
		</Paper>
	</Cell>
	<Cell span={4}>
		<Paper color="secondary" variant="outlined">
			<Title>Hus forbrug</Title>
			<Content>
				<div class="flex-div">
					<Icon icon="mdi:home-lightning-bolt-outline" style="font-size: 64px; margin-inline: 20px" />
					<div class=" mdc-typography--headline4">{total_month}</div>
				</div>
			</Content>
		</Paper>
	</Cell>
	<Cell span={2}></Cell>
</LayoutGrid>

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
			<Button variant="outlined" color="secondary" class="nav" href={null} on:click={() => previous()} on:keydown={() => previous()} disabled = {p_disabled}><Label>Previous</Label></Button>
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
			<Button variant="outlined" color="secondary" class="nav" href={null} on:click={() => next()} on:keydown={() => next()} disabled = {n_disabled}><Label>Next</Label></Button>
		</div>
	</Cell>
	<Cell span={1}></Cell>
</LayoutGrid>





