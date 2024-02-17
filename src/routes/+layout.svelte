<script>
// @ts-nocheck

  import "../app.pcss";
  import { _active, _view } from '$lib/stores.js';

  import { Navbar, NavBrand, NavLi, NavUl, NavHamburger } from 'flowbite-svelte';
  import { ThumbsUpSolid, ArrowRightOutline, CogOutline } from 'flowbite-svelte-icons';
  import { Dropdown, DropdownItem, DropdownDivider, DropdownHeader } from 'flowbite-svelte';
  import { DarkMode } from 'flowbite-svelte';

  let dropdownOpen = false;
  let btnClass = 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg ps-1 w-7';

  $_active = 'year';
  let activeView = (s) => {
    $_active = s;
    console.log($_active)
  }

</script>

<style>
</style>

<div>
<Navbar class="bg-gray-200" >
  <NavBrand >
    <span class="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Ladeforbrug</span>
  </NavBrand>
  <NavHamburger  />
  <NavUl class="flex flex-wrap items-bottom justify-between">
    <NavLi on:click={() => activeView('year')}>Årligt</NavLi>
    <NavLi on:click={() => activeView('month')}>Måned</NavLi>
    <NavLi on:click={() => activeView('day')}>Dagligt</NavLi>
    <NavLi><DarkMode {btnClass}/></NavLi>
    <NavLi>
      <CogOutline class="w-5 h-5" />
      <Dropdown bind:open={dropdownOpen}>
        <DropdownItem on:click={() => activeView('settings')} on:click={() => (dropdownOpen = false)}>Settings</DropdownItem>
        <DropdownItem bind:open={dropdownOpen} on:click={() => activeView('summary')}>Summary</DropdownItem>
        <DropdownItem bind:open={dropdownOpen} on:click={() => activeView('load')}>Load Data</DropdownItem>
        <!-- <DropdownDivider /> -->
      </Dropdown>
    </NavLi>
  </NavUl>
</Navbar>

<div class="flexor-content">
  <slot></slot>
</div>
</div>
