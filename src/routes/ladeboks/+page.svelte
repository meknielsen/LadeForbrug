<script>
    // @ts-nocheck
    let { data } = $props();
    console.log(data.user.name)
</script>

<p>
    Hello {data.user.name}
</p>
