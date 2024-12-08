<template>

  <div class="flex">
    <SideBar />
    <div class="flex-1 p-2 sm:ml-64 bg-gray-50 min-h-screen">
      <div class="w-full mb-3 top-0 sticky z-10">
        <TopBar />
      </div>
      <div class="rounded-md shadow-md h p-1">
        <OrganizationalChart />
      </div>
    </div>
  </div>

</template>

<script>
import OrgChart from '@/components/org/OrgChartEditor.vue';
import OrganizationalChart from '@/components/org/OrganizationalChart.vue';
import SideBar from '@/components/SideBar.vue';
import TopBar from '@/components/TopBar.vue';

export default {
  name: 'OrgStructurePage',
  components: {
    OrganizationalChart,
    OrgChart,
    SideBar,
    TopBar
  }
}
</script>