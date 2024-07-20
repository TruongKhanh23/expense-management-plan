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

const year = getCurrentChooseMonth().year;
const monthYear = getCurrentChooseMonth().monthYear;
const pathSegments = buildPathSegments(
  "estimateNecessityExpenses",
  year,
  monthYear,
);

export async function getEstimateNecessityExpenses() {
  try {
    const count = ref(0);
    const estimateNecessityList = ref([]);
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
    alert("Get estimateNecessityList failed");
  }
}

export async function setEstimateNecessityExpenses(id, values) {
  try {
    await setDoc(
      doc(db, ...pathSegments, id),
      {
        details: values,
      },
      { merge: true },
    );
    alert("Set EstimateNecessityExpenses successfully");
  } catch (error) {
    alert(`Set EstimateNecessityExpenses failed: ${error}`);
  }
}
