// src/main.js
// eslint-disable-next-line
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/router.js"; // Import the router

import './assets/css/output.css';
import 'flowbite';
import 'flowbite/dist/flowbite.css';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import '@fortawesome/fontawesome-free/css/all.css';
import "quill/dist/quill.snow.css";

// import vuetify from './plugins/vuetify.js';

createApp(App)
  .use(router)
  // .use(vuetify) 
  .mount("#app");
