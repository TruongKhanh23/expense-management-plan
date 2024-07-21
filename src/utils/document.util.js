import { getFirestore, doc, getDoc } from "firebase/firestore";
import { db } from "@/main";

export async function checkDocumentExists(pathSegments, documentId) {
  const docRef = doc(db, ...pathSegments, "2024");
  try {
    const docSnap = await getDoc(docRef);
    return docSnap.exists();
  } catch (error) {
    console.error("Error checking document:", error);
    return null;
  }
}
