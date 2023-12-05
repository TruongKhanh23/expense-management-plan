import { ref } from "vue";
import { db } from "@/main";
import {
  collection,
  onSnapshot,
  query,
  setDoc,
  doc,
  orderBy,
} from "firebase/firestore";

const pathSegments = [
  "users",
  "admin",
  "years",
  "2023",
  "months",
  "01-2023",
  "handleIncomes",
];

export async function getHandleIncomes() {
  try {
    const count = ref(0);
    const list = ref([]);
    onSnapshot(
      query(collection(db, ...pathSegments), orderBy("order", "asc")),
      (snap) => {
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
        localStorage.setItem("handleIncomes", JSON.stringify(list.value));
      },
    );
    return list.value;
  } catch (error) {
    alert("Get handleIncomes failed");
  }
}

export async function setHandleIncomes(values) {
  try {
    const id = values[0].type;
    await setDoc(
      doc(db, ...pathSegments, id),
      {
        items: values,
      },
      { merge: true },
    );
    alert("Set HandleIncomes successfully");
  } catch (error) {
    alert(`Set HandleIncomes failed: ${error}`);
  }
}

export async function setSolvedHandleIncomes(selectedRows, selectedRowKeys) {
  console.log("selectedRows", selectedRows);
  for (const row of selectedRows) {
    row.isSolved = !row.isSolved ?? true;
  }
  await setHandleIncomes(selectedRows);
}
