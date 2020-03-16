import { SubscriptionClient } from "subscriptions-transport-ws";
import { gql } from "apollo-boost";
import { WebSocketLink } from "apollo-link-ws";

import { items, card, tickets } from "./data";

const wsClient = new SubscriptionClient("ws://localhost:5001/graphql", {
  reconnect: true
});

const client = new WebSocketLink(wsClient);

wsClient
  .request({
    query: gql`
      subscription {
        scannedCard {
          code
          scannedDate
          amount
        }
      }
    `
  })
  .subscribe(data => card.set(data.data.scannedCard));

wsClient
  .request({
    query: gql`
      subscription {
        transaction {
          card {
            code
          }
          placedDate
          items {
            name
            amount
          }
        }
      }
    `
  })
  .subscribe(data =>
    tickets.update(tickets => tickets.concat([data.data.transaction]))
  );

export function purchase(card, items) {
  return client.request({
    query: gql`
      mutation Purchase($card: String!, $items: [Order!]) {
        purchase(card: $card, items: $items)
      }
    `,
    variables: { card, items }
  });
}

export function fetchCard(id) {
  client
    .request({
      query: gql`
        mutation ScanCard($card: String!) {
          scanCard(card: $card) {
            code
            scannedDate
            amount
          }
        }
      `,
      variables: { card: id }
    })
    .subscribe(res => card.set(res.data.scanCard));
}

export function fillCard(id, amount) {
  client
    .request({
      query: gql`
        mutation FillCard($card: String!, $amount: Int!) {
          fillCard(card: $card, amount: $amount) {
            code
            scannedDate
            amount
          }
        }
      `,
      variables: { card: id, amount }
    })
    .subscribe(res => card.set(res.data.fillCard));
}

function fetchItems() {
  client
    .request({
      query: gql`
        query {
          getItems {
            category
            name
            image
            price
          }
        }
      `,
      variables: {}
    })
    .subscribe(res => items.set(res.data.getItems));
}

fetchItems();
