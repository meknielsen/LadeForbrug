<script>
// @ts-nocheck

    import LayoutGrid, { Cell } from '@smui/layout-grid';
    import Button, { Label } from '@smui/button';
    import Textfield from '@smui/textfield';
    import HelperText from '@smui/textfield/helper-text';
    import { months, numberString } from '$lib/utils.js';
    import Select, { Option } from '@smui/select';
    import IconButton from '@smui/icon-button';
    import { _active } from '$lib/stores.js';
    import Tooltip, { Wrapper, RichActions } from '@smui/tooltip';
    import Dialog, { Title, Content, Actions } from '@smui/dialog';

    import Icon from '@smui/textfield/icon';
    import { json } from '@sveltejs/kit';
    import { get_current_component } from 'svelte/internal';

    let refusion_data = [];
    let today = new Date();
    let year = today.getFullYear().toString();
    let value = year;
    let open = false;
    let locale = 'DK';    
    let _values = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']

    /**
     * Set the refusion data for the given year and month.
     * @param year Year
     * @param month Month
     */
    let set_refusion_data = async (year) => {
        await fetch(`api/settings/${year}/`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(refusion_data[year])
        });
    }

    let add_year = async (year) => {
        await fetch(`api/settings/${year}/`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({})
        });
        get_refusion_data(year);
    }

    let delete_year = async (year) => {
        await fetch(`api/settings/${year}/`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
        });
        value = today.getFullYear().toString();
        get_refusion_data(year);
    }

    let get_refusion_data = async (year) => {
        const response = await fetch(`api/settings/`).then((r) => r.json());
        refusion_data = response;
        for (let i = 0; i < Object.keys(refusion_data).length; i++ ) {
            if ( Object.keys(refusion_data)[i] === year ) {
                for ( let j = 0; j < 12; j++ ){
                    if ( refusion_data[year][j] !== undefined ) {
                        _values[j] = refusion_data[year][j]
                    } else {
                        _values[j] = '0,00'
                    }
                }
            }
        }
    }

    let update_refusion_data = (data) => {
        let values = [];
        for ( let i= 0; i < 12; i++ ) {
            values[i] = data[i];
        }
        refusion_data[year] = values
    }

    let activeView = (s) => {
        $_active = s;
    }

    $: get_refusion_data(year);
    $: update_refusion_data(_values)
    $: year = value;

</script>

<style>
    * :global(.cell) {
		min-width: 90px;
		padding: 2px;
		margin: 2px;
	}
    :global(Button) {
        width: 100px;
        margin: 2px;
        margin-right: 4px;
    }
    .settings {
        display: flex;
        justify-content: left;
        align-items: center;
        min-width: 200px;
    }
    .settings-right {
        display: flex;
        justify-content: left;
        align-items: center;
    }
    .cell-button {
        width: 250px;
        margin-left: 6px;
        display: flex;
        justify-content: left;
        align-items:center
    }
    .textfield {
        width: 125px;
        margin-left: 6px;
        margin-right: 6px;
    }
    .wrapper {
        width: 500px;
        display: flex;
        justify-content: left;
        align-items:center;
    }
    .add-button {
        margin-left: 6px;
        margin-bottom: 10px;
        margin-top: 10px;
        display: flex;
        justify-content: left;
        align-items:center
    }
</style>

<LayoutGrid>
    <Cell span={3}>
        <div class="settings">
            <Select variant="outlined" color="secondary" bind:value>
              {#each Object.keys(refusion_data) as year}
                <Option value={year}>{year}</Option>
              {/each}
            </Select>
            <Wrapper rich>
                <div class="wrapper">
                <IconButton class="material-symbols-outlined">add_circle</IconButton>
                <Tooltip persistent>
                    <Title>
                        Add year 
                    </Title>
                    <Content>
                        <div class="textfield">
                            <Textfield variant="outlined" bind:value={year}></Textfield>
                        </div>
                    </Content>
                    <RichActions>
                        <div class="add-button">
                            <Button variant="raised" color="secondary" on:click={() => add_year(year)}><Label>Add</Label></Button>
                        </div>
                    </RichActions>
                </Tooltip>
                </div>
            </Wrapper>
        </div>
    </Cell>
	<Cell span={6}>
		<div class="settings">
            {#each months({locale}) as month, index (index)}
                {#if index<6}
                    <div class="cell">
                        <Textfield variant="outlined" bind:value={_values[index]} label={month}></Textfield>
                    </div>
                {/if}
            {/each}
        </div>
	</Cell>
    <Cell span={2}><div class="settings"></div></Cell>
    <Cell span={1}>
        <div class="settings-right">
            <Wrapper>
                <IconButton class="material-symbols-outlined" on:click={() => activeView('year')}>close</IconButton>
            </Wrapper>
        </div>
    </Cell>

    <Cell span={3}><div class="settings"></div></Cell>
    <Cell span={6}>
		<div class="settings">
            {#each months({locale: 'DK'}) as month, index (index)}
                {#if index>5}
                    <div class="cell">
                        <Textfield variant="outlined" bind:value={_values[index]} label={month}>
                        <HelperText slot="helper">Helper Text</HelperText>
                        </Textfield>
                    </div>
                {/if}
            {/each}
        </div>
	</Cell>
    <Cell span={3}><div class="settings"></div></Cell>

    <Cell span={3}><div class="settings"></div></Cell>
    <Cell span={2}>
        <div class="cell-button">
            <Button variant="raised" color="secondary" on:click={()=>set_refusion_data(year)}>Save</Button>
            <!-- <Button variant="raised" color="secondary" on:click={()=>get_refusion_data(year)}>Update</Button> -->
            <Dialog bind:open aria-labelledby="simple-title" aria-describedby="simple-content">
                <Title id="simple-title">WARNING</Title>
                <Content id="simple-content">Chosing the 'Delete' button below will delete the year {year} and all the monthly refusion data registered. </Content>
                <Actions>
                    <Button on:click={() => (delete_year(year))}>
                    <Label>Delete</Label>
                    </Button>
                    <Button>
                    <Label>Cancel</Label>
                    </Button>
                </Actions>
            </Dialog>
            <Button variant="raised" color="secondary" on:click={() => (open = true)}>Delete</Button>
        </div>
    </Cell>
    <Cell span={7}><div class="settings"></div></Cell>

</LayoutGrid>


