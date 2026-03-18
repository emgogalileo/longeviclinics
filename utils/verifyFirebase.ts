import { auth, db } from "./firebase";

export const verifyFirebase = () => {
  console.log("--- Firebase Verification ---");
  console.log("Auth initialized:", !!auth);
  console.log("Firestore initialized:", !!db);
  console.log("Project ID:", db.app.options.projectId);
  console.log("----------------------------");
};
