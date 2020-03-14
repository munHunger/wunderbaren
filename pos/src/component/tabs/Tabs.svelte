<script>
  import { items, selectedCategory } from "../../data.js";
  let tabs;

  const distinct = (value, index, self) => self.indexOf(value) === index;

  items.subscribe(data => {
    tabs = data.map(item => item.category).filter(distinct);
  });
</script>

<style type="text/scss">
  $foregoundAlt: #00ecc6;
  .bar {
    box-shadow: 0px 0px 2px 2px rgba(0, 0, 0, 0.2);
    text-align: center;
  }

  .tab {
    display: inline-block;
    padding: 40px;
    text-transform: uppercase;
    font-size: 23px;
    font-weight: 600;
    letter-spacing: 0.3rem;
    transition: all 0.3s;
    cursor: pointer;
  }
  .tab.selected {
    background-color: $foregoundAlt;
    color: #fff;
  }
</style>

<div class="bar">
  {#each tabs as tab}
    <div
      class="tab {$selectedCategory == tab ? 'selected' : ''}"
      on:click={() => selectedCategory.set(tab)}>
      {tab}
    </div>
  {/each}
</div>
