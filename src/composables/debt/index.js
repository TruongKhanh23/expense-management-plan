import { ref } from "vue";
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
      localStorage.setItem("debt", JSON.stringify(list.value));
    });
    return list.value;
  } catch (error) {
    alert("Get Debt failed\n" + error);
  }
}

export async function setDebt(values) {
  try {
    const pathSegments = ["users", "admin", "debt"];
    for (const item of values) {
      await setDoc(
        doc(db, ...pathSegments, item.key),
        {
          name: item.name,
          amount: item.amount,
          isFinished: item.isFinished,
        },
        { merge: true },
      );
    }
    alert("Set debts successfully");
  } catch (error) {
    alert(`Set debts failed: ${error}`);
  }
}

export const deleteDebt = async (id, user = "admin") => {
  try {
    const pathSegments = ["users", user, "debt"];
    // Tạo tham chiếu đến document cần xóa
    const docRef = doc(db, ...pathSegments, id);

    // Xóa document
    await deleteDoc(docRef);
    console.log(`Debt with ID ${id} has been deleted`);
    alert(`Debt ${id} was deleted`);
  } catch (error) {
    console.error(`Delete debt failed: ${error.message}`);
    alert(`Delete debt failed\n${error.message}`);
  }
};
