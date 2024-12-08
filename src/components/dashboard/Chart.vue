<template>
    <div class="bg-white border border-green-200 rounded-md p-6 mb-8">
      <div class="flex items-center justify-center h-full">
        <canvas id="projectChart" class="h-full"></canvas>
      </div>
    </div>
  </template>
<script>
import axios from 'axios';
import {
  Chart,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  LineController,
} from 'chart.js';

export default {
  name: 'Chart',
  data() {
    return {
      selectedStatus: '',
      projects: [],
      chartInstance: null,
    };
  },
  methods: {
    async fetchProjects() {
      try {
        const response = await axios.get('http://localhost:3000/api/get-project');
        this.projects = response.data;
        console.log(this.projects)
        this.updateChartData(this.projects);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
      }
    },

    updateChartData(filteredProjects) {
        const dateCounts = {
            pending: {},
            ongoing: {},
            finished: {},
        };

        // Calculate project counts based on their status and creation date
        filteredProjects.forEach((project) => {
            const date = project.createdAt?.slice(0, 10); // Extract the date (YYYY-MM-DD)
            if (!date) return; // Skip if no valid date

            if (!dateCounts[project.status]) dateCounts[project.status] = {};
            if (!dateCounts[project.status][date]) dateCounts[project.status][date] = 0;

            dateCounts[project.status][date]++;
        });

        // Gather all unique dates across statuses
        const allDates = Array.from(
            new Set([
            ...Object.keys(dateCounts.pending),
            ...Object.keys(dateCounts.ongoing),
            ...Object.keys(dateCounts.finished),
            ])
        ).sort(); // Sort dates in ascending order

        // Map data for each status, ensuring missing dates default to 0
        const pendingData = allDates.map((date) => dateCounts.pending[date] || 0);
        const ongoingData = allDates.map((date) => dateCounts.ongoing[date] || 0);
        const finishedData = allDates.map((date) => dateCounts.finished[date] || 0);

        if (this.chartInstance) {
            this.chartInstance.destroy(); // Destroy existing chart instance
        }

        // Create a new chart instance with the updated data
        this.chartInstance = new Chart(document.getElementById('projectChart'), {
            type: 'line',
            data: {
            labels: allDates, // Use all unique dates as labels
            datasets: [
                {
                label: 'Pending Projects',
                data: pendingData,
                borderColor: '#FF6347',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                fill: true,
                tension: 0.4,
                },
                {
                label: 'Ongoing Projects',
                data: ongoingData,
                borderColor: '#42A5F5',
                backgroundColor: 'rgba(66, 165, 245, 0.2)',
                fill: true,
                tension: 0.4,
                },
                {
                label: 'Finished Projects',
                data: finishedData,
                borderColor: '#32CD32',
                backgroundColor: 'rgba(50, 205, 50, 0.2)',
                fill: true,
                tension: 0.4,
                },
            ],
            },
            options: {
            responsive: true,
            plugins: {
                title: {
                display: true,
                text: 'Number of Projects Added Over Time',
                },
            },
            scales: {
                x: {
                type: 'category',
                title: {
                    display: true,
                    text: 'Date',
                },
                ticks: {
                    autoSkip: false, // Ensure all dates are displayed
                    maxRotation: 45,
                    minRotation: 45,
                },
                },
                y: {
                title: {
                    display: true,
                    text: 'Number of Projects',
                },
                },
            },
            },
        });
    },


    filterProjects() {
      const filteredProjects = this.selectedStatus
        ? this.projects.filter((project) => project.status === this.selectedStatus)
        : this.projects;
      this.updateChartData(filteredProjects);
    },
  },
  mounted() {
    // Register required Chart.js components
    Chart.register(
      Title,
      Tooltip,
      Legend,
      LineElement,
      PointElement,
      LinearScale,
      CategoryScale,
      LineController // Registering the "line" controller
    );
    this.fetchProjects();
  },
  watch: {
    selectedStatus(newStatus) {
      this.filterProjects();
    },
  },
};

</script>  