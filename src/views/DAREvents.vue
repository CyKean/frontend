<template>
  <NavBar />
  <div class="flex flex-col md:flex-row p-4 space-x-0 md:space-x-4">

      <div class="flex-1 bg-white p-4 border border-green-200 rounded-md shadow-md mb-4 md:mb-0">
          <h2 class="text-xl font-semibold mb-4 text-green-700">Upcoming and Passed Events</h2>

          <div v-if="loading" class="text-center py-6 flex justify-center">
              <svg class="animate-spin h-8 w-8 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
                  <path d="M4 12a8 8 0 0 0 16 0" stroke="currentColor" stroke-width="4" fill="none" />
              </svg>
          </div>

          <div class="el rounded-md overflow-auto">
              <div v-for="(event, index) in visibleEvents" :key="event.id" class="border rounded-md border-green-100 py-2">
                  <p class="font-semibold">{{ event.title }}</p>
                  <p class="text-sm text-gray-600">{{ formatEventDate(event.date) }}</p>
                  <p class="text-sm text-gray-500">
                      Status:
                      <span :class="isEventPassed(event.date) ? 'text-red-500' : 'text-green-500'">
                          {{ isEventPassed(event.date) ? 'Passed' : 'Upcoming' }}
                      </span>
                  </p>
              </div>
          </div>
          <div v-if="events.length > 4" class="text-center mt-4">
              <button 
                  @click="toggleShowAll" 
                  class="bg-green-500 text-white px-2 py-1 rounded-md text-xs hover:bg-green-600">
                  {{ showAll ? 'Show Less' : 'Show All' }}
              </button>
          </div>
      </div>

      <div class="flex-1 bg-white p-4 rounded-md border border-green-200 shadow-md">
          <h2 class="text-xl font-bold mb-4 text-green-700">Calendar</h2>

          <div class="flex justify-between items-center mb-4">
              <button @click="previousMonth" class="bg-green-300 text-green-700 text-xs p-2 rounded-md hover:bg-green-400">
                  Previous
              </button>
              <span class="font-semibold text-lg text-green-600">{{ monthName }} {{ currentDate.getFullYear() }}</span>
              <button @click="nextMonth" class="bg-green-300 text-green-700 text-xs p-2 rounded-md hover:bg-green-400">
                  Next
              </button>
          </div>

          <div class="grid grid-cols-7 gap-2 text-center">
              <div v-for="day in daysOfWeek" :key="day" class="font-bold text-green-600">{{ day }}</div>

              <div
                  v-for="(day, index) in calendarDays"
                  :key="index"
                  class="p-4 border border-green-200 rounded cursor-pointer hover:bg-gray-100 relative"
                  :class="{
                      'bg-green-100': isToday(day.date),
                      'border-green-500': hasEvent(day.date),
                      'bg-green-200': hasEvent(day.date),
                      'bg-green-500 text-white': isToday(day.date),
                  }"
                  @click="openEvent(day.date)"
              >
                  <span class="text-sm">{{ day.date.getDate() }}</span>

                  <div v-if="hasEvent(day.date)" class="text-xs mt-2">
                      <ul>
                          <li v-for="event in getEventsForDate(day.date)" :key="event.id">
                              <div class="text-xs text-white bg-green-600 rounded-md p-1 mt-1">
                                  {{ event.title }}
                              </div>
                          </li>
                      </ul>
                  </div>
              </div>
          </div>

          <div v-if="isEventDetailsModalOpen" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
              <div class="bg-white rounded-md shadow-lg p-6 w-11/12 md:w-96">
                  <h2 class="text-xl font-semibold mb-4 text-green-600">Events on {{ selectedDate }}</h2>
                  <div v-for="event in selectedEvents" :key="event.id" class="mb-4 text-left pb-2">
                      <p><strong class="mr-2">Title:</strong> {{ event.title }}</p>
                      <p><strong class="mr-2">Description:</strong> {{ event.description }}</p>
                      <p><strong class="mr-2">Time:</strong> {{ event.startTime }} - {{ event.endTime }}</p>
                      <p><strong class="mr-2">Location:</strong> {{ event.location }}</p>
                      <p><strong class="mr-2">Type:</strong> {{ event.type }}</p>
                      <p><strong class="mr-2">Category:</strong> {{ event.category }}</p>
                  </div>
                  <div class="flex justify-end mt-4">
                      <button @click="closeEventDetailsModal" class="bg-gray-300 text-gray-700 px-2 text-xs py-1 rounded">Close</button>
                  </div>
              </div>
          </div>
      </div>
  </div>

  <Footer />
