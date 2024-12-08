<template>
  <div class="container">
    <div class="button-group">
      <button @click="addRootNode" class="bg-yellow-200">Add Initial Node</button>
      <button @click="logChartData" class="bg-green-500 text-green-100">Save Chart</button>
    </div>

    <!-- Chart container -->
    <div id="chartDiv" class="chart rounded-md border border-green-200" style="width: 100%; height: 500px;"></div>

    <!-- Modal for editing node -->
    <div v-if="isModalVisible" class="modal-overlay z-10" @click.self="closeModal">
      <div class="modal">
        <h3>Edit Node</h3>
        <label for="name">Name:</label>
        <input id="name" v-model="editNodeData.name" placeholder="Enter name" />
        <label for="bgColor">Background Color:</label>
        <input id="bgColor" type="color" v-model="editNodeData.color" />
        <label for="fontColor">Font Color:</label>
        <input id="fontColor" type="color" v-model="editNodeData.fontColor" />
        <div class="modal-buttons">
          <button @click="saveEditNode" class="btn-primary">Save</button>
          <button @click="closeModal" class="btn-secondary">Cancel</button>
        </div>
      </div>
    </div>

    <vue-toastr ref="toastr" />
  </div>
</template>

<script>
import * as go from "gojs";
import toastr from "toastr";
import axios from "axios";

