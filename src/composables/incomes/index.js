import { ref } from "vue";
import { db } from "@/main";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

export async function getIncomes() {
  try {
    const pathSegments = [
      "users",
      "admin",
      "years",
      "2023",
      "months",
      "01-2023",
      "incomes",
    ];
    const incomes = ref([]);
    onSnapshot(
      query(collection(db, ...pathSegments), orderBy("amount", "desc")),
      (snap) => {
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
