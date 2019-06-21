<script >
     import { Router, Link, Route } from "svelte-routing";
    import Post from '../components/Post.svelte';
    import { getPosts } from '../Contentful.service';
    const posts = getPosts()
</script>

{#await posts}
    <p>...loading</p>
{:then posts}
<Router>
  <h1>Blog</h1>

  <ul>
    {#each posts as post}
        <li><Link to={post.slug}>{post.title}</Link></li>
    {/each}
  </ul>
    {#each posts as post}
      <Route path={post.slug}>
          <Post {...post}/>
      </Route>
    {/each}
</Router>
{:catch error}
    <p style="color: red">{error.message}</p>
{/await}
