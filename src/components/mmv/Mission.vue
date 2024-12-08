<template>

    <form @submit.prevent="saveMissionChanges">
        <div class="w-full mb-4 border border-green-200 hm rounded-md bg-green-50">
            <div class="flex items-center justify-between px-3 py-2 border-b-0">
                <h3 class="font-semibold text-green-600">DAR Mission</h3>
                <button type="button" @click="toggleMissionEditMode"
                    class="p-2 text-green-500 rounded cursor-pointer sm:ms-auto hover:text-green-900 hover:bg-green-100 dark:text-green-400 dark:hover:text-white dark:hover:bg-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"/>
                    </svg>
                    <span class="sr-only">Edit</span>
                </button>
            </div>
            <div class="px-4 py-2 rounded-b-lg dark:bg-green-800">
                <label for="mission-content" class="sr-only">Mission</label>
                <div class="relative">
                    <div id="mission-content" v-html="mission" :contenteditable="missionEditMode && !loading" @input="updateMission" class="w-full p-2 text-sm rounded-md bg-green-50"></div>
                    <div v-if="loading" class="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-white bg-opacity-70 z-10">
                        <svg class="animate-spin h-8 w-8 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
                            <path d="M4 12a8 8 0 0 0 16 0" stroke="currentColor" stroke-width="4" fill="none" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex space-x-2" v-if="missionEditMode">
            <button type="submit" class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 hover:bg-green-800">
                Save
            </button>
            <button type="button" @click="cancelMissionEdit" class="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-red-500 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-600">
                Cancel
            </button>
        </div>
    </form>

</template>

<script>
import axios from 'axios';
import toastr from 'toastr';

export default {
    name: 'Mission',
    data() {
        return {
            mission: '', // Holds the mission content
            missionEditMode: false, // Controls edit mode
            loading: false, // Add loading state
        };
    },
    async mounted() {
        await this.loadMission(); // Load initial mission content
    },
    methods: {
        async loadMission() {
            this.loading = true; // Show loader when fetching data
            try {
                const response = await axios.get('https://backend-w85m.onrender.com/api/get-mission');
                this.mission = response.data.mission || '';
            } catch (error) {
                toastr.error('Failed to load mission content.', 'Error');
                console.error('Error fetching mission:', error);
            } finally {
                this.loading = false; // Hide loader once data is fetched
            }
        },
        async saveChanges() {
            this.loading = true; // Show loader when saving data
            try {
                const response = await axios.post('https://backend-w85m.onrender.com/api/save-mission', { mission: this.mission });
                toastr.success(response.data.message, 'Success');
                this.missionEditMode = false;
            } catch (error) {
                toastr.error('Error saving mission.', 'Error');
                console.error('Error saving mission:', error);
            } finally {
                this.loading = false; // Hide loader once data is saved
            }
        },
        cancelEdit() {
            this.missionEditMode = false;
            this.loadMission(); // Reload original content
            toastr.info('Changes discarded.', 'Cancelled');
        },
        toggleEditMode() {
            this.missionEditMode = !this.missionEditMode;
            if (this.missionEditMode) {
                toastr.info('Edit mode enabled.', 'Info');
            } else {
                toastr.info('Edit mode disabled.', 'Info');
            }
        },
    },
};
</script>

<style scoped>
.hm{
    height: 30rem;
}
textarea {
    resize: none;
    position: relative;
}
</style>
