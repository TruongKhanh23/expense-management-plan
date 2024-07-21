import { ref } from "vue";
import { db } from "@/main";
import { buildPathSegments } from "@/composables/segment/index.js";
import { collection, onSnapshot, query, setDoc, doc } from "firebase/firestore";
import { getCurrentChooseMonth } from "@/utils/time.util";

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
      localStorage.setItem("handleIncomes", JSON.stringify(list.value));
    });
    return list.value;
  } catch (error) {
    alert("Get handleIncomes failed\n" + error);
  }
}
export async function setHandleIncomes(values) {
  try {
    const id = values[0].type;
    const year = getCurrentChooseMonth().year;
    const monthYear = getCurrentChooseMonth().monthYear;
    const pathSegments = buildPathSegments("handleIncomes", year, monthYear);
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
export function mergeItems(data) {
  const dataJson = JSON.parse(data);
  return dataJson.reduce((accumulator, current) => {
    // Kiểm tra xem current.items có tồn tại và có phải là một mảng không
    if (Array.isArray(current.items)) {
      // Gộp các item vào accumulator
      accumulator.push(...current.items);
    }
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
