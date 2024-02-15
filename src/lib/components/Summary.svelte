<script>
// @ts-nocheck

    import Paper, { Title, Subtitle, Content } from '@smui/paper';
    import LayoutGrid, { Cell } from '@smui/layout-grid';
    import { getChartYearData, getLatestDataDate, totalYear } from '$lib/chartData.js';
    import Button, { Label } from '@smui/button';

    export let data;

    let s = 0;
    let locale = 'da-DK';
    let refusion_sum = (y) => { data.refusion_data[`${y}`].forEach((el) => s += Number(el.replace(/,/g, '.'))); return s; };

    let total = (y) => totalYear(data.years, `${y}`, 2)[0].toLocaleString(locale);
    let total_charging = (y) => totalYear(data.years, `${y}`, 2)[1].toLocaleString(locale);
    let total_pay = (y) => totalYear(data.years, `${y}`, 2)[1] - refusion_sum(`${y}`);

    console.log(totalYear(data.years, `${2023}`, 2)[1] - refusion_sum(`${2023}`))

</script>

<style>
    .cell-container {
        width: 90%;
        padding: 5%;
        display: flex;
    }
    * :global(.total-button) {
        width: 90%;
        padding: 5%;;
        margin: 0 auto;
    }
    * :global(.paper) {
        width: 200px;
        padding: 10px;
    }
    * :global(.cell) {
        padding: 0px;
        margin: 1px;
    }
</style>

<div class="cell-container">
    <LayoutGrid>
        {#each ['2024', '2023'] as item, _i}
            <Cell span={3} class="cell">
                <Paper class="paper">
                    <Title>{item}</Title>
                    <Subtitle>Charging total:</Subtitle>
                    <Content>
                        <div class="total-button">
                            <Button variant="raised" class="total-button" color="secondary"><Label class="total-button">DKK {total(item)}</Label></Button>
                        </div>
                    </Content>
                    <Content>DKK {total_charging(item)}</Content>
                    <Content>DKK {total_pay(item)}</Content>
                </Paper>
            </Cell>
        {/each}
    </LayoutGrid>
</div>
