<template>

  <div class="flex">
    <SideBar />
    <div class="flex-1 p-2 sm:ml-64 bg-gray-50 min-h-screen">
      <div class="w-full mb-3 top-0 sticky z-10">
        <TopBar />
      </div>
      <div class="rounded-md shadow-md h p-1">

        <div class="flex justify-between bg-gray-50 p-2 items-center mb-3 rounded-md sticky top-0">
          <div class="flex space-x-4 items-center">
            <input v-model="searchQuery" type="text" placeholder="Search projects..."
              class="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              @input="filterNews"/>
            <button @click="openModal" class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-200 hover:text-green-900 transition">Add Project</button>
          </div>
          <div class="flex space-x-2 items-center">
            <button @click="changePage(-1)" :disabled="currentPage <= 1"
              class="px-2 py-2 text-xs text-white bg-green-500 rounded-l-md hover:bg-green-200 hover:text-green-900 transition disabled:opacity-50">Previous
            </button>
            <span class="text-green-700 text-sm">{{ currentPage }} of {{ totalPages }}</span>
            <button @click="changePage(1)" :disabled="currentPage >= totalPages"
              class="px-2 py-2 text-xs text-white bg-green-500 rounded-r-md hover:bg-green-200 hover:text-green-900 transition disabled:opacity-50">next
            </button>
          </div>
        </div>

        <div v-if="isLoading" class="text-center py-6 flex justify-center">
          <svg class="animate-spin h-8 w-8 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
            <path d="M4 12a8 8 0 0 0 16 0" stroke="currentColor" stroke-width="4" fill="none" />
          </svg>
        </div>
         
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 p-2">
          <div v-for="(project, index) in filteredProjects" :key="index" @click="openProjectModal(project)" class="shadow-md py-4 rounded-md cursor-pointer hover:shadow-xl transition hover:bg-gray-200">
            <h3 class="text-xl font-semibold text-green-600">{{ project.name }}</h3>
            <p class="mt-2 text-green-700">{{ truncateDescription(project.description) }}</p>
              
            <p class="mt-2 text-sm text-gray-700">{{ formatTimeAgo(project.createdAt) }}</p>

            <button @click.stop="editProject(project)" class="bg-yellow-400 mt-4 text-white px-2 p-1 text-xs rounded-sm hover:bg-yellow-200 hover:text-yellow-900 transition">
              Edit
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>

  <div class="relative">

    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-auto">
      <div class="bg-white p-6 rounded-lg w shadow-xl">
        <div class="flex flex-row items-center justify-between mb-6">
          <h2 class="text-lg font-semibold text-center text-green-600">{{ isEditMode ? 'Edit Project' : 'Add Project' }}</h2>
          <button @click="closeModal" class="text-green-500 hover:text-green-700">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
    
        <form @submit.prevent="submitProject">
          <div class="flex grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

            <div class="flex flex-col justify-center">
              <div class="mb-4">
                <label for="projectName" class="block text-sm font-medium text-gray-700">Project Name</label>
                <input type="text" id="projectName" v-model="project.name" class="mt-1 block w-full px-2 py-1 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"required/>
              </div>

              <div class="mb-4">
                <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
                <textarea id="description" v-model="project.description" rows="3" class="mt-1 block w-full px-2 py-1 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" required></textarea>
              </div>

              <div class="mb-4">
                <label for="objective" class="block text-sm font-medium text-gray-700">Objective</label>
                <textarea id="objective" v-model="project.objective" rows="3" class="mt-1 block w-full px-2 py-1 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" required></textarea>
              </div>

              <div class="mb-4">
                <label for="beneficiary" class="block text-sm font-medium text-gray-700">Beneficiary</label>
                <select id="beneficiary" v-model="project.beneficiary" class="mt-1 block w-full px-2 py-1 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" required>
                  <option value="community">Community</option>
                  <option value="farmers">Farmers</option>
                  <option value="government">Government</option>
                  <option value="private">Private Sector</option>
                </select>
              </div>
            </div>

            <div class="flex flex-col justify-center">
              <div class="mb-4">
                <label for="fund" class="block text-sm font-medium text-gray-700">Allocated Fund (PHP)</label>
                <input type="number" id="fund" v-model="project.fund" min="0"step="0.01" class="block w-full px-2 py-1 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" required/>
              </div>

              <div class="mb-4">
                <label for="timeline" class="block text-sm font-medium text-gray-700">Timeline</label>
                <div class="th w-full flex flex-col items-center justify-center overflow-auto">
                  <div v-for="(timeline, index) in project.timeline" :key="index" class="flex space-x-4 mb-2">
                    <input type="text" v-model="project.timeline[index]" class="mt-1 block w-full px-2 py-1 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" required/>
                    <button type="button" @click="removeTimeline(index)" class="px-2 text-xs bg-red-400 text-white rounded-md hover:bg-red-600 focus:outline-none">
                      Remove
                    </button>
                  </div>
                </div>
                <button type="button" @click="addTimeline" class="px-2 py-1 bg-green-600 text-white rounded-md text-xs hover:bg-green-700 focus:outline-none">
                  Add Timeline
                </button>
              </div>

              <div class="mb-4">
                <label for="status" class="block text-sm font-medium text-gray-700">Status</label>
                <select id="status" v-model="project.status" class="mt-1 block w-full px-2 py-1 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" required>
                  <option value="pending">Pending</option>
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>

            <div class="flex flex-col justify-center">
              <div class="mb-4">
                <label for="location" class="block text-sm font-medium text-gray-700">Location</label>
                <div class="flex items-center space-x-3">
                  <input type="text" id="location" v-model="project.location" class="mt-1 block w-full px-2 py-1 border border-green-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" required/>
                  <button type="button" @click="toggleMap" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none">
                    Show Map
                  </button>
                </div>
              </div>

              <div v-if="showMap" class="mb-4 bg-green-400 mh">
                <div id="map" class="h-64 w-full border border-gray-300 rounded-md"></div>
              </div>
            </div>

          </div>
          
          <div class="flex justify-end mt-4">
            <button type="submit" class="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 focus:outline-none">
              {{ isEditMode ? 'Update Project' : 'Save Project' }}
            </button>
          </div>
        </form>

      </div>
    </div>

     

    <!-- <div v-if="" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-auto">
      <div class="bg-white p-6 rounded-lg w-full max-w-lg shadow-xl">
        <h2 class="text-3xl font-semibold mb-6 text-center text-blue-600">{{ selectedProject.name }}</h2>
        <p class="mb-4 text-gray-700"><strong>Description:</strong> {{ selectedProject.description }}</p>
        <p class="mb-4 text-gray-700"><strong>Objective:</strong> {{ selectedProject.objective }}</p>
        <p class="mb-4 text-gray-700"><strong>Timeline:</strong> {{ selectedProject.timeline.join(', ') }}</p>
        <p class="mb-4 text-gray-700"><strong>Status:</strong> {{ selectedProject.status }}</p>
        <p class="mb-4 text-gray-700"><strong>Beneficiary:</strong> {{ selectedProject.beneficiary }}</p>
        <p class="mb-4 text-gray-700"><strong>Allocated Fund:</strong> PHP {{ selectedProject.fund }}</p>
        <p class="mb-4 text-gray-700"><strong>Location:</strong> {{ selectedProject.location }}</p>

        <button @click="closeProjectModal" class="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 focus:outline-none">
          close
        </button>
      </div>
    </div> -->

    <div v-if="isProjectModalOpen" 
         class="fixed inset-0 z-50 flex justify-center items-center bg-black bg-opacity-50" 
         @click="closeModal">
         <div class="relative w-full max-w-3xl p-8 bg-white rounded-lg shadow-2xl overflow-auto max-h-[90vh]" 
            @click.stop>
            <div class="flex justify-between items-center border-b pb-4 mb-4">
               <h2 class="text-2xl font-bold text-green-900">{{ selectedProject.name }}</h2>
               <button class="text-green-600 hover:text-green-800 transition ease-in-out duration-150" 
               @click="closeProjectModal" aria-label="Close modal">
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
               <!-- <p class="text-md flex items-center">
                  <span class="font-semibold text-green-700">Location:</span> 
                  <h6 class="font-bold ml-3">{{ selectedProject.location }}</h6>
               </p> -->
               <p class="text-md flex items-center">
                  <span class="font-semibold text-green-700">Status:</span> 
                  <h6 class="font-bold ml-3">{{ selectedProject.status }}</h6>
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
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import SideBar from "@/components/SideBar.vue";
import TopBar from "@/components/TopBar.vue";

