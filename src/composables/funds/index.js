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

export async function setFunds(funds) {
  // doc(firestoreInstance, "collectionName", "documentId")
  // setDoc(collectionReference, dataObject)
  console.log("funds setFunds", funds);
  try {
    for (const element of funds) {
      if (element.id) {
        const { id, ...rest } = element;
        console.log("id", id);
        console.log("rest", rest);
        await setDoc(
          doc(
            db,
            "users",
            "admin",
            "years",
            "2023",
            "months",
            "01-2023",
            "funds",
            id,
          ),
          rest,
        );
      }
    }
    alert(`Set fund ${id} successfully`);
  } catch (error) {
    alert("Failed to set fund");
  }
}
