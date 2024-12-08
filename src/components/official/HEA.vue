<template>
    <h5 class="text-left font-semibold text-lg">HEAD EXECUTIVE ASSISTANT</h5>

    <div class="flex items-start">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow">
            <div v-for="(card, index) in cards" :key="index" class="relative bg-white border border-green-200 rounded-lg shadow p-4">
                <div class="flex justify-end items-center px-2 pt-2">
                    <button @click="toggleDropdown(index, $event)" class="absolute inline-block mb-2 mx-2 top-2 text-green-500 hover:bg-green-100 focus:ring-4 focus:outline-none focus:ring-green-200 rounded-lg text-sm p-1.5">
                        <span class="sr-only">Open dropdown</span>
                        <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"/>
                        </svg>
                    </button>

                    <div v-if="loading" class="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-white bg-opacity-70 z-10">
                        <svg class="animate-spin h-8 w-8 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
                            <path d="M4 12a8 8 0 0 0 16 0" stroke="currentColor" stroke-width="4" fill="none" />
                        </svg>
                    </div>

                    <button @click="removeCard(index)" class="absolute top-2 right-2 text-red-600 hover:text-red-800">
                        <svg class="w-4 h-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                            <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                        </svg>
                    </button>
                    <div v-if="dropdownOpen[index]" class="absolute mt-10 z-10 text-base list-none divide-y bg-green-50 divide-green-100 rounded-lg shadow w-44">
                        <ul class="py-2">
                            <li>
                                <a href="#" @click="enableEdit(index)" class="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100">Edit</a>
                            </li>
                            <li>
                                <a href="#" @click="clearFields(index)" class="block px-4 py-2 text-sm text-red-600 hover:bg-green-100">Clear</a>
                            </li>
                        </ul>
                    </div>
                </div>

                <form @submit.prevent="saveChanges(index)">
                    <div class="flex flex-col p-4">
                        <div class="flex items-center justify-between">
                            <div class="flex-1 mx-1">
                                <label for="name-input" class="block mb-2 text-sm font-medium text-gray-900">Name</label>
                                <input type="text" v-model="card.name" :disabled="!card.isEditing" class="block w-full p-2 text-gray-900 border border-green-300 rounded-lg bg-gray-50 text-xs focus:ring-green-500 focus:border-green-500">
                            </div>

                            <div class="flex-1 mx-1">
                                <label class="block mb-2 text-sm font-medium text-gray-900">Description</label>
                                <div v-for="(desc, descIndex) in card.descriptions" :key="descIndex" class="flex items-center">
                                    <input type="text" v-model="desc.value" :disabled="!card.isEditing" class="block w-full p-2 mb-1 text-gray-900 border border-green-300 rounded-lg bg-gray-50 text-xs focus:ring-green-500 focus:border-green-500">
                                    <button class="ml-2 text-red-600" v-if="card.isEditing" @click="removeDescription(index, descIndex)">
                                        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/>
                                        </svg>
                                    </button>
                                </div>

                                <button v-if="card.isEditing" @click="addDescriptionField(index)" type="button" class="mt-2 px-4 py-1 text-sm font-medium text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300">
                                    <svg class="flex-shrink-0 w-3 h-3 transition duration-75" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                        <path fill="white" d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 144L48 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l144 0 0 144c0 17.7 14.3 32 32 32s32-14.3 32-32l0-144 144 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-144 0 0-144z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>

                        <div class="flex mt-4" v-if="card.isEditing">
                            <button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300">Save</button>
                            <button @click="cancelEdit(index)" class="ml-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-300 rounded-lg hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-300">Cancel</button>
                        </div>
                    </div>
                </form>

            </div>

            <div class="relative bg-white border border-gray-200 rounded-lg shadow p-4 flex items-center justify-center">
                <button @click="addNewCard" class="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300">
                    Add New Card
                </button>
            </div>
        </div>
    </div>

</template>

<script>
import axios from "axios";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

export default {
    name: 'HEA',
    data() {
        return {
            cards: [], 
            dropdownOpen: [],
            currentButtonIndex: null,
            loading: false
        };
    },
    methods: {
        toggleDropdown(index, event) {
            this.dropdownOpen[index] = !this.dropdownOpen[index];
            event.stopPropagation();
        },
        enableEdit(index) {
            this.cards[index].isEditing = true;
        },
        cancelEdit(index) {
            this.cards[index].isEditing = false;
        },
        async saveChanges(index) {
            try {
                const cleanedCards = this.cards.map(({ isEditing, ...card }) => card); 

                const heaData = { cards: cleanedCards }; 
                await axios.post('http://localhost:3000/api/save-hea', { heaData });
                alert('HEA data saved successfully');
                this.cards[index].isEditing = false; 
                toastr.success('Saved');
            } catch (error) {
                console.error('Failed to save HEA data:', error);
            }
        },
        async fetchHeaData() {
            this.loading = true;
            try {
                const response = await axios.get('http://localhost:3000/api/get-hea');
                this.cards = response.data.cards || [];
                this.loading = false;
                console.log(response.data.cards);
            } catch (error) {
                console.error('Failed to fetch HEA data:', error);
            }
        },


        addDescriptionField(index) {
            this.cards[index].descriptions.push({ value: '' });
        },
        removeDescription(cardIndex, descIndex) {
            this.cards[cardIndex].descriptions.splice(descIndex, 1);
        },
        clearFields(index) {
            this.cards[index].name = '';
            this.cards[index].descriptions = [{ value: '' }];
        },
        removeCard(index) {
            this.cards.splice(index, 1);
            this.dropdownOpen.splice(index, 1);
            this.saveCardsToLocalStorage();
            this.saveChanges(index);
        },
        addNewCard() {
            this.cards.push({
                name: '',
                descriptions: [{ value: '' }],
                isEditing: true
            });
            this.dropdownOpen.push(false);
            this.saveCardsToLocalStorage(); 
        },

        saveCardsToLocalStorage() {
            localStorage.setItem('heaCards', JSON.stringify(this.cards)); 
        },
        loadCardsFromLocalStorage() {
            const storedCards = localStorage.getItem('heaCards'); 
            if (storedCards) {
                this.cards = JSON.parse(storedCards);
            } else {
                this.addNewCard();
            }
        },
        handleClickOutside(event) {
            this.dropdownOpen = this.dropdownOpen.map(() => false);
        },
    },
    created() {
        this.fetchHeaData();  
    },
    mounted() {
        document.addEventListener('click', this.handleClickOutside);
        this.loadCardsFromLocalStorage();
        this.fetchHeaData(); 
    },
    beforeDestroy() {
        document.removeEventListener('click', this.handleClickOutside);
    }
};
</script>
