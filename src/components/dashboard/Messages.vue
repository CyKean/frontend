<template>
  <div class="bg-white border border-green-200 rounded-md p-6 mb-8">
    <h3 class="text-xl font-semibold text-green-800 mb-6">Unread Messages</h3>
    <router-link to="/messages" class="text-green-500 hover:underline mb-4 block">Go to comments</router-link>

    <!-- Loader for fetching messages -->
    <div v-if="loading" class="text-center py-6 flex justify-center">
      <svg class="animate-spin h-8 w-8 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
        <path d="M4 12a8 8 0 0 0 16 0" stroke="currentColor" stroke-width="4" fill="none" />
      </svg>
    </div>

    <!-- Display unread messages -->
    <div
      v-for="message in unreadMessages"
      :key="message.id"
      class="bg-green-100 p-5 rounded-md shadow hover:shadow-xl transition-all cursor-pointer mb-4"
    >
      <p class="text-lg font-semibold text-green-800">{{ message.email }}</p>
      <p class="text-sm text-green-500">{{ calculateTimePassed(message.timestamp) }}</p>
    </div>
  </div>
</template>


<script>
import SideBar from '@/components/SideBar.vue';
import axios from 'axios';

export default {
  components: {
    SideBar,
  },
  data() {
    return {
      unreadMessages: [], // Array to store unread messages
      loading: true, // State to indicate loading
    };
  },

  mounted() {
    this.fetchMessages(); // Fetch messages when the component is mounted
  },
  methods: {
    // Fetch unread messages from the backend
    async fetchMessages() {
      try {
        const response = await axios.get('http://localhost:3000/api/messages');
        const data = response.data;
        this.unreadMessages = data.unreadMessages;
        this.readMessages = data.readMessages;
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        this.loading = false; // Set loading to false once the data is fetched
      }
    },
    // Calculate the time passed since the message was received
    calculateTimePassed(timestamp) {
      const now = new Date();
      const timeDiff = now - new Date(timestamp);
      const seconds = Math.floor(timeDiff / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (days > 0) return `${days} days ago`;
      if (hours > 0) return `${hours} hours ago`;
      if (minutes > 0) return `${minutes} minutes ago`;
      return `${seconds} seconds ago`;
    },
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
