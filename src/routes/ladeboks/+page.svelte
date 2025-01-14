<script>
    // @ts-nocheck
    let { data } = $props();
    console.log(data.user.name)
</script>

<p>
    {data.user.name}
</p>
<p>
    {data.user.surname}
</p>
<p>
    {data.user.email}
</p>
<p>
    User id is:{data.user._id}
</p>
<p>
    Data is: {data.user.chargers[0].id}
</p>
<p>
    Refusion data is: {data.user.chargers[0].refusion_id}
</p>
