<template>
    <h5 class="text-left font-semibold text-lg">DIRECTOR</h5>
        <div class="flex items-start">
            
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow">
                    <div v-for="(category, index) in categories" :key="index" class="relative bg-white border border-green-200 rounded-lg shadow p-4">
                        <div class="flex justify-end items-center px-2 pt-2">
                            <button @click="toggleDropdown(index, $event)" type="button" class="absolute inline-block mb-2 mx-2 top-2 text-green-500 hover:bg-green-100 focus:ring-4 focus:outline-none focus:ring-green-200 rounded-lg text-sm p-1.5">
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

                            <button @click="removeCategory(index)" type="button" class="absolute top-2 right-2 text-red-600 hover:text-red-800">
                                <svg class="w-4 h-4" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                                    <path d="M135.2 17.7L128 32 32 32C14.3 32 0 46.3 0 64S14.3 96 32 96l384 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-96 0-7.2-14.3C307.4 6.8 296.3 0 284.2 0L163.8 0c-12.1 0-23.2 6.8-28.6 17.7zM416 128L32 128 53.2 467c1.6 25.3 22.6 45 47.9 45l245.8 0c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                                </svg>
                            </button>
                            <div v-if="dropdownOpen[index]" class="absolute mt-10 z-10 text-base list-none divide-y bg-green-50 divide-green-100 rounded-lg shadow w-44">
                                <ul class="py-2">
                                    <li>
                                        <a href="#" @click="enableEditCategory(index)" class="block px-4 py-2 text-sm text-gray-700 hover:bg-green-100">Edit</a>
                                    </li>
                                    <li>
                                        <a href="#" @click="clearCategoryFields(index)" class="block px-4 py-2 text-sm text-red-600 hover:bg-green-100">Clear</a>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <form @submit.prevent="saveChanges(index)">

                            <div class="flex flex-col p-4">
                                <div class="flex items-center justify-between">
                                    <div class="flex-1 mx-1">
                                        <label for="category-name-input" class="block mb-2 text-sm font-medium text-gray-900">Category Name</label>
                                        <input type="text" v-model="category.name" :disabled="!category.isEditing" class="block w-full p-2 text-gray-900 border border-green-300 rounded-lg bg-gray-50 text-xs focus:ring-green-500 focus:border-green-500">
                                    </div>
                                </div>

                                <div class="flex flex-col mt-4">
                                    <div v-for="(card, cardIndex) in category.cards" :key="cardIndex" class="flex items-center">
                                        <button type="button" class="ml-2 text-red-600" v-if="category.isEditing" @click="removeCard(index, cardIndex)">
                                            <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/>
                                            </svg>
                                        </button>
                                            
                                        <div class="flex-1 mx-1">
                                            <label for="name-input" class="block mb-2 text-sm font-medium text-gray-900">Name</label>
                                            <input type="text" v-model="card.name" :disabled="!category.isEditing" class="block w-full p-2 text-gray-900 border border-green-300 rounded-lg bg-gray-50 text-xs focus:ring-green-500 focus:border-green-500">
                                        </div>

                                        <div class="flex-1 mx-1">
                                            <label class="block mb-2 text-sm font-medium text-gray-900">Description</label>
                                            <div v-for="(desc, descIndex) in card.descriptions" :key="descIndex" class="flex items-center">
                                                <input type="text" v-model="desc.value" :disabled="!category.isEditing" class="block w-full p-2 mb-1 text-gray-900 border border-green-300 rounded-lg bg-gray-50 text-xs focus:ring-green-500 focus:border-green-500">
                                                <button class="ml-2 text-red-600" v-if="category.isEditing" @click="removeDescription(cardIndex, descIndex)">
                                                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM175 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z"/>
                                                    </svg>
                                                </button>
                                            </div>

                                            <button v-if="category.isEditing" @click="addDescriptionField(cardIndex)" type="button" class="mt-2 px-4 py-1 text-sm font-medium text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300">
                                                Add Description
                                            </button>
                                        </div>
                                    </div>

                                    <button v-if="category.isEditing" @click="addCardField(index)" type="button" class="mt-2 px-4 py-1 text-sm font-medium text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300">
                                        Add New Card
                                    </button>
                                        
                                </div>
                                <div class="flex mt-4" v-if="category.isEditing">
                                    <button type="submit" class="px-4 py-2 text-sm font-medium text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300">Save</button>
                                    <button @click="cancelEditCategory(index)" class="ml-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-300 rounded-lg hover:bg-gray-400 focus:ring-4 focus:outline-none focus:ring-gray-300">Cancel</button>
                                </div>
                            </div>
                        </form>
                        
                    </div>
                    
                    <div class="relative bg-white border border-gray-200 rounded-lg shadow p-4 flex items-center justify-center">
                        <button @click="addNewCategory" type="button" class="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded-lg hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300">
                            Add New Category
                        </button>
                    </div>
                </div>
            
        </div>
