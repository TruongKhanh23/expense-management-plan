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
    onSnapshot(
      query(collection(db, ...pathSegments), orderBy("percentage", "desc")),
      (snap) => {
        snap.forEach((doc) => {
          const data = doc.data();
          const fund = {
            id: doc.id,
            ...data,
          };

          funds.value.push(fund);
        });
        localStorage.setItem("funds", JSON.stringify(funds.value));
      },
    );
    return funds.value;
  } catch (error) {
    alert("Get funds failed");
  }
}

export function getFundsPercentage() {
  const initialValue = {
    necessity: 0,
    freedom: 0,
    education: 0,
    relax: 0,
    giving: 0,
    longTermSaving: 0,
  };
  const funds = JSON.parse(localStorage.getItem("funds") ?? "");
  const result = funds.reduce((accumulator, item) => {
    if (item.id in accumulator) {
      accumulator[item.id] = item.percentage;
    }
    return accumulator;
  }, initialValue);
  return result;
}
