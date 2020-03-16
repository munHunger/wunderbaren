import { writable } from "svelte/store";

export const cart = writable(JSON.parse(localStorage.getItem("cart") || "[]"));
cart.subscribe(val => localStorage.setItem("cart", JSON.stringify(val)));

export const tickets = writable(
  JSON.parse(localStorage.getItem("tickets") || "[]")
);
tickets.subscribe(val => localStorage.setItem("tickets", JSON.stringify(val)));

export const card = writable({});

export const items = writable([]);

export const selectedCategory = writable("drink");

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
// simulateCard();
