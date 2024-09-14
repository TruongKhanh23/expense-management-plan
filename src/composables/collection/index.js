import { ref } from "vue";
import { db } from "@/main";
import store from "@/store";
import sampleJson from "@/assets/data/sample.json";
import { getCurrentTime } from "@/utils/time.util";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  doc,
  getDocs,
  getDoc,
} from "firebase/firestore";
import { checkDocumentExists } from "@/utils/document.util";

export async function createNewMonth(month, year, monthYear) {
  const { email: user } = JSON.parse(localStorage.getItem("user"));
  const isYearExist = await checkDocumentExists(["users", user, "years"], year);
  const pathSegmentsCreateYear = ["users", user, "years"];
  const pathSegmentsCreateMonth = ["users", user, "years", year, "months"];

  try {
    if (!isYearExist) {
      //Create document year
      await setDoc(doc(db, ...pathSegmentsCreateYear, year), {
        name: "Năm " + year,
      });
    }
    // Create document month-year (Ex: 02-2023)
    let dataObject = { name: `Tháng ${month}, năm ${year}` };
    await setDoc(doc(db, ...pathSegmentsCreateMonth, monthYear), dataObject);
    console.log(`Set month ${dataObject.name} successfully`);
    console.log(
      "--------------------------------------------------------------------------------------",
    );
  } catch (error) {
    console.log("Failed to set month");
  }

  //Create collection funds/education
  const objects = [
    "estimateNecessityExpenses",
    "funds",
    "handleIncomes",
    "incomes",
  ];
  objects.forEach((object) => {
    switch (object) {
      case "estimateNecessityExpenses": {
        const data = sampleJson.estimateNecessityExpenses;
        const estimateNecessityExpenses = [
          "healthFund",
          "necessity",
          "necessityFund",
          "waterLavieFund",
        ];

        const newPathSegments = [...pathSegmentsCreateMonth, monthYear, object];
        estimateNecessityExpenses.forEach(async (documentId) => {
          const dataObject = data.find((item) => item.id === documentId);
          try {
            await setDoc(doc(db, ...newPathSegments, documentId), dataObject);
            console.log(`Set data document ${dataObject.id} successfully`);
          } catch (error) {
            console.log("Failed to set data document ${dataObject.id}");
          }
        });
        console.log("Set estimateNecessityExpenses successfully");
        console.log(
          "--------------------------------------------------------------------------------------",
        );

        break;
      }
      case "funds": {
        const data = sampleJson.funds;
        const funds = [
          "education",
          "freedom",
          "giving",
          "longTermSaving",
          "necessity",
          "enjoy",
        ];

        const newPathSegments = [...pathSegmentsCreateMonth, monthYear, object];
        funds.forEach(async (documentId) => {
          const dataObject = data.find((item) => item.id === documentId);
          try {
            await setDoc(doc(db, ...newPathSegments, documentId), dataObject);
            console.log(`Set data document ${dataObject.id} successfully`);
          } catch (error) {
            console.log(`Failed to set data document ${dataObject.id}`);
          }
        });
        console.log("Set funds successfully");
        console.log(
          "--------------------------------------------------------------------------------------",
        );
        break;
      }
      case "handleIncomes": {
        const data = sampleJson.handleIncomes;
        const handleIncomes = [
          "education",
          "freedom",
          "giving",
          "longTermSaving",
          "necessity",
          "enjoy",
        ];

        const newPathSegments = [...pathSegmentsCreateMonth, monthYear, object];
        handleIncomes.forEach(async (documentId) => {
          const dataObject = data.find((item) => item.id === documentId);
          try {
            await setDoc(doc(db, ...newPathSegments, documentId), dataObject);
            console.log(`Set data document ${dataObject.id} successfully`);
          } catch (error) {
            console.log(`Failed to set data document ${dataObject.id}`);
          }
        });
        console.log("Set handleIncomes successfully");
        console.log(
          "--------------------------------------------------------------------------------------",
        );
        break;
      }
      case "incomes": {
        const data = sampleJson.incomes;
        const handleIncomes = ["1", "2", "3"];

        const newPathSegments = [...pathSegmentsCreateMonth, monthYear, object];
        handleIncomes.forEach(async (documentId) => {
          const dataObject = data.find((item) => item.key === documentId);
          try {
            await setDoc(doc(db, ...newPathSegments, documentId), dataObject);
            console.log(`Set data document ${dataObject.key} successfully`);
          } catch (error) {
            console.log(`Failed to set data document ${dataObject.key}`);
          }
        });
        console.log("Set incomes successfully");
        console.log(
          "--------------------------------------------------------------------------------------",
        );
        break;
      }
      default:
        break;
    }
  });
}

