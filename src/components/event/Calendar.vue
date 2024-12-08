<template>
  <div class="flex flex-col">

    <div class="flex">
      <button @click="openModal" class="px-4 py-2 mb-2 bg-green-500 text-white rounded-md hover:bg-green-600">
        Add Event
      </button>
    </div>

    <div class="flex space-x-4 mb-3">

      <div class="w-1/3 bg-green-100 h-80 p-4 rounded-md shadow-md overflow-auto">
        <h2 class="text-xl text-green-700 font-semibold mb-4">Upcoming Events</h2>

        <div class="h-60 overflow-auto rounded-md">
          <div v-if="loading" class="text-center py-6 flex justify-center">
            <svg class="animate-spin h-8 w-8 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
              <path d="M4 12a8 8 0 0 0 16 0" stroke="currentColor" stroke-width="4" fill="none" />
            </svg>
          </div>

          <div v-for="event in upcomingEvents" key="event.id" class="bg-white p-4 rounded-md shadow-sm mb-4">
            <h4 class="font-medium">{{ event.title }}</h4>
            <p>{{ event.date }} | {{ event.startTime }} - {{ event.endTime }}</p>
            <button @click="editEvent(event)" class="mt-2 text-green-500">Edit</button>
          </div>
          <p v-if="upcomingEvents.length === 0" class="text-green-500">No upcoming events.</p>
        </div>
        
      </div>

      <div class="w-1/3 bg-green-100 p-4 h-80 rounded-md shadow-md overflow-auto">
        <h2 class="text-xl font-semibold mb-4 text-green-700">Ongoing Events</h2>

        <div class="h-60 overflow-auto rounded-md">
          <div v-if="loading" class="text-center py-6 flex justify-center">
            <svg class="animate-spin h-8 w-8 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
              <path d="M4 12a8 8 0 0 0 16 0" stroke="currentColor" stroke-width="4" fill="none" />
            </svg>
          </div>

          <div v-for="event in ongoingEvents" :key="event.id" class="bg-green-100 p-4 rounded-md shadow-sm mb-4">
            <h4 class="font-medium">{{ event.title }}</h4>
            <p>{{ event.date }} | {{ event.startTime }} - {{ event.endTime }}</p>
          </div>
          <p v-if="ongoingEvents.length === 0" class="text-green-500">No ongoing events.</p>
        </div>

      </div>


      <div class="w-1/3 bg-green-100 p-4 h-80 rounded-md shadow-md">
        <h2 class="text-xl font-semibold mb-4 text-green-700">Past Events</h2>

        <div class="h-60 overflow-auto rounded-md">
          <div v-if="loading" class="text-center py-6 flex justify-center">
            <svg class="animate-spin h-8 w-8 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none" />
              <path d="M4 12a8 8 0 0 0 16 0" stroke="currentColor" stroke-width="4" fill="none" />
            </svg>
          </div>

          <div v-for="event in pastEvents" :key="event.id" class="bg-green-400 p-4 rounded-md shadow-sm mb-4">
            <h4 class="font-medium text-white">{{ event.title }}</h4>
            <p class="text-green-100">{{ event.date }} | {{ event.startTime }} - {{ event.endTime }}</p>
          </div>
          <p v-if="pastEvents.length === 0" class="text-gray-500">No past events.</p>
        </div>

      </div>

    </div>


    <div class="flex-1 bg-white p-4 rounded-md shadow-md border border-green-200">
      <h2 class="text-2xl text-center text-green-900 font-bold mb-4">Calendar</h2>
      <div class="flex justify-between items-center mb-4">
        <button @click="previousMonth" class="text-sm bg-green-200 text-green-700 p-1 px-2 rounded hover:bg-green-400 hover:text-green-100">
          Previous
        </button>
        <span class="font-semibold text-green-600 text-md">{{ monthName }} {{ currentDate.getFullYear() }}</span>
        <button @click="nextMonth" class="text-sm bg-green-200 text-green-700 p-1 px-2 rounded hover:bg-green-400 hover:text-green-100">
          Next
        </button>
      </div>

      <div class="grid grid-cols-7 gap-2 text-center">
        <div v-for="day in daysOfWeek" :key="day" class="font-bold text-green-700">{{ day }}</div>

        <div v-for="(day, index) in calendarDays" :key="index" class="p-4 border border-green-200 rounded cursor-pointer hover:bg-green-100 relative"
          :class="{
            'bg-green-400': isToday(day.date),
            'border-green-500': hasEvent(day.date),
            'bg-green-200': hasEvent(day.date),
            'bg-green-500 text-white': isToday(day.date),
          }"
          @click="openEventModal(day.date)">

          <span class="text-sm font-semibold">{{ day.date.getDate() }}</span>
          <div v-if="hasEvent(day.date)" class="text-xs text-green-100 rounded-md px-2 bg-green-500 p-1  absolute top-1 right-1">
            {{ getEventForDate(day.date) }}
          </div>
        </div>
      </div>
    </div>
  </div>

  <div v-if="isEventModalOpen" class="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
    <div class="bg-white rounded-lg shadow-lg p-6 w-96">
      <h2 class="text-xl font-semibold mb-4">Event Details</h2>
      <div v-if="eventDetails">
        <h3 class="font-medium text-lg">{{ eventDetails.title }}</h3>
        <p>{{ eventDetails.date }} | {{ eventDetails.startTime }} - {{ eventDetails.endTime }}</p>
        <p><strong>Description:</strong> {{ eventDetails.description }}</p>
        <p><strong>Location:</strong> {{ eventDetails.location }}</p>
        <p><strong>Category:</strong> {{ eventDetails.category }}</p>
        <p><strong>Type:</strong> {{ eventDetails.type }}</p>
        <div class="flex justify-between mt-4">
          <button @click="closeEventModal" class="w-1/2 p-2 bg-gray-300 text-gray-700 rounded">Close</button>
        </div>
      </div>
    </div>
  </div>

  <div v-if="isModalOpen" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div class="bg-white rounded-md shadow-md p-6 w">
      <div class="flex items-center justify-between">
        <h2 class="text-xl text-green-700 font-semibold mb-4">{{ editMode ? 'Edit' : 'Add' }} Event</h2>
        <button @click.prevent="closeModal" class="text-green-400 hover:text-green-600 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
     
      <form @submit.prevent="submitEvent">
        <div class="flex grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5 p-2">

          <div class="flex flex-col">
            <div>
              <label for="title" class="block text-lg text-left font-semibold text-green-900">Event Title</label>
              <input type="text" v-model="event.title" placeholder="Event Title" required class="block w-full p-2 mb-2 text-gray-900  border border-green-300 rounded-md bg-gray-50 text-sm focus:ring-green-500 focus:border-green-500" />
            </div>

            <div>
              <label for="title" class="block text-lg text-left font-semibold text-green-900">Description</label>
              <textarea v-model="event.description" placeholder="Event Description" required class="block w-full p-2 mb-2 text-gray-900  border border-green-300 rounded-md bg-gray-50 text-sm focus:ring-green-500 focus:border-green-500" />
            </div>

            <div>
              <label for="title" class="block text-lg text-left font-semibold text-green-900">Location</label>
              <input type="text" v-model="event.location" placeholder="Location" required class="block w-full p-2 mb-2 text-gray-900  border border-green-300 rounded-md bg-gray-50 text-sm focus:ring-green-500 focus:border-green-500" />
            </div>

          </div>

          <div class="flex flex-col">
            <div>
              <label for="title" class="block text-lg text-left font-semibold text-green-900">Event Type</label>
              <select v-model="event.type" required class="block w-full p-2 mb-2 text-gray-900  border border-green-300 rounded-md bg-gray-50 text-sm focus:ring-green-500 focus:border-green-500">
                <option disabled value="">Select Event Type</option>
                <option value="Workshop">Workshop</option>
                <option value="Seminar">Seminar</option>
                <option value="Distribution Event">Distribution Event</option>
                <option value="Meeting">Meeting</option>
              </select>
            </div>

            <div>
              <label for="title" class="block text-lg text-left font-semibold text-green-900">Category</label>
              <select v-model="event.category" required class="block w-full p-2 mb-2 text-gray-900  border border-green-300 rounded-md bg-gray-50 text-sm focus:ring-green-500 focus:border-green-500">
                <option disabled value="">Select Category</option>
                <option value="Land Reform">Land Reform</option>
                <option value="Agriculture Development">Agriculture Development</option>
                <option value="Training">Training</option>
              </select>
            </div>

            <div>
              <label for="title" class="block text-lg text-left font-semibold text-green-900">Date and Time</label>
              <input v-model="event.date" type="date" required class="block w-full p-2 mb-2 text-gray-900  border border-green-300 rounded-md bg-gray-50 text-sm focus:ring-green-500 focus:border-green-500" />
            <input v-model="event.startTime" type="time" required class="block w-full p-2 mb-2 text-gray-900  border border-green-300 rounded-md bg-gray-50 text-sm focus:ring-green-500 focus:border-green-500" />
            <input v-model="event.endTime" type="time" required class="block w-full p-2 mb-2 text-gray-900  border border-green-300 rounded-md bg-gray-50 text-sm focus:ring-green-500 focus:border-green-500" />
            </div>



          </div>

        </div>

        <div class="flex justify-end">
          <button type="submit" class="px-3 p-2 bg-green-500 hover:bg-green-600 text-white rounded-md">{{ editMode ? 'Update' : 'Add' }} Event</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import toastr from 'toastr';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default {
  data() {
    return {
      // upcomingEvents: [],
      // pastEvents: [],
      loading: true,
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
      isEventModalOpen: false,
      currentDate: new Date(),
      daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      calendarDays: [],
      monthName: '',
    };
  },
  mounted() {
    this.getEvents();
    this.generateCalendar();
  },
  computed: {
    ongoingEvents() {
      const now = new Date();
      return this.events.filter((event) => {
        const eventDate = new Date(event.date + ' ' + event.startTime);
        const eventEndDate = new Date(event.date + ' ' + event.endTime);
        return eventDate <= now && eventEndDate >= now;
      });
    },
    upcomingEvents() {
      const today = new Date();
      return this.events.filter((event) => new Date(event.date) >= today);
    },
    pastEvents() {
      const today = new Date();
      return this.events.filter((event) => new Date(event.date) < today);
    },
  },
  methods: {
    async getEvents() {
      this.loading = true;
      try {
        const response = await axios.get('http://localhost:3000/api/events');
        this.events = response.data;
        this.generateCalendar();
        this.loading = false;
      } catch (error) {
        console.error('Error fetching events:', error.response || error); // More detailed error logging
        toastr.error('Failed to get event data');
      }

    },
    async submitEvent() {
      console.log('Event data:', this.event); // Log event data for debugging
      try {
        if (this.editMode) {
          const confirmation = await Swal.fire({
            title: 'Are you sure?',
            text: "Do you want to update this event?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!',
          });

          if (confirmation.isConfirmed) {
            try {
              await axios.post(`http://localhost:3000/api/events/update/${this.eventId}`, this.event);
              toastr.success('Event updated successfully!');
            } catch (error) {
              console.error('Error updating event:', error.response || error);
              toastr.error('Failed to update event');
            }
          } else {
            toastr.info('Update canceled');
            return; // Exit if user cancels
          }
        } else {
          try {
            const response = await axios.post('http://localhost:3000/api/events/add', this.event);
            console.log('Event added successfully:', response.data); // Log the success response
            toastr.success('Event added successfully!');
          } catch (error) {
            console.error('Error adding event:', error.response || error);
            toastr.error('Failed to add event');
          }
        }

        this.resetForm();
        this.getEvents();
        this.closeModal();
      } catch (error) {
        console.error('Unexpected error:', error.response || error); // Detailed error logging
        toastr.error('An unexpected error occurred');
      }
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
    getEventForDate(date) {
      const event = this.events.find((ev) => new Date(ev.date).toDateString() === date.toDateString());
      return event ? event.title : '';
    },
    openEventModal(date) {
      const event = this.events.find((event) => new Date(event.date).toDateString() === date.toDateString());
      if (event) {
        this.eventDetails = event;
        this.isEventModalOpen = true;
      }
    },
    closeEventModal() {
      this.isEventModalOpen = false;
      this.eventDetails = null;
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
  },
};
</script>

<style scoped>
.w{
  width: 50rem;
  height: auto;
}
</style>
