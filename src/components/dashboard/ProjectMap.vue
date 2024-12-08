<template>
   <div class="bg-white border border-green-200 rounded-md p-2">
     <div id="map" class="h-96 w-full rounded-lg mb-6 bg-gray-200"></div>
 
     <div v-if="showModal" 
         class="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50" 
         @click="closeModal">
         <div class="relative w-full max-w-3xl p-8 bg-white rounded-lg shadow-2xl overflow-auto max-h-[90vh]" 
            @click.stop>
            <div class="flex justify-between items-center border-b pb-4 mb-4">
               <h2 class="text-2xl font-bold text-green-900">{{ selectedProject.name }}</h2>
               <button class="text-green-600 hover:text-green-800 transition ease-in-out duration-150" 
               @click="closeModal" aria-label="Close modal">
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-7 h-7">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
               </svg>
               </button>
            </div>

            <div class="space-y-6 text-gray-700 text-left">
               <p class="text-md">{{ selectedProject.description }}</p>
               <p class="text-md flex items-center">
                  <span class="font-semibold text-green-700">Beneficiary:</span> 
                  <h6 class="font-bold ml-3">{{ selectedProject.beneficiary }}</h6>
               </p>
               <p class="text-md flex items-center">
                  <span class="font-semibold text-green-700">Fund:</span> 
                  <h6 class="font-bold ml-3">{{ selectedProject.fund }}</h6>
               </p>
               <p class="text-md flex items-center">
                  <span class="font-semibold text-green-700">Objective:</span> 
                  <h6 class="font-bold ml-3">{{ selectedProject.objective }}</h6>
               </p>

               <!-- Timeline -->
               <div class="text-left">
                  <h3 class="text-lg font-semibold text-green-700 mb-3">Timeline:</h3>
                  <ol class="relative border-l border-gray-200 dark:border-gray-700">
                     <li  v-for="(timeline, index) in selectedProject.timeline" :key="index"  class="mb-4 ml-6">
                        <div class="absolute w-3 h-3 bg-green-500 rounded-full -left-1.5 border border-white"></div>
                        <p class="text-sm text-left font-medium text-gray-700 dark:text-gray-400">{{ timeline }}</p>
                     </li>
                  </ol>
               </div>
            </div>
         </div>
      </div>

   </div>
 </template>
 
 
 <script>
 import axios from "axios";
 import L from 'leaflet';  // Import Leaflet library
 
 export default {
   
    data() {
       return {
          projects: [],  // Array to hold all project locations
          showModal: false,  // To control modal visibility
          selectedProject: {}  // To hold the selected project data
       };
    },
    mounted() {
       this.fetchProjectLocations().then(projects => {
          if (projects.length > 0) {
             this.loadMap(projects);
          } else {
             console.error('No project locations available');
          }
       });
    },
    methods: {
       async fetchProjectLocations() {
          try {
             const response = await axios.get('http://localhost:3000/api/project-location');
             return response.data;  // Contains an array of project locations
          } catch (error) {
             console.error('Error fetching project locations:', error);
             return [];
          }
       },
 
       loadMap(projects) {
          const map = L.map('map').setView([14.5342, 121.0577], 14);  // Default view with zoom level 14
 
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
             attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }).addTo(map);
 
          const markers = [];
 
          projects.forEach(project => {
             const { lat, lng } = project.location;
 
             const markerIcon = L.icon({
                iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png', // Custom marker icon URL
                iconSize: [25, 41],  // Size of the marker
                iconAnchor: [12, 41], // Anchor point of the icon (for better positioning)
                popupAnchor: [1, -34] // Anchor point of the popup (adjust as needed)
             });
 
             const marker = L.marker([lat, lng], { icon: markerIcon }).addTo(map)
                .bindPopup(`
                   <strong>${project.name}</strong><br>
                   ${project.description}<br>
                `);
 
             marker.on('click', () => {
                this.selectedProject = project;  // Set selected project data
                this.showModal = true;  // Show the modal
                this.adjustMapZIndex(false);  // Adjust map z-index when modal is shown
             });
 
             markers.push(marker);  // Push the marker to the markers array
          });
 
          const group = new L.featureGroup(markers);  // Create a feature group for all markers
          map.fitBounds(group.getBounds());  // Automatically adjust the map view to fit the markers
       },
 
       closeModal() {
          this.showModal = false;  // Hide the modal
          this.adjustMapZIndex(true);  // Adjust map z-index back when modal is closed
       },
 
       adjustMapZIndex(isVisible) {
          const mapElement = document.getElementById('map');
          if (isVisible) {
             mapElement.style.zIndex = 1;  // Lower z-index when modal is closed
          } else {
             mapElement.style.zIndex = -1;  // Raise z-index when modal is visible
          }
       }
    }
 }
 </script>
 
 <style scoped>
 #map {
    height: 400px;
    width: 100%;
    z-index: 1;  /* Default z-index for the map */
 }
 
 /* Optional: Custom styling for modal */
 .modal-overlay {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
 }
 
 .modal-content {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    max-width: 500px;
    width: 100%;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.2);
 }
 </style>
 