export async function createNewMonthByDuplicate(month, year, monthYear) {
  const { currentYear } = getCurrentTime();
  const { docIds: listMonthsByYear } = await getListMonthsByYear(currentYear);
  const lastMonth = listMonthsByYear[listMonthsByYear.length - 1];
  const { email: user } = JSON.parse(localStorage.getItem("user"));
  const pathSegmentsCreateMonth = ["users", user, "years", year, "months"];

  // Lấy document hiện tại
  const lastMonthDocRef = doc(db, ...pathSegmentsCreateMonth, lastMonth);

  const lastMonthDocSnap = await getDoc(lastMonthDocRef);

  if (lastMonthDocSnap.exists()) {
    const data = lastMonthDocSnap.data();

    // Tạo một document mới với dữ liệu sao chép
    const newMonthDocRef = doc(db, ...pathSegmentsCreateMonth, monthYear); // monthYear là ID của document mới

    await setDoc(newMonthDocRef, data);

    // Các collection con cần sao chép
    const subcollections = [
      "estimateNecessityExpenses",
      "funds",
      "handleIncomes",
      "incomes",
    ];

    for (const subcolId of subcollections) {
      const subcollectionRef = collection(
        db,
        ...pathSegmentsCreateMonth,
        lastMonth,
        subcolId,
      );
      const newSubcollectionRef = collection(
        db,
        ...pathSegmentsCreateMonth,
        monthYear,
        subcolId,
      );

      const subcollectionDocs = await getDocs(subcollectionRef);
      for (const subDocSnap of subcollectionDocs.docs) {
        const subDocData = subDocSnap.data();
        await setDoc(doc(newSubcollectionRef, subDocSnap.id), subDocData);
      }
    }
    console.log("Duplicate new month successfully");
  } else {
    await createNewMonth(month, year, monthYear);
  }
}

export async function getListYears() {
  const pathSegments = ["users", "admin", "years"];
  return await getListDocsByCollection(pathSegments);
}

export async function getListMonthsByYear(year) {
  const pathSegments = ["users", "admin", "years", year, "months"];
  return await getListDocsByCollection(pathSegments);
}

export async function getHandleIncomesByMonth(year, month) {
  const user = JSON.parse(localStorage.getItem("user"));
  const originPathSegments = [
    "users",
    user.email,
    "years",
    year,
    "months",
    month,
  ];
  const handleIncomesPathSegments = [...originPathSegments, "handleIncomes"];

  const handleIncomesByType = await getListDocsByCollection(
    handleIncomesPathSegments,
  );

  const allHandleIncomes = handleIncomesByType.docsData.map((type) => {
    return type.items;
  });

  const allHandleIncomesDetails = allHandleIncomes
    .filter((item) => item !== undefined)
    .flat();

  return allHandleIncomesDetails;
}

export async function getHandleIncomesAllYears() {
  const { docIds: allYears } = await getListYears();
  let allMonths = [];
  let allHandleIncomes = [];
  for (const year of allYears) {
    const { docIds: listMonthsByYear } = await getListMonthsByYear(year);
    for (const month of listMonthsByYear) {
      const listHandleIncomesByMonth = await getHandleIncomesByMonth(
        year,
        month,
      );
      allHandleIncomes.push(...listHandleIncomesByMonth);
    }
  }
  return allHandleIncomes;
}

export async function getAllHandleIncomesIsDebt() {
  const handleIncomeAllYears = await getHandleIncomesAllYears();
  const allHandleIncomesIsDebt = handleIncomeAllYears.filter(
    (item) => item.isDebt === "true",
  );
  store.dispatch("setAllHandleIncomesIsDebt", allHandleIncomesIsDebt);
}

export async function getListDocsByCollection(pathSegments) {
  const colRef = collection(db, ...pathSegments);

  try {
    const querySnapshot = await getDocs(colRef);
    const documents = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return { docIds: documents.map((item) => item.id), docsData: documents };
  } catch (error) {
    console.error("Error getting documents: ", error);
    return [];
  }
}
