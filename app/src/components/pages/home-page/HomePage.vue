<script setup>
import { ref, watch } from "vue";
import KanbanBoard from "@/components/organisms/kanban-board/KanbanBoard.vue";
import TicketForm from "@/components/organisms/ticket-form/TicketForm.vue";
import getColumnNames from "@/components/helpers/getColumnNames";

import {
  getInitialColor,
  applyColorToUI,
  storeColor,
} from "@/components/helpers/colorUtils";

const columns = getColumnNames();

// Get the initial color and apply it to the UI
const initialColor = getInitialColor();
applyColorToUI(initialColor);

const color = ref(initialColor);

// Change the UI color as the user chooses it
watch(color, (newColor) => {
  applyColorToUI(newColor);
});

// Store the color once the input is closed
const onColorChange = (newColor) => {
  storeColor(newColor);
};

// Handle ticket form visibility
const isFormOpen = ref(false);

const toggleForm = () => {
  isFormOpen.value = !isFormOpen.value;
};
</script>

<template>
  <main class="home-page">
    <header class="home-page__header">
      <h1 class="heading--1">Paylead App</h1>
      <div class="home-page__header-buttons">
        <label
          for="color-input"
          class="form-color-input-wrapper button button--with-icon button--colored button--regular"
        >
          <input
            type="color"
            name="color-input"
            id="color-input"
            class="form-color-input"
            v-model="color"
            @change="onColorChange(color)"
          />
          <img
            src="../../../assets/images/paint-icon.svg"
            alt=""
            class="button__icon"
          />
        </label>

        <button
          type="button"
          class="button button--colored button--regular"
          @click="toggleForm"
        >
          New task
        </button>
      </div>
    </header>
    <KanbanBoard :columns="columns" :color="color" />
    <TicketForm v-if="isFormOpen" :columns="columns" @close="toggleForm" />
  </main>
</template>
