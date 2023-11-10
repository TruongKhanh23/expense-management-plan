import { ref } from "vue";
import { db } from "@/main";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  doc,
} from "firebase/firestore";

const pathSegments = [
  "users",
  "admin",
  "years",
  "2023",
  "months",
  "01-2023",
  "funds",
];

export async function getFunds() {
  try {
    const count = ref(0);
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
      query(collection(db, ...pathSegments), orderBy("order", "asc")),
      (snap) => {
        count.value++;
        if (count.value > 1) {
          funds.value = [
            {
              id: "",
              src: "",
              percentage: "",
              wallet: "",
              name: "",
              classColor: "",
            },
          ];
        }
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

export function getFundsPercentage(funds) {
  const initialValue = {
    necessity: 0,
    freedom: 0,
    education: 0,
    relax: 0,
    giving: 0,
    longTermSaving: 0,
  };

  const result = funds.reduce((accumulator, item) => {
    if (item.id in accumulator) {
      accumulator[item.id] = item.percentage;
    }
    return accumulator;
  }, initialValue);
  return result;
}

export async function setFunds(values) {
  try {
    for (const fund of Object.keys(values)) {
      await setDoc(
        doc(db, ...pathSegments, fund),
        {
          percentage: parseFloat(values[fund]),
        },
        { merge: true },
      );
    }
    alert("Set funds successfully");
  } catch (error) {
    alert(`Set funds failed: ${error}`);
  }
}
