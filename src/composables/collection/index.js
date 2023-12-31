import { ref } from "vue";
import { db } from "@/main";
import dayjs from "dayjs";
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
} from "firebase/firestore";

const pathSegments = [
  "users",
  "admin",
  "years",
  "2023",
  "months",
  "01-2023",
  "handleIncomes",
];

const countries = ref([]);
export async function createNewMonth(month, year, monthYear) {

  const pathSegments = ["users", "admin", "years", year, "months"];

  // Create document month-year (Ex: 02-2023)
  let dataObject = { name: `Tháng ${month}, năm ${year}` };
  // doc(firestoreInstance, "collectionName", "documentId")
  // setDoc(collectionReference, dataObject)
  try {
    await setDoc(doc(db, ...pathSegments, monthYear), dataObject);
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

        const newPathSegments = [...pathSegments, monthYear, object];
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
          "relax",
        ];

        const newPathSegments = [...pathSegments, monthYear, object];
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
          "relax",
        ];

        const newPathSegments = [...pathSegments, monthYear, object];
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

        const newPathSegments = [...pathSegments, monthYear, object];
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
