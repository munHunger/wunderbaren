<script>
  import Scroll from "./Scroll.svelte";
</script>

<style>
  .header {
    padding: 80px;
    font-family: "Montserrat";
  }

  .title {
    font-size: 5rem;
    letter-spacing: 0.6rem;
    color: #555;
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .bar {
    display: inline-block;
    height: 1px;
    background-color: rgba(0, 0, 0, 0.3);
    width: 20%;
    opacity: 0;
    animation: fade-in 0.5s ease-out 0s 1 forwards;
  }

  .subtitle {
    margin-top: 15px;
    font-size: 1rem;
    letter-spacing: 0.1rem;
    opacity: 0;
    animation: fade-in 1.25s ease-out 0.25s 1 forwards;
  }

  .scroll {
    margin-top: 50px;
  }
</style>

<div class="header container">
  <div class="title">Wunderbaren</div>
  <div class="bar" />
  <div class="subtitle">
    <p>The classiest of underground bars opens up for a third time</p>
    <p>Welcome in to the third rendition of wunderbaren</p>
  </div>
  <div class="scroll">
    <Scroll />
  </div>
</div>
