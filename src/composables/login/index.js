import { useRouter } from "vue-router";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendPasswordResetEmail,
} from "firebase/auth";

export function grantPermission() {
  // Lấy thông tin người dùng từ localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user?.email;

  // Lấy danh sách permissions từ localStorage
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  // Kiểm tra quyền hạn của người dùng và lưu vào localStorage
  const userPermission = permissions.find(
    (permission) => permission.email === userEmail,
  );

  if (userPermission && userPermission.permission === "admin") {
    localStorage.setItem("isAllowEditing", true);
  } else {
    localStorage.setItem("isAllowEditing", false);
  }
}

export const signInWithGoogle = () => {
  const router = useRouter();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      if (result.user.email === "truongnguyenkhanh230800@gmail.com") {
        result.user.email = "admin";
        localStorage.setItem("user", JSON.stringify(result.user));
      }
      localStorage.setItem("user", JSON.stringify(result.user));
      grantPermission();
      window.location.href = "/";
    })
    .catch((error) => {
      alert(error.message);
    });
};
