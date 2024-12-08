<template>

  <div class="flex justify-between bg-gray-50 p-2 items-center mb-3 rounded-md sticky top-0">
    <div class="flex space-x-4 items-center">
      <input v-model="searchTerm" type="text" placeholder="Search news..."
        class="px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
        @input="filterNews"/>
      <button @click="openAddModal" class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-200 hover:text-green-900 transition">Add News</button>
    </div>
    <div class="flex space-x-2 items-center">
      <button @click="changePage(currentPage - 1)" :disabled="currentPage <= 1"
        class="px-2 py-2 text-xs text-white bg-green-500 rounded-l-md hover:bg-green-200 hover:text-green-900 transition disabled:opacity-50">Previous
      </button>
      <span class="text-green-700 text-sm">{{ currentPage }} of {{ totalPages }}</span>
      <button @click="changePage(currentPage + 1)" :disabled="currentPage >= totalPages"
        class="px-2 py-2 text-xs text-white bg-green-500 rounded-r-md hover:bg-green-200 hover:text-green-900 transition disabled:opacity-50">next
      </button>
    </div>
  </div>

  <div v-if="loading" class="text-center py-6 flex justify-center">
    <svg class="animate-spin h-8 w-8 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
      <path d="M4 12a8 8 0 0 0 16 0" stroke="currentColor" stroke-width="4" fill="none" />
    </svg>
  </div>

  <div v-if="!loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 p-2">
    <div v-for="newsItem in paginatedNews" :key="newsItem.id" class="border border-green-200 p-3 rounded-md shadow-sm hover:shadow-xl transition">
      <!-- <img :src="`http://localhost:3000/uploads/${newsItem.image}`" class="w-full h-40 object-cover rounded-lg mb-4"/> -->
      <div class="w-full h-40 mb-4">
        <img v-if="newsItem.image" :src="`https://backend-w85m.onrender.com/uploads/${newsItem.image}`" alt="News Image" class="w-full h-full object-cover rounded-lg" />
        <div v-else class="flex justify-center items-center w-full h-full bg-gray-200 rounded-lg"></div>
      </div>

      <h2 class="text-xl font-semibold text-green-800">{{ newsItem.title }}</h2>
      <p class="text-gray-400 text-xs mt-2">{{ newsItem.timeAgo }}</p>
      <div class="mt-4 flex space-x-4">
        <button @click="openEditModal(newsItem)" class="bg-yellow-400 text-white px-2 p-1 text-xs rounded-sm hover:bg-yellow-200 hover:text-yellow-900 transition">
          Edit
        </button>
        <button @click="openCommentsModal(newsItem)" class="bg-green-500 text-white px-2 text-xs rounded-sm hover:bg-green-200 hover:text-green-900 transition">
          View Comments
        </button>
      </div>
    </div>
  </div>

  <div v-if="isCommentsModalOpen" @click.self="closeCommentsModal"
    class="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50 w-full">
    <div class="bg-white p-8 rounded-md w overflow-auto shadow-lg py-2">

      <div class="flex items-center justify-between sticky top-0 mb-2">
        <h3 class="text-xl font-semibold text-gray-900 flex">
          Comments on "<h6 class="text-green-500">{{ currentNewsItem.title }}</h6>"
        </h3>
        <button @click="closeCommentsModal" class=" text-green-600 text-sm">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-7 h-7">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
          
      <div v-if="currentNewsItem.comments && currentNewsItem.comments.length > 0">
        <ul class="space-y-2">
          <li v-for="(comment, index) in currentNewsItem.comments" :key="index" class="p-2 px-5 bg-white bg-opacity-80 rounded-md shadow-sm border border-green-200">
            <div class="flex items-center space-x-2">
              <p class="font-semibold text-green-700">{{ comment.username }}</p>
            </div>
            <p class="mt-1 text-gray-600 text-left">{{ comment.comment }}</p>
          </li>
        </ul>
      </div>
          
      <div v-else>
        <p class="text-green-600">No comments available.</p>
      </div>
        
    </div>
  </div>

  <div v-if="showModal.newsModal" class="modal fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center overflow-auto">
    <div class="modal-content bg-white p-8 rounded-md w">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-semibold text-gray-800">{{ modalTitle }}</h2>
        <button @click.prevent="closeModal" class="text-green-400 hover:text-green-600 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form @submit.prevent="submitForm" class="form relative">
        <div class="flex flex-col">

          <div class="flex flex-row justify-between">
            <div>
              <label for="title" class="block text-sm font-medium text-gray-900">Title</label>
              <input v-model="title" type="text" id="title"
                class="block w-full p-2 mb-2 text-gray-900  border border-green-300 rounded-md bg-gray-50 text-sm focus:ring-green-500 focus:border-green-500"/>
              <label for="message" class="block text-sm font-medium text-gray-900">Your message</label>
              <div id="message-editor" class="border border-green-200 rounded-md bg-white" />
            </div>

            <div>
              <label for="user_avatar" class="block text-sm font-medium text-gray-900">Upload image</label>
              <input ref="fileInput" type="file"
                class="block w-full text-sm text-green-900 border border-green-300 rounded-lg cursor-pointer bg-green-50 focus:outline-none"
                aria-describedby="user_avatar_help" @change="previewImage"/>

              <div v-if="imagePreview" class="mt-4">
                <img :src="imagePreview"class="w-full h-48 object-contain rounded-md" />
              </div>
                
            </div>
            
            <button type="submit" class="absolute bottom-0 right-0 px-6 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none">
              Save
            </button>
            
          </div>

        </div>

      </form>
    </div>
  </div>

