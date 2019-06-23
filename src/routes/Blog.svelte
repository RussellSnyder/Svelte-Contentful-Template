<script >
     import { Router, Link, Route } from "svelte-routing";
    import Post from '../components/Post.svelte';
    import PageHeader from '../components/PageHeader.svelte';
    import { getPosts, getBlogPageData } from '../Contentful.service';
    const posts = getPosts()
    const blogPageData = getBlogPageData()
</script>


<PageHeader page={blogPageData}/>

{#await posts}
    <p>...loading</p>
{:then posts}
<Router>
   <div class="row">
      <ul class="collection col s12 m6">
        {#each posts as post}
            <li class="collection-item"><Link to={post.slug}>{post.title} - {post.short}</Link></li>
        {/each}
      </ul>
    </div>
    {#each posts as post}
      <Route path={post.slug}>
          <Post {...post}/>
      </Route>
    {/each}
</Router>
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}
