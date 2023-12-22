import { ref } from "vue";
import { db } from "@/main";
import { buildPathSegments } from "@/composables/segment/index.js"
import { collection, onSnapshot, query, setDoc, doc } from "firebase/firestore";
import sampleJson from "@/assets/data/sample.json";

export async function getHandleIncomes(year, monthYear, user = "admin") {
  try {
    const count = ref(0);
    const list = ref([]);
    const pathSegments = buildPathSegments("handleIncomes", year, monthYear, user)
    onSnapshot(
      query(collection(db, ...pathSegments)),
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
    console.log("error", error);
    localStorage.setItem("handleIncomes", JSON.stringify(sampleJson.handleIncomes));
    return sampleJson.handleIncomes
  }
}

export async function setHandleIncomes(values) {
  try {
    const id = values[0].type;
    const pathSegments = buildPathSegments("handleIncomes")
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
