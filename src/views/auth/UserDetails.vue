<template>
    <div class="flex justify-center items-center h-screen bg-gray-100">
      <div class="w-full max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow-lg sm:p-8 md:p-10 dark:bg-gray-800 dark:border-gray-700">
        <h2 class="text-2xl font-medium text-gray-900 dark:text-white mb-6">Enter Your Details</h2>
  
        <form @submit.prevent="submitForm" class="space-y-6">
          <!-- First Name -->
          <div>
            <label for="firstName" class="block text-sm font-medium text-gray-700 dark:text-white">First Name</label>
            <input
              type="text"
              id="firstName"
              v-model="firstName"
              class="mt-1 block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              required
            />
          </div>
  
          <!-- Last Name -->
          <div>
            <label for="lastName" class="block text-sm font-medium text-gray-700 dark:text-white">Last Name</label>
            <input
              type="text"
              id="lastName"
              v-model="lastName"
              class="mt-1 block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              required
            />
          </div>
  
          <!-- Address -->
          <div>
            <label for="address" class="block text-sm font-medium text-gray-700 dark:text-white">Address</label>
            <textarea
              id="address"
              v-model="address"
              rows="3"
              class="mt-1 block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              required
            ></textarea>
          </div>
  
          <!-- Phone Number -->
          <div>
            <label for="phone" class="block text-sm font-medium text-gray-700 dark:text-white">Phone Number</label>
            <input
              type="text"
              id="phone"
              v-model="phone"
              class="mt-1 block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              required
            />
          </div>
  
          <!-- Date of Birth -->
          <div>
            <label for="dob" class="block text-sm font-medium text-gray-700 dark:text-white">Date of Birth</label>
            <input
              type="date"
              id="dob"
              v-model="dob"
              class="mt-1 block w-full p-2.5 bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-green-500 focus:border-green-500 dark:bg-gray-600 dark:border-gray-500 dark:text-white"
              required
            />
          </div>
  
          <!-- Submit Button -->
          <div>
            <button
              type="submit"
              :disabled="loading"
              class="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              <span v-if="loading" class="animate-spin mr-3">
                <!-- Loading spinner icon -->
                <svg class="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path d="M4 12a8 8 0 0 1 16 0" fill="none" stroke="currentColor" stroke-width="4"></path>
                </svg>
              </span>
              <span v-if="!loading">Submit</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import toastr from "toastr";
  
  export default {
    name: 'OtherDetails',
    data() {
      return {
        firstName: '',
        lastName: '',
        address: '',
        phone: '',
        email: '',
        dob: '',
        loading: false, // Loading state for the button
      };
    },
    methods: {
      submitForm() {
        // Set loading to true when submitting
        this.loading = true;
  
        // Retrieve the email from localStorage
        const email = localStorage.getItem('userEmail');
        console.log(email);
  
        if (!email) {
          // Handle case if email is not found (e.g., user did not register properly)
          this.message = 'Email not found, please register first.';
          this.loading = false; // Reset loading
          toastr.warning('Email not found, please register first')
          return;
        }
  
        // Create an object with the user details
        const userDetails = {
          email, // Include email retrieved from localStorage
          firstName: this.firstName,
          lastName: this.lastName,
          address: this.address,
          phone: this.phone,
          dob: this.dob,
        };
  
        // Send the details to the backend or process them as needed
        console.log(userDetails);
  
        // Example: Send to backend to store additional details in Firebase
        axios.post('https://backend-w85m.onrender.com/api/submitUserDetails', userDetails)
          .then(response => {
            // If successfully inserted, remove email from localStorage
            localStorage.removeItem('userEmail');
            
            // Redirect to the next page
            this.$router.push({ name: 'LoginPage' });
          })
          .catch(error => {
            console.error('Error submitting user details:', error);
            this.message = 'Failed to submit user details.';
          })
          .finally(() => {
            // Set loading to false after the request is complete
            this.loading = false;
          });
      }
    },
  };
  </script>
  
  <style scoped>
  /* Scoped styles to handle the form layout */
  </style>
  