<template>
    <div class="bg-gray-900 text-white">
      <div class="container mx-auto py-12 px-4">
        <div class="flex flex-col md:flex-row items-center justify-between  grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-5 p-2">
          <div class="mb-6 md:mb-0">
            <h1 class="text-3xl font-bold mb-2">
              Department of Agrarian Reform
            </h1>
            <p class="text-lg">
              The Department of Agrarian Reform is the lead government agency that holds and implements
              comprehensive and genuine agrarian reform which actualizes equitable land distribution,
              ownership, agricultural productivity, and tenurial security for, of and with the tillers of the land towards
              the improvement of their quality of life.
            </p>
          </div>
          <div class="flex flex-col items-center">
            <h2 class="text-xl font-bold mb-4">Site Directory</h2>
            <ul class="list-none">
              <li class="mb-2 text-left">
                <router-link to="/" class="hover:underline">Home</router-link>
              </li>
              <li class="mb-2 text-left">
                <router-link to="" class="hover:underline">About Us</router-link>
              </li>
              <li class="mb-2 text-right">
                <router-link to="/mission-vision-and-mandate" class="hover:underline">Mandate, Mission and Vision</router-link>
              </li>
              <li class="mb-2 text-right">
                <router-link to="/leaders" class="hover:underline">DAR Leaders</router-link>
              </li>
              <li class="mb-2 text-right">
                <router-link to="/officials" class="hover:underline">Officials</router-link>
              </li>
              <li class="mb-2 text-right">
                <router-link to="/org-structure" class="hover:underline">Organizational Structure</router-link>
              </li>
             
              <li class="mb-2 text-left">
                <router-link to="/contact-us" class="hover:underline">Projects</router-link>
              </li>
              <li class="mb-2 text-left">
                <router-link to="/contact-us" class="hover:underline">Events</router-link>
              </li>
              <li class="mb-2 text-left">
                <router-link to="/contact-us" class="hover:underline">Contact Us</router-link>
              </li>
            </ul>
          </div>
          <div class="flex flex-col items-center mt-6 md:mt-0">
            <h2 class="text-xl font-bold mb-4">Follow Us</h2>
            <ul class="list-none">
              <li class="mb-2">
                <a href="#" class="hover:underline">Facebook</a>
              </li>
              <li class="mb-2">
                <a href="#" class="hover:underline">Twitter (X)</a>
              </li>
              <li class="mb-2">
                <a href="#" class="hover:underline">Youtube</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="mt-12 text-center">
          <p class="text-sm">
            Republic of the Philippines - All content is in the public domain unless otherwise stated.
          </p>
         
        </div>
       
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'FooterComponent',
  }
  </script>
  
  <style scoped>
  </style>
  