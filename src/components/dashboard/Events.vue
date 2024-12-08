<template>
  <div class="bg-white border border-green-200 rounded-md p-6">
    <h1 class="text-2xl font-bold text-green-800 mb-6">Upcoming and Current Events</h1>

    <!-- Loading Spinner -->
    <div v-if="loading" class="text-center py-6 flex justify-center">
      <svg class="animate-spin h-8 w-8 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
        <path d="M4 12a8 8 0 0 0 16 0" stroke="currentColor" stroke-width="4" fill="none" />
      </svg>
    </div>

    <!-- Events List -->
    <ul v-else class="divide-y divide-gray-200">
      <li v-for="event in events" :key="event.id" class="py-4 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition duration-200 rounded-lg mb-4">
        <div class="flex flex-col">
          <p class="text-lg font-semibold text-green-800">{{ event.title }}</p>
          <p class="text-sm text-green-600">Date: {{ event.date }}</p>
        </div>
        <router-link
          to="/events"
          class="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300 mt-2 md:mt-0"
        >
          View Details
        </router-link>
      </li>
    </ul>

    <!-- No Events -->
    <p v-if="events.length === 0 && !loading" class="text-center text-green-500 mt-6">
      No upcoming events.
    </p>
  </div>
</template>


<script>
export default {
  data() {
    return {
      events: [],  // To store the list of events
      loading: true,  // State to track if data is being loaded
    };
  },
  methods: {
    async fetchEvents() {
      try {
        const response = await fetch("http://localhost:3000/api/get-events");
        const allEvents = await response.json();

        // Filter events to include only those with dates on or after today
        const today = new Date();
        this.events = allEvents.filter((event) => new Date(event.date) >= today);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        this.loading = false; // Set loading to false after data is fetched
      }
    },
  },
  mounted() {
    this.fetchEvents();  // Fetch events when component is mounted
  },
};
</script>

<style scoped>
/* Spinner styling */
.spinner {
  border: 4px solid #f3f3f3;  /* Light grey background */
  border-top: 4px solid #3498db;  /* Blue color for the spinner */
  border-radius: 50%;
  width: 40px;
  height: 40px;
  margin: 0 auto;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>
