<template>
    <div class="flex">
        <SideBar />
        <div class="flex-1 p-2 sm:ml-64 bg-gray-50 min-h-screen">
            <div class="w-full mb-3 top-0 sticky z-10">
                <TopBar />
            </div>
            <div class="rounded-md shadow-md h p-1">
                <div class=" grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-5 p-2">
                    <Mandate />
                    <Mission />
                    <Vision />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import SideBar from '@/components/SideBar.vue';
import Mandate from '@/components/mmv/Mandate.vue'
import Mission from '@/components/mmv/Mission.vue'
import Vision from '@/components/mmv/Vision.vue'
import TopBar from '@/components/TopBar.vue';

export default {
    name: 'MMVPage',
    components: {
        SideBar,
        Mandate,
        Mission,
        Vision,
        TopBar,
    },
  
};
</script>
