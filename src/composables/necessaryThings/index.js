import { ref } from "vue";
import store from "@/store";
import { db } from "@/main";
import {
  collection,
  onSnapshot,
  query,
  setDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { dataNecessaryThings, dataNecessaryThingsType } from "@/assets/data/sample";
import { toastWithPromise } from "@/utils/toast.util";

// Hàm lấy necessaryThings từ Firebase
export async function getNecessaryThings() {
  try {
    const user = store.getters.getUser.email;

    const count = ref(0);
    const list = ref([]);
    const pathSegments = ["users", user, "necessaryThings"];
    
    // Theo dõi thay đổi dữ liệu từ Firebase
    const unsubscribe = onSnapshot(
      query(collection(db, ...pathSegments)), 
      (snap) => {
        count.value++;
        
        // Nếu không có dữ liệu (snapshot trống) thì gọi hàm setNecessaryThings
        if (snap.empty) {
          console.log("went snap.empty");
        } else {
          // Nếu có dữ liệu, reset list và thêm dữ liệu từ snapshot
          list.value = [];
          snap.forEach((doc) => {
            const data = doc.data();
            const item = {
              id: data.id,                 // ID của item từ Firebase
              name: data.name,            // Tên sản phẩm
              timespan: data.timespan,    // Khoảng thời gian sử dụng
              savePerMonth: data.savePerMonth,  // Số tiền tiết kiệm mỗi tháng
              limitation: data.limitation, // Giới hạn số tiền
              type: data.type,            // Loại sản phẩm (ví dụ: shampoo)
            };
            list.value.push(item);
          });
          // Dispatch dữ liệu lấy được vào store
          store.dispatch("setNecessaryThings", list.value);
        }
      },
      (error) => {
        // Nếu xảy ra lỗi, hiển thị thông báo lỗi
        console.error("Error fetching necessary things:", error);
        alert("Get necessary things failed\n" + error);
      }
    );

    return unsubscribe; // Dùng để dừng theo dõi sau này nếu cần
  } catch (error) {
    alert("Error in getNecessaryThings:\n" + error);
  }
}

// Hàm set necessaryThings vào Firebase với cấu trúc mới
export async function setNecessaryThings(values) {
  const user = store.getters.getUser.email;
  const promise = new Promise(async (resolve, reject) => {
    try {
      const pathSegments = ["users", user, "necessaryThings"];
      for (const item of values) {
        await setDoc(
          doc(db, ...pathSegments, item.id),
          {
            id: item.id,
            name: item.name,
            timespan: item.timespan,
            savePerMonth: item.savePerMonth,
            limitation: item.limitation,
            type: item.type,
          },
          { merge: true },
        );
      }
      store.dispatch("setNecessaryThings", list.value);
      resolve("Set necessary things successfully");
    } catch (error) {
      console.log("Error:", error);
      reject(`Set necessary things failed`, error);
    }
  });

  toastWithPromise(
    promise,
    "Setting necessary things...",
    "Set necessary things successfully",
    "Set necessary things failed",
  );

  try {
    await promise; // Chờ promise hoàn thành để xử lý thêm nếu cần
  } catch (error) {
    console.error(error); // Xử lý lỗi nếu cần
  }
}

// Hàm xóa necessaryThing
export const deleteNecessaryThing = async (id) => {
  const user = store.getters.getUser.email;
  const promise = new Promise(async (resolve, reject) => {
    try {
      const pathSegments = ["users", user, "necessaryThings"];
      // Tạo tham chiếu đến document cần xóa
      const docRef = doc(db, ...pathSegments, id);

      // Xóa document
      await deleteDoc(docRef);
      resolve(`Necessary thing was deleted`);
    } catch (error) {
      reject(`Delete necessary thing failed`);
    }
  });

  toastWithPromise(
    promise,
    "Deleting necessary thing...",
    "Delete necessary thing successfully",
    "Delete necessary thing failed",
  );

  try {
    await promise; // Chờ promise hoàn thành để xử lý thêm nếu cần
  } catch (error) {
    console.error(error); // Xử lý lỗi nếu cần
  }
};

export async function getNecessaryThingsType() {
  try {
    const user = store.getters.getUser.email;

    const list = ref([]);
    const pathSegments = ["users", user, "necessaryThingsType"];

    // Theo dõi thay đổi dữ liệu từ Firebase
    const unsubscribe = onSnapshot(
      query(collection(db, ...pathSegments)), 
      (snap) => {
        if (snap.empty) {
          console.log("went snap.empty");
        } else {
          list.value = [];
          snap.forEach((doc) => {
            const data = doc.data();
            const item = {
              id: data.id,      // ID của item từ Firebase
              name: data.name,  // Tên loại sản phẩm
            };
            list.value.push(item);
          });
          // Dispatch dữ liệu lấy được vào store
          store.dispatch("setNecessaryThingsType", list.value);
        }
      },
      (error) => {
        console.error("Error fetching necessary things type:", error);
        alert("Get necessary things type failed\n" + error);
      }
    );

    return unsubscribe; // Dùng để dừng theo dõi sau này nếu cần
  } catch (error) {
    alert("Error in getNecessaryThingsType:\n" + error);
  }
}

// Hàm set necessaryThingsType vào Firebase
export async function setNecessaryThingsType(values) {
  const user = store.getters.getUser.email;
  const promise = new Promise(async (resolve, reject) => {
    try {
      const pathSegments = ["users", user, "necessaryThingsType"];
      for (const item of values) {
        await setDoc(
          doc(db, ...pathSegments, item.id),
          {
            id: item.id,
            name: item.name,
          },
          { merge: true },
        );
      }
      resolve("Set necessary things type successfully");
    } catch (error) {
      console.log("Error:", error);
      reject(`Set necessary things type failed`, error);
    }
  });

  toastWithPromise(
    promise,
    "Setting necessary things type...",
    "Set necessary things type successfully",
    "Set necessary things type failed",
  );

  try {
    await promise; // Chờ promise hoàn thành để xử lý thêm nếu cần
  } catch (error) {
    console.error(error); // Xử lý lỗi nếu cần
  }
}

// Hàm xóa necessaryThingsType
export const deleteNecessaryThingType = async (id) => {
  const user = store.getters.getUser.email;
  const promise = new Promise(async (resolve, reject) => {
    try {
      const pathSegments = ["users", user, "necessaryThingsType"];
      // Tạo tham chiếu đến document cần xóa
      const docRef = doc(db, ...pathSegments, id);

      // Xóa document
      await deleteDoc(docRef);
      resolve(`Necessary thing type was deleted`);
    } catch (error) {
      reject(`Delete necessary thing type failed`);
    }
  });

  toastWithPromise(
    promise,
    "Deleting necessary thing type...",
    "Delete necessary thing type successfully",
    "Delete necessary thing type failed",
  );

  try {
    await promise; // Chờ promise hoàn thành để xử lý thêm nếu cần
  } catch (error) {
    console.error(error); // Xử lý lỗi nếu cần
  }
};