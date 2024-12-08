<template>
  <div class="w-full">
    <NavigationBar :loggedIn="loggedIn" :user="user" @logout="logout" />

    <div class=" grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-5 p-2">

      <section class="p-4 md:p-8 bg-white shadow-lg border border-green-200 rounded-lg text-center hs">
        <h2 class="font-bold text-green-300 text-lg mb-4">The Secretary</h2>
      
        <div class="flex justify-center">
          <img class="w-24 h-24 mb-3 rounded-full shadow-md shadow-green-200" :src="`http://localhost:3000/uploads/${secretary.image}`" alt="Leader Image" />
        </div>

        <div v-if="loading" class="text-center py-6 flex justify-center">
          <svg class="animate-spin h-8 w-8 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
            <path d="M4 12a8 8 0 0 0 16 0" stroke="currentColor" stroke-width="4" fill="none" />
          </svg>  
        </div>

        <p class="font-semibold">{{ secretary.name }}</p>
        <p class="text-gray-700">{{ secretary.shortInfo }}</p>
      </section>

      <section class="p-2 md:p-2 hn bg-white rounded-md border border-green-200 shadow-lg">
        <h2 class="font-bold text-lg mb-4 text-gray-800">Latest News</h2>

        <div v-if="loading" class="text-center py-6 flex justify-center">
          <svg class="animate-spin h-8 w-8 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
            <path d="M4 12a8 8 0 0 0 16 0" stroke="currentColor" stroke-width="4" fill="none" />
          </svg>  
        </div>
        
        <div :class="{ 'overflow-auto': showAllNews }" class="space-y-4 nh rounded-md">
          <div v-for="article in (showAllNews ? news : news.slice(0, 4))" :key="article.id" class="bg-white border border-green-200 flex shadow-lg rounded-lg p-4">
            <div class="flex flex-row items-start w-full space-x-4">
              <div class="flex items-center justify-center">
                <img v-if="article.image" class="w-24 h-24 rounded-md img shadow-md shadow-green-200" :src="`http://localhost:3000/uploads/${article.image}`" alt="Leader Image"/>
                <div v-else class="w-24 h-24 bg-gray-200 rounded-md"></div>
              </div>
              <div class="flex flex-col ml-4 w-full">
                <h3 class="font-semibold text-left text-green-600">{{ article.title }}</h3>
                <p class="text-gray-600 text-sm text-left" v-html="article.message"></p>
                <div class="flex flex-col items-center mt-2">
                  <p class="text-gray-500 text-xs">{{ formatDate(article.createdAt) }}</p>
                  <button @click="toggleCommentInput(article.id)" class="text-green-500 text-sm mt-2">
                    Add a comment
                  </button>
                  <div class="flex flex-col w-full mt-2">
                    <div v-if="article.showCommentInput" class="flex items-center space-x-2">
                      <textarea v-model="article.comment" placeholder="Write your comment..." class="w-full p-2 border rounded-md"></textarea>
                      <button @click="submitComment(article)" class="bg-green-500 text-white px-2 py-1 text-xs rounded-md">
                        Submit
                      </button>
                    </div>
                    <p v-if="article.commentWarning" class="text-red-500 text-sm mt-2">
                      Your comment contains offensive words. Please revise it.
                    </p>
                    <div v-if="article.showCommentInput && article.comments.length > 0" class="mt-4 w-full">
                      <h4 class="font-semibold text-green-700">Comments:</h4>
                      <div v-for="(comment, index) in article.comments" :key="index" class="mt-2 p-2 border border-green-200 rounded-md">
                        <p class="text-left"><strong>{{ comment.username }}:</strong> {{ comment.comment }}</p>
                        <p class="text-xs text-gray-500">{{ timeAgo(comment.timestamp) }}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-if="news.length > 4" class="mt-4 text-center">
          <button @click="showAllNews = !showAllNews" class="bg-green-500 text-white px-2 py-1 text-xs rounded-md">
            {{ showAllNews ? "Show Less" : "View All" }}
          </button>
        </div>
      </section>

      <section class="p-2 md:p-2 hn bg-white rounded-md border border-green-200 shadow-lg">
        <h2 class="font-bold text-lg mb-4 text-gray-800">Upcoming Events</h2>
          <div v-if="loading" class="text-center py-6 flex justify-center">
            <svg class="animate-spin h-8 w-8 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
              <path d="M4 12a8 8 0 0 0 16 0" stroke="currentColor" stroke-width="4" fill="none" />
            </svg>
          </div>

          <div class="overflow-auto p-2">
            <div v-for="event in upcomingEvents" :key="event.id" class="bg-green-50 p-2 rounded-lg shadow-md mb-6 transition-transform transform hover:scale-105">
              <div>
                <h3 class="font-semibold text-2xl text-left text-green-700 mb-2">{{ event.title }}</h3>
                <p class="text-gray-700 text-lg mb-1">{{ event.description }}</p>
                <p class="text-gray-600 text-md mb-2">{{ event.location }}</p>
                <p class="text-gray-500 text-sm">{{ event.date }} | {{ event.startTime }} - {{ event.endTime }}</p>
              </div>
            </div>
            <p v-if="upcomingEvents.length === 0" class="text-green-500 text-center text-lg">No upcoming events.</p>
          </div>
         
      </section>

    </div>
    <Footer/>
  </div>
</template>

<script>
import NavigationBar from "@/components/NavBar";
import Footer from "@/components/Footer.vue";
import axios from "axios";
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

