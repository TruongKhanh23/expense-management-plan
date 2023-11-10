import { ref } from "vue";
import { db } from "@/main";
import { collection, onSnapshot, orderBy, query, setDoc, doc } from "firebase/firestore";

const pathSegments = [
  "users",
  "admin",
  "years",
  "2023",
  "months",
  "01-2023",
  "incomes",
];

export async function getIncomes() {
  try {
    const count = ref(0);
    const incomes = ref([]);
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
    for (const id of Object.keys(values)){
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
