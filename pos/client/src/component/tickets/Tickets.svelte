<script>
  import { tickets } from "../../data";
  import { slide } from "svelte/transition";
  function remove(ticket) {
    tickets.update(tickets => tickets.filter(t => t !== ticket));
  }
</script>

<style>
  .tickets {
    position: absolute;
    bottom: 0px;
    width: 100%;
    text-align: right;
    cursor: pointer;
  }

  .ticket {
    text-align: left;
    display: inline-block;
    margin-right: 20px;
  }

  .card {
    font-size: 22px;
    font-weight: 600;
    padding: 5px;
  }
  .date {
    padding: 5px;
    letter-spacing: 0.1rem;
  }
  .list {
    margin-top: 10px;
    padding: 15px;
  }
  .item {
    font-size: 18px;
  }
  .amount {
    font-size: 14px;
    font-weight: 600;
  }
</style>

<div class="tickets">
  {#each $tickets as ticket}
    <div class="ticket dark" on:click={() => remove(ticket)} transition:slide>
      <div class="card dark text alt">{ticket.card.code}</div>

      <div class="date dark">{ticket.placedDate}</div>

      <div class="list">
        {#each ticket.items as item}
          <div class="item">
            {item.name}
            <span class="text alt amount">x{item.amount}</span>
          </div>
        {/each}
      </div>
    </div>
  {/each}
</div>
