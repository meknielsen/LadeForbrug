<script>
  // @ts-nocheck
  import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
  import IconButton from '@smui/icon-button';
  import { onMount } from 'svelte';
  import { _active } from '$lib/stores.js';

  let darkTheme;

  onMount(() => {
    darkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const toggleMode = () => (darkTheme = !darkTheme);

  $_active = 'year';
  let activeView = (s) => {
    $_active = s;
    // console.log($active);
  }

</script>

<svelte:head>
  {#if darkTheme === undefined}
    <link rel="stylesheet" href="/smui-light.css" media="(prefers-color-scheme: light)"/>
    <link rel="stylesheet" href="/smui-dark.css" media="screen and (prefers-color-scheme: dark)"/>
  {:else if darkTheme}
    <link rel="stylesheet" href="/smui-light.css" media="print" />
    <link rel="stylesheet" href="/smui-dark.css" media="screen" />
  {:else}
    <link rel="stylesheet" href="/smui-light.css" />
  {/if}
</svelte:head>

<style>
  .spacer {
    width: 20px;
  }
</style>

<div class="flexy">
    <div class="top-app-bar-container flexor">
      <TopAppBar
        variant="static"
        color='secondary'
      >
        <Row>
          <Section>
            <Title>Ladeforbrug</Title>
            <div class="spacer"></div>
            <IconButton class="material-icons" on:click={() => activeView('year')}>calendar_month</IconButton>
            <IconButton class="material-icons" on:click={() => activeView('month')}>date_range</IconButton>
            <IconButton class="material-icons" on:click={() => activeView('day')}>today</IconButton>
          </Section>
          <Section align="end" toolbar>
            <IconButton class="material-icons" on:click={toggleMode}>settings</IconButton>
            <IconButton class="material-icons" aria-label="Bookmark this page"
              >bookmark</IconButton
            >
          </Section>
        </Row>
      </TopAppBar>
      <div class="flexor-content">
        <slot />
      </div>
    </div>
</div>
