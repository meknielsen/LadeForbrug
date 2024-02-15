<script>
  import "../app.pcss";
  // @ts-nocheck
  import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
  import IconButton from '@smui/icon-button';
  import { onMount } from 'svelte';
  import { _active, _view } from '$lib/stores.js';
  import Menu, { SelectionGroup, SelectionGroupIcon } from '@smui/menu';
  import List, { Item, Separator, Text } from '@smui/list';
  import Tooltip, { Wrapper } from '@smui/tooltip';

  let darkTheme;
  let settings;
  let selected1 = 'dark';

  onMount(() => {
    darkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const toggleMode = () => (darkTheme = !darkTheme);

  $_active = 'year';
  let activeView = (s) => {
    $_active = s;

  }

</script>

<svelte:head>
  {#if darkTheme === undefined}
    <link rel="stylesheet" href="/smui-light.css" media="(prefers-color-scheme: light)">
    <link rel="stylesheet" href="/smui-dark.css" media="screen and (prefers-color-scheme: dark)">
  {:else if darkTheme}
    <link rel="stylesheet" href="/smui-light.css" media="print">
    <link rel="stylesheet" href="/smui-dark.css" media="screen">
  {:else}
    <link rel="stylesheet" href="/smui-light.css">
  {/if}
</svelte:head>

<style>
  .spacer {
    width: 20px;
  }
</style>

<div class="flexy">
    <div class="top-app-bar-container flexor">
      <TopAppBar variant="static" color="secondary">
        <Row>
          <Section>
            <Title>Ladeforbrug</Title>
            <div class="spacer"></div>
            <Wrapper>
              <IconButton class="material-symbols-outlined" on:click="{()" => activeView('year')}&gt;calendar_month</IconButton>
              <Tooltip>Year</Tooltip>
            </Wrapper>
            <Wrapper>
              <IconButton class="material-symbols-outlined" on:click="{()" => activeView('month')}&gt;date_range</IconButton>
              <Tooltip>Month</Tooltip>
            </Wrapper>
            <Wrapper>
              <IconButton class="material-symbols-outlined" on:click="{()" => activeView('day')}&gt;today</IconButton>
              <Tooltip>Day</Tooltip>
            </Wrapper>
          </Section>
          <Section align="end" toolbar>
            <div style="min-width: 50px;">
              <IconButton class="material-symbols-outlined" on:click="{()" => settings.setOpen(true)}&gt;settings</IconButton>
              <!-- <IconButton class="material-symbols-outlined" on:click={() => activeView('settings')}>settings</IconButton> -->
              <Menu bind:this="{settings}">
                <List>
                  <Item on:smui:action="{()" => activeView('settings')}&gt;
                    <Text>Settings</Text>
                  </Item>
                  <Item on:smui:action="{()" => activeView('summary')}&gt;
                    <Text>Summary</Text>
                  </Item>
                  <Item on:smui:action="{()" => activeView('load')}&gt;
                    <Text>Load Data</Text>
                  </Item>
                  <Separator></Separator>
                  <SelectionGroup>
                    <Item on:smui:action="{()" => (selected1 = 'light')} selected={selected1 === 'light'} on:click={toggleMode}&gt;
                      <Text>Light</Text>
                      <SelectionGroupIcon>
                        <i class="material-symbols-outlined">check</i>
                      </SelectionGroupIcon>
                    </Item>
                    <Item on:smui:action="{()" => (selected1 = 'dark')} selected={selected1 === 'dark'} on:click={toggleMode}&gt;
                      <Text>Dark</Text>
                      <SelectionGroupIcon>
                        <i class="material-symbols-outlined">check</i>
                      </SelectionGroupIcon>
                    </Item>
                  </SelectionGroup>
                </List>
              </Menu>
            </div>
          </Section>
        </Row>
      </TopAppBar>
      <div class="flexor-content">
        <slot></slot>
      </div>
    </div>
</div>
