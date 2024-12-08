<template>
  <div class="bg-white shadow-lg rounded-lg p-6 mb-8">
    <!-- Loading Spinner -->
    <div v-if="loading" class="text-center py-6">
      <div class="spinner animate-spin h-8 w-8 border-t-4 border-blue-500 rounded-full mx-auto"></div>
      <p class="mt-2 text-gray-600">Loading announcements...</p>
    </div>

    <!-- Announcements List -->
    <div v-else-if="announcements.length > 0">
      <div v-for="announcement in announcements" :key="announcement.id" class="bg-blue-50 p-5 rounded-lg shadow-md mb-6 hover:bg-blue-100 transition duration-200">
        <h3 class="text-lg font-semibold text-gray-800">{{ announcement.title }}</h3>
        <p class="text-xs text-gray-500 mt-2">Created: {{ formatDate(announcement.createdAt) }}</p>
        <router-link to="/announcement" class="text-blue-600 mt-4 inline-block hover:underline">View details</router-link>
      </div>
    </div>

    <!-- No Announcements -->
    <div v-else class="text-center text-gray-500 py-6">No announcements available.</div>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      announcements: [],  // To store the list of announcements
      loading: true,  // State to track if data is being loaded
    };
  },
  mounted() {
    this.getAllAnnouncements(); // Fetch announcements when component is mounted
  },
  methods: {
    // Fetch all announcements from the backend
    async getAllAnnouncements() {
      try {
        const response = await axios.get('http://localhost:3000/api/announcements');
        this.announcements = response.data;
      } catch (error) {
        console.error('Error fetching announcements:', error);
      } finally {
        this.loading = false; // Set loading to false after data is fetched
      }
    },
    // Method to format date
    formatDate(dateString) {
      const date = new Date(dateString);
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    }
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
