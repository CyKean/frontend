<template>
    <div class="flex justify-center items-center h-screen">
         <div class="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-xl sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
             <form class="space-y-6" @submit.prevent="createUser">
                 <h5 class="text-xl font-medium text-gray-900 dark:text-white">Sign up</h5>
                 
                 <div class="relative">
                    <input type="text" v-model="username"
                        @input="validateUsername" 
                        id="username_input" 
                        :disabled="isSubmitting"
                        :class="{'border-red-500': errors.username, 'border-green-500': success.username}"
                        class="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                    <label for="username_input" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-green-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                        Username
                    </label>
                    <p v-if="errors.username" class="text-red-500 text-xs -mb-3 mt-1 absolute">
                        {{ errors.username }}
                    </p>
                    <p v-if="success.username && !errors.username" class="text-green-500 text-xs mt-1"></p>
                </div>

                <div class="relative">
                    <input type="text" v-model="email" 
                        @input="validateEmail"
                        id="email_input" 
                        :disabled="isSubmitting"
                        :class="{'border-red-500': errors.email, 'border-green-500': success.email}"
                        class="block px-2.5 pb-1.5 pt-3 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " />
                    <label for="email_input" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-green-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
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
                        id="password_input" 
                        :disabled="isSubmitting"
                        :class="{'border-red-500': errors.password, 'border-green-500': success.password}"
                        class="block px-2.5 pb-1.5 pt-3 pr-10 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" 
                        placeholder=" " 
                    />
                    <label for="password_input" class="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-3 scale-75 top-1 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-green-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-3 start-1 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">
                        Password
                    </label>
                    <p v-if="errors.password" class="text-red-500 text-xs -mb-3 mt-1 absolute">
                        {{ errors.password }}
                    </p>
                    <p v-if="success.password && !errors.password" class="text-green-500 text-xs mt-1"></p>

                    <!-- Button for toggling password visibility (on the right side) -->
                    <button 
                        type="button" 
                        @click="togglePasswordVisibility"
                        class="absolute inset-y-0 right-2 flex items-center justify-end text-xs text-gray-500 dark:text-gray-400"
                    >
                        <span v-if="showPassword">hide</span>
                        <span v-else>show</span>
                    </button>
                </div>

 
                <button
                    type="submit"
                    :disabled="isSubmitting"
                    class="w-full text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex items-center justify-center"
                >
                    <span v-if="isSubmitting" class="loader"></span>
                    <span v-else>Create</span>
                </button>
                 <div class="text-sm font-medium text-gray-500 dark:text-gray-300">
                     Registered? <router-link to="/login" class="text-green-700 hover:underline dark:text-blue-500">Log in with my account</router-link>
                 </div>
             </form>

             <!-- <div class="google-signup">
                <button @click="signInWithGoogle" class="btn-google">Sign up with Google</button>
            </div> -->
         </div>
     </div>
 </template>
 
 <script>
 import axios from "axios";
 
 export default {
     name: "RegisterPage",
     data() {
         return {
             username: '',
             email: '',
             password: '',
             message: '',
             isSubmitting: false,
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
             showPassword: false,
         }
     },
     methods: {
         validateUsername() {
             if (this.username.length < 3) {
                 this.errors.username = "Username must be at least 3 characters";
                 this.success.username = false;
             } else {
                 this.errors.username = null;
                 this.success.username = true;
             }
         },
         async validateEmail() {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            this.errors.email = null;
            this.success.email = false;

            if (!emailPattern.test(this.email)) {
                this.errors.email = "Please enter a valid email address";
                return; 
            }

            try {
                const response = await this.checkEmailExists(this.email);
                if (response.exists) {
                    this.errors.email = "Email already exists"; 
                } else {
                    this.success.email = true; 
                }
            } catch (error) {
                console.error("Error checking email existence:", error);
                this.errors.email = "Error checking email";
            }
        },
        async checkEmailExists(email) {
            try {
                const response = await axios.post('http://localhost:3000/api/check-email', { email });
                return response.data;
            } catch (error) {
                console.error('Failed to check email existence:', error);
                throw new Error('Failed to check email existence');
            }
        },

         validatePassword() {
            const capitalLetter = /[A-Z]/;
            const number = /[0-9]/;
            const specialCharacter = /[!@#$%^&*(),.?":{}|<>]/;
            
            if (this.password.length < 6) {
                this.errors.password = "Password must be at least 6 characters";
                this.success.password = false;
            } else if (!capitalLetter.test(this.password)) {
                this.errors.password = "Password must contain at least one capital letter";
                this.success.password = false;
            } else if (!number.test(this.password)) {
                this.errors.password = "Password must contain at least one number";
                this.success.password = false;
            } else if (!specialCharacter.test(this.password)) {
                this.errors.password = "Password must contain at least one special character";
                this.success.password = false;
            } else {
                this.errors.password = null;
                this.success.password = true;
            }
        },
        async createUser() {
            this.validateUsername();
            this.validateEmail();
            this.validatePassword();
            this.isSubmitting = true;
            
            if (this.errors.username || this.errors.email || this.errors.password) {
                return;
            }

            try {
                const response = await axios.post('http://localhost:3000/api/createUser', {
                    username: this.username,
                    email: this.email,
                    password: this.password
                });

                // Store the email in localStorage
                localStorage.setItem('userEmail', this.email);

                // Redirect to Email Verification page
                this.$router.push({ name: 'EmailVerification' });

                this.message = response.data.message;
            } catch (error) {
                this.message = error.response.data.error || 'Failed to create user';
            }
            
            setTimeout(() => {
                this.isSubmitting = false;
            }, 2000);
        },
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        },

     }
 }
 </script>

 <style>
    .loader {
    border: 3px solid #f3f3f3;
    border-top: 3px solid #3498db;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    animation: spin 0.6s linear infinite;
    margin-right: 8px;
}
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}

</style>
 