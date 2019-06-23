<script >
     import { Router, Link, Route } from "svelte-routing";
    import Post from '../components/Post.svelte';
    import PageHeader from '../components/PageHeader.svelte';
    import { getPosts, getHomePageData } from '../Contentful.service';
    const posts = getPosts()
    const homePageData = getHomePageData()
</script>

<PageHeader page={homePageData}/>

{#await posts}
    <p>...loading blog posts</p>
{:then posts}
<Router>
    <div class="row">
        {#each posts as post, i}
            {#if i < 3 }
            <div class="col s12 m4">
                <Post {...post} isPreview={true} />
            </div>
            {/if}
        {/each}
    </div>

</Router>
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}
