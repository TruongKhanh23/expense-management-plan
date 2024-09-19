import { createRouter, createWebHistory } from "vue-router"; // Import the necessary functions and objects
import Home from "@/components/Home/Home.vue";
import Login from "@/components/authentication/Login.vue";
import Register from "@/components/authentication/Register.vue";
import SplashScreen from "@/components/global/SplashScreen.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const routes = [
  {
    path: "/",
    name: "SplashScreen",
    component: SplashScreen,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
    meta: {
      requiresAuth: true,
    },
  },
  { path: "/login", name: "Login", component: Login },
  { path: "/register", name: "Register", component: Register },
];

const router = createRouter({
  history: createWebHistory(), // Use createWebHistory for the default history mode
  routes,
});

const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject,
    );
  });
};

router.beforeEach(async (to, from, next) => {
  const user = await getCurrentUser();

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (user) {
      next();
    } else {
      next("/login");
    }
  } else {
    if ((to.path === "/login" || to.path === "/register") && user) {
      next("/home");
    } else {
      next();
    }
  }
});

export default router;
