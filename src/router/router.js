// src/router/index.js
import { createRouter, createWebHistory } from "vue-router"; //kasama na yan
import HomePage from "@/views/HomePage.vue";
import AboutPage from "@/views/AboutPage.vue";
import ContactPage from "@/views/ContactPage.vue";
import LoginPage from "@/views/auth/LoginPage.vue";
import RegisterPage from "@/views/auth/RegisterPage.vue";
import EmailVerification from "@/views/auth/EmailVerification.vue";
import DashboardPage from "@/views/admin/DashboardPage.vue";
import Forbidden from "@/views/error/403.vue";
import MMVPage from "@/views/admin/MMVPage.vue";
import LeadersPage from "@/views/admin/LeadersPage.vue";
import OfficialsPage from "@/views/admin/OfficialsPage.vue";
import OrgStructurePage from "@/views/admin/OrgStructurePage.vue";
import AnnouncementPage from "@/views/admin/AnnouncementPage.vue";
import ProjectPage from "@/views/admin/ProjectPage.vue";
import EventsPage from "@/views/admin/EventsPage.vue";
import MissionVisionMandate from "@/views/MissionVisionMandate.vue";
import DAROfficial from "@/views/DAROfficial.vue";
import DARLeader from "@/views/DARLeader.vue";
import DAREvents from "@/views/DAREvents.vue";
import CommentFeedback from "@/views/admin/CommentFeedback.vue";
import Projects from "@/views/Projects.vue";
import UserDetails from "@/views/auth/UserDetails.vue";
import OrgChart from "@/views/OrgChart.vue";
import axios from "axios";

const routes = [
  { path: "/", name: "HomePage", component: HomePage },
  { path: "/about", name: "AboutPage", component: AboutPage },
  { path: "/login", name: "LoginPage", component: LoginPage },
  { path: "/register", name: "RegisterPage", component: RegisterPage },
  { path: "/email-verification", name: "EmailVerification", component: EmailVerification },
  { path: "/user-details", name: "UserDetails", component: UserDetails},
  { path: "/admin-dashboard", name: "DashboardPage", component: DashboardPage, meta: { requireAdmin: true }},
  { path: "/403", name: "Forbidden", component: Forbidden },
  { path: "/mandate-mission-and-vision", name: "MMVPage", component: MMVPage, meta: { requireAdmin: true}},
  { path: "/DAR-leaders", name: "LeadersPage", component: LeadersPage, meta: { requireAdmin: true}},
  { path: "/DAR-officials", name: "OfficialsPage", component: OfficialsPage, meta: { requireAdmin: true}},
  { path: "/organizational-structure", name: "OrgStructurePage", component: OrgStructurePage, meta: { requireAdmin: true}},
  { path: "/announcement", name: "AnnouncementPage", component: AnnouncementPage, meta: { requireAdmin: true}},
  { path: "/projects", name: "ProjectPage", component: ProjectPage, meta: { requireAdmin: true}},
  { path: "/events", name: "EventsPage", component: EventsPage, meta: { requireAdmin: true}},
  { path: "/messages", name: "CommentFeedback", component: CommentFeedback, meta: { requireAdmin: true}},
  { path: "/mission-vision-and-mandate", name: "MissionVisionMandate", component: MissionVisionMandate },
  { path: "/officials", name: "DAROfficial", component: DAROfficial },
  { path: "/leaders", name: "DARLeader", component: DARLeader },
  { path: "/DAR-events", name: "DAREvents", component: DAREvents },
  { path: "/contact-us", name: "ContactPage", component: ContactPage },
  { path: "/DAR-projects", name: "Projects", component: Projects},
  { path: "/org-structure", name: "OrgChart", component: OrgChart }
  // Add more routes as needed...

  // Add more routes as needed...
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  console.log(`Navigating to: ${to.path}`);

  if (to.matched.some(record => record.meta.requireAdmin)) {
      console.log('Checking admin access');
      try {
          const user = JSON.parse(localStorage.getItem('user'));
          console.log('User from session:', user); 

          if (user.role === 'admin') {
              console.log('User is admin, granting access to dashboard');
              next();
          } else {
              console.log('User is not admin, redirecting to 403');
              next('/403');
          }
      } catch (error) {
          console.error('Session check error:', error);
          next('/403');
      }
  } else {
      console.log('No admin check needed, proceeding to next route');
      next();
  }
});



export default router;
