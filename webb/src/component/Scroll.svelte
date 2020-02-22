<script>
  import { fade } from "svelte/transition";
  let scroll = 0;
  function updateScroll() {
    scroll = window.scrollY;
    if (scroll < 300) setTimeout(updateScroll, 500);
  }
  updateScroll();
</script>

<style>
  .inner {
    width: 10px;
    height: 10px;
    position: absolute;
    top: -2px;
    left: -2px;
    animation: flash 3s ease-in-out 0.5s infinite;
  }
  .middle {
    width: 17px;
    height: 17px;
    position: absolute;
    top: -3px;
    left: -3px;
    animation: flash 3s ease-in-out 0.25s infinite;
  }
  .outer {
    display: inline-block;
    position: relative;
    width: 23px;
    height: 23px;
    transform: rotateZ(45deg);
    animation: flash 3s ease-in-out 0s infinite;
  }

  @keyframes flash {
    0% {
      box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 0.2);
    }
    10% {
      box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 0.1);
    }
    20% {
      box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 0.2);
    }
    100% {
      box-shadow: 2px 2px 0px 0px rgba(0, 0, 0, 0.2);
    }
  }
</style>

{#if scroll < 300}
  <div class="outer" out:fade>
    <div class="middle">
      <div class="inner" />
    </div>
  </div>
{/if}
