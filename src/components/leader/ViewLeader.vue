<template>

    <div v-if="showModal" id="crud-modal" tabindex="-1" aria-hidden="true" class="hidden fixed inset-0 z-50 flex justify-center items-center w-full overflow-y-auto">
        <div class="relative p-4 h-full">
            <div class="relative w-full h-auto bg-white rounded-lg shadow dark:bg-gray-700 mb-4">
                <div class="flex items-center justify-between p-2 md:p-2 rounded-t dark:border-gray-600">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                        Add Leader Information
                    </h3>
                    <button @click="closeModal" type="button" class="text-green-400 bg-transparent hover:bg-green-200 hover:text-green-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-toggle="crud-modal">
                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                        </svg>
                        <span class="sr-only">Close modal</span>
                    </button>
                </div>

                <form @submit.prevent="submitForm" class="p-4 md:p-5 overflow-y-auto mb-4 md:mb-4">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="flex items-center justify-center">
                            <div v-if="previewImage" class="relative w-full h-60 w-60 border-2 border-dashed rounded-full">
                                <img :src="previewImage" alt="Uploaded Image" class="w-full h-full object-cover rounded-lg">
                                <button @click="removeImage" type="button" class="absolute top-2 right-2 p-1 text-white text-xs bg-red-600 rounded-md focus:outline-none">
                                    remove
                                </button>
                            </div>
                            <label v-else for="dropzone-file" 
                                class="flex flex-col items-center justify-center w-60 h-60 border-2 border-green-300 border-dashed rounded-full cursor-pointer bg-green-50"
                                @dragover.prevent @drop.prevent="handleDrop">
                                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                    </svg>
                                </div>
                                <input id="dropzone-file" type="file" class="hidden" @change="handleFileUpload" />
                            </label>
                        </div>

                        <div class="grid grid-cols-1"> 
                            <div class="bg-white dark:bg-gray-800 p-2 rounded-lg">
                                <label for="name-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                <input v-model="name" type="text" id="name-input" class="block w-full p-2 text-green-900 border border-green-100 rounded-lg bg-gray-50 text-xs focus:ring-green-500 focus:border-green-500">
                            </div>

                            <div class="bg-white dark:bg-gray-800 p-2 rounded-lg">
                                <label for="position-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Position</label>
                                <input v-model="position" type="text" id="position-input" class="block w-full p-2 text-green-900 border border-green-100 rounded-lg bg-gray-50 text-xs focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            </div>

                            <div class="px-2 py-2 bg-white dark:bg-gray-800">
                                <label for="term" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Range of Terms</label>
                                <div class="flex space-x-2">
                                    <input v-model="termStart" type="text" id="small-input" class="block w-full p-2 text-green-900 border border-green-100 rounded-lg bg-gray-50 text-xs focus:ring-green-500 focus:border-green-500" placeholder="Start">
                                    <input v-model="termEnd" type="text" id="small-input" class="block w-full p-2 text-green-900 border border-green-100 rounded-lg bg-gray-50 text-xs focus:ring-green-500 focus:border-green-500" placeholder="End">
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="mt-4 bg-white rounded-b-lg dark:bg-gray-800">
                            <label for="editor" class="sr-only">Publish post</label>
                            <textarea v-model="shortInfo" id="editor" rows="8" class="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border-2 border-green-200 focus:ring-green-500 focus:border-green-500" placeholder='Information...' required ></textarea>
                        </div>

                        <div class="grid grid-cols-1">
                            <div class="py-2 bg-white rounded-b-lg dark:bg-gray-800">
                                <label for="achievements" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Milestones</label>
                                <div v-for="(event, index) in timeline" :key="index" class="flex space-x-2 mb-2">
                                    <input v-model="timeline[index]" type="text" id="small-input" class="block w-full p-2 text-green-900 border border-green-100 rounded-lg bg-gray-50 text-xs focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    <button @click="removeTimeline(index)" type="button" class="px-3 py-1 text-sm font-medium text-center text-white bg-red-500 rounded-lg focus:ring-4 focus:ring-red-200">Remove</button>
                                </div>
                                <button @click="addTimeline" type="button" class="px-4 py-2 text-white text-xs font-semibold bg-blue-700 rounded-lg hover:bg-blue-800">Add Timeline Event</button>
                            </div>
                        </div>
                    </div>

                    <button type="submit" class="inline-flex items-center px-5 py-2.5 mt-4 text-sm font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-green-200 dark:focus:ring-blue-900 hover:bg-green-800">
                        Publish
                    </button>
                </form>
            </div>
        </div>
    </div>

    <div class="container mx-auto p-4">
        <div class="flex justify-between items-center mb-4">
            <div class="flex items-center space-x-2">
                <input type="text" v-model="searchQuery" placeholder="Search..." 
                class="block p-2 w-80 text-sm text-gray-900 border border-green-300 rounded-lg bg-gray-50 
                        focus:ring-green-500 focus:border-green-500" />
            
                <button @click="openModal" class="block text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="button">
                    Add Leader
                </button>
            </div>

            <div class="flex items-center space-x-2">
                <button @click="prevPage" :disabled="currentPage === 1"
                        class="bg-green-200 p-2 rounded-lg text-sm text-gray-700 hover:bg-green-300 
                            disabled:bg-gray-100 disabled:cursor-not-allowed">
                    Previous
                </button>
                <span class="text-sm">{{ currentPage }} of {{ totalPages }}</span>
                <button @click="nextPage" :disabled="currentPage === totalPages"
                        class="bg-green-200 p-2 rounded-lg text-sm text-gray-700 hover:bg-green-300 
                            disabled:bg-gray-100 disabled:cursor-not-allowed">
                    Next
                </button>
            </div>
        </div>

        <div v-if="paginatedData.length">
            <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div v-for="(leader, index) in paginatedData" :key="leader?.id" class="w-full">
                    <div class="w-full max-w-sm bg-white border border-green-200 rounded-lg shadow-md mb-4">
                        <div class="relative flex justify-end px-4 pt-4">
                            <button @click="toggleDropdown(index, $event)" class="inline-block text-green-500 hover:bg-green-100 focus:ring-4 focus:outline-none focus:ring-green-200 rounded-lg text-sm p-1.5" type="button">
                                <span class="sr-only">Open dropdown</span>
                                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                                <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                                </svg>
                            </button>

                            <div v-if="leader.showDropdown" class="absolute right-0 top-16 z-10 w-44 text-base list-none bg-green-50 divide-y divide-gray-100 rounded-lg shadow-md">
                                <ul class="py-2">
                                <li>
                                    <a @click="editModal(leader, index, event)" class="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100 cursor-pointer">Edit</a>
                                </li>
                                <!-- <li>
                                    <a @click="deleteLeader(leader)" class="block px-4 py-2 text-sm text-red-600 hover:bg-green-100">Delete</a>
                                </li> -->
                                </ul>
                            </div>
                        </div>

                        <div class="flex flex-col items-center pb-2 h-60"> <!-- Fixed height for the card -->
                            <img class="w-24 h-24 mb-3 rounded-full shadow-md shadow-green-200" :src="`http://localhost:3000/uploads/${leader.image}`" alt="Leader Image" />

                            <h5 class="mb-1 font-medium text-gray-900 text-center text-[clamp(0.6rem, 1.5vw, 0.9rem)] leading-tight max-w-xs overflow-hidden whitespace-nowrap">{{ leader.name }}</h5>

                            <span class="text-sm text-gray-500 text-[clamp(0.6rem, 1.5vw, 0.9rem)] ">{{leader.position}}</span>
                            
                            <div class="flex mt-4 md:mt-4">
                                <button @click="toggleModal(leader)" class="block text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center" type="button">
                                View
                                </button>
                            </div>
                        </div>

                    </div>

                    <div v-if="isModalOpen && selectedLeader.id === leader.id" class="fixed inset-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50">
                        <div class="relative w-full max-w-2xl max-h-screen">
                            <div class="relative bg-white max-h-full rounded-lg shadow dark:bg-gray-700 overflow-hidden">
                            <div class="flex items-center justify-between p-2 md:p-2 rounded-t dark:border-gray-600">
                                <button @click="toggleModal" type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span class="sr-only">Close modal</span>
                                </button>
                            </div>

                            <div class="overflow-y-auto max-h-[75vh] p-4">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center pb-6">
                                    <div class="flex justify-center md:justify-start">
                                        <img class="w-40 h-40 rounded-full shadow-lg" :src="`https://backend-w85m.onrender.com/uploads/${selectedLeader.image}`" alt="Leader image" />
                                    </div>

                                    <div class="text-left space-y-2">
                                        <h5 class="text-2xl font-bold text-gray-900 dark:text-white">{{ selectedLeader.name }}</h5>
                                        <span class="text-md font-medium text-gray-600 dark:text-gray-300">{{ selectedLeader.position }}</span>
                                        <div class="text-sm flex text-gray-700 dark:text-gray-400">
                                            <p><span class="font-medium">{{ selectedLeader.termStart }}</span></p> - 
                                            <p><span class="font-medium">{{ selectedLeader.termEnd }}</span></p>
                                        </div>
                                    </div>
                                </div>

                                <div class="my-6 mx-6 ">
                                    <p class="text-sm text-left text-gray-700 dark:text-gray-400">{{ selectedLeader.shortInfo }}</p>
                                </div>

                                <div class="mt-2 mx-6">
                                    <h6 class="font-semibold text-left text-gray-900 dark:text-white mb-4">Milestones:</h6>
                                    <ol class="relative border-l border-gray-200 dark:border-gray-700">
                                        <li v-for="milestone in selectedLeader.milestones" :key="milestone" class="mb-4 ml-6">
                                        <div class="absolute w-3 h-3 bg-green-500 rounded-full -left-1.5 border border-white"></div>
                                        <p class="text-sm text-left font-medium text-gray-700 dark:text-gray-400">{{ milestone }}</p>
                                        </li>
                                    </ol>
                                </div>

                    
                            </div>
                            </div>
                        </div>
                        </div>


                    <div v-if="showModal" class="fixed overflow-auto inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                        <div class="relative p-4 h-full">
                            <div class="relative w-full h-auto bg-white rounded-lg shadow dark:bg-gray-700 mb-4">
                                <div class="flex items-center justify-between p-2 md:p-2 rounded-t dark:border-gray-600">
                                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                                        Edit Leader Information 
                                    </h3>
                                    <button type="button" @click="showModal = false" class="text-green-400 bg-transparent hover:bg-green-200 hover:text-green-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center">
                                        <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                        </svg>
                                        <span class="sr-only">Close modal</span>
                                    </button>
                                </div>

                                <form @submit.prevent="submitForm" class="p-4 md:p-5 overflow-y-auto mb-4 md:mb-4">
                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div class="flex items-center justify-center">
                                            <div v-if="previewImage" class="relative h-60 w-60 border-2 border-dashed border-green-200 rounded-full">
                                                <img :src="previewImage" alt="Uploaded Image" class="w-full h-full object-cover rounded-lg">
                                                <button @click="removeImage" type="button" class="absolute top-2 right-2 p-1 text-white text-xs bg-red-600 rounded-md focus:outline-none">
                                                    Remove
                                                </button>
                                            </div>
                                            <label v-else for="dropzone-file" 
                                                class="flex flex-col items-center justify-center w-60 h-60 border-2 border-green-200 border-dashed rounded-full cursor-pointer bg-green-50"
                                                @dragover.prevent @drop.prevent="handleDrop">
                                                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                                    <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                                    </svg>
                                                </div>
                                                <input id="dropzone-file" type="file" class="hidden" @change="handleFileUpload" />
                                            </label>
                                        </div>

                                        <div class="grid grid-cols-1"> 
                                            <div class="bg-white dark:bg-gray-800 p-2 rounded-lg">
                                                <label for="name-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                                <input v-model="name" type="text" id="name-input" class="w-full p-2 text-xs text-gray-900 bg-white rounded-lg border border-green-200 focus:ring-green-500 focus:border-green-500">
                                            </div>

                                            <div class="bg-white dark:bg-gray-800 p-2 rounded-lg">
                                                <label for="position-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Position</label>
                                                <input v-model="position" type="text" id="position-input" class="block w-full p-2 text-green-900 border border-green-100 rounded-lg bg-gray-50 text-xs focus:ring-green-500 focus:border-green-500">
                                            </div>

                                            <div class="px-2 py-2 bg-white dark:bg-gray-800">
                                                <label for="term" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Range of Terms</label>
                                                <div class="flex space-x-2">
                                                    <input v-model="termStart" type="text" id="small-input" class="block w-full p-2 text-green-900 border border-green-100 rounded-lg bg-gray-50 text-xs focus:ring-green-500 focus:border-green-500" placeholder="Start">
                                                    <input v-model="termEnd" type="text" id="small-input" class="block w-full p-2 text-green-900 border border-green-100 rounded-lg bg-gray-50 text-xs focus:ring-green-500 focus:border-green-500" placeholder="End">
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div class="mt-4 bg-white rounded-b-lg dark:bg-gray-800">
                                            <label for="editor" class="sr-only">Publish post</label>
                                            <textarea v-model="shortInfo" id="editor" rows="8" class="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border-2 border-green-200 focus:ring-green-500 focus:border-green-500" placeholder='Information...' required ></textarea>
                                        </div>

                                        <div class="grid grid-cols-1">
                                            <div class="py-2 bg-white rounded-b-lg dark:bg-gray-800">
                                                <label for="achievements" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Milestones</label>
                                                <div v-for="(event, index) in timeline" :key="index" class="flex space-x-2 mb-2">
                                                    <input v-model="timeline[index]" type="text" id="small-input" class="block w-full p-2 text-green-900 border border-green-200 rounded-lg bg-gray-50 text-xs focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                                    <button @click="removeTimeline(index)" type="button" class="px-3 py-1 text-sm font-medium text-center text-white bg-red-500 rounded-lg focus:ring-4 focus:ring-red-200">Remove</button>
                                                </div>
                                                <button @click="addTimeline" type="button" class="px-4 py-2 text-white text-xs font-semibold bg-blue-700 rounded-lg hover:bg-blue-800">Add Timeline Event</button>
                                            </div>

                                        </div>
                                    </div>

                                    <button type="submit" class="inline-flex items-center px-5 py-2.5 mt-4 text-sm font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-green-200 dark:focus:ring-blue-900 hover:bg-green-800">
                                        Publish
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>


                </div>
            </div>
        </div>

        <div v-else>
            <p>No leaders found.</p>
        </div>

       
    </div>
