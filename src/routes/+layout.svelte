<script>
    import TopAppBar, { Row, Section, Title } from '@smui/top-app-bar';
    import IconButton from '@smui/icon-button';
</script>

<style>
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
            <IconButton class="material-icons" href="/years">calendar_month</IconButton>
            <IconButton class="material-icons" href="/months">date_range</IconButton>
            <IconButton class="material-icons" href="/days">today</IconButton>
          </Section>
          <Section align="end" toolbar>
            <IconButton class="material-icons">settings</IconButton>
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

