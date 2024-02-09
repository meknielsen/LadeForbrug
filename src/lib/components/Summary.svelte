<script>
// @ts-nocheck

    import Paper, { Title, Subtitle, Content } from '@smui/paper';
    import LayoutGrid, { Cell } from '@smui/layout-grid';
    import { getChartYearData, getLatestDataDate, totalYear } from '$lib/chartData.js';

    export let data;

    // console.log(totalYear(data.years, `${2023}`, 2))
    let s = 0;
    let c = data.refusion_data[`${2023}`][0]
    let d = getChartYearData(data.years, `${2023}`);
    console.log(typeof Number(d[0][0][4]))
    console.log(typeof c)

    let one = '100';
    let two = '25'

    console.log(one-two)

</script>

<style>
    .cell-container {
        width: 90%;
        padding: 5%;
    }
</style>

<div class="cell-container">
    <LayoutGrid>
        {#each ['2024', '2023', '2022', '2021', '2020', '2019', '2018'] as item, _i}
            <Cell span={3}>
                <Paper>
                    <Title>{item}</Title>
                    <Subtitle>Charging total</Subtitle>
                    <Content>kWh</Content>
                </Paper>
            </Cell>
        {/each}
    </LayoutGrid>
</div>
