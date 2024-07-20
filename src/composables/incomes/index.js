import { ref } from "vue";
import { db } from "@/main";
import { buildPathSegments } from "@/composables/segment/index.js";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  doc,
} from "firebase/firestore";
import { getCurrentChooseMonth } from "@/utils/time.util";

export async function getIncomes(year, monthYear, user = "admin") {
  try {
    const count = ref(0);
    const incomes = ref([]);
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
        localStorage.setItem("incomes", JSON.stringify(incomes.value));
      },
    );
    return incomes.value;
  } catch (error) {
    alert("Get incomes failed");
  }
}
export async function setIncomes(values) {
  try {
    const pathSegments = buildPathSegments(
      "incomes",
      getCurrentChooseMonth().year,
      getCurrentChooseMonth().monthYear,
    );
    for (const id of Object.keys(values)) {
      await setDoc(
        doc(db, ...pathSegments, id),
        {
          source: values[id].source,
          amount: values[id].amount,
        },
        { merge: true },
      );
    }
    alert("Set incomes successfully");
  } catch (error) {
    alert(`Set funds failed: ${error}`);
  }
}
