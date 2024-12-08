<template>
   <div class="flex">
     <SideBar />
     <div class="flex-1 p-2 sm:ml-64 bg-gray-50 min-h-screen">
       <!-- Top Bar -->
       <div class="w-full mb-3 top-0 sticky z-10">
         <TopBar />
       </div>
       <div class="rounded-md shadow-md h p-1">
         <div class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-4">
            <ProjectMap />
            <Chart />
            <Events />
            <Messages />
         </div>
       </div>
     </div>
   </div>
 </template>
 
<script>
import ProjectMap from "@/components/dashboard/ProjectMap.vue"; 
import SideBar from "@/components/SideBar.vue";
import Events from "@/components/dashboard/Events.vue";
import Announcemnt from "@/components/dashboard/Announcemnt.vue";
import Messages from "@/components/dashboard/Messages.vue";
import Chart from "@/components/dashboard/Chart.vue";
import TopBar from "@/components/TopBar.vue";

export default {
   name: 'DashboardPage',
   components: {
      ProjectMap,
      SideBar,
      Events,
      Announcemnt,
      Messages,
      Chart,
      TopBar,
   },
   
}
</script>
<style>
.h{
   height: 35rem;
   overflow: auto;
}
</style>