export default {
  data() {
    return {
      diagram: null,
      nodeDataArray: [],
      rootNodeKey: 1,
      selectedNode: null,
      isModalVisible: false,
      editNodeData: { name: "", color: "#FFFFFF", fontColor: "#000000" },
    };
  },

  mounted() {
    // Initialize GoJS Diagram
    this.diagram = go.GraphObject.make(go.Diagram, "chartDiv", {
      layout: go.GraphObject.make(go.TreeLayout, {
        angle: 90,
        layerSpacing: 35,
      }),
      initialAutoScale: go.Diagram.UniformToFill,
      "undoManager.isEnabled": true,
      "click": (e) => this.handleDiagramClick(e),
    });

    // Define the node template
    this.diagram.nodeTemplate = go.GraphObject.make(
      go.Node,
      "Auto",
      go.GraphObject.make(go.Shape, "RoundedRectangle", {
        stroke: null,
        portId: "",
        fromLinkable: true,
        toLinkable: true,
      }, new go.Binding("fill", "color")),
      go.GraphObject.make(
        go.Panel,
        "Table",
        { margin: 5 },
        go.GraphObject.make(go.TextBlock, {
          row: 0,
          font: "bold 12pt sans-serif",
          margin: 2,
        }, new go.Binding("text", "name"),
          new go.Binding("stroke", "fontColor"))
      ),
      {
        contextMenu: this.makeContextMenu(),
        click: (e, node) => this.handleNodeClick(node),
      }
    );

    // Define the link template
    this.diagram.linkTemplate = go.GraphObject.make(go.Link,
      go.GraphObject.make(go.Shape, { strokeWidth: 2, stroke: "#000" }),
      go.GraphObject.make(go.Shape, { toArrow: "Standard" })
    );

    // Fetch chart data after the component is mounted
    this.fetchChartData();
    this.show();
  },

  methods: {
    // Fetch chart data from the API
    async fetchChartData() {
      try {
        const response = await axios.get("https://backend-w85m.onrender.com/api/get-chart");
        
        if (response.data && response.data.nodes) {
          const fetchedData = response.data.nodes;
          
          this.nodeDataArray = fetchedData.map((node, index) => ({
            ...node,
            parent: index === 0 ? undefined : 1  // First node has no parent, others are children of node 1
          }));

          console.log(this.nodeDataArray);

          // Save to local storage
          localStorage.setItem("orgChartData", JSON.stringify(this.nodeDataArray));

          // Set the model with the fetched data
          this.diagram.model = new go.TreeModel(this.nodeDataArray);
        } else {
          console.error("No valid data found from the API.");
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    },

    show(){
      this.diagram.model = new go.TreeModel(this.nodeDataArray);
    },

    // Add the root node (CEO)
    addRootNode() {
      if (this.nodeDataArray.length > 0) {
        toastr.warning("Root node already exists.");
        return;
      }
      const rootNode = {
        key: this.rootNodeKey,
        name: "CEO",
        color: "lightblue",
        fontColor: "#000000",
      };
      this.nodeDataArray.push(rootNode);
      this.updateChart();
      toastr.success("Root node added successfully.");
    },

    // Add a new node under a parent node
    addNode(parentNodeData) {
      const newKey = this.nodeDataArray.length + 1;
      const newNode = {
        key: newKey,
        parent: parentNodeData ? parentNodeData.key : null,  // Link to the parent if available
        name: `New Node ${newKey}`,
        color: "lightblue",
        fontColor: "#000000",
      };
      this.nodeDataArray.push(newNode);
      this.updateChart();
      toastr.success("Node added successfully.");
    },

    // Update the chart with the latest data
    updateChart() {
      const model = new go.TreeModel(this.nodeDataArray);
      this.diagram.model = model;
    },

    // Log and save chart data
    logChartData() {
      console.log("Current Chart Data:", this.nodeDataArray);
      localStorage.setItem("orgChartData", JSON.stringify(this.nodeDataArray));
      axios.post('https://backend-w85m.onrender.com/api/save-chart', this.nodeDataArray)
        .then(response => {
          toastr.success(response.data.message);
        })
        .catch(error => {
          toastr.error("Failed to save chart data.");
        });
    },

    // Edit a node
    editNode(nodeData) {
      this.editNodeData = { ...nodeData };
      this.isModalVisible = true;
    },

    // Handle node click
    handleNodeClick(node) {
      if (this.selectedNode === node) {
        this.selectedNode = null;
      } else {
        this.selectedNode = node;
      }
    },

    // Handle diagram click (to deselect node)
    handleDiagramClick() {
      this.selectedNode = null;
    },

    // Context menu for node actions (Edit, Delete, Add)
    makeContextMenu() {
      return go.GraphObject.make(go.Adornment, "Vertical",
        go.GraphObject.make(go.TextBlock, {
          text: "Edit Node",
          click: (e, obj) => {
            const nodeData = obj.part.data;
            this.editNode(nodeData);
          }
        }),
        go.GraphObject.make(go.TextBlock, {
          text: "Delete Node",
          click: (e, obj) => {
            const nodeData = obj.part.data;
            this.deleteNode(nodeData);
          }
        }),
        go.GraphObject.make(go.TextBlock, {
          text: "Add Node",
          click: (e, obj) => {
            const nodeData = obj.part.data;
            this.addNode(nodeData);
          }
        })
      );
    },

    // Delete a node
    deleteNode(nodeData) {
      if (nodeData.key === this.rootNodeKey) {
        toastr.error("Cannot delete the root node.");
        return;
      }
      this.diagram.startTransaction("Delete Node");
      const model = this.diagram.model;
      model.removeNodeData(nodeData);
      this.diagram.commitTransaction("Delete Node");
      this.updateChart();
      toastr.success("Node deleted successfully.");
    },

    // Save edited node
    saveEditNode() {
      const updatedNode = this.nodeDataArray.find(node => node.key === this.editNodeData.key);
      if (updatedNode) {
        updatedNode.name = this.editNodeData.name;
        updatedNode.color = this.editNodeData.color;
        updatedNode.fontColor = this.editNodeData.fontColor;
        this.updateChart();
        toastr.success("Node updated successfully.");
        this.closeModal();
      }
    },

    // Close the modal
    closeModal() {
      this.isModalVisible = false;
    },
  },
};
</script>


  
  <style scoped>
  #chartDiv {
  width: 100%;
  height: 500px;
}
  .container {
    max-width: 1200px;
    margin: 20px auto;
    padding: 10px;
    font-family: 'Arial', sans-serif;
  }
  
  .chart {
    width: 100%;
    height: 600px;
    border: 1px solid #ccc;
    margin-bottom: 20px;
  }
  
  .button-group {
    display: flex;
    gap: 15px;
    margin-bottom: 20px;
    justify-content: start;
  }
  
  button {
    padding: 12px 20px;
    font-size: 14px;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .btn-primary {
    background-color: #007bff;
    color: white;
    border: none;
  }
  
  .btn-secondary {
    background-color: #6c757d;
    color: white;
    border: none;
  }
  
  button:hover {
    opacity: 0.9;
  }
  
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .modal {
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    width: 300px;
  }
  
  input {
    margin-bottom: 10px;
    padding: 8px;
    width: 100%;
    border-radius: 6px;
    border: 1px solid #ccc;
  }
  
  .modal-buttons {
    display: flex;
    justify-content: space-between;
  }
  
  .modal-buttons button {
    width: 48%;
  }
  </style>
  