<template>
  <div class="bg-gray-100 min-h-screen">
    <!-- Navigation Bar -->
    <NavigationBar />

    <!-- Hero Section -->
    <section class="bg-green-700 text-white py-16 text-center">
      <h1 class="text-4xl font-bold">About Us</h1>
      <p class="mt-4 text-lg max-w-2xl mx-auto">
        Discover our journey, our mission, and the values that drive us.
      </p>
    </section>

    <!-- Our Mission Section -->
    <section class="py-12 px-6 md:px-16 bg-white text-center">
      <h2 class="text-3xl font-bold text-green-700 mb-4">Our Mission</h2>
      <p class="text-gray-600 max-w-3xl mx-auto">
        We aim to make a positive impact by delivering quality services that contribute to the well-being of our community. Integrity, innovation, and dedication form the core of our mission.
      </p>
    </section>

    <!-- Our Values Section -->
    <section class="py-12 px-6 md:px-16 bg-green-50 text-center">
      <h2 class="text-3xl font-bold text-green-700 mb-8">Our Values</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <div class="bg-white p-6 shadow-md rounded-lg">
          <h3 class="text-xl font-semibold text-green-600 mb-2">Integrity</h3>
          <p class="text-gray-600">
            We believe in transparency and uphold the highest standards of integrity.
          </p>
        </div>
        <div class="bg-white p-6 shadow-md rounded-lg">
          <h3 class="text-xl font-semibold text-green-600 mb-2">Innovation</h3>
          <p class="text-gray-600">
            We embrace creativity and continuously seek better ways to serve our community.
          </p>
        </div>
        <div class="bg-white p-6 shadow-md rounded-lg">
          <h3 class="text-xl font-semibold text-green-600 mb-2">Commitment</h3>
          <p class="text-gray-600">
            Our dedication to excellence ensures the success of our clients and community.
          </p>
        </div>
      </div>
    </section>

    <!-- Contact Us Section -->
    <section class="py-12 px-6 md:px-16 bg-white text-center">
      <h2 class="text-3xl font-bold text-green-700 mb-8">Contact Us</h2>
      <div class="flex flex-col md:flex-row gap-8 max-w-4xl mx-auto">
        <div class="bg-green-100 p-6 shadow-md rounded-lg md:w-1/2 text-left">
          <h3 class="text-xl font-semibold text-green-700">Office Address</h3>
          <p class="text-gray-700 mt-2">123 Main St, City, Country</p>
        </div>
        <div class="bg-green-100 p-6 shadow-md rounded-lg md:w-1/2 text-left">
          <h3 class="text-xl font-semibold text-green-700">Get in Touch</h3>
          <p class="text-gray-700 mt-2">Email: info@example.com</p>
          <p class="text-gray-700 mt-1">Phone: +123 456 7890</p>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-green-700 text-white py-4 text-center">
      <p>&copy; 2024 Your Company Name. All rights reserved.</p>
    </footer>
  </div>
</template>

<script>
import NavigationBar from "@/components/NavBar.vue";

export default {
  name: "AboutPage",
  components: {
    NavigationBar
  }
};
</script>

<style scoped>
/* Adjust font sizes for responsive design */
@media (max-width: 768px) {
  h1 {
    font-size: 2.5rem;
  }
  h2 {
    font-size: 2rem;
  }
}
</style>
 