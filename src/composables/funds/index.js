import { ref } from "vue";
import { db } from "@/main";
import { buildPathSegments } from "@/composables/segment/index.js";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  doc,
} from "firebase/firestore";
import { getCurrentChooseMonth } from "@/utils/time.util";
import { toastWithPromise } from "@/utils/toast.util";

const pathSegments = [
  "users",
  "admin",
  "years",
  "2023",
  "months",
  "12-2023",
  "funds",
];

export async function getFunds(year, monthYear, user = "admin") {
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
    const pathSegments = buildPathSegments("funds", year, monthYear, user);
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
    alert("Get funds failed\n", error);
  }
}

export function getFundsPercentage(funds) {
  const initialValue = {
    necessity: 0,
    freedom: 0,
    education: 0,
    enjoy: 0,
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
  const promise = new Promise(async (resolve, reject) => {
    try {
      const year = getCurrentChooseMonth().year;
      const monthYear = getCurrentChooseMonth().monthYear;
      const pathSegments = buildPathSegments("funds", year, monthYear);
      for (const fund of Object.keys(values)) {
        await setDoc(
          doc(db, ...pathSegments, fund),
          {
            percentage: parseFloat(values[fund]),
          },
          { merge: true },
        );
      }
      resolve("Set funds successfully");
    } catch (error) {
      reject(`Set funds failed`);
    }
  });

  toastWithPromise(
    promise,
    "Setting funds...",
    "Set funds successfully",
    "Set funds failed",
  );
  try {
    await promise; // Chờ promise hoàn thành để xử lý thêm nếu cần
  } catch (error) {
    console.error(error); // Xử lý lỗi nếu cần
  }
}
