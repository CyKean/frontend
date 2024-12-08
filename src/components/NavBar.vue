<!-- <template>
    <nav class="bg-gray-800 border-gray-200 dark:bg-gray-900">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse text-white">
                <img src="../assets/logo.png" alt="GOVPH Logo" class="h-10 w-10">
                <div class="text-left ml-2">
                    <h6 class="text1">Republic of the Philippines</h6>
                    <h3 class="font-bold">Department of Agrarian Reform</h3>
                    <h4 class="text2">Kagawaran ng Repormang Pansakahan</h4>
                </div>
            </a>
            <div class="flex md:order-2">
                <li v-if="!isLoggedIn" class="text-white">
                        <router-link to="/login">Login</router-link>
                    </li>
                    <li v-if="isLoggedIn" class="relative group">
                    <button @click="logout" class="text-white font-bold hover:text-green-700">
                        Logout
                    </button>
                </li>
             
                <button data-collapse-toggle="navbar-search" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
            </div>
            
            <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-search">
                <div class="relative mt-3 md:hidden">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="text" id="search-navbar" class="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search...">
                </div>
                <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-800 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li class="mx-2"><router-link class="nav-link text-white hover:text-green-500 transition" to="/">Home</router-link></li>

                    <li class="relative group">
                        <a class="nav-link text-white hover:text-green-500 transition cursor-pointer">About<i class="fas fa-chevron-down ml-1 text-xs"></i></a>

                        <div class="absolute left-0 hidden group-hover:block md:ml-44 lg:-ml-24">
                            <ul class="absolute center hidden group-hover:flex flex-col bg-white text-black w-64 py-2 rounded shadow-lg z-10">
                                <li><router-link class="block px-2 py-1 hover:bg-green-500 hover:text-white text-base font-normal" to="/mission-vision-and-mandate">Mandate, Mission, and Vision</router-link></li>
                                <li><router-link class="block px-2 py-1 hover:bg-green-500 hover:text-white text-base font-normal" to="/leaders">DAR Leaders</router-link></li>
                                <li><router-link class="block px-2 py-1 hover:bg-green-500 hover:text-white text-base font-normal" to="/officials">Officials</router-link></li>
                                <li><router-link class="block px-2 py-1 hover:bg-green-500 hover:text-white text-base font-normal" to="/org-structure">Oranizational Structure</router-link></li>
                            </ul>
                        </div>
                    </li>

                    <li class="relative group">
                        <router-link class="nav-link text-white hover:text-green-500 transition cursor-pointer" to="/DAR-projects">Projects</router-link>

                    </li>

                    <li><router-link class="nav-link text-white hover:text-green-500 transition" to="/DAR-events">Events</router-link></li>

                    <li><router-link class="nav-link text-white hover:text-green-500 transition" to="/contact-us">Contact Us</router-link></li>
                   
                </ul>
            </div>
        </div>
    </nav>

    <div class="span bg-green-600"></div>
</template>
  
  <script>
  import Swal from 'sweetalert2';

  
  export default {
    name: "NavBar",
    data() {
        return {
        isLoggedIn: false,
        userId: null,
        username: null,
        };
    },
    methods: {
        async logout() {
            const result = await Swal.fire({
                title: 'Are you sure you want to logout?',
                text: "You will be redirected to the login page.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, logout!',
                cancelButtonText: 'Cancel'
            });

            if (result.isConfirmed) {
                localStorage.removeItem('user');
                this.isLoggedIn = false;
                this.userId = null;
                this.username = null;
                this.$router.push('/login');

                Swal.fire({
                    title: 'Logged out!',
                    text: 'You have been logged out successfully.',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                });
            }
        },
        checkUserSession() {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                this.isLoggedIn = true;
                this.userId = user.id; // Get user ID
                this.username = user.username; // Get username
            } else {
                this.isLoggedIn = false;
            }
        },
    },
    created() {
        this.checkUserSession();
    },
  };
  </script>
  
  <style scoped>
  @import "../assets/css/color.css";
  
  .span {
    height: 7px;
  }
  .text1 {
    font-size: 0.7em;
    margin-bottom: -8px;
  }
  .text2 {
    font-size: 0.9em;
    margin-top: -8px;
  }
  </style> -->

