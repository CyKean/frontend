<template>
  <div>
    <NavigationBar />
    <div class="max-w-lg mx-auto p-6 my-4 border border-green-200 bg-white rounded-lg shadow-md">
      <h1 class="text-2xl font-semibold mb-4 text-green-700 text-center">Contact Us</h1>
      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="email" class="block text-gray-700 text-left">Email</label>
          <input type="email" id="email" v-model="form.email" required placeholder="Enter your email" class="w-full p-2 border border-green-300 rounded-md"/>
        </div>
        <div class="mb-4">
          <label for="message" class="block text-gray-700 text-left">Message</label>
          <textarea id="message" v-model="form.message" required placeholder="Write your message" class="w-full p-2 border border-green-300 rounded-md" rows="5"></textarea>
        </div>
        <button type="submit" :disabled="loading" class="w-full p-2 bg-green-500 text-white rounded-md hover:bg-green-600">
        <div v-if="loading" class="text-center py-6 flex justify-center">
          <svg class="animate-spin h-8 w-8 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
            <path d="M4 12a8 8 0 0 0 16 0" stroke="currentColor" stroke-width="4" fill="none" />
          </svg>
        </div>
          <span v-else>Send Message</span>
        </button>
      </form>
    
    </div>
    <Footer />
  </div>
</template>

<script>
import NavigationBar from "@/components/NavBar.vue";
import Footer from "@/components/Footer.vue";
import axios from 'axios';
import toastr from 'toastr'; // Make sure to install and import toastr

export default {
  name: "ContactPage",
  components: {
    NavigationBar,
    Footer,
  },
  data() {
    return {
      form: {
        email: "",
        message: "",
      },
      successMessage: "",
      errorMessage: "",
      loading: false, // State for button loading
    };
  },
  methods: {
    async handleSubmit() {
      this.loading = true; // Start loading when the form is submitted
      try {
        // Send the form data to the backend API
        const response = await axios.post("http://localhost:3000/api/contact", this.form);

        // Show success toastr notification
        toastr.success("Your message has been sent successfully!", "Success");

        // Show success message
        this.successMessage = response.data.success;
        this.errorMessage = ""; // Clear previous error message

        // Clear form fields
        this.form.email = "";
        this.form.message = "";
      } catch (error) {
        // Show error toastr notification
        toastr.error(error.response?.data?.error || 'There was an error sending your message.', "Error");

        this.errorMessage = error.response?.data?.error || 'There was an error sending your message.';
        this.successMessage = ""; // Clear previous success message
      } finally {
        this.loading = false; // Stop loading after the request is complete
      }
    },
  },
};
</script>

<style scoped>
h1 {
  color: #333;
}
</style>
