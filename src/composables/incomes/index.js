import { ref } from "vue";
import store from "@/store";
import { db } from "@/main";
import { buildPathSegments } from "@/composables/segment/index.js";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  doc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { getCurrentChooseMonth } from "@/utils/time.util";

import { toastWithPromise } from "@/utils/toast.util";

export async function getIncomes(year, monthYear, user = "admin") {
  try {
    const count = ref(0);
    const incomes = ref([]);
    const year = getCurrentChooseMonth().year;
    const monthYear = getCurrentChooseMonth().monthYear;

    const pathSegments = buildPathSegments("incomes", year, monthYear, user);
    onSnapshot(
      query(collection(db, ...pathSegments), orderBy("amount", "desc")),
      (snap) => {
        count.value++;
        if (count.value > 1) {
          incomes.value = [];
        }
        snap.forEach((doc) => {
          const data = doc.data();
          const income = {
            key: doc.id,
            ...data,
          };
          incomes.value.push(income);
        });
        store.dispatch("setIncomes", incomes.value);
      },
    );
    return incomes.value;
  } catch (error) {
    alert("Get incomes failed\n" + error);
  }
}

export async function setIncomes(values) {
  const user = store.getters.getUser.email;
  const promise = new Promise(async (resolve, reject) => {
    try {
      const pathSegments = buildPathSegments(
        "incomes",
        getCurrentChooseMonth().year,
        getCurrentChooseMonth().monthYear,
        user,
      );
      for (const item of values) {
        await setDoc(doc(db, ...pathSegments, item.key), {
          source: item.source,
          amount: item.amount,
        });
      }
      resolve("Set incomes successfully");
    } catch (error) {
      reject(error);
    }
  });

  toastWithPromise(
    promise,
    "Setting incomes...",
    "Set incomes successfully",
    "Set incomes failed",
  );

  try {
    await promise; // Chờ promise hoàn thành để xử lý thêm nếu cần
  } catch (error) {
    console.error(error); // Xử lý lỗi nếu cần
  }
}

export const deleteIncome = async (id) => {
  const user = store.getters.getUser.email;
  const year = getCurrentChooseMonth().year;
  const monthYear = getCurrentChooseMonth().monthYear;
  const pathSegments = buildPathSegments("incomes", year, monthYear, user);

  const promise = new Promise(async (resolve, reject) => {
    try {
      // Tạo tham chiếu đến document cần xóa
      const docRef = doc(db, ...pathSegments, id);

      // Xóa document
      await deleteDoc(docRef);
      resolve("Delete income successfully");
    } catch (error) {
      reject(error);
    }
  });

  toastWithPromise(
    promise,
    "Deleting income...",
    "Delete income successfully",
    "Delete income failed",
  );

  try {
    await promise; // Chờ promise hoàn thành để xử lý thêm nếu cần
  } catch (error) {
    console.error(error); // Xử lý lỗi nếu cần
  }
};
