import { ref } from "vue";
import store from "@/store";
import { db } from "@/main";
import { buildPathSegments } from "@/composables/segment/index.js";
import { collection, onSnapshot, query, setDoc, doc } from "firebase/firestore";
import { getCurrentChooseMonth } from "@/utils/time.util";

import { toastWithPromise } from "@/utils/toast.util";

export async function getHandleIncomes(year, monthYear, user = "admin") {
  try {
    const count = ref(0);
    const list = ref([]);
    const pathSegments = buildPathSegments(
      "handleIncomes",
      year,
      monthYear,
      user,
    );
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
      store.dispatch("setHandleIncomes", list.value);
    });
  } catch (error) {
    alert("Get handleIncomes failed\n" + error);
  }
}
export async function setHandleIncomes(values) {
  console.log("values setHandleIncomes", values);

  const user = store.getters.getUser.email;
  const promise = new Promise(async (resolve, reject) => {
    try {
      const id = values[0].type;
      const year = getCurrentChooseMonth().year;
      const monthYear = getCurrentChooseMonth().monthYear;
      const pathSegments = buildPathSegments(
        "handleIncomes",
        year,
        monthYear,
        user,
      );
      await setDoc(
        doc(db, ...pathSegments, id),
        {
          items: values,
        },
        { merge: true },
      );
      resolve("Set handle incomes successfully");
    } catch (error) {
      reject(error);
    }
  });

  toastWithPromise(
    promise,
    "Setting handle incomes...",
    "Set handle incomes successfully",
    "Set handle incomes failed",
  );

  try {
    await promise; // Chờ promise hoàn thành để xử lý thêm nếu cần
  } catch (error) {
    console.error(error); // Xử lý lỗi nếu cần
  }
}
export function mergeItems(data) {
  // Kiểm tra nếu data là mảng, nếu không, trả về mảng rỗng
  if (!Array.isArray(data)) {
    return [];
  }

  return data.reduce((accumulator, current) => {
    // Gộp current item vào accumulator
    accumulator.push(current);
    return accumulator;
  }, []);
}
export function calculateTotalAmountByDebtId(data) {
  // Nếu data là null hoặc không phải là mảng, trả về mảng rỗng
  if (!Array.isArray(data)) {
    return [];
  }

  const items = mergeItems(data);

  // Sử dụng reduce để nhóm các đối tượng theo debtId và tính tổng amount
  const groupedByDebtId = items.reduce((accumulator, item) => {
    // Nếu debtId chưa có trong accumulator, khởi tạo với totalAmount = 0
    if (!accumulator[item.debtId]) {
      accumulator[item.debtId] = {
        debtId: item.debtId,
        fund: item.fund,
        totalAmount: 0,
      };
    }
    // Cộng dồn amount vào totalAmount của debtId tương ứng
    accumulator[item.debtId].totalAmount += item.amount;
    return accumulator;
  }, {});

  // Chuyển đối tượng nhóm thành mảng
  return Object.values(groupedByDebtId);
}
