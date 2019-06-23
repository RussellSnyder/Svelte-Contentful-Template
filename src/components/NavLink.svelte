<script>
  import { Link } from "svelte-routing";
  function getProps({ location, href, isPartiallyCurrent, isCurrent }) {
    const isActive = href === "/" ? isCurrent : isPartiallyCurrent || isCurrent;
    // The object returned here is spread on the anchor element's attributes
    if (isActive) {
      return { class: "active" };
    }
    return {};
  }

  export let to = "";
  export let className = "";
</script>

<Link class={className} to="{to}" getProps="{getProps}">
  <slot />
</Link>