export default {
  name: "HomePage",
  components: {
    Footer,
    NavigationBar,
  },
  data() {
    return {
      loggedIn: true,
      showAllNews: false, 
      user: {
        username: "",
        email: "",
      },
      secretary: {
        name: "",
        image: "",
        shortInfo: "",
      },
      news: [],
      events: [],
      loading: false,
      offensiveWords: [
        'badword1', 'badword2', 'curseword1', 'curseword2', 'salbahe', 'walanghiya'
      ]
    };
  },
  methods: {
    toggleCommentInput(articleId) {
      const article = this.news.find(item => item.id === articleId);
      article.showCommentInput = !article.showCommentInput;
      article.commentWarning = false; // Reset the warning when toggling visibility
    },
    
    containsOffensiveWords(text) {
      const words = text.toLowerCase().split(' ');
      return words.some(word => this.offensiveWords.includes(word));
    },
    
    async submitComment(article) {
      if (this.containsOffensiveWords(article.comment)) {
        article.commentWarning = true;
        return; // Don't proceed if the comment contains offensive words
      }

      const user = JSON.parse(localStorage.getItem('user'));
      if (!user) {
        toastr.error('User not logged in.');
        return; // If no user is logged in, prevent submitting the comment
      }

      try {
        const response = await axios.post(`/api/comments/${article.id}`, {
          comment: article.comment,
          userId: user.id, // Include user ID
          username: user.username, // Include username
        });

        console.log('Comment saved:', response.data);
        article.comment = '';  // Reset comment input
        article.commentWarning = false; // Reset warning
        toastr.success('Comment submitted successfully!'); // Display success message when comment is submitted successfully
        await this.fetchComments(article.id);
      } catch (error) {
        console.error('Error submitting comment:', error);
        toastr.error('Error submitting comment:', error);
      }
    },

  async fetchComments(articleId = null) {
    try {
      const response = await fetch("/api/data");
      const data = await response.json();

      if (articleId) {
        const updatedArticle = data.news.find((item) => item.id === articleId);
        const article = this.news.find((item) => item.id === articleId);

        if (article && updatedArticle) {
          article.comments = updatedArticle.comments || [];
          article.comments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)); // Ensure latest comments are at the top
        }
      } else {
        // Refresh all news
        this.news = data.news || [];
        this.news.forEach((article) => {
          article.comments = article.comments || []; // Ensure comments array exists
          article.showCommentInput = false; // Initially hide the comment input
        });
      }

      this.loading = false;
    } catch (error) {
      console.error("Error fetching data:", error);
      this.loading = false;
    }
  },

    async fetchData() {
      this.loading = true;
      try {
        const response = await fetch("/api/data");
        const data = await response.json();

        this.secretary = data.secretary || { name: "", image: "", shortInfo: "" };
        this.news = data.news || [];
        // this.events = data.events || [];

        this.news.forEach(article => {
          article.comments = article.comments || [];  // Ensure comments array exists
          article.showCommentInput = false;  // Initially hide the comment input
        });

        this.loading = false;
      } catch (error) {
        console.error("Error fetching data:", error);
        this.loading = false;
      }
    },
    async getEvents() {
      this.loading = true;
      try {
        const response = await axios.get('/api/events');
        this.events = response.data;
        this.loading = false;
      } catch (error) {
        console.error('Error fetching events:', error.response || error); // More detailed error logging
        toastr.error('Failed to get event data');
      }

    },
    formatDate(isoString) {
      if (!isoString) return "Unknown Date";
      const date = new Date(isoString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    },
    logout() {
      this.loggedIn = false;
      this.$router.push("/login");
    },
    checkUserSession() {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user) {
        this.isLoggedIn = true;
        this.userId = user.id;  // Get user ID
        this.username = user.username;  // Get username
      } else {
        this.isLoggedIn = false;
      }
    },
    timeAgo(timestamp) {
      if (!timestamp) {
        return "Unknown time"; // Handle missing timestamp
      }

      let timestampDate;

      // Check if timestamp is a Firestore timestamp object
      if (timestamp._seconds) {
        timestampDate = new Date(timestamp._seconds * 1000); // Convert seconds to milliseconds
      } else if (timestamp instanceof Date) {
        // Handle JavaScript Date objects
        timestampDate = timestamp;
      } else if (typeof timestamp === "number") {
        // Handle Unix timestamps in milliseconds
        timestampDate = new Date(timestamp);
      } else {
        return "Invalid time format"; // Handle unsupported formats
      }

      const now = new Date();
      const timeDifference = now - timestampDate;
      const seconds = Math.floor(timeDifference / 1000);
      const minutes = Math.floor(seconds / 60);
      const hours = Math.floor(minutes / 60);
      const days = Math.floor(hours / 24);

      if (days > 0) {
        return `${days} day${days > 1 ? 's' : ''} ago`;
      } else if (hours > 0) {
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
      } else if (minutes > 0) {
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
      } else {
        return `${seconds} second${seconds > 1 ? 's' : ''} ago`;
      }
    }
  },
  created() {
    this.fetchData();
    this.checkUserSession();
    this.getEvents();
  },
  computed: {
    upcomingEvents() {
      const today = new Date();
      return this.events.filter((event) => new Date(event.date) >= today);
    },
  }
};
</script>

<style scoped>
.hs{
  height: 27rem;
}
.hn{
  height: 45rem;
}
.nh{
  height: 36rem;
  overflow: auto;
}
.img{
  height: 100px;
  width: 146px;
}
.he{
  height: 40rem;
  overflow: auto;
}
</style>
