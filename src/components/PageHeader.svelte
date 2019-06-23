<style>
</style>

<script>
	export let page;
</script>

{#await page}
<h1>Loading....</h1>
{:then page}
<h1>{page.title}</h1>
<div class="row">
    <div class="col s12 m4">
        {@html page.description}
    </div>
</div>
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}