</template>

<script>
import axios from "axios";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default {
    data() {
        return {
            categories: [
                {
                    name: '',
                    isEditing: false,
                    cards: [
                        { name: '', descriptions: [{ value: '' }] },
                    ],
                },
            ],
            dropdownOpen: [],
            loading: false,
        };
    },
    methods: {
        toggleDropdown(index, event) {
            this.dropdownOpen[index] = !this.dropdownOpen[index];
            event.stopPropagation();
        },
        removeCategory(index) {
            this.categories.splice(index, 1);
            this.saveChanges(index);
        },
        enableEditCategory(index) {
            this.categories[index].isEditing = !this.categories[index].isEditing;
        },
        cancelEditCategory(index) {
            this.categories[index].isEditing = false;
        },
        clearCategoryFields(index) {
            this.categories[index].name = '';
            this.categories[index].cards = [{ name: '', descriptions: [{ value: '' }] }];
        },
        removeCard(categoryIndex, cardIndex) {
            this.categories[categoryIndex].cards.splice(cardIndex, 1);
        },
        addNewCategory() {
            this.categories.push({ name: '', cards: [{ name: '', description: '' }], isEditing: true });
            this.dropdownOpen.push(false);
            this.saveCategoriesToLocalStorage();  
        },
        saveCategoryChanges(index) {
            this.categories[index].isEditing = false;
            this.saveCategoriesToLocalStorage(); 
        },
        addCardField(categoryIndex) {
            this.categories[categoryIndex].cards.push({ name: '', descriptions: [{ value: '' }] });
        },
        removeDescription(cardIndex, descIndex) {
            this.categories.forEach((category) => {
                const card = category.cards[cardIndex];
                if (card) {
                    card.descriptions.splice(descIndex, 1);
                }
            });
        },
        addDescriptionField(cardIndex) {
            this.categories.forEach((category) => {
                if (category.isEditing) {
                    if (category.cards && category.cards[cardIndex]) {
                        const card = category.cards[cardIndex];

                        if (!card.descriptions) {
                            card.descriptions = []; 
                        }

                        card.descriptions.push({ value: '' });
                    } else {
                        console.error(`Card at index ${cardIndex} does not exist in category ${category.name}.`);
                    }
                }
            });
        },
        saveCategoriesToLocalStorage() {
            localStorage.setItem('categories', JSON.stringify(this.categories));
        },
        loadCategoriesFromLocalStorage() {
            const savedCategories = JSON.parse(localStorage.getItem('categories'));
            if (savedCategories) {
                this.categories = savedCategories;
                this.dropdownOpen = new Array(this.categories.length).fill(false);
            }
        },
        handleClickOutside(event) {
            this.dropdownOpen = this.dropdownOpen.map(() => false);
        },
        async saveChanges(index) {
            try {
                const cleanedCategories = this.categories.map(({ isEditing, cards, ...category }) => {
                    const cleanedCards = cards.map(({ name, descriptions }) => ({
                        name: name || '', 
                        descriptions: descriptions || '', 
                    }));
                    return {
                        ...category, 
                        cards: cleanedCards 
                    };
                });

                const payload = { categories: cleanedCategories };
                await axios.post('http://localhost:3000/api/save-director', payload);
               
                toastr.success('Saved');
                if (this.categories[index]) {
                    this.categories[index].isEditing = false;
                } 

            } catch (error) {
                console.error('Error saving data:', error);
            }
        },
        async fetchDirectorData() {
            this.loading = true;
            try {
                const response = await axios.get('http://localhost:3000/api/get-director'); // API endpoint to get director data
                const { categories } = response.data;  // Destructure categories from the response
                this.categories = categories;  // Assign the categories to the component's data
                this.dropdownOpen = new Array(this.categories.length).fill(false);  // Initialize dropdown states if needed
                this.loading = false; //
            } catch (error) {
                console.error('Error fetching data:', error);  // Handle errors
            }
        }


    },
    created() {
        this.loadCategoriesFromLocalStorage();
        this.fetchDirectorData();
    },
    mounted() {
        document.addEventListener('click', this.handleClickOutside);
    },
    beforeDestroy() {
        document.removeEventListener('click', this.handleClickOutside);
    }
};
</script>
