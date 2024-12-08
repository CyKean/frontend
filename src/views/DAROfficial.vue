<template>
      <NavBar />
  
      <div class="w-full px-8">

        <div v-if="loading" class="text-center py-6 flex justify-center">
          <svg class="animate-spin h-8 w-8 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
            <path d="M4 12a8 8 0 0 0 16 0" stroke="currentColor" stroke-width="4" fill="none" />
          </svg>
        </div>
  
        <div v-if="error" class="text-red-500 text-center mb-4">
          <p>{{ error }}</p>
        </div>
  
        <div v-if="officialsData">
  
          <div v-if="officialsData.secretary" class="mb-6">
            <div class="mb-4">
              
              <h4 class="font-semibold sn text-green-700">{{ officialsData.secretary.name }}</h4>
              <h2 class="font-semibold text-2xl text-gray-600">SECRETARY of the DEPARTMENT of AGRARIAN REFORM</h2>
        
            </div>
          </div>

          <div v-if="officialsData.hea.length > 0" class="mb-6">
            
            <ul>
              <li v-for="(card, index) in officialsData.hea" :key="index">
                <h4 class="font-semibold text-2xl text-green-700">{{ card.name }}</h4>
              </li>
            </ul>
            <h3 class="text-xl font-semibold text-gray-600">Head of Executive Assistance</h3>

          </div>

          <div v-if="officialsData.undersec.length > 0" class="mb-6">

            <h3 class="text-3xl text-left font-semibold text-gray-600 mb-4">Undersecretaries</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-1 px-8">
              <h2 v-for="(card, index) in officialsData.undersec" :key="index" class="border border-green-200 rounded-md p-4">
                <h4 class="font-semibold text-lg text-green-700 text-left">{{ card.name }}</h4>
                <p v-for="(description, idx) in card.descriptions" :key="idx" class="text-left text-gray-700 text-md">{{ description.value }}</p>
              </h2>
            </div>

          </div>
  
          <div v-if="officialsData.assissec.length > 0" class="mb-6">
            <h3 class="text-3xl text-left font-semibold text-gray-600 mb-4">Assistant Secretaries</h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-1 px-8">
              <h2 v-for="(card, index) in officialsData.assissec" :key="index" class="border border-green-200 rounded-md p-4">
                <h4 class="font-semibold text-lg text-green-700 text-left">{{ card.name }}</h4>
                <p v-for="(description, idx) in card.descriptions" :key="idx" class="text-left text-gray-700 text-md">{{ description.value }}</p>
              </h2>
            </div>
          </div>
  
          <div v-if="officialsData.director.length > 0" class="mb-6">
            <h3 class="text-3xl text-left font-semibold text-gray-600 mb-40">Directors</h3>
            <div v-for="(category, index) in officialsData.director" :key="index" class="mb-4">
              <div class="pl-8 mt-2 mb-1">
                <h4 class="font-semibold text-lg text-left text-gray-700 underline">{{ category.name }}</h4>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-1 px-8">
                <h2 v-for="(card, jdx) in category.cards" :key="jdx" class="border border-green-200 rounded-md p-4">
                  <h5 class="font-semibold text-lg text-green-700 text-left">{{ card.name }}</h5>
                  <p v-for="(description, kdx) in card.descriptions" :key="kdx" class="text-left text-gray-700 text-md">{{ description.value }}</p>
                </h2>
              </div>
             
            </div>
          </div>
  
        </div>
      </div>

  <Footer/>

</template>
  
  <script>
  import NavBar from '@/components/NavBar.vue';
  import Footer from '@/components/Footer.vue';
  import axios from 'axios';
  
  export default {
    name: 'DAROfficial',
    components: {
      NavBar,
      Footer,
    },
    data() {
      return {
        officialsData: null,
        loading: true,
        error: null,
      };
    },
    mounted() {
      this.fetchOfficialsData();
    },
    methods: {
      async fetchOfficialsData() {
        try {
          const response = await axios.get('https://backend-w85m.onrender.com/api/officials');
          this.officialsData = response.data;
        } catch (error) {
          this.error = 'Failed to fetch data. Please try again later.';
        } finally {
          this.loading = false;
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .sn{
    font-size: 2.5rem;
  }
  </style>
  