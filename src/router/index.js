import { createRouter, createWebHistory } from 'vue-router'
//import routes
import {Stores_Auth} from "@/stores/auth/auth.js";

import auth from "@/router/routes/auth/auth.js"
import dashboard from "@/router/routes/dashboard/dashboard.js";
import users from "@/router/routes/users/users.js";
import project_categories from "@/router/routes/projects/project_categories.js";
import project_statuses from "@/router/routes/projects/project_statuses.js";
import projects from "@/router/routes/projects/projects.js";





const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
      ...auth,
      ...dashboard,
      ...users,
      ...project_categories,
      ...project_statuses,
      ...projects

  ],
})






// Check Authenticate
router.beforeEach((to, from, next) => {
    // trying to access a restricted page + not logged in
    // redirect to login page
    if (to.path !== '/authentication' && !Stores_Auth().AuthGetCheckAuth) {
        next('/authentication');
    }else if (to.path === '/authentication' && Stores_Auth().AuthGetCheckAuth){
        next('/');
    }
    else {
        next();
    }
});

export default router
