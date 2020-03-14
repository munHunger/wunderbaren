<script>
  import { cart, card } from "../../data.js";
  import Hamburger from "../hamburger/Hamburger.svelte";
  import Keypad from "../keypad/Keypad.svelte";

  let keypadVisible = false;

  function update(item, amount) {
    cart.update(data => {
      let existing = data.find(i => i.name === item.name);
      if (existing) existing.amount += amount;
      return data;
    });
  }
</script>

<style type="text/scss">
  .list {
    font-family: "Cousine", monospace;
    padding: 30px;
    font-size: 20px;
  }
  .item {
    margin-bottom: 25px;
  }
  .item > .name {
    margin-left: 15px;
  }
  .item > .amount {
    font-size: 14px;
  }
  .item > .price {
    float: right;
  }
  .card {
    padding: 30px;
  }

  .card .group {
    display: inline-block;
  }

  .card .code {
    font-size: 24px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1rem;
  }
  .card .date {
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.3rem;
  }
  .card .amount {
    float: right;
    font-weight: 600;
    font-size: 24px;
    letter-spacing: 0.1rem;
  }

  .pay {
    bottom: 0px;
    position: absolute;
    width: 100%;
    box-sizing: border-box;
    padding: 30px;
    text-align: center;
  }
  .pay button {
    margin-right: 30px;
  }
  .pay button.disabled {
    background-color: #494949;
  }
  .pay > .price {
    font-weight: 600;
  }

  .drawer.wrapper {
    margin-top: 5px;
    padding: 0px;
    overflow: hidden;
    transition: all 0.3s ease-out;
    height: 50px;
  }
  .drawer.wrapper.hidden {
    height: 0px;
  }
  .drawer {
    padding: 15px;
    border-radius: 0px 0px 10px 10px;
    text-align: center;
    word-spacing: 3em;
    letter-spacing: 0.1rem;
    font-size: 16px;
  }
  .drawer .link {
    user-select: none;
    cursor: pointer;
  }

  .keypad {
    overflow: hidden;
    transition: all 0.4s ease-in-out;
    height: 500px;
  }
  .keypad.hidden {
    height: 0px;
  }
</style>

<div class="dark card">
  <div on:click={() => (keypadVisible = !keypadVisible)}>
    <div class="group">
      <div class="code text alt">{$card.code}</div>
      <div class="date">{$card.scannedDate}</div>
    </div>
    <div class="amount text alt">{$card.amount}$</div>
  </div>
  <div class="keypad {keypadVisible ? '' : 'hidden'}">
    <Keypad onSend={() => (keypadVisible = false)} />
  </div>
</div>

<div class="cart list">
  {#each $cart as item}
    <div class="item">
      <Hamburger onClick={open => (item.open = open)} />
      <span class="text name">{item.name}</span>
      <span class="text alt amount">x{item.amount}</span>
      <span class="text alt price">{item.amount * item.price}$</span>
      <div class="drawer wrapper {!item.open ? 'hidden' : ''}">
        <div class="drawer dark">
          <span class="link button text alt" on:click={() => update(item, 1)}>
            add
          </span>
          <span class="link button" on:click={() => update(item, -1)}>
            remove
          </span>
        </div>
      </div>
    </div>
  {/each}
</div>

<div class="dark pay">
  <button
    class={$cart.reduce((acc, val) => acc + val.price * val.amount, 0) <= $card.amount ? '' : 'disabled'}>
    pay
  </button>
  <span class="text alt price">
    {$cart.reduce((acc, val) => acc + val.price * val.amount, 0)}$
  </span>
</div>