</template>

<script>
import axios from 'axios';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import toastr from 'toastr';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import SideBar from '@/components/SideBar.vue';

export default {
  components: {
    SideBar,
  },
  data() {
    return {
      loading: true,
      activeTab: 'news',
      isCommentsModalOpen: false, // Track if comments modal is open
      showModal: {
        newsModal: false,
      },
      modalTitle: 'Add News',
      title: '',
      message: '', // Used to store Quill editor content
      news: [],
      filteredNews: [],
      paginatedNews: [],
      searchTerm: '',
      editingNewsId: null,
      imagePreview: '',
      currentPage: 1,
      perPage: 8,
      totalPages: 1,
      quill: null, // Quill instance
    };
  },
  methods: {
    changeTab(tab) {
      this.activeTab = tab;
      if (tab === 'news') {
        this.getNews();
      }
    },
    openCommentsModal(newsItem) {
      this.currentNewsItem = newsItem;
      this.isCommentsModalOpen = true;
    },
    closeCommentsModal() {
      this.isCommentsModalOpen = false;
      this.currentNewsItem = null;
    },
    openAddModal() {
      this.modalTitle = 'Add News';
      this.title = '';
      this.message = '';
      this.imagePreview = '';
      this.editingNewsId = null;
      this.showModal.newsModal = true;
      this.$nextTick(() => {
        this.initQuill(); // Ensure Quill initializes after DOM is updated
      });
    },
    openEditModal(newsItem) {
      this.modalTitle = 'Edit News';
      this.title = newsItem.title;
      this.message = newsItem.message;
      this.imagePreview = `https://backend-w85m.onrender.com/uploads/${newsItem.image}`;
      this.editingNewsId = newsItem.id;
      this.showModal.newsModal = true;
      this.$nextTick(() => {
        this.initQuill(); // Ensure Quill initializes after DOM is updated
      });
    },
    closeModal() {
      this.showModal.newsModal = false;
      this.$nextTick(() => {
        this.destroyQuill(); // Destroy Quill when closing modal
      });
    },
    previewImage(event) {
      const file = event.target.files[0];
      if (file) {
        this.imagePreview = URL.createObjectURL(file);
      }
    },
    initQuill() {
      if (this.quill) {
        this.quill.root.innerHTML = this.message || ''; // Populate Quill editor with content
        return;
      }
      
      const editorElement = document.querySelector('#message-editor');
      if (editorElement) {
        this.quill = new Quill(editorElement, {
          theme: 'snow',
          placeholder: 'Write your message here...',
        });
        this.quill.root.innerHTML = this.message || ''; // Set initial content
      }
    },
    destroyQuill() {
      if (this.quill) {
        this.quill = null; // Destroy the existing Quill instance
      }
    },
    async submitForm() {
      this.message = this.quill.root.innerHTML; // Get content from Quill editor
      const formData = new FormData();
      formData.append('title', this.title);
      formData.append('message', this.message);

      if (this.$refs.fileInput.files.length > 0) {
        formData.append('image', this.$refs.fileInput.files[0]);
      }

      try {
        let response;
        if (this.editingNewsId) {
          const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to update this news!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!',
          });

          if (result.isConfirmed) {
            response = await axios.post(`https://backend-w85m.onrender.com/api/update-news/${this.editingNewsId}`, formData);
            Swal.fire('Updated!', 'Your news has been updated.', 'success');
          }
        } else {
          const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You are about to add this news!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, add it!',
          });

          if (result.isConfirmed) {
            response = await axios.post('https://backend-w85m.onrender.com/api/add-news', formData);
            Swal.fire('Added!', 'Your news has been added.', 'success');
          }
        }

        toastr.success('News saved successfully!');
        this.getNews();
        this.closeModal();
      } catch (error) {
        console.error('Error saving news:', error);
        toastr.error('An error occurred while saving the news.');
      }
    },
    async getNews() {
      try {
        this.loading = true; 
        const response = await axios.get('https://backend-w85m.onrender.com/api/get-news');
        this.news = response.data.data;
        this.filterNews();
      } catch (error) {
        toastr.error('Failed to load news.');
        console.error('Error fetching news:', error);
      } finally {
        this.loading = false; // Hide loader when data is fetched
      }
    },
    filterNews() {
      this.filteredNews = this.news.filter(newsItem =>
        newsItem.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        newsItem.message.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
      this.totalPages = Math.ceil(this.filteredNews.length / this.perPage);
      this.paginateNews();
    },
    paginateNews() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      this.paginatedNews = this.filteredNews.slice(start, end);
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
        this.paginateNews();
      }
    },
   
  },
  mounted() {
    this.getNews();
  },
};
</script>

<style>
.w{
  width: 50rem;
  height: 35rem;
}
.form{
  height: 28rem;
}
</style>