<script>
  export let onClick;
  let active = false;

  function toggleActive() {
    active = !active;
    if (onClick) onClick(active);
  }
</script>

<style type="text/scss">
  $size: 20px;
  .wrapper {
    display: inline-block;
    position: relative;
    width: $size;
    height: $size;
    overflow: hidden;
    cursor: pointer;
  }

  .first,
  .middle,
  .last {
    position: absolute;
    left: 0px;
    top: 50%;
    height: 3px;
    width: $size;
    transition: all 0.3s ease-out;
    background-color: white;
  }

  .first {
    transform: translate(0, -6px);
  }

  .last {
    transform: translate(0, 6px);
  }

  .first.active {
    transform: rotateZ(225deg);
  }
  .middle.active {
    transform: rotateZ(225deg);
  }
  .last.active {
    transform: rotateZ(135deg);
  }
</style>

<div class="wrapper" on:click={toggleActive}>
  <div class="first {active ? 'active' : ''}" />
  <div class="middle {active ? 'active' : ''}" />
  <div class="last {active ? 'active' : ''}" />
</div>
