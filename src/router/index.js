import { createRouter, createWebHistory } from "vue-router"; // Import the necessary functions and objects
import Home from "@/components/home/Home.vue";
import Login from "@/components/authentication/Login.vue";
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

  // Kiểm tra nếu đường dẫn không nằm trong danh sách đã định sẵn
  const validPaths = routes.map((route) => route.path);
  if (!validPaths.includes(to.path) && to.path !== "/login") {
    next("/login");
    return;
  }

  // Kiểm tra xác thực
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (user) {
      next();
    } else {
      next("/login");
    }
  } else {
    if (to.path === "/login" && user) {
      next("/home");
    } else {
      next();
    }
  }
});

export default router;
