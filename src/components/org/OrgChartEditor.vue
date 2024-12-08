<template>
  <div
    class="org-chart-wrapper"
    @mousedown="startDrag"
    @mousemove="onDrag"
    @mouseup="endDrag"
    @mouseleave="endDrag"
  >
    <div class="zoom-controls">
      <button @click="zoomIn" class="zoom-btn">Zoom In</button>
      <button @click="zoomOut" class="zoom-btn">Zoom Out</button>
      <button
        @click="saveChart"
        class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mb-4"
      >
        Save Chart
      </button>
    </div>

    <div
      class="org-chart-container"
      ref="chartContainer"
      :style="chartStyle"
    >
      <OrgNode :node="rootNode" :level="0" :parent="null" @node-updated="saveChartToLocalStorage" />
      <!-- <OrgNode :node="rootNode" :level="0" :parent="null" /> -->

    </div>
  </div>
</template>

<script>
import axios from "axios";
import OrgNode from './OrgNode.vue';
import toastr from 'toastr';
import 'toastr/build/toastr.min.css';

export default {
  components: {
    OrgNode,
  },
  data() {
    return {
      rootNode: {
        id: 1,
        value: '',
        children: [],
      },
      scale: 1, // Zoom level (default 1)
      isDragging: false, // To track if dragging is in progress
      lastMousePosition: { x: 0, y: 0 }, // To store last mouse position
      translate: { x: 0, y: 0 }, // To store translation (panning offset)
    };
  },
  methods: {
    async saveChart() {
      try {
        const response = await axios.post('http://localhost:3000/api/save-chart', {
          chartData: this.rootNode,
        });
        console.log('Sending chart data:', {
          chartData: this.rootNode,
        });
        this.saveChartToLocalStorage();
        toastr.success('Saved')
        console.log('Chart saved successfully:', response.data);
      } catch (error) {
        alert('Error saving chart');
        console.error('Error saving chart data:', error);
      }
    },

    async getChart() {
      try {
        const response = await axios.get('http://localhost:3000/api/get-chart');
        console.log('Retrieving chart data:', response.data);

        this.rootNode = response.data.chartData || { id: 1, value: '', children: [] };  // Default if no data is provided
        this.scale = response.data.scale || 1;  // Default zoom scale if not provided
        this.translate = response.data.translate || { x: 0, y: 0 };  // Default translate position if not provided

        console.log('Chart data successfully retrieved and set.', this.rootNode);
      } catch (e) {
        alert('Error retrieving chart');
        console.error('Error retrieving chart data:', e);
      }
    },
    saveChartToLocalStorage() {
      localStorage.setItem('orgChart', JSON.stringify(this.rootNode));
      console.log('Chart saved to local storage:', this.rootNode);
    },

    loadChartFromLocalStorage() {
      const savedChart = localStorage.getItem('orgChart');
      console.log('Chart saved to local storage:', savedChart);
      if (savedChart) {
        this.rootNode = JSON.parse(savedChart);
        console.log('Loaded chart from local storage:', this.rootNode);
      }
    },

    zoomIn() {
      this.scale += 0.1;
    },

    zoomOut() {
      this.scale = Math.max(this.scale - 0.1, 0.5); // Prevent zooming out too much
    },

    startDrag(event) {
      this.isDragging = true;
      this.lastMousePosition = { x: event.clientX, y: event.clientY };
    },

    onDrag(event) {
      if (this.isDragging) {
        const deltaX = event.clientX - this.lastMousePosition.x;
        const deltaY = event.clientY - this.lastMousePosition.y;

        this.translate.x += deltaX;
        this.translate.y += deltaY;

        this.lastMousePosition = { x: event.clientX, y: event.clientY };
      }
    },

    endDrag() {
      this.isDragging = false;
    },
  },
  computed: {
    chartStyle() {
      return {
        transform: `scale(${this.scale}) translate(${this.translate.x}px, ${this.translate.y}px)`,
        transformOrigin: 'top left',
        transition: 'transform 0.1s ease-out',
      };
    },
  },
  mounted() {
    // this.getChart();  // Fetch the chart data when the component is mounted
    this.loadChartFromLocalStorage();
    // localStorage.removeItem('orgChart');

  }
};
</script>

<style scoped>
/* Wrapper to hold the chart and handle dragging and zooming */
.org-chart-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: grab;
}

/* Style for the zoom buttons */
.zoom-controls {
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 100;
}

.zoom-btn {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 8px 12px;
  margin: 5px;
  cursor: pointer;
}

.zoom-btn:hover {
  background-color: #45a049;
}

/* The organizational chart container that will be zoomed and dragged */
.org-chart-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform-origin: 0 0;
}
</style>
