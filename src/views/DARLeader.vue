<template>
  
      <NavBar />
  
      <div class="max-w-5xl mx-auto bg-white p-2">
  
        <div v-if="loading" class="text-center py-6 flex justify-center">
          <svg class="animate-spin h-8 w-8 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
            <path d="M4 12a8 8 0 0 0 16 0" stroke="currentColor" stroke-width="4" fill="none" />
          </svg>
        </div>
  
        <div v-if="error" class="text-red-500 text-center mb-4">
          <p>{{ error }}</p>
        </div>
  
        <div v-if="leaders.length">
          <div v-for="leader in leaders" :key="leader.id" class="p-6 rounded-lg mb-8">

            <div class="flex space-x-4">
              <div class="">
                <img class="mb-3 rounded-full shadow-md shadow-green-200" :src="`http://localhost:3000/uploads/${leader.image}`" alt="Leader Image" />
              </div>

              <div class="flex flex-col justify-center items-left">
                <h3 class="text-2xl font-semibold text-green-700 text-left">{{ leader.name }}</h3>
                <h4 class="text-left text-gray-700">{{ leader.position }}</h4>
                <h4 class="text-left mt-1 text-gray-700">{{ leader.termStart }} - {{ leader.termEnd }}</h4>
              </div>
            </div>

            <h4 class="text-left mb-2 text-gray-700">{{ leader.shortInfo }}</h4>
           
            <ul class="list-disc pl-5">
              <ol class="relative border-l border-gray-200 dark:border-gray-700">
                <li v-for="(milestone, index) in leader.milestones" :key="index" class="mb-4 ml-6">
                  <div class="absolute w-3 h-3 bg-green-500 rounded-full -left-1.5 border border-white"></div>
                  <p class="text-md text-left font-medium text-gray-700">{{ milestone }}</p>
                </li>
              </ol>
            </ul>
            <ul class="list-disc pl-5">
              <li v-for="(desc, index) in leader.description" :key="index">{{ desc }}</li>
            </ul>
          </div>
        </div>
      </div>

      <Footer/>

  </template>
  
  <script>
  import axios from 'axios';
  import NavBar from '@/components/NavBar.vue';
  import Footer from '@/components/Footer.vue';
  
  export default {
    name: 'DARLeader',
    components: {
      NavBar,
      Footer,
    },
    data() {
      return {
        leaders: [],
        loading: true,
        error: null,
      };
    },
    mounted() {
      this.fetchLeaders();
    },
    methods: {
      async fetchLeaders() {
        try {
          const response = await axios.get('http://localhost:3000/api/leaders');
          this.leaders = response.data;
        } catch (error) {
          this.error = 'Failed to fetch leaders. Please try again later.';
        } finally {
          this.loading = false;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  img{
    height: 10rem;
    width: 10rem;
  }
  </style>
  