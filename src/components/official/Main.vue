<template>
    <div class="w-full max-w-xl bg-white border border-green-200 rounded-lg shadow">

        <div v-if="loading" class="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-white bg-opacity-70 z-10">
            <svg class="animate-spin h-8 w-8 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
                <path d="M4 12a8 8 0 0 0 16 0" stroke="currentColor" stroke-width="4" fill="none" />
            </svg>
        </div>

        <div class="flex justify-end px-2">
            <button @click="toggleDropdown" class="relative text-green-500 hover:bg-green-100 focus:ring-4 focus:outline-none focus:ring-green-200 rounded-lg text-sm p-1.5">
                <span class="sr-only">Open dropdown</span>
                <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                </svg>
            </button>

            <div v-if="dropdownOpen" class="absolute top-16 z-10 text-base list-none divide-y bg-green-50 divide-green-100 rounded-lg shadow w-44">
                <ul class="py-2">
                    <li>
                        <a href="#" @click="enableEdit" class="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100">Edit</a>
                    </li>
                    <li>
                        <a href="#" @click="clearFields" class="block px-4 py-2 text-sm text-red-600 hover:bg-green-100">Clear</a>
                    </li>
                </ul>
            </div>
        </div>

        <form @submit.prevent="saveChanges">
            <div class="flex flex-col items-center pb-5">
                <div class="grid grid-cols-1 gap-4 md:grid-cols-2 w-full p-4">

                    <div class="mx-1">
                        <label for="name-input" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input type="text" id="name-input" v-model="name" :disabled="!isEditing" class="block w-full p-2 text-gray-900 border border-green-300 rounded-lg bg-gray-50 text-xs focus:ring-green-500 focus:border-green-500">
                    </div>

                    <div class="mx-1">
                        <label class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                        <div v-for="(desc, index) in descriptions" :key="index" class="flex items-center mb-2">
                            <input type="text" v-model="desc.value" :disabled="!isEditing" class="block w-full p-2 text-gray-900 border border-green-300 rounded-lg bg-gray-50 text-xs focus:ring-green-500 focus:border-green-500">
                            <button class="ml-2 text-red-600" v-if="isEditing" @click="removeDescription(index)">
                                <svg class="flex-shrink-0 w-5 h-5 text-green-500 transition duration-75 group-hover:text-green-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                    <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/>
                                </svg>
                            </button>
                        </div>

                        <button type="button" v-if="isEditing" @click="addDescriptionField" class="mt-1 px-4 py-1 text-sm font-medium text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300">Add Description</button>
                    </div>
                </div>

                <div class="flex mt-1" v-if="isEditing">
                    <button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300">Save</button>
                    <button @click="cancelEdit" class="ml-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-300 rounded-lg hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-300">Cancel</button>
                </div>
            
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

export default {
    name: 'Main',
    data() {
        return {
            name: '', 
            descriptions: [{ value: '' }], 
            isEditing: false, 
            dropdownOpen: false,
            loading: false,
        };
    },
    methods: {
        toggleDropdown(event) {
            event.stopPropagation(); 
            this.dropdownOpen = !this.dropdownOpen; 
        },
        enableEdit() {
            this.isEditing = true; 
            this.dropdownOpen = false; 
        },
        async saveChanges() {
            try {
                const cleanedDescriptions = this.descriptions.filter(desc => desc.value !== '');

                const response = await axios.post('https://backend-w85m.onrender.com/api/save-secretary', {
                    name: this.name,
                    descriptions: cleanedDescriptions.map(desc => desc.value),
                });

               toastr.success('Saved');
                this.isEditing = false;
            } catch (error) {
                console.error('Error saving secretary:', error);
                alert('Failed to save. Please try again.');
            }
        },
        cancelEdit() {
            this.isEditing = false; 
        },
        clearFields() {
            this.name = '';
            this.descriptions = [{ value: '' }]; 
        },
        addDescriptionField() {
            this.descriptions.push({ value: '' }); 
        },
        removeDescription(index) {
            this.descriptions.splice(index, 1); 
        },
        async getSecretaryData() {
            this.loading = true;
            try {
                const response = await axios.get('https://backend-w85m.onrender.com/api/get-secretary');

                if (response.data && response.data.success) {
                    const { name, descriptions } = response.data.data || {}; 

                    this.name = name || '';
                    this.descriptions = (descriptions || []).map(desc => ({ value: desc })); 

                    if (response.data.message) {
                        console.log("API Message:", response.data.message);
                    }
                    console.log(this.name, this.description)
                    this.loading = false;
                } else {
                    console.error('Failed to fetch secretary data:', response.data?.message || 'Unknown error');
                }
            } catch (error) {
                console.error('Error fetching secretary data:', error);
            }
        }


    },
    created() {
        this.getSecretaryData();
    },
    mounted() {
        document.addEventListener('click', this.handleClickOutside);
    },
    beforeDestroy() {
        document.removeEventListener('click', this.handleClickOutside);
    }
}
</script>
