<template>
         
   <button data-drawer-target="default-sidebar" data-drawer-toggle="default-sidebar" aria-controls="default-sidebar" type="button" class="flex p-2 mt-2 ms-3 text-sm text-green-500 rounded-lg sm:hidden hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
      <span class="sr-only">Open sidebar</span>
      <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
      <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
      </svg>
   </button>
   

   <aside id="default-sidebar" class="fixed top-0 p-2 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">

      <div class="h-full px-3 py-4 overflow-y-auto bg-green-500 rounded-md">
         <div class="flex justify-center items-center mb-4">
            <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse text-white">
               <img src="../assets/logo.png" alt="GOVPH Logo" class="h-10 w-10">
               <div class="text-left text-xs ml-2">
                  <h6 class="text1">Republic of the Philippines</h6>
                  <h6 class="font-bold text3">Department of Agrarian Reform</h6>
                  <h6 class="text2">Kagawaran ng Repormang Pansakahan</h6>
               </div>
            </a>
         </div>
         <ul class="space-y-2 font-medium">
            <li>
               <router-link to="/admin-dashboard"  class="flex items-center p-2 text-white rounded-lg group hover:bg-green-100 hover:text-green-900">
                  <svg class="w-5 h-5 text-white transition duration-75 group-hover:text-green-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                     <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                     <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                  </svg>
                  <span class="ms-3">Dashboard</span>
               </router-link>
            </li>

            <li>
               <router-link to="/announcement" class="flex items-center p-2 text-white rounded-lg group hover:bg-green-100 hover:text-green-900"
               :class="{'bg-green-100 text-green-900': activeLink === 'annoucement'}"
               @click="setActiveLink('annoucement')">
                  <svg class="flex-shrink-0 w-5 h-5 text-white transition duration-75 group-hover:text-green-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
                     <path d="M480 32c0-12.9-7.8-24.6-19.8-29.6s-25.7-2.2-34.9 6.9L381.7 53c-48 48-113.1 75-181 75l-8.7 0-32 0-96 0c-35.3 0-64 28.7-64 64l0 96c0 35.3 28.7 64 64 64l0 128c0 17.7 14.3 32 32 32l64 0c17.7 0 32-14.3 32-32l0-128 8.7 0c67.9 0 133 27 181 75l43.6 43.6c9.2 9.2 22.9 11.9 34.9 6.9s19.8-16.6 19.8-29.6l0-147.6c18.6-8.8 32-32.5 32-60.4s-13.4-51.6-32-60.4L480 32zm-64 76.7L416 240l0 131.3C357.2 317.8 280.5 288 200.7 288l-8.7 0 0-96 8.7 0c79.8 0 156.5-29.8 215.3-83.3z"/>
                  </svg>
                  <span class="ms-3">Announcement</span>
               </router-link>
            </li>
            <li>
               <router-link to="/projects" class="flex items-center p-2 text-white rounded-lg group hover:bg-green-100 hover:text-green-900">
                  <svg class="flex-shrink-0 w-5 h-5 text-white transition duration-75 group-hover:text-green-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor">
                     <path d="M48 0C21.5 0 0 21.5 0 48L0 464c0 26.5 21.5 48 48 48l96 0 0-80c0-26.5 21.5-48 48-48s48 21.5 48 48l0 80 96 0c26.5 0 48-21.5 48-48l0-416c0-26.5-21.5-48-48-48L48 0zM64 240c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zm112-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zM80 96l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zm80 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zM272 96l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16z"/>
                  </svg>
                  <span class="ms-3">Projects</span>
               </router-link>
            </li>

            <li>
               <router-link to="/events" class="flex items-center p-2 text-white rounded-lg group hover:bg-green-100 hover:text-green-900" fill="currentColor">
                  <svg class="flex-shrink-0 w-5 h-5 text-white transition duration-75 group-hover:text-green-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
                     <path d="M96 32l0 32L48 64C21.5 64 0 85.5 0 112l0 48 448 0 0-48c0-26.5-21.5-48-48-48l-48 0 0-32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 32L160 64l0-32c0-17.7-14.3-32-32-32S96 14.3 96 32zM448 192L0 192 0 464c0 26.5 21.5 48 48 48l352 0c26.5 0 48-21.5 48-48l0-272z"/>
                  </svg>
                  <span class="ms-3">Events</span>
               </router-link>
            </li>

            <li>
               <router-link to="/mandate-mission-and-vision" class="flex items-center p-2 text-white rounded-lg group hover:bg-green-100 hover:text-green-900">
                  <svg class="flex-shrink-0 w-5 h-5 text-white transition duration-75 group-hover:text-green-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor">
                     <path d="M0 80l0 48c0 17.7 14.3 32 32 32l16 0 48 0 0-80c0-26.5-21.5-48-48-48S0 53.5 0 80zM112 32c10 13.4 16 30 16 48l0 304c0 35.3 28.7 64 64 64s64-28.7 64-64l0-5.3c0-32.4 26.3-58.7 58.7-58.7L480 320l0-192c0-53-43-96-96-96L112 32zM464 480c61.9 0 112-50.1 112-112c0-8.8-7.2-16-16-16l-245.3 0c-14.7 0-26.7 11.9-26.7 26.7l0 5.3c0 53-43 96-96 96l176 0 96 0z"/>
                  </svg>
                  <span class="ms-3 text-sm text-left">Mandate, Mission & Vision</span>
               </router-link>
            </li>

            <li>
               <router-link to="/DAR-leaders" class="flex items-center p-2 text-white rounded-lg group hover:bg-green-100 hover:text-green-900">
                  <svg class="flex-shrink-0 w-5 h-5 text-white transition duration-75 group-hover:text-green-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor">
                     <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192l42.7 0c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0L21.3 320C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7l42.7 0C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3l-213.3 0zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352l117.3 0C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7l-330.7 0c-14.7 0-26.7-11.9-26.7-26.7z"/>
                  </svg>
                  <span class="ms-3">DAR Leaders</span>
               </router-link>
            </li>
            

            <li>
               <router-link to="/DAR-officials" class="flex items-center p-2 text-white rounded-lg group hover:bg-green-100 hover:text-green-900">
                  <svg class="flex-shrink-0 w-5 h-5 text-white transition duration-75 group-hover:text-green-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512" fill="currentColor">
                     <path d="M72 88a56 56 0 1 1 112 0A56 56 0 1 1 72 88zM64 245.7C54 256.9 48 271.8 48 288s6 31.1 16 42.3l0-84.7zm144.4-49.3C178.7 222.7 160 261.2 160 304c0 34.3 12 65.8 32 90.5l0 21.5c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-26.8C26.2 371.2 0 332.7 0 288c0-61.9 50.1-112 112-112l32 0c24 0 46.2 7.5 64.4 20.3zM448 416l0-21.5c20-24.7 32-56.2 32-90.5c0-42.8-18.7-81.3-48.4-107.7C449.8 183.5 472 176 496 176l32 0c61.9 0 112 50.1 112 112c0 44.7-26.2 83.2-64 101.2l0 26.8c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32zm8-328a56 56 0 1 1 112 0A56 56 0 1 1 456 88zM576 245.7l0 84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM320 32a64 64 0 1 1 0 128 64 64 0 1 1 0-128zM240 304c0 16.2 6 31 16 42.3l0-84.7c-10 11.3-16 26.1-16 42.3zm144-42.3l0 84.7c10-11.3 16-26.1 16-42.3s-6-31.1-16-42.3zM448 304c0 44.7-26.2 83.2-64 101.2l0 42.8c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32l0-42.8c-37.8-18-64-56.5-64-101.2c0-61.9 50.1-112 112-112l32 0c61.9 0 112 50.1 112 112z"/>
                  </svg>
                  <span class="ms-3">DAR Officials</span>
               </router-link>
            </li>

            <li>
               <router-link to="/organizational-structure" class="flex items-center p-2 text-white rounded-lg group hover:bg-green-100 hover:text-green-900">
                  <svg class="flex-shrink-0 w-5 h-5 text-white transition duration-75 group-hover:text-green-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill="currentColor">
                     <path d="M208 80c0-26.5 21.5-48 48-48l64 0c26.5 0 48 21.5 48 48l0 64c0 26.5-21.5 48-48 48l-8 0 0 40 152 0c30.9 0 56 25.1 56 56l0 32 8 0c26.5 0 48 21.5 48 48l0 64c0 26.5-21.5 48-48 48l-64 0c-26.5 0-48-21.5-48-48l0-64c0-26.5 21.5-48 48-48l8 0 0-32c0-4.4-3.6-8-8-8l-152 0 0 40 8 0c26.5 0 48 21.5 48 48l0 64c0 26.5-21.5 48-48 48l-64 0c-26.5 0-48-21.5-48-48l0-64c0-26.5 21.5-48 48-48l8 0 0-40-152 0c-4.4 0-8 3.6-8 8l0 32 8 0c26.5 0 48 21.5 48 48l0 64c0 26.5-21.5 48-48 48l-64 0c-26.5 0-48-21.5-48-48l0-64c0-26.5 21.5-48 48-48l8 0 0-32c0-30.9 25.1-56 56-56l152 0 0-40-8 0c-26.5 0-48-21.5-48-48l0-64z"/>
                  </svg>
                  <span class="ms-3 text-left">Organizational Structure</span>
               </router-link>
            </li>

            <li>
               <router-link to="/messages" class="flex items-center p-2 text-white rounded-lg group hover:bg-green-100 hover:text-green-900">
                  <svg  class="flex-shrink-0 w-5 h-5 text-white transition duration-75 group-hover:text-green-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
                     <path d="M512 240c0 114.9-114.6 208-256 208c-37.1 0-72.3-6.4-104.1-17.9c-11.9 8.7-31.3 20.6-54.3 30.6C73.6 471.1 44.7 480 16 480c-6.5 0-12.3-3.9-14.8-9.9c-2.5-6-1.1-12.8 3.4-17.4c0 0 0 0 0 0s0 0 0 0s0 0 0 0c0 0 0 0 0 0l.3-.3c.3-.3 .7-.7 1.3-1.4c1.1-1.2 2.8-3.1 4.9-5.7c4.1-5 9.6-12.4 15.2-21.6c10-16.6 19.5-38.4 21.4-62.9C17.7 326.8 0 285.1 0 240C0 125.1 114.6 32 256 32s256 93.1 256 208z"/>
                  </svg>
                  <span class="ms-3">Comments & Feedback</span>
               </router-link>
            </li>
            <li v-if="isLoggedIn">
               <button @click="logout" class="flex items-center p-2 text-white rounded-lg group hover:bg-green-100 hover:text-green-900 w-full">
                  <svg class="flex-shrink-0 w-5 h-5 text-white transition duration-75 group-hover:text-green-900 dark:text-gray-400 dark:group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"  fill="currentColor">
                     <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"/>
                  </svg>
                  <span class="ms-3">Logout</span>
               </button>
            </li>
          
         </ul>
      </div>
   </aside>

</template>

<script>
 import Swal from 'sweetalert2';
export default {
    name: 'SideBar',
    data() {
      return {
         isLoggedIn: false,
         isDropdownOpen: false,
         activeLink: 'dashboard', 
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
      toggleDropdown() {
         this.isDropdownOpen = !this.isDropdownOpen; 
      },
      setActiveLink(link) {
         this.activeLink = link;
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
}
</script>

<style>
  .text1{
   font-size:10px;
   margin-bottom: -4px;
  }
  .text2{
   font-size: 9px;
   margin-top: -4px;
  }
  .text3{
   font-size: 10px;
   }
</style>