<script setup>
import TicketUnit from "@/components/molecules/ticket-unit/TicketUnit.vue";
import { ticketStore } from "@/components/helpers/ticketStore";

defineProps({
  columns: {
    type: Array,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

ticketStore.loadTickets();
</script>

<template>
  <div class="kanban-board">
    <section
      class="kanban-board__column"
      v-for="column in columns"
      :key="column"
    >
      <h2 class="kanban-board__column-title heading--2 shadow--colored">
        {{ column }}
      </h2>
      <div class="kanban-board__column-tickets-container">
        <TicketUnit
          v-for="ticket in ticketStore.tickets.filter(
            (ticket) => ticket.status === column
          )"
          :key="ticket.id"
          :columns="columns"
          :ticket="ticket"
          :color="color"
        />
      </div>
    </section>
  </div>
</template>
