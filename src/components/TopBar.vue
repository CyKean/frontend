<template>
    <div class="w-full bg-green-500 rounded-md p-2 sticky top-0 z-10">
      <p class="text-left text-white font-bold text-xl ml-3">{{ pageName }}</p>
    </div>
</template>

<script>
export default {
    name: 'TopBar',
    data() {
        return {
            pageName: 'Dashboard'
        };
    },
    watch: {
        '$route': 'updatePageName'
    },
    methods: {
        updatePageName() {
            const routeToPageName = {
                '/admin-dashboard': 'Dashboard',
                '/announcement': 'Announcements',
                '/projects': 'Projects',
                '/events': 'Events',
                '/mandate-mission-and-vision': 'Mandate, Mission and Vision',
                '/DAR-leaders': 'Leaders',
                '/DAR-officials': 'Officials',
                '/organizational-structure': 'Organizational Structure',
                '/messages': 'Messages',
            };

            this.pageName = routeToPageName[this.$route.path] || 'Dashboard'; // Default to 'Dashboard'
        }
    },
    created() {
        this.updatePageName();
    }
};
</script>
