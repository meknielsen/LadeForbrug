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
    {data.user._id}
</p>

<select class="select select-bordered w-full max-w-xs">
    <option disabled selected>Who shot first?</option>
    <option>Han Solo</option>
    <option>Greedo</option>
  </select>
