<script>
  import { cart, items, selectedCategory } from "../../data.js";
  function addToCart(item) {
    cart.update(data => {
      let existing = data.find(i => i.name === item.name);
      if (existing) existing.amount++;
      else data = data.concat([{ ...item, amount: 1 }]);
      return data;
    });
  }
</script>

<style type="text/scss">
  .card {
    position: relative;
    display: inline-block;
    width: 20%;
    margin-top: 20px;
    padding: 5px 10px 20px 10px;
    box-sizing: border-box;
    box-shadow: 0px 0px 2px 1px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

  .image > img {
    width: 100%;
  }

  .name {
    margin-top: 15px;
    margin-left: 5px;
    font-size: 18px;
    letter-spacing: 0.1rem;
  }

  .price {
    margin-left: 5px;
    margin-top: 25px;
    font-weight: 600;
    font-size: 16px;
  }
</style>

{#each $items.filter(item => item.category === $selectedCategory) as item}
  <div class="card" on:click={() => addToCart(item)}>
    <div class="image">
      <img src={item.image} alt={item.name} />
    </div>
    <div class="name">{item.name}</div>
    <div class="price text alt">{item.price}$</div>
  </div>
{/each}
