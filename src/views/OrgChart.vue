<template>
  <div>
    <NavigationBar :loggedIn="loggedIn" :user="user" @logout="logout" />

    <div class="p-4 flex justify-center space-x-2">
      <div id="chart" class="chart border border-green-200 rounded-md"></div>
      <div>
        <button @click="show" class="bg-green-500 py-1 px-3 rounded-md text-green-100 hover:bg-green-400">Show Chart</button>
      </div>
     
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

      this.diagram = $(
        go.Diagram,
        chartContainer, // Reference to the div container
        {
          layout: $(
            go.TreeLayout,
            {
              angle: 90,
              layerSpacing: 35,
            }
          ),
          initialAutoScale: go.Diagram.UniformToFill,
          "undoManager.isEnabled": true,
          isReadOnly: true,
        }
      );

      this.diagram.nodeTemplate = $(
        go.Node,
        "Auto",
        {
          movable: false, // Disables moving nodes
        },
        $(
          go.Shape,
          "RoundedRectangle",
          {
            stroke: null,
            portId: "",
            fromLinkable: true,
            toLinkable: true,
          },
          new go.Binding("fill", "color")
        ),
        $(
          go.Panel,
          "Table",
          { margin: 5 },
          $(
            go.TextBlock,
            {
              row: 0,
              font: "bold 12pt sans-serif",
              margin: 2,
            },
            new go.Binding("text", "name"),
            new go.Binding("stroke", "fontColor")
          )
        )
      );

      this.diagram.linkTemplate = $(
        go.Link,
        $(
          go.Shape,
          { strokeWidth: 2, stroke: "#000" } // Link line
        ),
        $(
          go.Shape,
          { toArrow: "Standard" } // Arrowhead
        )
      );

      this.diagram.model = new go.TreeModel(this.nodeDataArray);
    },
    async fetchChartData() {
      try {
        const response = await axios.get("https://backend-w85m.onrender.com/api/get-chart");

        this.nodeDataArray = response.data || [];
        localStorage.setItem("orgChartData", JSON.stringify(this.nodeDataArray));

        this.diagram.model = new go.TreeModel(this.nodeDataArray);
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

<style>
.chart {
  width: 70rem;
  height: 600px;
  border: 1px solid #ccc;
  margin-bottom: 20px;
}
.wc{
  width: 30rem;
}
</style>
