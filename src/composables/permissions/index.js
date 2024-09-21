import { ref } from "vue";
import { db } from "@/main";
import dayjs from "dayjs";
import sampleJson from "@/assets/data/sample.json";
import { getCurrentTime } from "@/utils/time.util";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  doc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { checkDocumentExists } from "@/utils/document.util";

export async function getPermissions() {
  try {
    const list = ref([]);
    const pathSegments = ["permissions"];
    onSnapshot(query(collection(db, ...pathSegments)), (snap) => {
      snap.forEach((doc) => {
        const data = doc.data();
        const item = {
          key: doc.id,
          ...data,
        };
        list.value.push(item);
      });
      localStorage.setItem("permissions", JSON.stringify(list.value));
    });
    return list.value;
  } catch (error) {
    alert("Get Permissions failed\n" + error);
  }
}

export const grantPermission = () => {
  // Lấy thông tin người dùng từ localStorage
  const user = store.getters.getUser;
  const userEmail = user?.email;
  console.log("userEmail", userEmail);

  // Lấy danh sách permissions từ localStorage
  const permissions = JSON.parse(localStorage.getItem("permissions"));

  // Kiểm tra quyền hạn của người dùng và lưu vào localStorage
  const userPermission = permissions.find(
    (permission) => permission.email === userEmail,
  );

  if (
    (userPermission && userPermission.permission === "admin") ||
    userEmail === "admin"
  ) {
    localStorage.setItem("isAllowEditing", true);
  } else {
    localStorage.setItem("isAllowEditing", false);
  }
};
