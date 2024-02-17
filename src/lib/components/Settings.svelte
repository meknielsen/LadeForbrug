<script>
// @ts-nocheck

    // import { Input } from 'flowbite-svelte';
    import { FloatingLabelInput, Helper, Label, Input, CloseButton } from 'flowbite-svelte';
    import { ButtonGroup, Button, Dropdown, DropdownItem, Select, Modal, P } from 'flowbite-svelte';
    import { DarkMode } from 'flowbite-svelte';

    import { ExclamationCircleOutline, PlusOutline, ArrowRightOutline  } from 'flowbite-svelte-icons';

    import { months, numberString } from '$lib/utils.js';

    import { _active } from '$lib/stores.js';

    // import Tooltip, { Wrapper, RichActions } from '@smui/tooltip';
    // import Dialog, { Title, Content, Actions } from '@smui/dialog';

    // import Icon from '@smui/textfield/icon';

    // import { json } from '@sveltejs/kit';
    // import { get_current_component } from 'svelte/internal';

    let refusion_data = [];
    let today = new Date();
    let year = today.getFullYear().toString();
    let new_year = '';
    let value = year;
    let years = [];
    let open = false;
    let locale = 'DK';    
    let _values = ['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']
    let popupDelete = false;
    let popupAdd = false;
    let isDisabled = true;

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
        get_refusion_data(year);
        await fetch(`api/settings/${year}/`, {
            method: 'PUT',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify([])
        });
        get_refusion_data(year);
    }

    let delete_year = async (y) => {
        await fetch(`api/settings/${y}/`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json'
            },
        });
        value = today.getFullYear().toString();
        get_refusion_data(y);
        year = value;
        years = years.filter(e => e.value !== `${y}`);
    }

    let get_refusion_data = async (year) => {
        const response = await fetch(`api/settings/`).then((r) => r.json());
        refusion_data = response;
        for (let i = 0; i < Object.keys(refusion_data).length; i++ ) {
            years[i] = { value: Object.keys(refusion_data)[i], name: Object.keys(refusion_data)[i]}
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
        console.log(years)
    }

    let update_refusion_data = (data) => {
        let values = [];
        for ( let i= 0; i < 12; i++ ) {
            if ( data[i] == "" ) {
                values[i] = "0,00";
            } else {
                values[i] = data[i];
            }
        }
        refusion_data[year] = values
    }

    let activeView = (s) => {
        $_active = s;
    }

    let validate_input = (y) => {
        year = y;
        isDisabled = !isNaN(y) && y.length === 4 && Number(y) >= 2020 && !Object.keys(refusion_data).includes(y);
        return isDisabled;
    }

    $: get_refusion_data(year);
    $: update_refusion_data(_values)
    $: year = value; 

</script>

<style>
</style>

<div class="flex flex-row pt-16">
    <div class="basis-1/12"></div>
    <div class="basis-1/12 min-w-32">
        <Label for="search" class="block mt-1 w-28">Select year
            <Select class="mt-2" size="sm" items={years} bind:value={year} placeholder=''/>
        </Label>
    </div>
    <div class="basis-1/12 mt-8 min-w-16">
        <Button pill={true} class="!p-2" color="alternative" on:click={() => (popupAdd = true, new_year ="")}><PlusOutline /></Button>
        <Modal title="Add Year" bind:open={popupAdd} size="xs" autoclose outsideclose={false}>
            <form class="flex flex-col space-y-1" action="#">
            <Input type="text" name="add_year" bind:value={new_year} placeholder="" />
            <P size="xs" class="text-red-500 {validate_input(new_year) ? 'dark:text-green-600' : 'dark:text-red-600'} ml-1 p-0" >Must be a valid, non-existing year after 2020.</P>
        </form>
            <svelte:fragment slot="footer">
              <Button on:click={() => add_year(new_year)} disabled={!isDisabled}>Add</Button>
              <Button color="alternative">Cancel</Button>
            </svelte:fragment>
        </Modal>
    </div>
    <div class="basis-6/12 flex">
        {#each months({locale}) as month, index (index)}
            {#if index<6}
                <div class="min-w-28 p-1">
                    <Label class="mb-2 ml-2" for="input-sm">{month}</Label>
                    <ButtonGroup class="w-full" size="md">
                        <Input id="input-sm" type="email" placeholder="0,00" bind:value={_values[index]}/>
                    </ButtonGroup>
                </div>
            {/if}
        {/each}
    </div>
    <div class="basis-2/12">
    </div>
    <div class="basis-1/12">
        <CloseButton color="dark" size="lg" on:click={() => activeView('year')}/>
    </div>
</div>

<div class="flex flex-row">
    <div class="basis-1/12"></div>
    <div class="basis-1/12 min-w-32"></div>
    <div class="basis-1/12 min-w-16"></div>
    <div class="basis-6/12 flex">
        {#each months({locale}) as month, index (index)}
            {#if index>5}
                <div class="p-1 min-w-28">
                    <Label class="mb-2 ml-2" for="input-sm">{month}</Label>
                    <ButtonGroup class="w-full" size="md">
                        <Input id="input-sm" type="email" placeholder="0,00" bind:value={_values[index]}/>
                    </ButtonGroup>
                </div>
            {/if}
        {/each}
    </div>
    <div class="basis-3/12">
    </div>
</div>

<div class="flex flex-row">
    <div class="basis-3/12"></div>
    <div class="basis-1/12 flex">
        <div class="m-1 pt-10 mr-6 w-12">
            <Button on:click={()=>set_refusion_data(year)}>Save</Button>
        </div>
        <div class="m-1 pt-10 w-12">
            <Button on:click={() => (popupDelete = true)}>Delete</Button>
            <Modal bind:open={popupDelete} size="xs" autoclose outsideclose>
                <div class="text-center">
                    <ExclamationCircleOutline class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200" />
                    <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">This will delete the year {year} and all the monthly refusion data registered. </h3>
                    <Button color="red" class="me-2" on:click={() => (delete_year(year))}>Delete</Button>
                    <Button color="alternative">Cancel
                    </Button>
                </div>
            </Modal>
        </div>
        
    </div>
    <div class="basis-8/12"></div>
</div>

<!-- 
		<div class="settings">
            {#each months({locale}) as month, index (index)}
                {#if index<6}
                    <div class="cell"> -->
                        <!-- <Textfield variant="outlined" bind:value={_values[index]} label={month}></Textfield> -->
                        <!-- <Label class="mb-2 ml-2" for="input-sm">{month}</Label>
                        <ButtonGroup class="w-full" size="md">
                            <Input id="input-sm" type="email" placeholder="0,00" />
                        </ButtonGroup>
                    </div>
                {/if}
            {/each}
        </div> -->

        <!-- <div class="settings-right">
            <Wrapper>
                <IconButton class="material-symbols-outlined" on:click={() => activeView('year')}>close</IconButton>
            </Wrapper>
        </div> -->


		<!-- <div class="settings">
            {#each months({locale: 'DK'}) as month, index (index)}
                {#if index>5}
                    <div class="cell"> -->
                        <!-- <Textfield variant="outlined" bind:value={_values[index]} label={month}>
                        <HelperText slot="helper">Helper Text</HelperText>
                        </Textfield> -->
                        <!-- <Label class="mb-2 ml-2" for="input-sm">{month}</Label>
                        <ButtonGroup class="w-full" size="md">
                            <Input id="input-sm" type="email" placeholder="0,00" />
                        </ButtonGroup>
                    </div>
                {/if}
            {/each}
        </div> -->

        <!-- <div class="cell-button">
            <Button variant="raised" color="secondary" on:click={()=>set_refusion_data(year)}>Save</Button>
            <Dialog bind:open aria-labelledby="simple-title" aria-describedby="simple-content">
                <Title id="simple-title">WARNING</Title>
                <Content id="simple-content">Chosing the 'Delete' button below will delete the year {year} and all the monthly refusion data registered. </Content>
                <Actions>
                    <Button on:click={() => (delete_year(year))}>
                    Delete
                    </Button>
                    <Button>
                    Cancel
                    </Button>
                </Actions>
            </Dialog>
            <Button variant="raised" color="secondary" on:click={() => (open = true)}>Delete</Button>
        </div> -->
 


