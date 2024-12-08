<template>

  <div class="flex">
    <SideBar />
    <div class="flex-1 p-2 sm:ml-64 bg-gray-50 min-h-screen">
      <div class="w-full mb-3 top-0 sticky z-10">
        <TopBar />
      </div>
      <div class="rounded-md shadow-md h p-1">
        <div class="h-full">
          <div class="container mx-auto p-4">
            <div class="mb-4">
              <ul class="flex space-x-4">
                <li>
                  <button class="py-1 px-4 text-white text-sm bg-green-600 rounded-md" :class="{ 'bg-blue-700': activeTab === 'unread' }" @click="activeTab = 'unread'">
                    Unread
                    <span v-if="unreadMessagesCount > 0" class="ml-2 text-xs bg-red-500 text-white rounded-full px-2">
                      {{ unreadMessagesCount }}
                    </span>
                  </button>
                </li>
                <li>
                  <button class="py-1 px-4 text-white text-sm bg-green-600 rounded-md" :class="{ 'bg-blue-700': activeTab === 'read' }" @click="activeTab = 'read'">
                      Read
                  </button>
                </li>
              </ul>
            </div>
      
            <div v-if="activeTab === 'unread'">
              <div v-for="message in unreadMessages" :key="message.id" class="bg-white border border-green-200 p-4 hover:bg-green-200 rounded-md shadow mb-2 cursor-pointer" @click="openMessage(message)">
                <p class="text-lg font-semibold">{{ message.email }}</p>
                <p class="text-sm text-gray-500">{{ calculateTimePassed(message.timestamp) }}</p>
              </div>
            </div>
      
            <div v-if="activeTab === 'read'">
              <div v-for="message in readMessages" :key="message.id" class="bg-green-100 p-4 border border-green-200 hover:bg-green-200 rounded-md shadow mb-2 cursor-pointer overflow-auto" @click="openMessage(message)">
                <p class="text-lg font-semibold text-green-200">{{ message.email }}</p>
                <p class="text-sm text-gray-500">{{ calculateTimePassed(message.timestamp) }}</p>
              </div>
            </div>
          </div>
      
          <div v-if="isModalOpen" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div class="bg-white p-6 rounded-lg w-96">
              <h2 class="text-xl font-semibold mb-4">Message Details</h2>
              <p class="text-lg">{{ selectedMessage.email }}</p>
              <p class="text-lg font-semibold">{{ selectedMessage.message }}</p>
              <p class="text-sm text-gray-500 mt-2">{{ calculateTimePassed(selectedMessage.timestamp) }}</p>
              <button @click="closeModal" class="mt-4 py-2 px-4 bg-red-600 text-white rounded hover:bg-red-700">
                  Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  </template>
  
  <script>
  import SideBar from '@/components/SideBar.vue';
  import TopBar from '@/components/TopBar.vue';
  import axios from 'axios';
  
  export default {
    components: {
        SideBar,
        TopBar,
    },
    data() {
      return {
        activeTab: 'unread', // default tab
        unreadMessages: [],
        readMessages: [],
        isModalOpen: false, // to control modal visibility
        selectedMessage: null, // to store the selected message
      };
    },
    computed: {
        unreadMessagesCount() {
            return this.unreadMessages.length;
        },
    },

    mounted() {
      this.fetchMessages();
    },
    methods: {
      async fetchMessages() {
        try {
          const response = await axios.get('https://backend-w85m.onrender.com/api/messages');
          const data = response.data;
          this.unreadMessages = data.unreadMessages;
          this.readMessages = data.readMessages;
        } catch (error) {
          console.error('Error fetching messages:', error);
        }
      },
      calculateTimePassed(timestamp) {
        const now = new Date();
        const timeDiff = now - new Date(timestamp);
        const seconds = Math.floor(timeDiff / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
  
        if (days > 0) return `${days} days ago`;
        if (hours > 0) return `${hours} hours ago`;
        if (minutes > 0) return `${minutes} minutes ago`;
        return `${seconds} seconds ago`;
      },
      openMessage(message) {
        // Open the modal and set the selected message
        this.selectedMessage = message;
        this.isModalOpen = true;
  
        // Only mark the message as read if it hasn't been marked as read yet
        if (!message.isRead) {
          this.markAsRead(message);
        }
      },
      async markAsRead(message) {
        try {
          // Send a PUT request to update the isRead status in the backend
          await axios.post(`https://backend-w85m.onrender.com/api/messages/${message.id}`, { isRead: true });
  
          // Update the message locally
          message.isRead = true;
  
          // Remove the message from unreadMessages and add it to readMessages
          this.unreadMessages = this.unreadMessages.filter(m => m.id !== message.id);
          this.readMessages.push(message);
        } catch (error) {
          console.error('Error marking message as read:', error);
        }
      },
      closeModal() {
        this.isModalOpen = false;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Additional styles for the modal */
  </style>
  