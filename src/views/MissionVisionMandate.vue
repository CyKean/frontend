<template>
  <NavBar />

  <div v-if="loading" class="w-full text-center py-6 flex justify-center">
    <svg class="animate-spin h-8 w-8 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
      <path d="M4 12a8 8 0 0 0 16 0" stroke="currentColor" stroke-width="4" fill="none" />
    </svg>
  </div>  

  <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-5 p-2">

    <div v-for="item in data" class="">
      <div class="border border-green-200 shadow-lg rounded-md p-6 m-4">
        <h2 v-if="item.mandate" class="text-2xl font-bold text-green-600">Mandate</h2>
        <h2 v-if="item.mission" class="text-2xl font-bold text-green-600">Mission</h2>
        <h2 v-if="item.vision" class="text-2xl font-bold text-green-600">Vision</h2>
        <p class="text-gray-700">{{ item.mandate }}</p>
        <p class="text-gray-700">{{ item.mission }}</p>
        <p class="text-gray-700">{{ item.vision }}</p>
      </div>
    </div>

  </div>
  
  <!-- <div class="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
  
    <div v-if="loading" class="text-center py-6 flex justify-center">
      <svg class="animate-spin h-8 w-8 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
        <path d="M4 12a8 8 0 0 0 16 0" stroke="currentColor" stroke-width="4" fill="none" />
      </svg>
    </div>

    <div v-if="error" class="text-red-500 text-center mb-4">
      <p class="font-semibold">{{ error }}</p>
    </div>
  
    <div v-if="data.length > 0" class="space-y-8">
      <div v-for="(item, index) in data" :key="index" class="space-y-6">
        <div class="bg-blue-50 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
          <h3 class="text-xl font-semibold text-blue-700">Mission</h3>
          <p class="text-gray-700">{{ item.mission }}</p>
        </div>

        <div class="bg-green-50 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
          <h3 class="text-xl font-semibold text-green-700">Vision</h3>
          <p class="text-gray-700">{{ item.vision }}</p>
        </div>

        <div class="bg-yellow-50 p-6 rounded-lg shadow-md transition-transform transform hover:scale-105">
          <h3 class="text-xl font-semibold text-yellow-700">Mandate</h3>
          <div v-html="sanitizeContent(item.mandate)" class="mandate-content text-gray-700"></div>
        </div>
      </div>
    </div>
  </div> -->
  <Footer />
</template>

<script>
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer.vue';
import axios from 'axios';
import sanitizeHtml from 'sanitize-html'; // Import sanitize-html

export default {
  name: "MissionVisionMandate",
  components: {
    NavBar,
    Footer,
  },
  data() {
    return {
      data: [],
      loading: true,
      error: null,
    };
  },
  mounted() {
    this.fetchMissionVisionMandate();
  },
  methods: {
    sanitizeContent(content) {
      return sanitizeHtml(content, {
        allowedTags: ['p', 'ol', 'li', 'b', 'i', 'em', 'strong', 'u', 'span', 'br'],
        allowedAttributes: {
          '*': ['class', 'style'],
        },
        textFilter: (text) => text.trim(), // Remove unnecessary whitespace
      });
    },

    async fetchMissionVisionMandate() {
      try {
        const response = await axios.get('http://localhost:3000/api/missionvisionmandate');
        console.log('API response:', response.data);
        this.data = response.data;
      } catch (error) {
        console.error('Error fetching data:', error);
        this.error = 'Failed to fetch data. Please try again later.';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.mandate-content ol {
  padding-left: 20px;
  list-style-type: decimal;
}

.mandate-content li {
  margin-bottom: 8px;
}

</style>
