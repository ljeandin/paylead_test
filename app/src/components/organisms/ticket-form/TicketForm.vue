<script setup>
import { defineProps, defineEmits } from "vue";
import { ticketStore } from "@/components/helpers/ticketStore";

defineProps({
  columns: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const onClickCloseButton = () => {
  emit("close");
};
</script>

<template>
  <div class="ticket-form shadow--colored js-ticket-form">
    <div class="ticket-form__header">
      <h2 class="heading--3">New task</h2>
      <button
        class="button button--colored button--with-icon button--small"
        @click="onClickCloseButton()"
      >
        X
      </button>
    </div>
    <form class="ticket-form__form" @submit.prevent="onSubmit">
      <div class="ticket-form__input-wrapper">
        <label for="title">Titre</label>
        <input
          type="text"
          id="title"
          name="title"
          class="form-input"
          v-model="ticketData.title"
          required
        />
      </div>

      <div class="ticket-form__input-wrapper">
        <label for="description">Description</label>
        <textarea
          id="description"
          name="description"
          class="form-textarea"
          v-model="ticketData.description"
          required
        ></textarea>
      </div>

      <div class="ticket-form__input-wrapper">
        <label for="status">Status</label>
        <div>
          <select
            id="status"
            name="status"
            class="form-select"
            v-model="ticketData.status"
            required
          >
            <option v-for="column in columns" :key="column" :value="column">
              {{ column }}
            </option>
          </select>
        </div>
      </div>

      <div class="ticket-form__submit-wrapper">
        <button type="submit" class="button button--white button--small">
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ticketData: {
        id: "",
        title: "",
        description: "",
        status: this.columns[0],
      },
    };
  },
  methods: {
    onSubmit() {
      this.ticketData.id = Date.now();
      const newTicket = this.ticketData;

      ticketStore.addTicket(newTicket);

      this.$emit("close");

      this.ticketData = {
        id: "",
        title: "",
        description: "",
        status: this.columns[0],
      };
    },
  },
};
</script>
