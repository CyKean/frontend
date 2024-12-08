<template>

    <form @submit.prevent="saveVisionChanges">
        <div class="w-full mb-4 border border-green-200 hv rounded-md bg-green-50">
            <div class="flex items-center justify-between px-3 py-2 border-b-0">
                <h3 class="font-semibold text-green-600">DAR Vision</h3>
                <button type="button" @click="toggleVisionEditMode"
                    class="p-2 text-green-500 rounded cursor-pointer sm:ms-auto hover:text-green-900 hover:bg-green-100 dark:text-green-400 dark:hover:text-white dark:hover:bg-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
                    </svg>
                    <span class="sr-only">Edit</span>
                </button>
            </div>
            <div class="px-4 py-2 rounded-b-lg dark:bg-green-800">
                <label for="vision-content" class="sr-only">Vision</label>
                <div class="relative">
                    <div id="vision-content" v-html="vision" :contenteditable="visionEditMode && !loading" @input="updateVision" class="w-full p-2 text-sm rounded-md bg-green-50"></div>
                    <div v-if="loading" class="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-white bg-opacity-70 z-10">
                        <svg class="animate-spin h-8 w-8 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
                            <path d="M4 12a8 8 0 0 0 16 0" stroke="currentColor" stroke-width="4" fill="none" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex space-x-2" v-if="visionEditMode">
            <button type="submit" class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 hover:bg-green-800">
                Save
            </button>
            <button type="button" @click="cancelVisionEdit" class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-red-500 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-600">
                Cancel
            </button>
        </div>
    </form>

</template>

<script>
import axios from 'axios';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

export default {
    name: 'Vision',
    data() {
        return {
            vision: '', // Store the vision content
            editMode: false, // Edit mode flag
            loading: false, // Loading state
        };
    },
    async mounted() {
        await this.loadVision();
    },
    methods: {
        async loadVision() {
            this.loading = true; // Start loading
            try {
                const response = await axios.get('https://backend-w85m.onrender.com/api/get-vision');
                this.vision = response.data.vision || ''; // Load the initial vision content
            } catch (error) {
                toastr.error('Error fetching vision', 'Error');
                console.error('Error fetching vision:', error);
            } finally {
                this.loading = false; // Stop loading once the data is fetched
            }
        },
        async saveChanges() {
            try {
                const response = await axios.post('https://backend-w85m.onrender.com/api/save-vision', { vision: this.vision });
                toastr.success(response.data.message, 'Success');
                this.editMode = false; // Disable edit mode
            } catch (error) {
                toastr.error('Error saving vision', 'Error');
                console.error('Error saving vision:', error);
            }
        },
        cancelEdit() {
            this.editMode = false; // Exit edit mode without saving
            this.loadVision(); // Reload the original content
            toastr.info('Changes discarded.', 'Cancelled');
        },
        toggleEditMode() {
            this.editMode = !this.editMode;
            if (this.editMode) {
                toastr.info('Edit mode enabled.', 'Info');
            } else {
                toastr.info('Edit mode disabled.', 'Info');
            }
        },
    },
};
</script>
<style>
.hv{
    height: 30rem;
}
</style>