<!-- </div> -->
<div v-if="loading" class="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-white bg-opacity-70 z-10">
            <svg class="animate-spin h-8 w-8 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
                <path d="M4 12a8 8 0 0 0 16 0" stroke="currentColor" stroke-width="4" fill="none" />
            </svg>
        </div>


</template>


<script>
import axios from 'axios';
import $ from 'jquery';
import 'datatables.net'; 
import 'datatables.net-dt/css/dataTables.dataTables.css';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default {
    name: 'ViewLeader',
    data() {
        return {
            showModal: false,
            showDropdown: false,
            leaders: [],
            isModalOpen: false,
            showModal: false, 
            selectedLeader: {},
            searchQuery: '',
            currentPage: 1,
            pageSize: 5,
            name: '',
            position: '',
            termStart: '',
            termEnd: '',
            shortInfo: '',
            timeline: [],
            previewImage: null,
            loading: false,
        };
    },
    computed: {
        filteredData() {
            if (!this.leaders || !Array.isArray(this.leaders)) {
                return [];
            }
            return this.leaders.filter((item) =>
                item.name.toLowerCase().includes(this.searchQuery.toLowerCase())
            );
        },
        paginatedData() {
            const start = (this.currentPage - 1) * this.pageSize;
            return this.filteredData.slice(start, start + this.pageSize);
        },
        totalPages() {
            return Math.ceil(this.filteredData.length / this.pageSize);
        },
    },
    async mounted() {
        await this.fetchLeaders();
        $('#export-table').DataTable();
        document.addEventListener('click', this.handleClickOutside);
    },
    beforeDestroy() {
        document.removeEventListener('click', this.handleClickOutside);
    },
    methods: {
        openModal() {
            this.showModal = true; // Show the modal
        },
        closeModal() {
            this.showModal = false; // Hide the modal
        },
        async fetchLeaders() {
            this.loading = true; 
            try {
                const response = await axios.get('https://backend-w85m.onrender.com/api/leaders');
                this.leaders = response.data || []; 
                console.log('Leaders fetched:', this.leaders);
                this.loading = false;
            } catch (error) {
                console.error('Error fetching leaders:', error);
            }
        },
        
        toggleDropdown(index, event) {
            if (event) {
                event.stopPropagation();
            }
            if (this.leaders[index]) {
                this.leaders[index].showDropdown = !this.leaders[index].showDropdown;
            }
        },
        toggleModal(leader) {
            this.isModalOpen = !this.isModalOpen;
            this.selectedLeader = leader;
        },
        editModal(leader, index, event) {
            if (event) {
                event.stopPropagation();
            }

            this.toggleDropdown(index, event);
            this.selectedLeader = leader;  
            this.showModal = true;

            this.name = leader.name || '';
            this.position = leader.position || '';
            this.termStart = leader.termStart || '';
            this.termEnd = leader.termEnd || '';
            this.shortInfo = leader.shortInfo || '';
            this.timeline = Array.isArray(leader.milestones) ? [...leader.milestones] : (leader.milestones ? [leader.milestones] : []);
            this.previewImage = leader.image ? `https://backend-w85m.onrender.com/uploads/${leader.image}` : null;
            this.file = null;

            console.log('Timeline:', this.timeline);
            console.log('Preview Image:', this.previewImage);
        },
        handleFileUpload(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.previewImage = e.target.result; 
                };
                reader.readAsDataURL(file);
                this.file = file;  
            }
        },
        handleDrop(event) {
            const file = event.dataTransfer.files[0];
            if (file) {
                this.file = file;
                this.previewImage = URL.createObjectURL(file);
            }
        },
        removeImage() {
            this.previewImage = null;
            this.file = null;
        },
        addTimeline() {
            this.timeline.push('');
        },
        removeTimeline(index) {
            this.timeline.splice(index, 1);
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        resetForm() {
            this.name = '';
            this.position = '';
            this.termStart = '';
            this.termEnd = '';
            this.shortInfo = '';
            this.timeline = ['']; 
            this.previewImage = null;
        },
        async submitForm() {
            const formData = new FormData();
            formData.append('name', this.name || '');
            formData.append('position', this.position || '');
            formData.append('termStart', this.termStart || '');
            formData.append('termEnd', this.termEnd || '');
            formData.append('shortInfo', this.shortInfo || '');
            formData.append('timeline', JSON.stringify(this.timeline || []));

            if (this.file) {
                formData.append('image', this.file); 
            } else if (this.selectedLeader.id) {
                formData.append('image', this.selectedLeader.image); 
            }

            if (this.selectedLeader.id) {
                formData.append('id', this.selectedLeader.id);
            }

            try {
                const response = await axios.post('https://backend-w85m.onrender.com/api/submit-leaders', formData);
                console.log('Data inserted/updated successfully:', response.data);
                this.closeModal(); 
                toastr.success('Leader added successfully');
                await this.fetchLeaders(); 
            } catch (error) {
                console.error('Error submitting data:', error);
                alert('Error submitting data');
            }
        },
        async deleteLeader(leader) {
            const confirmDelete = confirm("Are you sure you want to delete this leader?");
            if (confirmDelete) {
                try {
                    const leaderId = leader.id; 
                    const response = await axios.delete(`https://backend-w85m.onrender.com/api/leaders/${leaderId}`); // Use DELETE method
                    console.log('Leader deleted successfully:', response.data);
                    this.leaders = this.leaders.filter(item => item.id !== leaderId);
                    alert('Leader deleted successfully');
                    await this.fetchLeaders(); // Refresh the list after deletion
                } catch (error) {
                    console.error('Error deleting leader:', error);
                    alert('Error deleting leader');
                }
            }
        },
        handleClickOutside(event) {
            if (this.leaders && Array.isArray(this.leaders)) {
                this.leaders.forEach(leader => {
                    if (leader.showDropdown) {
                        leader.showDropdown = false; 
                    }
                });
            }
        },
    },
}
</script>