export default {
  components: {
    SideBar,
    TopBar,
  },
  data() {
    return {
      isLoading: false,
      projects: [],
      maps: {},
      isProjectModalOpen: false,
      selectedProject: null,
      searchQuery: "",
      currentPage: 1,
      itemsPerPage: 8,
      isModalOpen: false,
      isEditMode: false,
      showMap: false,
      map: null,
      marker: null,
      project: {
        name: "",
        description: "",
        objective: "",
        fund: "", // Fund field
        timeline: [],
        status: "",
        beneficiary: "",
        location: "",
      },
    };
  },
  computed: {
    filteredProjects() {
      const lowerSearchQuery = this.searchQuery.toLowerCase();
      const filtered = this.projects.filter(project => {
        const name = project.name ? project.name.toLowerCase() : ''; // Fallback to empty string if undefined
        const description = project.description ? project.description.toLowerCase() : ''; // Fallback to empty string if undefined
        const status = project.status ? project.status.toLowerCase() : ''; // Fallback to empty string if undefined
        const beneficiary = project.beneficiary ? project.beneficiary.toLowerCase() : ''; // Fallback to empty string if undefined

        return (
          name.includes(lowerSearchQuery) ||
          description.includes(lowerSearchQuery) ||
          status.includes(lowerSearchQuery) ||
          beneficiary.includes(lowerSearchQuery)
        );
      });

      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;

      return filtered.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.projects.length / this.itemsPerPage);
    }
  },

  methods: {
    openModal() {
      this.isModalOpen = true;
      this.resetProjectForm();
    },
    closeModal() {
      this.isModalOpen = false;
      this.resetProjectForm();
    },
    truncateDescription(description) {
      if (description && description.length > 100) {
        return description.slice(0, 100) + '...';
      }
      return description;
    },
    openProjectModal(project) {
      this.selectedProject = project;
      this.isProjectModalOpen = true;
    },
    closeProjectModal() {
      this.isProjectModalOpen = false;
      this.selectedProject = null;
    },
    toggleMap() {
      this.showMap = !this.showMap;

      if (this.showMap && !this.map) {
        this.$nextTick(() => {
          this.initializeMap();
        });
      }
    },
    initializeMap() {
      const mapContainer = document.getElementById("map");
      if (!mapContainer) {
        console.error("Map container not found");
        return;
      }

      if (this.map) {
        this.map.remove(); // Removes the existing map from the container
      }

      this.map = L.map("map").setView([14.144, 121.032], 13); // Default coordinates

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(this.map);

      this.map.on("click", (e) => {
        const { lat, lng } = e.latlng;

        if (this.marker) {
          this.map.removeLayer(this.marker);
        }

        this.marker = L.marker([lat, lng]).addTo(this.map);

        this.project.location = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
      });
    },
    addTimeline() {
      this.project.timeline.push("");
    },
    removeTimeline(index) {
      this.project.timeline.splice(index, 1);
    },
    submitProject() {
      if (this.isEditMode) {
        this.updateProject();
      } else {
        this.addProject();
      }
    },
    addProject() {
      axios
        .post("http://localhost:3000/api/save-project", this.project)
        .then((response) => {
          this.projects.push(response.data);
          this.getProject();
          toastr.success('Project saved successfully');
          this.closeModal();
        })
        .catch((error) => {
          toastr.error('Failed to save project');
          console.error(error);
        });
    },
    updateProject() {
      Swal.fire({
        title: 'Are you sure?',
        text: "Do you want to update this project?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, update it!',
        cancelButtonText: 'No, cancel!',
        reverseButtons: true,
        customClass: {
          confirmButton: 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-4 focus:ring-blue-300 rounded',
          cancelButton: 'bg-gray-300 text-black hover:bg-gray-400 focus:ring-4 focus:ring-gray-300 rounded',
        }
      }).then((result) => {
        if (result.isConfirmed) {
          // Proceed with the update if confirmed
          axios
            .post(`http://localhost:3000/api/update-project/${this.project._id}`, this.project)
            .then((response) => {
              const index = this.projects.findIndex((p) => p._id === this.project._id);
              if (index !== -1) {
                this.projects.splice(index, 1, response.data);
              }

              this.currentPage = 1;
              this.getProject();  // Fetch the updated list from the backend

              Swal.fire(
                'Updated!',
                'The project has been updated successfully.',
                'success'
              );
              toastr.success('Updated!');
              this.closeModal();
            })
            .catch((error) => {
              console.error(error);
              Swal.fire(
                'Error!',
                'There was an error updating the project.',
                'error'
              );
              toastr.error('Failed to update the project');
            });
        } else {
          Swal.fire(
            'Cancelled',
            'Your project was not updated.',
            'info'
          );
        }
      });
    },
    editProject(project) {
      this.isEditMode = true;
      this.project = { ...project }; // Copy the data to avoid direct mutation
      this.isModalOpen = true;
      this.isProjectModalOpen = false;
    },
    resetProjectForm() {
      this.project = {
        _id: null,
        name: "",
        description: "",
        objective: "",
        fund: "",
        timeline: [""],
        status: "",
        beneficiary: "",
        location: "",
        coordinates: { lat: '', lng: '' },
      };
      this.isEditMode = false;
    },
    changePage(direction) {
      this.currentPage += direction;
    },
    async getProject() {
      this.isLoading = true;
      try {
        const response = await axios.get("http://localhost:3000/api/get-project");
        this.projects = response.data; // Store the data in 'projects'
        this.isLoading = false;
      } catch (error) {
        console.error("Error fetching projects:", error);
        this.isLoading = false;
        toastr.error('Failed to retrieve.', 'Error');
      }
    },
    projectStatusClass(status) {
      switch (status) {
        case 'pending':
          return 'text-yellow-500';
        case 'ongoing':
          return 'text-green-500';
        case 'completed':
          return 'text-blue-500';
        default:
          return '';
      }
    },
    formatTimeAgo(createdAt) {
      const now = new Date();
      const createdDate = new Date(createdAt);
      const diffInSeconds = Math.floor((now - createdDate) / 1000);
      const diffInMinutes = Math.floor(diffInSeconds / 60);
      const diffInHours = Math.floor(diffInMinutes / 60);
      const diffInDays = Math.floor(diffInHours / 24);

      if (diffInSeconds < 60) {
        return `${diffInSeconds} seconds ago`;
      } else if (diffInMinutes < 60) {
        return `${diffInMinutes} minute${diffInMinutes !== 1 ? 's' : ''} ago`;
      } else if (diffInHours < 24) {
        return `${diffInHours} hour${diffInHours !== 1 ? 's' : ''} ago`;
      } else {
        return `${diffInDays} day${diffInDays !== 1 ? 's' : ''} ago`;
      }
    },
  },
  mounted() {
    this.getProject(); // Wait for project data to load
  },

  updated() {
    if (this.showMap) {
      this.initializeMap();  // Ensure the map is reinitialized after any updates
    }
  },
  
};
</script>
<style>
.map-container {
  width: 100%;
  height: 400px; /* or any other fixed height */
}
.w{
  width: 60rem;
}
.th{
  height: 11rem;
}
.mh{
  height: 15rem;
}
</style> 

