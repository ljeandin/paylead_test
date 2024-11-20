<script setup>
import { defineProps, computed } from "vue";
import { ticketStore } from "@/components/helpers/ticketStore";

const props = defineProps({
  columns: {
    type: Array,
    required: true,
  },
  ticket: {
    type: Object,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

// Put current status at the top of the list in the select options
const orderedColumns = [
  props.ticket.status,
  ...props.columns.filter((column) => column !== props.ticket.status),
];

// Handle status change
const changeTicketStatus = (ticketId, updatedStatus) => {
  ticketStore.updateTicketStatus(ticketId, updatedStatus);
};

const onStatusChange = (event, changeTicketStatus) => {
  let previousStatus = event.target.dataset.ticketStatus;
  const newStatus = event.target.value;

  if (previousStatus !== newStatus) {
    previousStatus = newStatus;
    changeTicketStatus(parseFloat(event.target.dataset.ticketId), newStatus);
  }
};

// Delete ticket
const onDeleteTicket = (ticketId) => {
  ticketStore.deleteTicket(ticketId);
};

// Compute the background style for the trash icon with dynamic color
const trashIconStyle = computed(() => {
  const encodedSvg = encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="33" height="32" fill="none">
      <path d="M26.755 8.38v16.76h1.53V8.38h3.04V6.86h-1.52V5.33h-6.1V2.28h-1.52v3.05h-10.67V2.28h-1.52v3.05h-6.09v1.53h-1.53v1.52h3.05v16.76h1.52V8.38h19.81ZM26.755 25.14h-1.52v4.57h1.52v-4.57ZM25.235 29.71H8.475v1.53h16.76v-1.53Z" fill="${props.color}"/>
      <path d="M23.705 11.43h-1.52v12.19h1.52V11.43ZM22.185 23.62h-1.52v3.04h1.52v-3.04ZM17.615 11.43h-1.52v15.23h1.52V11.43ZM22.185.76h-10.67v1.52h10.67V.76ZM13.045 23.62h-1.53v3.04h1.53v-3.04ZM11.515 11.43h-1.52v12.19h1.52V11.43ZM8.475 25.14h-1.53v4.57h1.53v-4.57Z" fill="${props.color}"/>
    </svg>
  `);
  return {
    backgroundImage: `url("data:image/svg+xml,${encodedSvg}")`,
  };
});
</script>

<template>
  <div class="ticket-unit shadow--colored">
    <h3 class="ticket-unit__title">{{ ticket.title }}</h3>

    <p class="ticket-unit__description">{{ ticket.description }}</p>

    <div class="ticket-unit__footer">
      <select
        name="ticket-unit__status-select"
        class="form-select"
        :data-ticket-status="ticket.status"
        :data-ticket-id="ticket.id"
        :id="'ticket-status-select-' + ticket.id"
        @change="onStatusChange($event, changeTicketStatus)"
      >
        <option v-for="column in orderedColumns" :key="column" :value="column">
          {{ column }}
        </option>
      </select>

      <button
        class="button button--small button--white button--with-icon"
        :data-ticket-id="ticket.id"
        @click="onDeleteTicket(ticket.id)"
      >
        <span
          class="button__icon ticket-unit__delete-icon"
          :style="trashIconStyle"
        ></span>
      </button>
    </div>
  </div>
</template>
