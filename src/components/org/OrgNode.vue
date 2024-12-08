<template>
  <div class="node-wrapper relative">
    <div class="flex flex-col items-center space-y-4">
      <!-- Parent Node Content -->
      <div
        class="node bg-white border-2 border-gray-400 p-4 rounded-lg shadow-lg flex flex-col items-center space-y-2 w-48"
        :id="`node-${node.id}`"
      >
        <!-- Editable Input at the top -->
        <input
          v-model="editableValue"
          placeholder="Enter name..."
          class="border p-2 rounded-md w-full text-center"
          :disabled="!isEditing"
          @input="updateParentNode"
        />
        
        <!-- Buttons below the input -->
        <div class="flex space-x-2">
          <!-- Show only when not editing -->
          <button v-if="!isEditing" @click="addChild" class="bg-green-500 text-white p-2 rounded-md hover:bg-green-600">Add Child</button>
          <button v-if="!isEditing" @click="addSubnode" class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Add Subnode</button>
          <button v-if="!isEditing" @click="editNode" class="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600">Edit</button>
          <button v-if="!isEditing && parent" @click="removeNode" class="bg-red-500 text-white p-2 rounded-md hover:bg-red-600">Remove</button>

          <!-- Show only when editing -->
          <button v-if="isEditing" @click="saveChanges" class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Save</button>
          <button v-if="isEditing" @click="cancelEdit" class="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600">Cancel</button>
        </div>
      </div>

      <!-- Subnodes Displayed Above the Child Node -->
      <div v-if="Array.isArray(node.subnodes) && node.subnodes.length > 0" class="subnodes-container space-y-2">
        <div v-for="subnode in node.subnodes" :key="subnode.id" class="subnode-container bg-gray-200 p-2 rounded-md w-40">
          <input
            v-model="subnodeValues[subnode.id]"
            placeholder="Enter subnode name..."
            class="border p-2 rounded-md w-full text-center"
            :disabled="!isEditingSubnode(subnode)"
          />
          <div class="flex space-x-2">
            <!-- Only Edit and Remove Buttons for Subnode -->
            <button v-if="!isEditingSubnode(subnode)" @click="editSubnode(subnode)" class="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-600">Edit</button>
            <button v-if="!isEditingSubnode(subnode)" @click="removeSubnode(subnode)" class="bg-red-500 text-white p-2 rounded-md hover:bg-red-600">Remove</button>
          </div>

          <!-- Show Save and Cancel buttons when editing a subnode -->
          <div v-if="isEditingSubnode(subnode)" class="mt-2 flex space-x-2">
            <button @click="saveSubnodeChanges(subnode)" class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600">Save</button>
            <button @click="cancelSubnodeEdit(subnode)" class="bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600">Cancel</button>
          </div>
        </div>
      </div>

      <!-- Child Nodes Displayed Below Subnodes Horizontally -->
      <div v-if="Array.isArray(node.children) && node.children.length > 0" class="flex flex-row space-x-4 mt-4 relative">
        <!-- SVG Wrapper for Connection Lines -->
        <svg class="absolute top-0 left-1/2 transform -translate-x-1/2" :style="{ height: connectionHeight + 'px', width: '100%' }">
          <!-- Loop through children and create a path for each connection -->
          <path
            v-for="child in node.children"
            :key="child.id"
            :d="getLinePath(child)"
            stroke="black"
            fill="transparent"
            stroke-width="2"
          />
        </svg>

        <!-- Child Node Components -->
        <div v-for="child in node.children" :key="child.id" class="relative flex flex-col items-center">
          <OrgNode :node="child" :level="level + 1" :parent="node" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';

