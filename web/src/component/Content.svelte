<script>
  export let leftImage, rightImage;
  export let body;
  export let title;
</script>

<style>
  .leftImage {
    float: left;
  }
  .leftImage > img {
    -webkit-mask-image: -webkit-gradient(
      linear,
      left top,
      right top,
      from(rgba(0, 0, 0, 1)),
      to(rgba(0, 0, 0, 0))
    );
    mask-image: linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  }
  .rightImage {
    float: right;
  }
  .rightImage > img {
    -webkit-mask-image: -webkit-gradient(
      linear,
      right top,
      left top,
      from(rgba(0, 0, 0, 1)),
      to(rgba(0, 0, 0, 0))
    );
    mask-image: linear-gradient(to left, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  }
  .text {
    position: absolute;
    top: 50%;
    font-family: "Montserrat";
    width: 33%;
  }
  .text.right {
    right: 33%;
    transform: translate(50%, -50%);
  }
  .text.left {
    left: 33%;
    transform: translate(-50%, -50%);
  }
  .text.center {
    left: 55%;
    transform: translate(-50%, -50%);
  }
  .title {
    font-size: 3rem;
    letter-spacing: 0.6rem;
    color: #555;
  }

  .body {
    margin-top: 15px;
    font-size: 1rem;
    letter-spacing: 0.2rem;
    color: #444;
    line-height: 1.5rem;
  }
  .container {
    content: "";
    display: table;
    clear: both;
    width: 100%;
  }
</style>

<div class="container">
  {#if leftImage}
    <div class="leftImage">
      <img src={leftImage} alt="image" />
    </div>
  {/if}
  {#if rightImage}
    <div class="rightImage">
      <img src={rightImage} alt="image" />
    </div>
  {/if}
  <div
    class="text {leftImage && !rightImage ? 'right' : !leftImage && rightImage ? 'left' : 'center'}">
    <div class="title">{title}</div>
    <div class="body">{body}</div>
  </div>
</div>
