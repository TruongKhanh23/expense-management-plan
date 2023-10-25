import { ref } from "vue";
import { db } from "@/main";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

export async function getFunds() {
  try {
    const pathSegments = [
      "users",
      "admin",
      "years",
      "2023",
      "months",
      "01-2023",
      "funds",
    ];
    const funds = ref([
      {
        id: "",
        src: "",
        percentage: "",
        wallet: "",
        name: "",
        classColor: "",
      },
    ]);
    onSnapshot(query(collection(db, ...pathSegments), orderBy("percentage", "desc")), (snap) => {
      snap.forEach((doc) => {
        const data = doc.data();
        const fund = {
          id: doc.id,
          ...data,
        };

        funds.value.push(fund);
      });
      localStorage.setItem("funds", JSON.stringify(funds.value));
    });
    return funds.value;
  } catch (error) {
    alert("Get funds failed");
  }
}
