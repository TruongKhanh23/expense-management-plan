import { ref } from "vue";
import store from '@/store'
import { db } from "@/main";
import { buildPathSegments } from "@/composables/segment/index.js";
import {
  collection,
  onSnapshot,
  query,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import dayjs from "dayjs";


import { toastWithPromise } from "@/utils/toast.util";

export async function getDebt() {
  try {
    const { email: user } = JSON.parse(localStorage.getItem("user"));
    const count = ref(0);
    const list = ref([]);
    const pathSegments = ["users", user, "debt"];
    onSnapshot(query(collection(db, ...pathSegments)), (snap) => {
      count.value++;
      if (count.value > 1) {
        list.value = [];
      }
      snap.forEach((doc) => {
        const data = doc.data();
        const item = {
          key: doc.id,
          ...data,
        };
        list.value.push(item);
      });
      store.dispatch("setDebts", list.value);
    });
    return list.value;
  } catch (error) {
    alert("Get Debt failed\n" + error);
  }
}

export async function setDebt(values) {
  const { email: user } = JSON.parse(localStorage.getItem("user"));
  const promise = new Promise(async (resolve, reject) => {
    try {
      const pathSegments = ["users", user, "debt"];
      for (const item of values) {
        await setDoc(
          doc(db, ...pathSegments, item.key),
          {
            name: item.name,
            amount: item.amount,
            isFinished: item.isFinished,
            startDate: item.startDate.format("YYYY-MM-DD"),
          },
          { merge: true },
        );
      }
      resolve("Set debts successfully");
    } catch (error) {
      reject(`Set debts failed`);
    }
  });

  toastWithPromise(
    promise,
    "Setting debts...",
    "Set debts successfully",
    "Set debts failed",
  );

  try {
    await promise; // Chờ promise hoàn thành để xử lý thêm nếu cần
  } catch (error) {
    console.error(error); // Xử lý lỗi nếu cần
  }
}

export const deleteDebt = async (id, user = "admin") => {
  const promise = new Promise(async (resolve, reject) => {
    try {
      const pathSegments = ["users", user, "debt"];
      // Tạo tham chiếu đến document cần xóa
      const docRef = doc(db, ...pathSegments, id);

      // Xóa document
      await deleteDoc(docRef);
      resolve(`Debt was deleted`);
    } catch (error) {
      reject(`Delete debt failed`);
    }
  });

  toastWithPromise(
    promise,
    "Deleting debt...",
    "Delete debt successfully",
    "Delete debt failed",
  );

  try {
    await promise; // Chờ promise hoàn thành để xử lý thêm nếu cần
  } catch (error) {
    console.error(error); // Xử lý lỗi nếu cần
  }
};
