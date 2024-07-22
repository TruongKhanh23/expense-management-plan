import { ref } from "vue";
import { db } from "@/main";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  doc,
} from "firebase/firestore";
import { buildPathSegments } from "@/composables/segment/index.js";
import { getCurrentChooseMonth } from "@/utils/time.util";

import { toastWithPromise } from '@/utils/toast.util';

export async function getEstimateNecessityExpenses(
  currentYear,
  currentMonthYear,
) {
  try {
    const count = ref(0);
    const estimateNecessityList = ref([]);
    const pathSegments = buildPathSegments(
      "estimateNecessityExpenses",
      currentYear,
      currentMonthYear,
    );
    onSnapshot(
      query(collection(db, ...pathSegments), orderBy("order", "asc")),
      (snap) => {
        count.value++;
        if (count.value > 1) {
          estimateNecessityList.value = [];
        }
        snap.forEach((doc) => {
          const data = doc.data();
          const item = {
            id: doc.id,
            ...data,
          };

          estimateNecessityList.value.push(item);
        });
        localStorage.setItem(
          "estimateNecessityList",
          JSON.stringify(estimateNecessityList.value),
        );
      },
    );
    return estimateNecessityList.value;
  } catch (error) {
    alert("Get estimateNecessityList failed\n" + error);
  }
}

export async function setEstimateNecessityExpenses(id, values) {
  const promise = new Promise(async (resolve, reject) => {
    try {
      const year = getCurrentChooseMonth().year;
      const monthYear = getCurrentChooseMonth().monthYear;
      const pathSegments = buildPathSegments(
        "estimateNecessityExpenses",
        year,
        monthYear,
      );
      await setDoc(
        doc(db, ...pathSegments, id),
        {
          details: values,
        },
        { merge: true },
      );
      resolve("Set estimate necessity expenses successfully");
    } catch (error) {
      reject(`Set estimate necessity expenses failed: ${error}`);
    }
  });
 
  toastWithPromise(
    promise,
    "Setting estimate necessity expenses...",
    "Set estimate necessity expenses successfully",
    "Set estimate necessity expenses failed"
  );
 
  try {
    await promise; // Chờ promise hoàn thành để xử lý thêm nếu cần
  } catch (error) {
    console.error(error); // Xử lý lỗi nếu cần
  }
  
}
