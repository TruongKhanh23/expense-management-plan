import { createRouter, createWebHistory } from "vue-router"; // Import the necessary functions and objects
import Home from "@/components/home/Home.vue";
import Login from "@/components/authentication/Login.vue";
import SplashScreen from "@/components/global/SplashScreen.vue";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import store from "@/store";

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
  const auth = getAuth();
  const user = await getCurrentUser();
  const userInfo = store.getters.getUser;

  const validPaths = routes.map((route) => route.path);
  if (!validPaths.includes(to.path) && to.path !== "/login") {
    next("/login");
    return;
  }

  // Kiểm tra xác thực và điều hướng
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (user && userInfo.email) {
      next(); // User hợp lệ
    } else {
      await signOut(auth); // Đăng xuất nếu không hợp lệ
      next("/login"); // Chuyển hướng về trang đăng nhập
    }
  } else {
    if (to.path === "/login") {
      if (user && userInfo.email) {
        next("/home"); // Nếu user và userInfo tồn tại, chuyển hướng đến home
      } else {
        next(); // Không có user, tiếp tục tới trang login
      }
    } else {
      next(); // Đường dẫn không yêu cầu xác thực, tiếp tục điều hướng
    }
  }
});

export default router;
