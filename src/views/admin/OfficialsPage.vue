<template>

    <div class="flex">
        <SideBar />
        <div class="flex-1 p-2 sm:ml-64 bg-gray-50 min-h-screen">
            <div class="w-full mb-3 top-0 sticky z-10">
                <TopBar />
            </div>
            <div class="rounded-md shadow-md h p-1">
                <div class="flex justify-center">
                    <Main />
                </div>

                <div class="mx-2 my-2">
                    <HEA />
                </div>

                <div class="mx-2 my-2">
                    <UnderSec />
                </div>

                <div class="mx-2 my-2">
                    <AssisSec />
                </div>

                <div class="mx-2 my-2">
                    <Director />
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import SideBar from '@/components/SideBar.vue';
import Main from '@/components/official/Main.vue';
import HEA from '@/components/official/HEA.vue';
import UnderSec from '@/components/official/UnderSec.vue';
import AssisSec from '@/components/official/AssisSec.vue';
import Director from '@/components/official/Director.vue';
import TopBar from '@/components/TopBar.vue';

export default {
    name: 'OfficialsPage',
    components: {
        SideBar,
        Main,
        HEA,
        UnderSec,
        AssisSec,
        Director,
        TopBar,
    },
    
}
</script>