export default {
  name: 'OrgNode',
  props: {
    node: {
      type: Object,
      required: true,
      default: () => ({}),
    },
    level: {
      type: Number,
      required: true,
    },
    parent: {
      type: Object,
      default: null,
    },
  },
  setup(props) {
    const { node, parent } = props;

    const isEditing = ref(false); // Track if node is being edited
    const editableValue = ref(props.node.value); // Local value for editing
    const subnodeValues = ref({}); // Store subnode values separately
    const editingSubnodes = ref(new Set()); // Track editing state of individual subnodes
    const updateParentNode = () => {
      // Emit the updated value to the parent
      props.$emit('update:nodeValue', editableValue.value);
    };

    // Sync editable value when editing state changes
    const startEditing = () => {
      editableValue.value = node.value;
    };

    watch(isEditing, (newValue) => {
      if (!newValue) {
        node.value = editableValue.value; // Sync the node value when editing ends
      }
    });

    watch(() => node.value, (newValue) => {
      if (!isEditing.value) {
        editableValue.value = newValue; // Update editable value when node value changes
      }
    });

    // Add Child Node
    const addChild = () => {
      const newNode = {
        id: Date.now(),
        value: '',
        children: [],
        subnodes: [],
      };
      node.children.push(newNode);
    };

    // Add Subnode
    const addSubnode = () => {
      if (!Array.isArray(node.subnodes)) {
        node.subnodes = [];
      }

      const newNode = {
        id: Date.now(),
        value: '',
        children: [],
        subnodes: [],
      };

      node.subnodes.push(newNode);
      subnodeValues.value[newNode.id] = newNode.value; // Add subnode value to the subnodeValues
    };

    // Edit Node
    const editNode = () => {
      isEditing.value = true;
      startEditing();
    };

    // Save Changes
    const saveChanges = () => {
      node.value = editableValue.value;
      isEditing.value = false;
    };

    // Cancel Edit
    const cancelEdit = () => {
      editableValue.value = node.value;
      isEditing.value = false;
    };

    // Remove Node
    const removeNode = () => {
      const index = parent.children.indexOf(node);
      if (index !== -1) {
        parent.children.splice(index, 1);
      }
    };

    // Remove Subnode
    const removeSubnode = (subnode) => {
      const index = node.subnodes.indexOf(subnode);
      if (index !== -1) {
        node.subnodes.splice(index, 1);
        delete subnodeValues.value[subnode.id]; // Remove from subnodeValues
      }
    };

    // Edit Subnode
    const editSubnode = (subnode) => {
      editingSubnodes.value.add(subnode.id);
    };

    // Check if a Subnode is being edited
    const isEditingSubnode = (subnode) => {
      return editingSubnodes.value.has(subnode.id);
    };

    // Save Subnode Changes
    const saveSubnodeChanges = (subnode) => {
      subnode.value = subnodeValues.value[subnode.id];
      editingSubnodes.value.delete(subnode.id);
    };

    // Cancel Subnode Edit
    const cancelSubnodeEdit = (subnode) => {
      subnodeValues.value[subnode.id] = subnode.value;
      editingSubnodes.value.delete(subnode.id);
    };

    // Calculate Path for SVG Line between Parent and Child
    const getLinePath = (child) => {
      const parentNode = document.getElementById(`node-${node.id}`);
      const childNode = document.getElementById(`node-${child.id}`);
      if (parentNode && childNode) {
        const parentRect = parentNode.getBoundingClientRect();
        const childRect = childNode.getBoundingClientRect();
        const startX = parentRect.left + parentRect.width / 2;
        const startY = parentRect.bottom;
        const endX = childRect.left + childRect.width / 2;
        const endY = childRect.top;
        return `M${startX},${startY} C${startX},${(startY + endY) / 2} ${endX},${(startY + endY) / 2} ${endX},${endY}`;
      }
      return '';
    };

    return {
      editableValue,
      isEditing,
      addChild,
      addSubnode,
      editNode,
      saveChanges,
      cancelEdit,
      removeNode,
      removeSubnode,
      editSubnode,
      isEditingSubnode,
      saveSubnodeChanges,
      cancelSubnodeEdit,
      getLinePath,
      subnodeValues,
      editingSubnodes,
    };
  },
};
</script>

<style scoped>
.node-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
}

.subnodes-container {
  padding-left: 16px;
}

.subnode-container {
  position: relative;
}

.node {
  position: relative;
  transition: 0.2s ease-in-out;
}
/* 
.node:hover {
  transform: scale(1.05);
} */

.connection-line {
  position: absolute;
  width: 100%;
}
</style>
