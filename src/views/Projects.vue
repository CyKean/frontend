<template>
   <NavBar />
   
   <div class="flex">
    
     <div class="flex-1 p-4">
       <div id="map" style="height: 400px; width: 100%; z-index: 1;"></div>
     </div>
   </div>
   
   <div v-if="showModal" class="fixed inset-0 z-50 flex justify-center items-center bg-gray-800 bg-opacity-50" @click="closeModal">
     <div class="w-full max-w-2xl p-4 bg-white rounded-lg shadow-lg" @click.stop>
       <div class="flex justify-between items-center">
         <h2 class="text-xl font-semibold text-gray-800">{{ selectedProject.name }}</h2>
         <button class="text-gray-500 hover:text-gray-700" @click="closeModal">
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
           </svg>
         </button>
       </div>
       
       <div class="mt-4">
         <p class="text-gray-600">{{ selectedProject.description }}</p>
         <p class="text-gray-600">{{ selectedProject.beneficiray }}</p>
         <p class="text-gray-600">{{ selectedProject.fund }}</p>
         <p class="text-gray-600">{{ selectedProject.objective }}</p>
         
         <p class="mt-2 text-gray-600"><strong>Timeline:</strong></p>
         <ul>
           <li v-for="(timeline, index) in selectedProject.timeline" :key="index" class="text-gray-600">
             {{ timeline }}
           </li>
         </ul>
       </div>
       
       <div class="mt-4 text-right">
         <button class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600" @click="closeModal">Close</button>
       </div>
     </div>
   </div>
   <Footer/>
 </template>
<script>
import NavBar from "@/components/NavBar"; 
import Footer from "@/components/Footer.vue";
import axios from "axios";
import L from 'leaflet';  // Import Leaflet library

export default {
  name: 'Projects',
  components: {
    NavBar,
    Footer
  },
  data() {
    return {
      projects: [],  // Array to hold all project locations
      showModal: false,  // To control modal visibility
      selectedProject: {}  // To hold the selected project data
    };
  },
  mounted() {
    this.fetchProjectLocations().then(projects => {
      console.log(projects);
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
    },

    showProjectDetails(project) {
      this.selectedProject = project;  // Set selected project data
      this.showModal = true;  // Show the modal
      this.adjustMapZIndex(false);  // Adjust map z-index when modal is shown
    }
  }
};
</script>
<style scoped>
  #map {
    height: 400px;
    width: 100%;
    z-index: 1;
  }
  
  .flex {
    display: flex;
  }

  .w-64 {
    width: 16rem;
  }

  .h-screen {
    height: 100vh;
  }

  .bg-gray-800 {
    background-color: #2d2d2d;
  }

  .text-white {
    color: white;
  }

  .p-4 {
    padding: 1rem;
  }

  .cursor-pointer {
    cursor: pointer;
  }

  .hover\:bg-gray-700:hover {
    background-color: #374151;
  }

  .rounded {
    border-radius: 0.375rem;
  }

  /* Optional: Modal Custom Styling */
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
 