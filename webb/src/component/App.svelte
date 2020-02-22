<script>
  import Header from "./Header.svelte";
  import Content from "./Content.svelte";
</script>

<style>
  .parallax {
    background-image: url("assets/backdrop.jpg");
    height: 500px;
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
</style>

<div class="parallax" />

<Header />

<div class="parallax" />

<Content
  leftImage="assets/cocktail1.jpg"
  title="Pangalactic Blaster"
  body="The pangalactic gargeblaster is a drink made from the finest of gargles,
  which gives it it's earthy tones with hints of vanilla from the aging process.
  Who could ever refuse having ther gargles blasted with this meticulously
  blended artisan cocktail" />

<div class="parallax" />

<Content
  rightImage="assets/cocktail2.jpg"
  title="Smokey Valley"
  body="By torching a handpicked piece of african driftwood we were able to get
  a smokey smell previously unheard of in the world of cocktails. This drink
  boasts more smoke than a forrest fire with a whiskey miraculously saved from a
  burning destillery" />

<div class="parallax" />

<Content
  rightImage="assets/cocktail3.jpg"
  title="Tears au Hawai"
  body="The mixologists of hawai are among the best at their craft. We captured
  that essence in the tears of the mixologists. Tears au Hawai embodies a full,
  rich, and salty mouthfeel, with deep vanilla undertones" />

<div class="parallax" />

<Content
  leftImage="assets/beer.png"
  rightImage="assets/wine.png"
  title="For the trash"
  body="If cocktails isn't your thing we have a great selection of shit beer and
  cheap wine to get you filthy drunk." />
