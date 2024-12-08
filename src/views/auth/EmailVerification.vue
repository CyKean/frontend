<template>
  <div class="flex justify-center items-center h-screen">
    <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <form class="space-y-6" @submit.prevent="verifyEmail">
        <h5 class="text-xl font-medium text-gray-900 dark:text-white">Enter code here</h5>

        <div>
          <input
            type="text"
            v-model="code"
            :disabled="loading"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-500 focus:border-green-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            required
          />
        </div>

        <button
          type="submit"
          :disabled="loading"
          class="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center justify-center"
        >
          <span v-if="loading" class="loader"></span>
          <span v-else>Submit</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import toastr from 'toastr'; // Import Toastr

export default {
  name: 'EmailVerification',
  data() {
    return {
      code: '',
      loading: false, // Tracks loading state
      errors: {
        code: null,
      },
    };
  },
  methods: {
    async verifyEmail() {
      this.loading = true; // Start loading
      this.errors.code = null;

      try {
        const response = await axios.post('http://localhost:3000/api/verify-email', {
          code: this.code,
        });

        // Show success Toastr notification
        toastr.success(response.data.message, 'Success', {
          positionClass: 'toast-top-right',
        });

        // Redirect to UserDetailsPage after successful verification
        setTimeout(() => {
          this.$router.push({ name: 'UserDetails' });
        }, 2000);
      } catch (error) {
        if (error.response && error.response.data.error) {
          this.errors.code = error.response.data.error;

          // Show error Toastr notification
          toastr.error(this.errors.code, 'Error', {
            positionClass: 'toast-top-right',
          });

          setTimeout(() => {
            this.errors.code = null;
          }, 3000);
        }
      } finally {
        this.loading = false; // End loading
      }
    },
  },
};
</script>

<style>
.loader {
  border: 2px solid #f3f3f3; /* Light gray */
  border-top: 2px solid #3498db; /* Blue */
  border-radius: 50%;
  width: 16px;
  height: 16px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
