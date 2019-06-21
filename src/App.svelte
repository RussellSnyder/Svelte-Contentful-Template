<style src="../node_modules//materialize-css/dist/css/materialize.css"></style>
<script>
	let name = 'world';
	import Posts from './Posts.svelte';
</script>


<div class="container">
    <h1>Hello {name}!</h1>
    <div class="posts">
        <Posts/>
    </div>
</div>
