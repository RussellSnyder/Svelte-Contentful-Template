<script>
	let name = 'world';
  import { Router, Route } from "svelte-routing";
  import NavLink from "./components/NavLink.svelte";
  import Home from "./routes/Home.svelte";
  import About from "./routes/About.svelte";
  import Blog from "./routes/Blog.svelte";
  // Used for SSR. A falsy value is ignored by the Router.
  export let url = "";

</script>

<Router url="{url}">
<header>
    <nav class="white">
        <div class="nav-wrapper container">
            <NavLink to="/">Svelte+Contentful</NavLink>
            <ul id="nav-mobile" class="right">
                <li><NavLink to="/">Home</NavLink></li>
                <li><NavLink to="about">About</NavLink></li>
                <li><NavLink to="blog">Blog</NavLink></li>
            </ul>
        </div>
  </nav>
</header>
<main class="container">
    <Route path="about" component="{About}" />
    <Route path="blog/*" component="{Blog}" />
    <Route path="/" component="{Home}" />
</main>
<footer class="page-footer sticky blue">
          <div class="container">
            <div class="row">
              <div class="col l6 s12">
                <h5 class="white-text">Svelte+Contentful Template - With Material UI styles</h5>
              </div>
            </div>
          </div>
          <div class="footer-copyright">
            <div class="container">
            Made by Russell
            </div>
          </div>
        </footer>
</Router>