</template>
  
  <script>
  import axios from 'axios';
  import NavBar from '@/components/NavBar.vue';
  import Footer from '@/components/Footer.vue';
  
  export default {
    components: {
        NavBar,
        Footer,
    },
    data() {
      return {
        events: [],
        event: {
          title: '',
          description: '',
          type: '',
          category: '',
          date: '',
          startTime: '',
          endTime: '',
          location: '',
        },
        editMode: false,
        eventId: null,
        isModalOpen: false,
        currentDate: new Date(),
        daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        calendarDays: [],
        monthName: '',
        loading: false,
        selectedEvents: [],
        selectedDate: '',
        isEventDetailsModalOpen: false,
        showAll: false,
      };
    },
    mounted() {
      this.getEvents();
      this.generateCalendar();
    },
    computed: {
      visibleEvents() {
        return this.showAll ? this.events : this.events.slice(0, 4);
      },
    },
    methods: {
      async getEvents() {
        this.loading = true;
        const response = await axios.get('http://localhost:3000/api/events');
        this.events = response.data;
        this.generateCalendar();
        this.loading = false;
      },
      async submitEvent() {
        if (this.editMode) {
          await axios.post(`http://localhost:3000/api/events/update/${this.eventId}`, this.event);
        } else {
          await axios.post('http://localhost:3000/api/events/add', this.event);
        }
        this.resetForm();
        this.getEvents();
        this.closeModal();
      },
      editEvent(ev) {
        this.editMode = true;
        this.eventId = ev.id;
        this.event = { ...ev };
        this.openModal();
      },
      resetForm() {
        this.event = {
          title: '',
          description: '',
          type: '',
          category: '',
          date: '',
          startTime: '',
          endTime: '',
          location: '',
        };
        this.editMode = false;
        this.eventId = null;
      },
      generateCalendar() {
        const currentMonth = this.currentDate.getMonth();
        const firstDay = new Date(this.currentDate.getFullYear(), currentMonth, 1);
        const lastDay = new Date(this.currentDate.getFullYear(), currentMonth + 1, 0);
  
        const days = [];
        for (let i = 1; i <= lastDay.getDate(); i++) {
          days.push(new Date(this.currentDate.getFullYear(), currentMonth, i));
        }
  
        this.monthName = this.currentDate.toLocaleString('default', { month: 'long' });
  
        this.calendarDays = days.map((date) => ({
          date,
        }));
      },
      isToday(date) {
        const today = new Date();
        return date.getDate() === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear();
      },
      hasEvent(date) {
        return this.events.some((ev) => new Date(ev.date).toDateString() === date.toDateString());
      },
      getEventsForDate(date) {
        return this.events.filter((ev) => new Date(ev.date).toDateString() === date.toDateString());
      },
      openEvent(date) {
        const events = this.getEventsForDate(date);
        if (events.length > 0) {
          this.selectedEvents = events;
          this.selectedDate = date.toDateString();
          this.isEventDetailsModalOpen = true;
        }
      },
      closeEventDetailsModal() {
        this.isEventDetailsModalOpen = false;
        this.selectedEvents = [];
        this.selectedDate = '';
      },
      previousMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() - 1);
        this.generateCalendar();
      },
      nextMonth() {
        this.currentDate.setMonth(this.currentDate.getMonth() + 1);
        this.generateCalendar();
      },
      openModal() {
        this.isModalOpen = true;
      },
      closeModal() {
        this.isModalOpen = false;
      },
      isUpcoming(date) {
        const today = new Date();
        const eventDate = new Date(date);
        return eventDate >= today;
      },
      isPassed(date) {
        const today = new Date();
        const eventDate = new Date(date);
        return eventDate < today;
      },
      toggleShowAll() {
        this.showAll = !this.showAll;
      },
      formatEventDate(date) {
        return new Date(date).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        });
      },
      isEventPassed(eventDate) {
        return new Date(eventDate) < new Date();
      },
      
    },
  };
  </script>
  
  <style scoped>
  .eh{
    height: 29rem;
    width: 30rem;
  }
  .el{
    height: 23rem;
  }
  </style>
  