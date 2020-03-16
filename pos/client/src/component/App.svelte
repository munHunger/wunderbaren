<script>
  import Cart from "./cart/Cart.svelte";
  import Tabs from "./tabs/Tabs.svelte";
  import ItemGrid from "./item/ItemGrid.svelte";

  import { fetchCard } from "../server";
  let card = "";

  function handleKeydown(key) {
    if (key.key === "Enter") {
      fetchCard(card);
      card = "";
    } else if (key.key.length === 1) card += key.key;
  }
</script>

<style type="text/scss">
  $backgroundDark: #494949;
  $backgroundDarkAlt: #3c3c3c;
  $backgroundLight: #fff;

  $foregoundDark: #333;
  $foregoundLight: #fff;
  $foregoundAlt: #00ecc6;

  :global(body) {
    background-color: $backgroundLight;
    color: $foregoundDark;
    margin: 0px;
  }
  :global(.text.alt) {
    color: $foregoundAlt;
  }
  :global(div.dark) {
    background-color: $backgroundDark;
    color: $foregoundLight;
  }

  :global(div.dark div.dark) {
    background-color: $backgroundDarkAlt;
  }

  :global(button) {
    outline: none;
    border: 0;
    background: none;
    box-shadow: none;
    font-weight: 600;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
    transition: all 0.3s;
    background-color: $foregoundAlt;
    text-transform: uppercase;
    min-width: 100px;
    color: $foregoundLight;
    font-size: 20px;
  }

  .content {
    position: absolute;
    display: inline-block;
    width: 77%;
    left: 0px;
    top: 0px;
    height: 100%;
  }

  .sidebar {
    position: absolute;
    display: inline-block;
    width: 23%;
    left: 77%;
    top: 0px;
    height: 100%;
  }
</style>

<svelte:window on:keydown={handleKeydown} />

<div class="content">
  <Tabs tabs={['beer', 'cider', 'drinks', 'shots']} selected="drinks" />
  <ItemGrid />
</div>
<div class="sidebar dark">
  <Cart />
</div>
