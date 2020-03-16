import { SubscriptionClient } from "subscriptions-transport-ws";
import { gql } from "apollo-boost";
import { WebSocketLink } from "apollo-link-ws";

import { items, card } from "./data";

const wsClient = new SubscriptionClient("ws://localhost:5001/graphql", {
  reconnect: true
});

const client = new WebSocketLink(wsClient);

const listeners = [];
// wsClient
//   .request({
//     query: gql`
//       subscription {
//         onJobComplete {
//           name
//         }
//       }
//     `,
//     variables: {}
//   })
//   .subscribe(data => {
//     console.log("recieved data from server!");
//     console.log(data);
//     listeners.forEach(listener => listener.apply(undefined, [data.data]));
//   });

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