<template>
    <nav class="bg-gray-800 border-gray-200 dark:bg-gray-900">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse text-white">
                <img src="../assets/logo.png" alt="GOVPH Logo" class="h-10 w-10">
                <div class="text-left ml-2">
                    <h6 class="text1">Republic of the Philippines</h6>
                    <h3 class="font-bold">Department of Agrarian Reform</h3>
                    <h4 class="text2">Kagawaran ng Repormang Pansakahan</h4>
                </div>
            </a>
            <div class="flex md:order-2">
                <button @click="toggleMenu" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-search" aria-expanded="false">
                    <span class="sr-only">Open main menu</span>
                    <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
                    </svg>
                </button>
            </div>
            
            <div :class="{'hidden': !menuOpen, 'flex': menuOpen}" class="items-center justify-between w-full md:flex md:w-auto" id="navbar-search">
                <ul class="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-800 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 w-full md:w-auto">
                    <li class="mx-2"><router-link class="nav-link text-white hover:text-green-500 transition" to="/">Home</router-link></li>
                    <li class="relative group">
                        <a class="nav-link text-white hover:text-green-500 transition cursor-pointer">About<i class="fas fa-chevron-down ml-1 text-xs"></i></a>
                        <div class="absolute left-0 hidden group-hover:block md:ml-44 lg:-ml-24">
                            <ul class="absolute center hidden group-hover:flex flex-col bg-white text-black w-64 py-2 rounded shadow-lg z-10">
                                <li><router-link class="block px-2 py-1 hover:bg-green-500 hover:text-white text-base font-normal" to="/mission-vision-and-mandate">Mandate, Mission, and Vision</router-link></li>
                                <li><router-link class="block px-2 py-1 hover:bg-green-500 hover:text-white text-base font-normal" to="/leaders">DAR Leaders</router-link></li>
                                <li><router-link class="block px-2 py-1 hover:bg-green-500 hover:text-white text-base font-normal" to="/officials">Officials</router-link></li>
                                <li><router-link class="block px-2 py-1 hover:bg-green-500 hover:text-white text-base font-normal" to="/org-structure">Organizational Structure</router-link></li>
                            </ul>
                        </div>
                    </li>
                    <li><router-link class="nav-link text-white hover:text-green-500 transition" to="/DAR-projects">Projects</router-link></li>
                    <li><router-link class="nav-link text-white hover:text-green-500 transition" to="/DAR-events">Events</router-link></li>
                    <li><router-link class="nav-link text-white hover:text-green-500 transition" to="/contact-us">Contact Us</router-link></li>

                    <!-- Conditionally render the buttons based on user login status -->
                    <div class="hidden md:block">
                        <button v-if="isLoggedIn" @click="logout" class="text-white font-bold hover:text-green-700">Logout</button>
                        <router-link v-else to="/login">
                            <button class="text-white font-bold hover:text-green-700">Login</button>
                        </router-link>
                    </div>
                    <div class="md:hidden w-full">
                        <button v-if="isLoggedIn" @click="logout" class="text-white font-bold hover:text-green-700 w-full">Logout</button>
                        <router-link v-else to="/login">
                            <button class="text-white font-bold hover:text-green-700 w-full">Login</button>
                        </router-link>
                    </div>
                </ul>
            </div>
        </div>
    </nav>

    <div class="span bg-green-600"></div>
</template>


<script>
import Swal from 'sweetalert2';

export default {
    name: "NavBar",
    data() {
        return {
            isLoggedIn: false,
            userId: null,
            username: null,
            menuOpen: false, // State to manage mobile menu visibility
        };
    },
    methods: {
        async logout() {
            const result = await Swal.fire({
                title: 'Are you sure you want to logout?',
                text: "You will be redirected to the login page.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, logout!',
                cancelButtonText: 'Cancel'
            });

            if (result.isConfirmed) {
                localStorage.removeItem('user');
                this.isLoggedIn = false;
                this.userId = null;
                this.username = null;
                this.$router.push('/login');

                Swal.fire({
                    title: 'Logged out!',
                    text: 'You have been logged out successfully.',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                });
            }
        },
        checkUserSession() {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                this.isLoggedIn = true;
                this.userId = user.id; // Get user ID
                this.username = user.username; // Get username
            } else {
                this.isLoggedIn = false;
            }
        },
        toggleMenu() {
            this.menuOpen = !this.menuOpen; // Toggle mobile menu visibility
        },
    },
    created() {
        this.checkUserSession();
    },
};
</script>

<style scoped>
@import "../assets/css/color.css";

.span {
    height: 7px;
}
.text1 {
    font-size: 0.7em;
    margin-bottom: -8px;
}
.text2 {
    font-size: 0.9em;
    margin-top: -8px;
}
</style>