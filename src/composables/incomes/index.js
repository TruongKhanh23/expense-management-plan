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
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import { getCurrentChooseMonth } from "@/utils/time.util";

const year = getCurrentChooseMonth().year;
const monthYear = getCurrentChooseMonth().monthYear;

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
    console.log("values", values);
    for (const id of Object.keys(values)) {
      await setDoc(doc(db, ...pathSegments, id), {
        source: values[id].source,
        amount: values[id].amount,
      });
    }
    alert("Set incomes successfully");
  } catch (error) {
    alert(`Set incomes failed: ${error}`);
  }
}

export const deleteIncome = async (id, user = "admin") => {
  const pathSegments = buildPathSegments("incomes", year, monthYear, user);
  console.log("pathSegments", ...pathSegments);
  console.log("id", id);
  try {
    const subCollectionRef = collection(
      db,
      "users",
      "admin",
      "years",
      "2024",
      "months",
      "07-2024",
      "incomes",
    );
    const querySnapshot = await getDocs(subCollectionRef);

    // Lặp qua các document và xóa document với ID cụ thể
    querySnapshot.forEach(async (subDoc) => {
      if (subDoc.id === id.toString()) {
        const docRef = doc(
          db,
          "users",
          "admin",
          "years",
          "2024",
          "months",
          "07-2024",
          "incomes",
          subDoc.id,
        );
        await deleteDoc(docRef);
        console.log(`Income with ID ${subDoc.id} has been deleted`);
      }
    });
    alert(`Income ${id} was deleted`);
  } catch (error) {
    alert(`Delete country failed\n` + error);
  }
};
