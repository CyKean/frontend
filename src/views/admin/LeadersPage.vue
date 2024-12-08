<template>
    <div class="flex">
        <SideBar />
        <div class="flex-1 p-2 sm:ml-64 bg-gray-50 min-h-screen">
            <div class="w-full mb-3 top-0 sticky z-10">
                <TopBar />
            </div>
            <div class="rounded-md shadow-md h p-1">
                <ViewLeader />
            </div>
        </div>
    </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue';
import ViewLeader from '@/components/leader/ViewLeader.vue';
import TopBar from '@/components/TopBar.vue';

export default {
    name: 'LeadersPage',
    components: {
        SideBar,
        ViewLeader,
        TopBar,
    },
    

};
</script>

<!-- 
<template>
    <SideBar />

    <div class="p-4 sm:ml-64">
        <div class="p-4 border-2 border-green-200 border-dashed rounded-lg dark:border-gray-700">

            <button data-modal-target="crud-modal" data-modal-toggle="crud-modal" class="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
                Toggle modal
            </button>

            <div id="crud-modal" tabindex="-1" aria-hidden="true" class="hidden fixed inset-0 z-50 flex justify-center items-center w-full overflow-y-auto">
                <div class="relative p-4 h-full w-full max-w-lg">
                    <div class="relative w-screen h-auto bg-white rounded-lg shadow dark:bg-gray-700 mb-4">
                        <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
                                Add Leader Information
                            </h3>
                            <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="crud-modal">
                                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                                </svg>
                                <span class="sr-only">Close modal</span>
                            </button>
                        </div>

                        <form @submit.prevent="submitForm" class="p-4 md:p-5 overflow-y-auto">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="flex items-center justify-center">
                                    <div v-if="previewImage" class="relative w-full h-64 border-2 border-dashed rounded-lg">
                                        <img :src="previewImage" alt="Uploaded Image" class="w-full h-full object-cover rounded-lg">
                                        <button @click="removeImage" type="button" class="absolute top-2 right-2 p-1 text-white text-xs bg-red-600 rounded-lg focus:outline-none">
                                            remove
                                        </button>
                                    </div>
                                    <label v-else for="dropzone-file" 
                                        class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                        @dragover.prevent @drop.prevent="handleDrop">
                                        <div class="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                            </svg>
                                            <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                                        </div>
                                        <input id="dropzone-file" type="file" class="hidden" @change="handleFileUpload" />
                                    </label>
                                </div>

                                <div class="grid grid-cols-1"> 
                                    <div class="bg-white dark:bg-gray-800 p-2 rounded-lg">
                                        <label for="name-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                        <input v-model="name" type="text" id="name-input" class="block w-full p-2 text-green-900 border border-green-200 rounded-lg bg-gray-50 text-xs focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    </div>

                                    <div class="bg-white dark:bg-gray-800 p-2 rounded-lg">
                                        <label for="position-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Position</label>
                                        <input v-model="position" type="text" id="position-input" class="block w-full p-2 text-green-900 border border-green-200 rounded-lg bg-gray-50 text-xs focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                    </div>

                                    <div class="px-2 py-2 bg-white dark:bg-gray-800">
                                        <label for="term" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Range of Terms</label>
                                        <div class="flex space-x-2">
                                            <input v-model="termStart" type="text" id="small-input" class="block w-full p-2 text-green-900 border border-green-200 rounded-lg bg-gray-50 text-xs focus:ring-green-500 focus:border-green-500" placeholder="Start">
                                            <input v-model="termEnd" type="text" id="small-input" class="block w-full p-2 text-green-900 border border-green-200 rounded-lg bg-gray-50 text-xs focus:ring-green-500 focus:border-green-500" placeholder="End">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div class="mt-4 bg-white rounded-b-lg dark:bg-gray-800">
                                    <label for="editor" class="sr-only">Publish post</label>
                                    <textarea v-model="shortInfo" id="editor" rows="8" class="block p-2.5 w-full text-sm text-gray-900 bg-white rounded-lg border border-green-200 focus:ring-green-500 focus:border-green-500" placeholder='Information...' required ></textarea>
                                </div>

                                <div class="grid grid-cols-1">
                                    <div class="py-2 bg-white rounded-b-lg dark:bg-gray-800">
                                        <label for="achievements" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Milestones</label>
                                        <div v-for="(event, index) in timeline" :key="index" class="flex space-x-2 mb-2">
                                            <input v-model="timeline[index].description" type="text" id="small-input" class="block w-full p-2 text-green-900 border border-green-200 rounded-lg bg-gray-50 text-xs focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                            <button @click="removeTimeline(index)" type="button" class="px-3 py-1 text-sm font-medium text-center text-white bg-red-500 rounded-lg focus:ring-4 focus:ring-red-200">Remove</button>
                                        </div>
                                        <button @click="addTimeline" type="button" class="px-4 py-2 text-white text-xs font-semibold bg-blue-700 rounded-lg hover:bg-blue-800">Add Timeline Event</button>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" class="inline-flex items-center px-5 py-2.5 mt-4 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import SideBar from '@/components/SideBar.vue';
export default {
    name: 'LeadersPage',
    components: {
        SideBar
    },
    data() {
        return {
            name: '',
            position: '',
            termStart: '',
            termEnd: '',
            shortInfo: '',
            timeline: [],
            previewImage: null,
            file: null,
        };
    },
    methods: {
        handleFileUpload(event) {
            const file = event.target.files[0];
            if (file) {
                this.file = file;
                this.previewImage = URL.createObjectURL(file);
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
            this.timeline.push({ description: '' });
        },
        removeTimeline(index) {
            this.timeline.splice(index, 1);
        },
        async submitForm() {
            const formData = new FormData();
            formData.append('name', this.name);
            formData.append('position', this.position);
            formData.append('termStart', this.termStart);
            formData.append('termEnd', this.termEnd);
            formData.append('shortInfo', this.shortInfo);
            formData.append('file', this.file);

            this.timeline.forEach(event => {
                formData.append('milestones[]', event.description);
            });

            try {
                // Make API request to submit the form data
                const response = await axios.post('http://localhost:3000/api/submit-leader', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log('Success:', response.data);
                // Optionally, reset the form or handle success
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        },
    },
};
</script>

<style scoped>
/* Add your styles here if needed */
</style> -->
