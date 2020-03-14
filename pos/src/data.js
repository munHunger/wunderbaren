import { writable } from "svelte/store";

export const cart = writable(JSON.parse(localStorage.getItem("cart") || "[]"));
cart.subscribe(val => localStorage.setItem("cart", JSON.stringify(val)));

export const card = writable({});

export const items = writable([
  {
    category: "drinks",
    name: "Negroni",
    image: "https://drinkoteket.se/wp-content/uploads/negroni-1.jpg",
    price: 31.2
  },
  {
    category: "beer",
    name: "Lapin kulta",
    image:
      "https://cdn1.matsmart.se/sites/se/files/styles/product_zoom/public/products/lapin_kulta_fresh_lager.jpg?itok=WwRdjet8",
    price: 8
  }
]);

export const selectedCategory = writable("drinks");

function simulateCard() {
  card.set({
    scannedDate:
      ("0" + new Date().getHours()).slice(-2) +
      ":" +
      ("0" + new Date().getMinutes()).slice(-2),
    code: Math.random()
      .toString(36)
      .substring(7),
    amount: Math.floor(Math.random() * 150)
  });
  setTimeout(simulateCard, 5000);
}
simulateCard();
