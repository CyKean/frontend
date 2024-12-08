<template>
  <div>
    <NavigationBar :loggedIn="loggedIn" :user="user" @logout="logout" />

    <div class="p-4 flex justify-center space-x-2">
      <div id="chart" class="chart border border-green-200 rounded-md"></div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import axios from "axios"; // If using Axios to fetch from Firebase
import * as go from "gojs"; // Import the GoJS library
import NavigationBar from "@/components/NavBar";
import Footer from "@/components/Footer.vue";

export default {
  name: "OrganizationalChart",
  components: { NavigationBar, Footer },
  data() {
    return {
      diagram: null, // Diagram instance
      nodeDataArray: [], // Chart data
    };
  },
  mounted() {
    this.fetchChartData(); // Fetch data on mount
    const savedData = localStorage.getItem("orgChartData");
    if (savedData) {
      this.nodeDataArray = JSON.parse(savedData);
    }

    this.$nextTick(() => {
      this.initializeDiagram();
    });
  },
  methods: {
    initializeDiagram() {
      const $ = go.GraphObject.make;

      const chartContainer = document.getElementById("chart");
      if (!chartContainer) {
        console.error("Chart container not found.");
        return;
      }

      this.diagram = $(go.Diagram, chartContainer, {
        layout: $(go.TreeLayout, {
          angle: 90,
          layerSpacing: 35,
        }),
        initialAutoScale: go.Diagram.UniformToFill,
        "undoManager.isEnabled": true,
        isReadOnly: true,
      });

      // Define the node template
      this.diagram.nodeTemplate = $(go.Node, "Auto", {
        movable: false, // Disable moving nodes
      },
      $(go.Shape, "RoundedRectangle", {
        stroke: null,
        portId: "",
        fromLinkable: true,
        toLinkable: true,
      },
      new go.Binding("fill", "color")),
      $(go.Panel, "Table", { margin: 5 },
        $(go.TextBlock, {
          row: 0,
          font: "bold 12pt sans-serif",
          margin: 2,
        }, new go.Binding("text", "name"), new go.Binding("stroke", "fontColor"))
      ));

      // Define the link template
      this.diagram.linkTemplate = $(go.Link,
        $(go.Shape, { strokeWidth: 2, stroke: "#000" }), // Link line
        $(go.Shape, { toArrow: "Standard" }) // Arrowhead
      );

      this.diagram.model = new go.TreeModel(this.nodeDataArray);
    },
    async fetchChartData() {
      try {
        const response = await axios.get("https://backend-w85m.onrender.com/api/get-chart");

        // If data is fetched, set it and store it in localStorage
        if (response.data && response.data.nodes) {
          const fetchedData = response.data.nodes;

          // Ensure each node has the parent field to build a hierarchical structure
          this.nodeDataArray = fetchedData.map((node, index) => {
            return {
              ...node,
              parent: index === 0 ? undefined : 1 // The first node (CEO) has no parent, others are children of node with key 1
            };
          });

          localStorage.setItem("orgChartData", JSON.stringify(this.nodeDataArray));

          this.diagram.model = new go.TreeModel(this.nodeDataArray);
        } else {
          console.error("No valid data found from the API.");
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    },
    show() {
      this.diagram.model = new go.TreeModel(this.nodeDataArray);
    },
  },
};
</script>

<style scoped>
.chart {
  width: 70rem;
  height: 600px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
}
</style>
