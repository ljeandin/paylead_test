import { reactive } from "vue";

export const ticketStore = reactive({
  tickets: [],

  loadTickets() {
    const storedTickets = localStorage.getItem("ticketList");
    this.tickets = storedTickets ? JSON.parse(storedTickets) : [];
  },

  addTicket(ticket) {
    this.tickets.push(ticket);
    localStorage.setItem("ticketList", JSON.stringify(this.tickets));
  },

  updateTicketStatus(ticketId, status) {
    const currentTicket = this.tickets.find((ticket) => ticket.id === ticketId);

    if (currentTicket) {
      currentTicket.status = status;
      localStorage.setItem("ticketList", JSON.stringify(this.tickets));
    }
  },

  deleteTicket(ticketId) {
    this.tickets = this.tickets.filter((ticket) => ticketId !== ticket.id);
    localStorage.setItem("ticketList", JSON.stringify(this.tickets));
  },
});
