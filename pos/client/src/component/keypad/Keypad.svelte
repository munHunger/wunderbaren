<script>
  export let onSend;
  let value = 0;
  function keyPress(key) {
    if (value === 0) value = key;
    else value = value * 10 + key;
    if (value > 200) value = 200;
  }

  function clear() {
    value = 0;
  }

  function add() {
    if (onSend) {
      onSend(value);
    }
    clear();
  }
</script>

<style>
  .keypad {
    text-align: center;
    margin-top: 50px;
  }
  .key {
    box-sizing: border-box;
    width: 30%;
    height: 80px;
    display: inline-block;
    cursor: pointer;
    user-select: none;
  }
  .display {
    margin-bottom: 40px;
    padding: 20px;
    box-shadow: inset 0px 0px 2px 2px #00ecc6;
  }

  .button {
    display: inline-block;
    margin: 0 25px 0 25px;
    font-size: 20px;
    cursor: pointer;
    user-select: none;
  }
</style>

<div class="keypad">
  <div class="display">{value}</div>
  <div class="key" on:click={() => keyPress(7)}>7</div>
  <div class="key" on:click={() => keyPress(8)}>8</div>
  <div class="key" on:click={() => keyPress(9)}>9</div>
  <div class="key" on:click={() => keyPress(4)}>4</div>
  <div class="key" on:click={() => keyPress(5)}>5</div>
  <div class="key" on:click={() => keyPress(6)}>6</div>
  <div class="key" on:click={() => keyPress(1)}>1</div>
  <div class="key" on:click={() => keyPress(2)}>2</div>
  <div class="key" on:click={() => keyPress(3)}>3</div>
  <div class="key" on:click={() => keyPress(0)}>0</div>
  <div>
    <div class="button text alt" on:click={add}>ADD</div>
    <div class="button" on:click={clear}>CLEAR</div>
  </div>
</div>
