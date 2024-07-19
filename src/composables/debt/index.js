import { ref } from "vue";
import { db } from "@/main";
import { buildPathSegments } from "@/composables/segment/index.js";
import { collection, onSnapshot, query, setDoc, doc } from "firebase/firestore";

export async function getDebt() {
  try {
    const count = ref(0);
    const list = ref([]);
    const pathSegments = ["users", "admin", "debt"];
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
      localStorage.setItem("Debt", JSON.stringify(list.value));
    });
    return list.value;
  } catch (error) {
    alert("Get Debt failed");
  }
}

export async function setDebt(values) {
  try {
    const pathSegments = ["users", "admin", "debt"];
    for (const id of Object.keys(values)) {
      await setDoc(
        doc(db, ...pathSegments, id),
        {
          name: values[id].name,
          amount: values[id].amount,
          isFinished: values[id].isFinished,
        },
        { merge: true },
      );
    }
    alert("Set debts successfully");
  } catch (error) {
    alert(`Set debts failed: ${error}`);
  }
}
