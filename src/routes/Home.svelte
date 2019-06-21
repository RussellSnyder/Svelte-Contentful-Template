<script >
     import { Router, Link, Route } from "svelte-routing";
    import Post from '../components/Post.svelte';
    import { getPosts } from '../Contentful.service';
    const posts = getPosts()
</script>

<h1>Home</h1>
{#await posts}
    <p>...loading blog posts</p>
{:then posts}
<Router>
    {#each posts as post}
        <Post {...post} isPreview={true} />
    {/each}
</Router>
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}
