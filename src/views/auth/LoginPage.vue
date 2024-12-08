<template>    
    <div class="flex justify-center items-center h-screen">
        <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-xl sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form class="space-y-6" @submit.prevent="signInUser">
                <h5 class="text-xl font-medium text-gray-900 dark:text-white">Sign in</h5>
                <div class="relative">
                    <input type="text" v-model="email" 
                        @input="validateEmail"
                        id="small_outlined" 
                        :class="{'border-red-500': errors.email, 'border-green-500': success.email}"
                        class="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                    <label for="small_outlined" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-green-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                        Email
                    </label>
                    <p v-if="errors.email" class="text-red-500 text-xs -mb-3 mt-1 absolute">
                        {{ errors.email }}
                    </p>
                    <p v-if="success.email && !errors.email" class="text-green-500 text-xs mt-1"></p>
                </div>
                <div class="relative">
                    <input 
                        :type="showPassword ? 'text' : 'password'" 
                        v-model="password" 
                        @input="validatePassword"
                        id="small_outlined" 
                        :class="{'border-red-500': errors.password, 'border-green-500': success.password}"
                        class="block px-2.5 pb-1.5 pt-3 pr-10 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" 
                        placeholder=" " 
                    />
                    <label for="small_outlined" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-green-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                        Password
                    </label>
                    <p v-if="errors.password" class="text-red-500 text-xs -mb-3 mt-1 absolute">
                        {{ errors.password }}
                    </p>
                    <p v-if="success.password && !errors.password" class="text-green-500 text-xs mt-1"></p>

                    <!-- Button for toggling password visibility -->
                    <button 
                        type="button" 
                        @click="togglePasswordVisibility"
                        class="absolute inset-y-0 right-2 flex items-center justify-end text-xs -z-1 text-gray-500 dark:text-gray-400"
                    >
                        <span v-if="showPassword">hide</span>
                        <span v-else>show</span>
                    </button>
                </div>


               
                <button type="submit" class="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" :disabled="loading">
                    <span v-if="loading">
                        <svg class="animate-spin h-5 w-5 mr-3 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 1 1 16 0A8 8 0 0 1 4 12z"></path>
                        </svg>
                    </span>
                    <span v-else>
                        Login
                    </span>
                </button>
                <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Not registered? <router-link to="/register" class="text-green-700 hover:underline dark:text-blue-500">Create account</router-link>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import toastr from "toastr";

export default {
    name: "LoginPage",
    data() {
        return {
            email: '',
            password: '',
            message: '',
            username: '',
            errors: {
                username: null,
                email: null,
                password: null
            },
            success: {
                username: false,
                email: false,
                password: false
            },
            loading: false,  // Add a loading state
            showPassword: false,
        }
    },
    methods: {
        async signInUser() {
            this.errors.password = null;
            this.errors.email = null;
            this.loading = true; // Set loading to true when submitting

            try {
                const response = await axios.post('http://localhost:3000/api/login', {
                    email: this.email,
                    password: this.password,
                });

                const user = response.data.user;
                localStorage.setItem('user', JSON.stringify(user)); 
                localStorage.setItem('userEmail', this.email);

                if (!user.firstName || !user.lastName || !user.address || !user.phone || !user.dob) {
                    // Store email in localStorage
                    localStorage.setItem('userEmail', this.email);

                    // Display toastr warning message
                    toastr.warning('You are missing additional user data. Please complete your profile.', 'Missing Information', { timeOut: 3000 });

                    // Wait for 2 seconds before redirecting to UserDetails page
                    setTimeout(() => {
                        this.$router.push({ name: 'UserDetails' });
                    }, 2000); // Redirect after 2 seconds
                    return; // Stop further execution as we already redirected
                }


                // If the user has the required details, navigate accordingly
                if (user.role === 'admin') {
                    this.$router.push('/admin-dashboard');
                } else {
                    this.$router.push('/'); 
                }
            } catch (error) {
                if (error.response && error.response.status === 400) {
                    if (error.response.data.errors.email) {
                        this.errors.email = error.response.data.errors.email;
                    } else if (error.response.data.errors.password) {
                        this.errors.password = error.response.data.errors.password;
                    }
                } else {
                    this.errors.password = 'An unexpected error occurred. Please try again.';
                }
            } finally {
                this.loading = false; // Set loading to false once the process is complete
            }
        },
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        },
        async fetchSession() {
            try {
                const response = await axios.get('http://localhost:3000/api/check-session');
                if (response.data.loggedIn) {
                    this.$data.username = response.data.user.username; 
                }
            } catch (error) {
                console.error('Error fetching session:', error);
            }
        }
    }
}
</script>
